import { AccessTimeOutlined, GroupOutlined } from "@mui/icons-material";
import type { eventCardData } from "./UpcomingEvents.types";

export const UPCOMING_EVENT_DATA: eventCardData[] = [
    {
        id: '101',
        color: 'blue',
        value: '101',
        day: 'Сегодня',
        title: 'Лекция по математике',
        time: AccessTimeOutlined,
        members: GroupOutlined,
        membersValue: 45,
        teacherInitials: 'ИИ',
        teacherBackgrounColor: "rgba(18, 159, 224, 0.5)",
        teachersData: "Иванов И.И."
    },
    {
        id: '201',
        color: 'purple',
        value: '201',
        day: 'Сегодня',
        title: 'Защита дипломов',
        time: AccessTimeOutlined,
        members: GroupOutlined,
        membersValue: 15,
        teacherInitials: 'ПП',
        teacherBackgrounColor: "rgba(15, 217, 103, 0.5)",
        teachersData: "Петров П.П."
    },
    {
        id: '102',
        color: 'green',
        value: '102',
        day: 'Сегодня',
        title: 'Практика по программированию',
        time: AccessTimeOutlined,
        members: GroupOutlined,
        membersValue: 25,
        teacherInitials: 'СС',
        teacherBackgrounColor: "rgba(215, 7, 238, 0.5)",
        teachersData: "Сидоров С.С."
    }
]