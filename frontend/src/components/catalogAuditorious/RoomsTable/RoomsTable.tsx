import { useEffect, useState, useRef } from 'react';
import {
  Paper, Table, TableHead, TableRow, TableCell, TableBody,
  Chip, CircularProgress, Box, IconButton, Stack, Typography
} from '@mui/material';
import { VisibilityOutlined, Groups2Outlined, BookmarkBorderOutlined } from '@mui/icons-material';
import { fetchRooms, type RoomDto } from '@/api/roomsApi';
import { BookingModal } from '@/components/BookingModal/BookingModal';
import { ViewBookingsModal, type ViewBookingsModalRef } from '@/components/ViewBookingsModal/ViewBookingsModal';
import type { Booking } from '@/types/api';

const EQUIP_LABEL: Record<string, string> = {
  projector: "Проектор", microphone: "Микрофон", wifi: "Wi-Fi",
  computers: "Компьютеры", board: "Доска",
};

export function RoomsTable() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [items, setItems] = useState<RoomDto[]>([]);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  const [bookingModalData, setBookingModalData] = useState<{
    roomId: string;
    roomName: string;
    mode: 'create' | 'edit';
    bookingData?: Booking;
  } | null>(null);

  const [isViewBookingsModalOpen, setIsViewBookingsModalOpen] = useState(false);
  const [selectedRoomForView, setSelectedRoomForView] = useState<{ id: string; name: string } | null>(null);
  const viewBookingsModalRef = useRef<ViewBookingsModalRef>(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        setLoading(true);
        const data = await fetchRooms(1);
        if (mounted) setItems(data.items);
      } catch (e) {
        if (mounted) setError((e as Error).message || "Ошибка загрузки");
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, []);

  const handleOpenBookingModal = (room: { id: string; name: string }) => {
    setBookingModalData({
      roomId: room.id,
      roomName: room.name,
      mode: 'create'
    });
    setIsBookingModalOpen(true);
  };

  const handleOpenEditModal = (booking: Booking) => {
    const room = items.find(r => r.id === booking.room.id);
    if (!room) return;

    setBookingModalData({
      roomId: room.id,
      roomName: room.name,
      mode: 'edit',
      bookingData: booking
    });
    setIsBookingModalOpen(true);
  };

  const handleCloseBookingModal = () => {
    setIsBookingModalOpen(false);
    setBookingModalData(null);
  };

  const handleOpenViewBookingsModal = (room: { id: string; name: string }) => {
    setSelectedRoomForView(room);
    setIsViewBookingsModalOpen(true);
  };

  const handleCloseViewBookingsModal = () => {
    setIsViewBookingsModalOpen(false);
    setSelectedRoomForView(null);
  };

  const handleBookingSaved = () => {
    console.log('Booking saved!');
    handleCloseBookingModal();
    
    if (isViewBookingsModalOpen && viewBookingsModalRef.current) {
      viewBookingsModalRef.current.refreshBookings();
    }
  }

  if (loading) return <Box sx={{ p: 3, display: 'grid', placeItems: 'center' }}><CircularProgress /></Box>;
  if (error) return <Box sx={{ p: 3 }}><Typography color="error">Не удалось загрузить данные: {error}</Typography></Box>;

  return (
    <>
      <Paper elevation={0} sx={{ borderRadius: 2, overflow: 'hidden', border: '1px solid #eef0f3' }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell width={100}>Номер</TableCell>
              <TableCell>Название</TableCell>
              <TableCell width={160} align="left">Вместимость</TableCell>
              <TableCell>Оборудование</TableCell>
              <TableCell width={160} align="center">Действия</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((r) => (
              <TableRow key={r.id} hover>
                <TableCell sx={{ color: 'text.secondary' }}>{r.code}</TableCell>
                <TableCell>
                  <Stack spacing={0.5}>
                    <Typography fontWeight={600}>{r.name}</Typography>
                  </Stack>
                </TableCell>
                <TableCell align="center">
                  <Stack direction="row" spacing={1} justifyContent="center" alignItems="center">
                    <Groups2Outlined fontSize="small" />
                    <span>{r.capacity}</span>
                  </Stack>
                </TableCell>
                <TableCell>
                  <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
                    {r.equipment.map((k) => <Chip key={k} label={EQUIP_LABEL[k] ?? k} size="small" variant="outlined" />)}
                  </Stack>
                </TableCell>
                <TableCell align="center">
                  <Stack direction="row" spacing={0.5} justifyContent="center">
                    <IconButton 
                      size="small" 
                      title="Просмотр"
                      onClick={() => handleOpenViewBookingsModal({ id: r.id, name: r.name })}
                    >
                      <VisibilityOutlined fontSize="small" /></IconButton>
                    <IconButton
                      size="small"
                      color="primary"
                      title="Забронировать"
                      onClick={() => handleOpenBookingModal({ id: r.id, name: r.name })}
                    >
                      <BookmarkBorderOutlined fontSize="small" />
                    </IconButton>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>

      {bookingModalData && (
        <BookingModal
          open={isBookingModalOpen}
          onClose={handleCloseBookingModal}
          onBookingSaved={handleBookingSaved}
          mode={bookingModalData.mode}
          initialData={bookingModalData.bookingData}
          roomId={bookingModalData.roomId}
          roomName={bookingModalData.roomName}
        />
      )}

      {selectedRoomForView && (
        <ViewBookingsModal
          ref={viewBookingsModalRef}
          open={isViewBookingsModalOpen}
          onClose={handleCloseViewBookingsModal}
          roomId={selectedRoomForView.id}
          roomName={selectedRoomForView.name}
          onEditBooking={handleOpenEditModal} // <-- ПЕРЕДАЕМ ФУНКЦИЮ
        />
      )}
    </>
  );
}