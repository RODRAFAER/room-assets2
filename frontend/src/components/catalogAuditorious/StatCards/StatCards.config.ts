// src/components/StatCards/StatCards.config.ts

import { DomainRounded, DesktopMacOutlined, EventAvailableOutlined, ConstructionRounded } from "@mui/icons-material";
import { type StatCardData } from "./StatCards.types";

export const STATS: StatCardData[] = [
    {
        icon: DomainRounded,
        id: 'total',
        value: 24,
        label: 'Всего аудиторий',
        color: '#646cff', // Фиолетовый (для иконки)
        status: "+12%",
        statusColor: 'rgba(34, 197, 94, 0.5)',
        statusTextColor: 'green'
    },
    {
        id: 'equipped',
        value: 18,
        label: 'Доступно сейчас',
        icon: DesktopMacOutlined,
        color: '#22c55e',
        status: "Активно",
        statusColor: 'rgba(34, 197, 94, 0.5)',
        statusTextColor: 'green'
    },
    {
        id: 'free',
        value: 6,
        label: 'Забронировано',
        icon: EventAvailableOutlined,
        color: '#f97316',
        status: "Занято",
        statusColor: 'rgba(255, 165, 0, 0.5)',
        statusTextColor: '#FF4500',
    },
    {
        id: 'capacity',
        value: 156,
        label: 'Единиц оборудования',
        icon: ConstructionRounded,
        color: '#ec4899',
        status: "Обновлено",
        statusColor: 'rgba(211, 211, 211, 0.5)',
        statusTextColor: 'black'
    },
];