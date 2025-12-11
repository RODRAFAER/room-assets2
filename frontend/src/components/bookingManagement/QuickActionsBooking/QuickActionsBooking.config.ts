import type { buttonProps } from "./QuickActionsBooking.types";
import { AddRounded, ContentPasteGoOutlined, DoneAllOutlined, EventRepeat} from '@mui/icons-material';

export const ACTIONS: buttonProps[] = [
    {
        id: "addBooking", 
        icon: AddRounded, 
        label: 'Новое бронирование',
        secondLabel: 'Забронировать аудиторию',
        backgroundColor: 'rgba(106, 205, 235, 0.3)',
        iconColor: 'blue',
    },
    {
        id: "massCheck", 
        icon: DoneAllOutlined, 
        label: 'Массовое подтверждение',
        secondLabel: 'Подтвердить несколько заявок',
        backgroundColor: 'rgba(20, 214, 91, 0.3)',
        iconColor: 'green',
    },
    {
        id: "repititiveBooking", 
        icon: EventRepeat, 
        label: 'Повторяющееся бронирование',
        secondLabel: 'Создать серию бронирований',
        backgroundColor: 'rgba(228, 162, 75, 0.3)',
        iconColor: 'orange',
    },
    {
        id: "exportReport",
        icon: ContentPasteGoOutlined,
        label: 'Экспорт отчёта',
        secondLabel: 'Выгрузить данные о бронированиях',
        backgroundColor: 'rgba(153, 27, 203, 0.3)',
        iconColor: 'purple',
    }
        
];