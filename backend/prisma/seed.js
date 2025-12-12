// backend/prisma/seed.ts
import { PrismaClient } from '../src/generated/prisma/client.js';
const prisma = new PrismaClient();
// Используем более современную и надежную конструкцию для запуска асинхронного кода
async function seedDatabase() {
    console.log('Start seeding...');
    // Создаем пользователей
    const user1 = await prisma.user.upsert({
        where: { email: 'alice@example.com' },
        update: {},
        create: { email: 'alice@example.com', name: 'Alice' },
    });
    const user2 = await prisma.user.upsert({
        where: { email: 'bob@example.com' },
        update: {},
        create: { email: 'bob@example.com', name: 'Bob' },
    });
    // Создаем комнаты
    const room1 = await prisma.room.upsert({
        where: { code: '201' },
        update: {},
        create: { code: '201', name: 'Конференц-зал', capacity: 70, equipment: ['projector', 'microphone', 'wifi'] },
    });
    const room2 = await prisma.room.upsert({
        where: { code: '101' },
        update: {},
        create: { code: '101', name: 'Лекционная аудитория', capacity: 120, equipment: ['projector', 'wifi'] },
    });
    const room3 = await prisma.room.upsert({
        where: { code: '102' },
        update: {},
        create: { code: '102', name: 'Компьютерный класс', capacity: 30, equipment: ['computers', 'projector', 'board', 'wifi'] },
    });
    const room4 = await prisma.room.upsert({
        where: { code: '202' },
        update: {},
        create: { code: '202', name: 'Семинарская', capacity: 25, equipment: ['board', 'wifi'] },
    });
    // Создаем бронирования
    await prisma.booking.createMany({
        data: [
            {
                startTime: new Date('2025-10-20T10:00:00Z'),
                endTime: new Date('2025-10-20T12:00:00Z'),
                roomId: room1.id,
                userId: user1.id,
            },
            {
                startTime: new Date('2025-10-21T14:00:00Z'),
                endTime: new Date('2025-10-21T15:30:00Z'),
                roomId: room2.id,
                userId: user2.id,
            },
        ],
        skipDuplicates: true,
    });
    console.log('Seeding finished.');
}
// Основной блок выполнения, который правильно обрабатывает ошибки и отключается от БД
try {
    await seedDatabase();
}
catch (e) {
    console.error('Seeding failed:', e);
    process.exit(1);
}
finally {
    await prisma.$disconnect();
}
//# sourceMappingURL=seed.js.map