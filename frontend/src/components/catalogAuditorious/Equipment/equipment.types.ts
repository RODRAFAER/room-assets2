import type { SvgIconComponent } from "@mui/icons-material";

export interface equipment {
    id: string;
    icon: SvgIconComponent;
    value: number;
    name: string;
    backgroundColor: string;
    color: string;
}