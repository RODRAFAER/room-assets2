// frontend/src/api/bookingsApi.ts
import { http } from './http';
import type { Booking } from '@/types/api';

// Тип для данных, которые мы отправляем при создании/редактировании
export type BookingFormData = {
  roomId: string;
  startTime: string; // ISO string
  endTime: string;   // ISO string
};

// Получить все бронирования для конкретной комнаты
export const getRoomBookings = async (roomId: string): Promise<Booking[]> => {
  const { data } = await http.get(`/rooms/${roomId}/bookings`);
  return data;
};

// Создать новое бронирование
export const createBooking = async (bookingData: BookingFormData): Promise<Booking> => {
  const { data } = await http.post('/bookings', bookingData);
  return data;
};

// Обновить существующее бронирование
export const updateBooking = async (id: string, bookingData: BookingFormData): Promise<Booking> => {
  const { data } = await http.put(`/bookings/${id}`, bookingData);
  return data;
};

// Удалить бронирование
export const deleteBooking = async (id: string): Promise<void> => {
  await http.delete(`/bookings/${id}`);
};