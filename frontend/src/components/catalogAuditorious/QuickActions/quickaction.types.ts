import { type SvgIconComponent } from "@mui/icons-material"

export interface buttonProps {
    id: string;
    icon: SvgIconComponent;
    label: string;
    secondLabel: string;
    backgroundColor: string;
    iconColor: string;
}