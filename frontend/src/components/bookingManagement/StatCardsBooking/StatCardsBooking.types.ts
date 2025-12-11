import { type SvgIconComponent } from "@mui/icons-material";

export interface StatCardData {
    icon: SvgIconComponent;
    id: string;
    value: number;
    label: string;
    color: string;
    backgroundColor: string;
    status: string;
    statusColor: string;
    statusTextColor: string;
}