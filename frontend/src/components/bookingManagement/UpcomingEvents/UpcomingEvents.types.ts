import type { SvgIconComponent } from "@mui/icons-material";

export interface eventCardData {
    id: string;
    color: string;
    value: string;
    day: string;
    title: string;
    time: SvgIconComponent;
    members: SvgIconComponent;
    membersValue: number;
    teacherInitials: string;
    teacherBackgrounColor: string;
    teachersData: string;
}