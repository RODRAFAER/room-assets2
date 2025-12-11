import type { buttonProps } from "./quickaction.types";
import { AddRounded, EventAvailableRounded, ConstructionRounded} from '@mui/icons-material';

export const ACTIONS: buttonProps[] = [
    {
        id: "addRoom", 
        icon: AddRounded, 
        label: 'Добавить аудиторию',
        secondLabel: 'Создать новую аудиторию',
        backgroundColor: 'rgba(106, 205, 235, 0.3)',
        iconColor: 'blue',
    },
    {
        id: "addBooking", 
        icon: EventAvailableRounded, 
        label: 'Создать бронирование',
        secondLabel: 'Забронировать аудиторию',
        backgroundColor: 'rgba(20, 214, 91, 0.3)',
        iconColor: 'green',
    },
    {
        id: "massEditing", 
        icon: ConstructionRounded, 
        label: 'Массовое редактирование',
        secondLabel: 'Изменить несколько аудиторий',
        backgroundColor: 'rgba(228, 162, 75, 0.3)',
        iconColor: 'orange',
    },
        
];