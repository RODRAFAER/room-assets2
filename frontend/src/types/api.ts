export interface User {
  id: string;
  name: string;
}

// Тип для объекта комнаты, который приходит в бронировании
export interface Room {
  id: string;
  code: string;
  name: string;
}

// Тип для объекта бронирования
export interface Booking {
  id: string;
  startTime: string; // API отдает строку в формате ISO 8601
  endTime: string;
  room: Room;
  user: User;
  createdAt: string;
  updatedAt: string;
}