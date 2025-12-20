import Fastify, { type FastifyError } from 'fastify'
import helmet from '@fastify/helmet'
import cors from '@fastify/cors'
import rateLimit from '@fastify/rate-limit'
import swagger from '@fastify/swagger'
import { STATUS_CODES } from 'node:http'
import prismaPlugin from './plugins/prisma.js'
import { Type as T } from 'typebox'
import type { TypeBoxTypeProvider } from '@fastify/type-provider-typebox'
import { ValidationProblem, ProblemDetails, User, Health, Room, Booking, RoomsResponse } from './types.js'
import { PrismaClient } from '@prisma/client'

export async function buildApp() {
  const app = Fastify({
    logger: true,
    trustProxy: true,

    schemaErrorFormatter(errors, dataVar) {
      const msg = errors.map((e) => e.message).filter(Boolean).join('; ') || 'Validation failed'
      return new ValidationProblem(msg, errors, dataVar)
    }
  }).withTypeProvider<TypeBoxTypeProvider>()

  await app.register(helmet)

  await app.register(cors, {
  origin: ['https://rodrafaer.github.io'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
});

  await app.register(rateLimit, {
    max: 100, 
    timeWindow: '1 minute',
    enableDraftSpec: true,
    addHeaders: {
      'x-ratelimit-limit': true,
      'x-ratelimit-remaining': true,
      'x-ratelimit-reset': true,
      'retry-after': true
    },
    errorResponseBuilder(request, ctx) {
      const seconds = Math.ceil(ctx.ttl / 1000)
      return {
        type: 'about:blank',
        title: 'Too Many Requests',
        status: 429,
        detail: `Rate limit exceeded. Retry in ${seconds} seconds.`,
        instance: request.url
      } satisfies ProblemDetails
    }
  })

  await app.register(swagger, {
    openapi: {
      openapi: '3.0.3',
      info: {
        title: 'Rooms API',
        version: '1.0.0',
        description: 'HTTP-API, совместим с RFC 9457.'
      },
      servers: [{ url: 'http://localhost:3000' }],
      tags: [
        { name: 'Users', description: 'Маршруты для управления пользователями' },
        { name: 'System', description: 'Служебные эндпоинты' }
      ]
    }
  })

  await app.register(prismaPlugin)

  app.setErrorHandler<FastifyError | ValidationProblem>((err, req, reply) => {
    const status = typeof err.statusCode === 'number' ? err.statusCode : 500
    const isValidation = err instanceof ValidationProblem

    const problem = {
      type: 'about:blank',
      title: STATUS_CODES[status] ?? 'Error',
      status,
      detail: err.message || 'Unexpected error',
      instance: req.url,
      ...(isValidation ? { errorsText: err.message } : {})
    }

    reply.code(status).type('application/problem+json').send(problem)
  })

  app.setNotFoundHandler((request, reply) => {
    reply.code(404).type('application/problem+json').send({
      type: 'about:blank',
      title: 'Not Found',
      status: 404,
      detail: `Route ${request.method} ${request.url} not found`,
      instance: request.url
    } satisfies ProblemDetails)
  })

  app.get(
    '/api/users',
    {
      schema: {
        operationId: 'listUsers',
        tags: ['Users'],
        summary: 'Возвращает список пользователей',
        description: 'Получаем id и email для каждого пользователя.',
        response: {
          200: {
            description: 'Список пользователей',
            content: { 'application/json': { schema: T.Array(User) } }
          },
          429: {
            description: 'Too Many Requests',
            headers: {
              'retry-after': {
                schema: T.Integer({ minimum: 0, description: 'Через сколько секунд можно повторить запрос' })
              }
            },
            content: { 'application/problem+json': { schema: ProblemDetails } }
          },
          500: {
            description: 'Internal Server Error',
            content: { 'application/problem+json': { schema: ProblemDetails } }
          }
        }
      }
    },
    async (_req, _reply) => {
      return app.prisma.user.findMany({ select: { id: true, email: true } })
    }
  )

  app.get(
    '/api/rooms',
    {
      schema: {
        operationId: 'listRooms',
        tags: ['Rooms'],
        summary: 'Возвращает список аудиторий',
        description: 'Получаем полный список аудиторий с их статусом и оборудованием.',
        querystring: {
          type: 'object',
          properties: {
            page: {
              type: 'integer',
              minimum: 1,
              default: 1,
              description: 'Номер страницы'
            },
            pageSize: {
              type: 'integer',
              minimum: 1,
              maximum: 100,
              default: 10,
              description: 'Размер страницы'
            }
          }
        },
        response: {
          200: {
            description: 'Список аудиторий',
            content: { 'application/json': {schema: RoomsResponse}}
          },
          429: { description: 'Too Many Requests'},
          500: { description: 'Internal Server Error'}
        }
      }
    },
    async (req, reply) => {
      const { page = 1, pageSize = 10} = req.query;

      const pageNumber = Number(page);
      const pageSizeNumber = Number(pageSize);
      const skip = (pageNumber - 1) * pageSizeNumber;

      const total = await app.prisma.room.count();
      const items = await app.prisma.room.findMany({
        skip: skip,
        take: pageSizeNumber,
      });

      return {
        items,
        page: pageNumber,
        total,
      }
    }
  )

  app.get(
    '/api/bookings',
    {
      schema: {
        operationId: 'listBookings',
        tags: ['Bookings'],
        summary: 'Возвращает список всех бронироваий',
        response: {
          200: {
            description: 'Список бронирований',
            content: {'application/json': { schema: T.Array(Booking)}}
          },
          429: { description: 'Too Many Requests'},
          500: { description: 'Internal Server Error'}
        }
      }
    },
    async (_req, _reply) => {
      return app.prisma.booking.findMany({
        include: {
          room: {
            select: {
              id: true,
              code: true,
              name: true
            }
          },
          user: {
            select: {
              id: true,
              name: true
            }
          },
        },
        orderBy: { startTime: 'asc'}
      })
    }
  )

  app.get(
    '/api/rooms/:roomId/bookings',
    {
      schema: {
        operationId: 'getRoomBookings',
        tags: ['Bookings'],
        summary: 'Возвращает бронирования для комнаты',
        description: 'Получает все бронирования для указанной аудитории.',
        params: {
          type: 'object',
          properties: {
            roomId: { type: 'string', description: 'ID комнаты' }
          }
        },
        response: {
          200: { description: 'Список бронирований', content: { 'application/json': { schema: T.Array(Booking) } } },
          400: { 
            description: 'Bad Request',
            content: { 'application/problem+json': { schema: ProblemDetails } }
          },
          500: { description: 'Internal Server Error' }
        }
      }
    },
    async (req, reply) => {
      const { roomId } = req.params;

      if (!roomId) {
        reply.code(400).send({ detail: 'roomId is required' });
        return;
      }

      const bookings = await app.prisma.booking.findMany({
        where: { roomId: roomId },
        include: {
          room: { select: { id: true, code: true, name: true } },
          user: { select: { id: true, name: true } },
        },
        orderBy: { startTime: 'asc' }
      });

      reply.send(bookings);
    }
  )

  app.post(
    '/api/bookings',
    {
      schema: {
        operationId: 'createBooking',
        tags: ['Bookings'],
        summary: 'Создает новое бронирование',
        body: {
          type: 'object',
          properties: {
            roomId: {type: 'string'},
            startTime: {type: 'string', format: 'date-time'},
            endTime: {type: 'string', format: 'date-time'},
          },
          required: ['roomId', 'startTime', 'endTime'],
        },
        response: {
          201: {
            description: 'Бронирование создано',
            content: { 'application/json': {schema: Booking}}
          },
          409: { description: "Ошибка пересечения времени"},
          429: { description: 'Too Many Requests'},
          500: { description: 'Internal Server Error'}
        }
      }
    },
    async (req, reply) => {
      const {roomId, startTime, endTime} = req.body

      const user = await app.prisma.user.findFirst();
      if (!user) {
        reply.code(500).send({ detail: 'В базе данных нет пользователей' });
        return;
      }
      const userId = user.id;

      const conflictingBooking = await app.prisma.booking.findFirst({
        where: {
          roomId: roomId,
          OR: [
            { startTime: { lt: new Date(endTime) }, endTime: { gt: new Date(startTime) } }
          ]
        }
      });

      if (conflictingBooking) {
        return reply.code(409).send({ detail: 'Комната уже забронирована на это время' });
      }

      const newBooking = await app.prisma.booking.create({
        data: {
          startTime: new Date(startTime),
          endTime: new Date(endTime),
          room: { connect: {id: roomId}},
          user: { connect: {id: userId}},
        },
        include: {
          room: {select: {id:true, code: true, name: true}},
          user: {select: {id: true, name: true}},
        }
      })

      reply.code(201).send(newBooking)
    }
  )

  app.delete(
    '/api/bookings/:id',
    {
      schema: {
        operationId: 'deleteBooking',
        tags: ['Bookings'],
        summary: 'Удаляет бронирование',
        params: {
          type: 'object',
          properties: {
            id: { type: 'string', description: 'ID бронирования' }
          },
          required: ['id']
        },
        response: {
          200: { description: 'Бронирование успешно удалено' },
          404: { description: 'Бронирование не найдено', content: { 'application/problem+json': { schema: ProblemDetails } } },
          500: { description: 'Internal Server Error' }
        }
      }
    },
    async (req, reply) => {
      const { id } = req.params;

      try {
        await app.prisma.booking.delete({
          where: { id: id }
        });
        return reply.send({ message: 'Бронирование успешно удалено' });
      } catch (error) {
        const prismaError = error as any;
        if (prismaError.code === 'P2025') {
          return reply.code(404).send({ detail: 'Бронирование не найдено' });
        }
        return reply.code(500).send({ detail: 'Internal Server Error' });
      }
    }
  );

  app.put(
    '/api/bookings/:id',
    {
      schema: {
        operationId: 'updateBooking',
        tags: ['Bookings'],
        summary: 'Обновляет существующее бронирование',
        params: {
          type: 'object',
          properties: {
            id: { type: 'string', description: 'ID бронирования' }
          },
          required: ['id']},
        body: {
          type: 'object',
          properties: {
            roomId: { type: 'string' },
            startTime: { type: 'string', format: 'date-time' },
            endTime: { type: 'string', format: 'date-time' },
          },
          required: ['roomId', 'startTime', 'endTime'],
        },
        response: {
          200: { description: 'Бронирование обновлено', content: { 'application/json': { schema: Booking } } },
          404: { description: 'Бронирование не найдено' },
          409: { description: 'Комната уже забронирована на это время' },
          500: { description: 'Internal Server Error' }
        }
      }
    },
      async (req, reply) => {
      const { id } = req.params as { id: string };
      const { roomId, startTime, endTime } = req.body as { roomId: string; startTime: string; endTime: string };

      try {
        const result = await app.prisma.$transaction(async (tx: PrismaClient) => {
          const bookingToUpdate = await tx.booking.findUnique({ where: { id } });
          if (!bookingToUpdate) {
            throw new Error('Booking not found');
          }

          const conflictingBooking = await tx.booking.findFirst({
            where: {
              id: { not: id },
              roomId: roomId,
              OR: [
                { startTime: { lt: new Date(endTime) }, endTime: { gt: new Date(startTime) } }
              ]
            }
          });

          if (conflictingBooking) {
            throw new Error('Комната уже забронирована на это время');
          }

          const updatedBooking = await tx.booking.update({
            where: { id: id },
            data: {
              startTime: new Date(startTime),
              endTime: new Date(endTime),
              room: { connect: { id: roomId } },
            },
            include: {
              room: { select: { id: true, code: true, name: true } },
              user: { select: { id: true, name: true } },
            }
          });
          
          return updatedBooking;
        });

        return reply.send(result);

      } catch (error: any) {
        const prismaError = error as any;
        if (prismaError.code === 'P2025' || error.message === 'Бронирование не найдено') {
          return reply.code(404).send({ detail: 'Бронирование не найдено' });
        }
        if (error.message === 'Комната уже забронирована на это время') {
          return reply.code(409).send({ detail: error.message });
        }
        console.error(error);
        return reply.code(500).send({ detail: 'Internal Server Error' });
      }
    }
  );

  app.get(
    '/api/health',
    {
      schema: {
        operationId: 'health',
        tags: ['System'],
        summary: 'Health/Readiness',
        description: 'Проверяет, что процесс жив и база данных отвечает.',
        response: {
          200: {
            description: 'Ready',
            content: { 'application/json': { schema: Health } }
          },
          503: {
            description: 'Temporarily unavailable',
            content: { 'application/problem+json': { schema: ProblemDetails } }
          },
          429: {
            description: 'Too Many Requests',
            headers: {
              'retry-after': { schema: T.Integer({ minimum: 0 }) }
            },
            content: { 'application/problem+json': { schema: ProblemDetails } }
          },
          500: {
            description: 'Internal Server Error',
            content: { 'application/problem+json': { schema: ProblemDetails } }
          }
        }
      }
    },
    async (_req, reply) => {
      try {
        await app.prisma.$queryRaw`SELECT 1`
        return { ok: true } as Health
      } catch {
        reply.code(503).type('application/problem+json').send({
          type: 'https://example.com/problems/dependency-unavailable',
          title: 'Service Unavailable',
          status: 503,
          detail: 'Database ping failed',
          instance: '/api/health'
        } satisfies ProblemDetails)
      }
    }
  )

  app.get(
    '/openapi.json',
    {
      schema: { hide: true, tags: ['Internal'] }
    },
    async (_req, reply) => {
      reply.type('application/json').send(app.swagger())
    }
  )

  return app
}