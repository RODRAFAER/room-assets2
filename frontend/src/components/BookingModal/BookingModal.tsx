// frontend/src/components/BookingModal/BookingModal.tsx
import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  CircularProgress,
} from '@mui/material';
import { DatePicker, TimePicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import { http } from '@/api/http';

// Описываем props, которые компонент будет принимать
interface BookingModalProps {
  open: boolean;
  onClose: () => void;
  roomId: string; // ID комнаты, которую бронируем
  roomName: string; // Название комнаты для заголовка
}

export function BookingModal({ open, onClose, roomId, roomName }: BookingModalProps) {
  // Состояния для полей формы
  const [startDate, setStartDate] = useState<Dayjs | null>(dayjs());
  const [startTime, setStartTime] = useState<Dayjs | null>(dayjs().add(1, 'hour'));
  const [endTime, setEndTime] = useState<Dayjs | null>(dayjs().add(2, 'hour'));
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!startDate || !startTime || !endTime) {
        alert('Пожалуйста, заполните все поля');
        return;
    }

    setLoading(true);

    // Собираем полную дату и время
    const startDateTime = startDate
        .hour(startTime.hour())
        .minute(startTime.minute())
        .second(0)
        .millisecond(0)
        .toISOString();

    const endDateTime = startDate
        .hour(endTime.hour())
        .minute(endTime.minute())
        .second(0)
        .millisecond(0)
        .toISOString();

    try {
    // --- ВОТ НОВЫЙ КОД ---
    // Отправляем POST-запрос на наш бэкенд
    const response = await http.post('/bookings', {
      roomId: roomId,
      startTime: startDateTime,
      endTime: endDateTime,
    });

    console.log('Ответ сервера:', response.data);

    alert('Бронирование успешно создано!');
    onClose(); // Закрываем модальное окно
    // TODO: В идеале, здесь нужно обновить список бронирований на странице
  } catch (error) {
    console.error('Ошибка при создании бронирования:', error);
    alert('Не удалось создать бронирование. Попробуйте еще раз.');
  } finally {
    setLoading(false);
  }
};

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
        <DialogTitle>Бронирование: {roomName}</DialogTitle>
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
            <Button onClick={onClose} disabled={loading}>
              Отмена
            </Button>
            <Button type="submit" variant="contained" disabled={loading}>
              {loading ? <CircularProgress size={24} /> : 'Забронировать'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </LocalizationProvider>
  );
}