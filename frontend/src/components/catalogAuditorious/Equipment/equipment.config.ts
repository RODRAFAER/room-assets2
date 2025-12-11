import { type equipment } from "./equipment.types";
import { VideoCall, Computer, FilterFrames, Mic, Videocam, AcUnit } from "@mui/icons-material";

export const EQUIPMENT: equipment [] = [
    {
        id: "projector",
        icon: VideoCall,
        value: 18,
        name: "Проекторы",
        backgroundColor: "rgba(106, 205, 235, 0.2)",
        color: "blue",
    },
    {
        id: "computer",
        icon: Computer,
        value: 45,
        name: "Компьютеры",
        backgroundColor: "rgba(25, 203, 90, 0.2)",
        color: "green",
    },
    {
        id: "interactiveBoard",
        icon: FilterFrames,
        value: 12,
        name: "Интер. доски",
        backgroundColor: "rgba(174, 22, 217, 0.2)",
        color: "purple",
    },
    {
        id: "microphone",
        icon: Mic,
        value: 24,
        name: "Микрофоны",
        backgroundColor: "rgba(228, 162, 75, 0.2)",
        color: "orange",
    },
    {
        id: "camera",
        icon: Videocam,
        value: 8,
        name: "Камеры",
        backgroundColor: "rgba(174, 51, 51, 0.2)",
        color: "red",
    },
    {
        id: "conditioner",
        icon: AcUnit,
        value: 16,
        name: "Кондиционеры",
        backgroundColor: "rgba(220, 204, 30, 0.2)",
        color: "brown",
    }
]