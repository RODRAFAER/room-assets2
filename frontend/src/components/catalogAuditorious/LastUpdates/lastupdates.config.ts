import type { lastUpdate } from "./lastupdates.types";
import { AddRounded, BorderColorRounded, CalendarTodayOutlined } from "@mui/icons-material";

export const UPDATES: lastUpdate [] = [
    {
        id: "1",
        icon: AddRounded,
        updateLabel: "Добавлена аудитория301",
        timeLabel: "2 часа назад",
        backgroundColor: "rgba(25, 203, 90, 0.2)",
        iconColor: "green",
    },
    {
        id: "2",
        icon: BorderColorRounded,
        updateLabel: "Обновлено оборудование в аудитории201",
        timeLabel: "4 часа назад",
        backgroundColor: "rgba(106, 205, 235, 0.2)",
        iconColor: "blue",
    },
    {
        id: "3",
        icon: CalendarTodayOutlined,
        updateLabel: "Создано бронирование для аудитории102",
        timeLabel: "6 часов назад",
        backgroundColor: "rgba(228, 162, 75, 0.2)",
        iconColor: "orange",
    }
]