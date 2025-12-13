import type { NavItem } from "./header.types";
import { ListAltOutlined, EventNoteOutlined, SettingsOutlined } from "@mui/icons-material";

export const DEFAULT_NAV: NavItem[] = [
    {id: "catalog", label: "Каталог аудиторий", icon: ListAltOutlined, path: '/room-assets2'},
    {id: "bookings", label: "Управление бронированием", icon: EventNoteOutlined, path: '/bookings'},
    {id: "settings", label: "Настройки", icon: SettingsOutlined, path: '/settings'},
];