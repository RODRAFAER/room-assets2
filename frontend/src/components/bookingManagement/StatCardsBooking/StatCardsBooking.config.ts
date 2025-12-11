import { CheckCircle, EventAvailableOutlined, WatchLater, Cancel, ShowChart } from "@mui/icons-material";
import { type StatCardData } from "./StatCardsBooking.types";

export const STATS: StatCardData[] = [
    {
        icon: EventAvailableOutlined,
        id: 'total',
        value: 47,
        label: 'Всего бронирований',
        color: 'blue', 
        backgroundColor: 'rgba(24, 191, 225, 0.2)',
        status: "+8%",
        statusColor: 'rgba(34, 197, 94, 0.5)',
        statusTextColor: 'green'
    },
    {
        id: 'equipped',
        value: 12,
        label: 'Активных сегодня',
        icon: CheckCircle,
        color: '#22c55e',
        backgroundColor: 'rgba(14, 220, 45, 0.1)',
        status: "Сегодня",
        statusColor: 'rgba(34, 197, 94, 0.3)',
        statusTextColor: 'green'
    },
    {
        id: 'waiting',
        value: 3,
        label: 'Требуют подтверждения',
        icon: WatchLater,
        color: 'orange',
        backgroundColor: 'rgba(223, 172, 19, 0.3)',
        status: "Ожидание",
        statusColor: 'rgba(255, 165, 0, 0.3)',
        statusTextColor: '#FF4500',
    },
    {
        id: 'thisWeek',
        value: 5,
        label: 'За эту неделю',
        icon: Cancel,
        color: 'red',
        backgroundColor: 'rgba(210, 24, 24, 0.1)',
        status: "Отменены",
        statusColor: 'rgba(255, 0, 0, 0.1)',
        statusTextColor: 'red'
    },
    {
        id: 'monthHours',
        value: 127,
        label: "Часов за месяц",
        icon: ShowChart,
        color: 'purple',
        backgroundColor: 'rgba(174, 20, 221, 0.2)',
        status: "85%",
        statusColor: 'rgba(90, 90, 90, 0.3)',
        statusTextColor: '#222121ff',
    }
];