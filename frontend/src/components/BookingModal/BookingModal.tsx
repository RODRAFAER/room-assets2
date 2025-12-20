// frontend/src/components/BookingModal/BookingModal.tsx
import React, { useState, useEffect } from 'react'; // <-- ДОБАВИЛИ useEffect
import {
  Dialog, DialogTitle, DialogContent, DialogActions, Button,
  Box, CircularProgress
} from '@mui/material';
import { DatePicker, TimePicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import { createBooking, updateBooking, type BookingFormData } from '@/api/bookingsApi'; // <-- ИМПОРТИРУЕМ НОВЫЕ ФУНКЦИИ
import type { Booking } from '@/types/api';

// Описываем props, которые компонент будет принимать
interface BookingModalProps {
  open: boolean;
  onClose: () => void;
  onBookingSaved: () => void; // Колбэк для обновления данных
  mode: 'create' | 'edit';    // Режим работы
  roomId: string;             // ID комнаты
  roomName: string;           // Название комнаты
  initialData?: Booking;      // Данные для редактирования (опционально)
}

export function BookingModal({ open, onClose, onBookingSaved, mode, roomId, roomName, initialData }: BookingModalProps) {
  // Состояния для полей формы
  const [startDate, setStartDate] = useState<Dayjs | null>(dayjs());
  const [startTime, setStartTime] = useState<Dayjs | null>(dayjs().add(1, 'hour'));
  const [endTime, setEndTime] = useState<Dayjs | null>(dayjs().add(2, 'hour'));
  const [loading, setLoading] = useState(false);

  // --- НОВЫЙ useEffect: Заполняет форму при редактировании ---
  useEffect(() => {
    if (!open) return;

    if (mode === 'edit' && initialData) {
      // Режим редактирования: заполняем поля из initialData
      const start = dayjs(initialData.startTime);
      const end = dayjs(initialData.endTime);
      setStartDate(start);
      setStartTime(start);
      setEndTime(end);
    } else {
      // Режим создания: сбрасываем поля на значения по умолчанию
      setStartDate(dayjs());
      setStartTime(dayjs().add(1, 'hour'));
      setEndTime(dayjs().add(2, 'hour'));
    }
  }, [mode, initialData, open]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!startDate || !startTime || !endTime) {
      alert('Пожалуйста, заполните все поля');
      return;
    }

    const startDateTime = startDate.hour(startTime.hour()).minute(startTime.minute()).second(0);
    const endDateTime = startDate.hour(endTime.hour()).minute(endTime.minute()).second(0);

    const bookingData: BookingFormData = {
      roomId: roomId,
      startTime: startDateTime.toISOString(),
      endTime: endDateTime.toISOString(),
    };

    setLoading(true);
    try {
      // --- НОВАЯ ЛОГИКА: Выбираем, что делать ---
      if (mode === 'edit' && initialData) {
        await updateBooking(initialData.id, bookingData);
        alert('Бронирование успешно обновлено!');
      } else {
        await createBooking(bookingData);
        alert('Бронирование успешно создано!');
      }

      onBookingSaved(); // Сообщаем родителю, что нужно обновить данные
    } catch (error: any) {
      console.error('Ошибка:', error);
      alert(error.response?.data?.detail || 'Не удалось сохранить бронирование. Попробуйте еще раз.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
        <DialogTitle>{mode === 'edit' ? 'Редактирование' : 'Бронирование'}: {roomName}</DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1 }}>
              <DatePicker
                label="Дата"
                value={startDate}
                onChange={(newValue) => setStartDate(newValue)}
                disabled={loading}
              />
              <Box sx={{ display: 'flex', gap: 2 }}>
                <TimePicker
                  label="Время начала"
                  value={startTime}
                  onChange={(newValue) => setStartTime(newValue)}
                  disabled={loading}
                />
                <TimePicker
                  label="Время окончания"
                  value={endTime}
                  onChange={(newValue) => setEndTime(newValue)}
                  disabled={loading}
                />
              </Box>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={onClose} disabled={loading}>Отмена</Button>
            <Button type="submit" variant="contained" disabled={loading}>
              {loading ? <CircularProgress size={24} /> : (mode === 'edit' ? 'Сохранить' : 'Забронировать')}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </LocalizationProvider>
  );
}