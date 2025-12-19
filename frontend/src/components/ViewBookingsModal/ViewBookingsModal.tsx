import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
  Box,
  Typography,
  Paper,
} from '@mui/material';
import { http } from '@/api/http';
import type { Booking } from '@/../../backend/src/types.ts'; 

interface ViewBookingsModalProps {
  open: boolean;
  onClose: () => void;
  roomId: string;
  roomName: string;
}

export function ViewBookingsModal({ open, onClose, roomId, roomName }: ViewBookingsModalProps) {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (open && roomId) {
      setLoading(true);
      http.get(`/rooms/${roomId}/bookings`)
        .then(res => setBookings(res.data))
        .catch(console.error)
        .finally(() => setLoading(false));
    }
  }, [open, roomId]);

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
                </TableRow>
              </TableHead>
              <TableBody>
                {bookings.length > 0 ? (
                  bookings.map((booking) => (
                    <TableRow key={booking.id}>
                      <TableCell>{new Date(booking.startTime).toLocaleString()}</TableCell>
                      <TableCell>{new Date(booking.endTime).toLocaleString()}</TableCell>
                      <TableCell>{booking.user?.name || 'Неизвестно'}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={3} sx={{ textAlign: 'center' }}>
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