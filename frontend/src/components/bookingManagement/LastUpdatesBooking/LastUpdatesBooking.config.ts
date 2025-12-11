import type { lastUpdate } from "./LastUpdatesBooking.types";
import { AddRounded, CloseOutlined, CheckOutlined, EditCalendar } from "@mui/icons-material";

export const UPDATES: lastUpdate [] = [
    {
        id: "1",
        icon: AddRounded,
        updateLabel: "Создано бронирование#2024-005 для аудитории 301",
        timeLabel: "15 минут назад • Иванов И.И.",
        backgroundColor: "rgba(25, 203, 90, 0.2)",
        iconColor: "green",
    },
    {
        id: "2",
        icon: CheckOutlined,
        updateLabel: "Подтверждено бронирование#2024-002",
        timeLabel: "1 час назад • Администратор",
        backgroundColor: "rgba(106, 205, 235, 0.2)",
        iconColor: "blue",
    },
    {
        id: "3",
        icon: EditCalendar,
        updateLabel: "Изменено время бронирования#2024-001",
        timeLabel: "2 часа назад",
        backgroundColor: "rgba(228, 162, 75, 0.2)",
        iconColor: "orange",
    },
    {
        id: "4",
        icon: CloseOutlined,
        updateLabel: "Отменено бронирование#2024-004",
        timeLabel: "4 часа назад",
        backgroundColor: "rgba(214, 10, 10, 0.3)",
        iconColor: "red",
    }
]