export type RoomStatus = 'Свободно' | 'Забронировано' | 'Обслуживание';

interface Room {
    id: number;
    number: string;
    status: RoomStatus;
}

export interface Floor {
    level: number;
    rooms: Room[];
}

export interface FloorStats {
    level: number;
    available: number;
    total: number;
}

export interface BuildingSchemeData {
    scheme: Floor[];
    stats: FloorStats[];
}