import { type SvgIconComponent } from "@mui/icons-material";

export interface StatCardData {
    icon: SvgIconComponent;
    id: string;
    value: number;
    label: string;
    color: string;
    status: string; // Цвет фона
    statusColor: string;
    statusTextColor: string;
}