import { http } from './http';
import type { Booking } from '@/types/api';

export type BookingFormData = {
  roomId: string;
  startTime: string;
  endTime: string;
};

export const getRoomBookings = async (roomId: string): Promise<Booking[]> => {
  const { data } = await http.get(`/rooms/${roomId}/bookings`);
  return data;
};

export const createBooking = async (bookingData: BookingFormData): Promise<Booking> => {
  const { data } = await http.post('/bookings', bookingData);
  return data;
};

export const updateBooking = async (id: string, bookingData: BookingFormData): Promise<Booking> => {
  const { data } = await http.put(`/bookings/${id}`, bookingData);
  return data;
};

export const deleteBooking = async (id: string): Promise<void> => {
  await http.delete(`/bookings/${id}`);
};