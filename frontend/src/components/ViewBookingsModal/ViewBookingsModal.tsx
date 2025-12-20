// frontend/src/components/ViewBookingsModal/ViewBookingsModal.tsx
import { useState, useEffect, useImperativeHandle, forwardRef } from 'react'; // <-- ДОБАВЛЕНЫ ИМПОРТЫ
import {
  Dialog, DialogTitle, DialogContent, DialogActions, Button,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  CircularProgress, Box, Typography, Paper, IconButton, Tooltip
} from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';
import { getRoomBookings, deleteBooking } from '@/api/bookingsApi';
import type { Booking } from '@/types/api';

// Добавляем новый пропс для обработки редактирования
interface ViewBookingsModalProps {
  open: boolean;
  onClose: () => void;
  roomId: string;
  roomName: string;
  onEditBooking: (booking: Booking) => void;
}

// Добавляем интерфейс для ref
export interface ViewBookingsModalRef {
  refreshBookings: () => void;
}

// Оборачиваем компонент в forwardRef
export const ViewBookingsModal = forwardRef<ViewBookingsModalRef, ViewBookingsModalProps>(
  ({ open, onClose, roomId, roomName, onEditBooking }, ref) => {
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [loading, setLoading] = useState(false);

    const fetchBookings = async () => {
      setLoading(true);
      try {
        const data = await getRoomBookings(roomId);
        setBookings(data);
      } catch (error) {
        console.error('Failed to fetch bookings:', error);
      } finally {
        setLoading(false);
      }
    };

    // "Отдаем" функцию fetchBookings наружу через ref
    useImperativeHandle(ref, () => ({
      refreshBookings: fetchBookings,
    }));

    useEffect(() => {
      if (open && roomId) {
        fetchBookings();
      }
    }, [open, roomId]);

    const handleDelete = async (bookingId: string) => {
      if (window.confirm('Вы уверены, что хотите удалить это бронирование?')) {
        try {
          await deleteBooking(bookingId);
          fetchBookings(); // Обновляем список после удаления
        } catch (error) {
          console.error('Failed to delete booking:', error);
          alert('Не удалось удалить бронирование.');
        }
      }
    };

    return (
      <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
        <DialogTitle>Бронирования для: {roomName}</DialogTitle>
        <DialogContent>
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
              <CircularProgress />
            </Box>
          ) : (
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Начало</TableCell>
                    <TableCell>Конец</TableCell>
                    <TableCell>Кто забронировал</TableCell>
                    <TableCell align="center">Действия</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {bookings.length > 0 ? (
                    bookings.map((booking) => (
                      <TableRow key={booking.id}>
                        <TableCell>{new Date(booking.startTime).toLocaleString()}</TableCell>
                        <TableCell>{new Date(booking.endTime).toLocaleString()}</TableCell>
                        <TableCell>{booking.user?.name || 'Неизвестно'}</TableCell>
                        <TableCell align="center">
                          <Tooltip title="Редактировать">
                            <IconButton onClick={() => onEditBooking(booking)}>
                              <EditIcon color="primary" />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Удалить">
                            <IconButton onClick={() => handleDelete(booking.id)} color="error">
                              <DeleteOutlineIcon />
                            </IconButton>
                          </Tooltip>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={4} sx={{ textAlign: 'center' }}>
                        <Typography variant="body2">Пока нет бронирований для этой аудитории.</Typography>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Закрыть</Button>
        </DialogActions>
      </Dialog>
    );
  }
);