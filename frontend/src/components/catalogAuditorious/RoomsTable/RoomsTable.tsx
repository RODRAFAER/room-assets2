// frontend/src/components/RoomsTable/RoomsTable.tsx
import { useEffect, useState } from 'react';
import {
  Paper, Table, TableHead, TableRow, TableCell, TableBody,
  Chip, CircularProgress, Box, IconButton, Stack, Typography
} from '@mui/material';
import { VisibilityOutlined, EditOutlined, DeleteOutline, Groups2Outlined, BookmarkBorderOutlined } from '@mui/icons-material';
import { fetchRooms, type RoomDto } from '@/api/roomsApi';
import { BookingModal } from '@/components/BookingModal/BookingModal';
import { ViewBookingsModal } from '@/components/ViewBookingsModal/ViewBookingsModal';

// Этот объект теперь должен соответствовать вашим статусам в БД (AVAILABLE, BOOKED, MAINTENANCE)
const STATUS_LABEL: Record<RoomDto['status'], string> = {
  available: 'Доступна',
  booked: 'Забронирована',
  maintenance: 'На обслуживании',
};
const STATUS_COLOR: Record<RoomDto['status'], "success" | "warning" | "default"> = {
  available: 'success',
  booked: 'warning',
  maintenance: 'default',
};
const EQUIP_LABEL: Record<string, string> = {
  projector: "Проектор", microphone: "Микрофон", wifi: "Wi-Fi",
  computers: "Компьютеры", board: "Доска",
};

export function RoomsTable() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [items, setItems] = useState<RoomDto[]>([]);

  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<{ id: string; name: string } | null>(null);
  const [isViewBookingsModalOpen, setIsViewBookingsModalOpen] = useState(false);
  const [selectedRoomForView, setSelectedRoomForView] = useState<{ id: string; name: string } | null>(null);

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

  // <-- 3. Добавляем функции для управления модальным окном -->
  const handleOpenBookingModal = (room: { id: string; name: string }) => {
    setSelectedRoom(room);
    setIsBookingModalOpen(true);
  };

  const handleCloseBookingModal = () => {
    setIsBookingModalOpen(false);
    setSelectedRoom(null);
  };

  const handleOpenViewBookingsModal = (room: { id: string; name: string }) => {
  setSelectedRoomForView(room);
  setIsViewBookingsModalOpen(true);
  };

const handleCloseViewBookingsModal = () => {
  setIsViewBookingsModalOpen(false);
  setSelectedRoomForView(null);
  };

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
              <TableCell width={160} align="right">Вместимость</TableCell>
              <TableCell>Оборудование</TableCell>
              <TableCell width={170}>Статус</TableCell>
              <TableCell width={160} align="center">Действия</TableCell> {/* <-- Увеличили ширину */}
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
                <TableCell align="right">
                  <Stack direction="row" spacing={1} justifyContent="flex-end" alignItems="center">
                    <Groups2Outlined fontSize="small" />
                    <span>{r.capacity}</span>
                  </Stack>
                </TableCell>
                <TableCell>
                  <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
                    {r.equipment.map((k) => <Chip key={k} label={EQUIP_LABEL[k] ?? k} size="small" variant="outlined" />)}
                  </Stack>
                </TableCell>
                <TableCell>
                  <Chip
                    label={STATUS_LABEL[r.status]}
                    size="small"
                    color={STATUS_COLOR[r.status]}
                    variant={r.status === 'maintenance' ? 'outlined' : 'filled'}
                  />
                </TableCell>
                <TableCell align="center">
                  <Stack direction="row" spacing={0.5} justifyContent="center">
                    <IconButton 
                      size="small" 
                      title="Просмотр"
                      onClick={() => handleOpenViewBookingsModal({ id: r.id, name: r.name })}
                    >
                      <VisibilityOutlined fontSize="small" /></IconButton>
                    <IconButton size="small" title="Редактировать"><EditOutlined fontSize="small" /></IconButton>
                    <IconButton size="small" color="error" title="Удалить"><DeleteOutline fontSize="small" /></IconButton>
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

      {/* <-- 5. Рендерим модальное окно */}
      {selectedRoom && (
        <BookingModal
          open={isBookingModalOpen}
          onClose={handleCloseBookingModal}
          roomId={selectedRoom.id}
          roomName={selectedRoom.name}
        />
      )}

      {selectedRoomForView && (
        <ViewBookingsModal
          open={isViewBookingsModalOpen}
          onClose={handleCloseViewBookingsModal}
          roomId={selectedRoomForView.id}
          roomName={selectedRoomForView.name}
        />
      )}
    </>
  );
}