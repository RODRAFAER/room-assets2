import { type BuildingSchemeData } from './roomsschema.types';

export const BUILDING_SCHEME_DATA: BuildingSchemeData = {
    scheme: [
        { level: 4, rooms: [
            { id: 401, number: '401', status: 'Свободно' },
            { id: 402, number: '402', status: 'Свободно' },
            { id: 403, number: '403', status: 'Забронировано' },
            { id: 404, number: '404', status: 'Свободно' },
        ]},
        { level: 3, rooms: [
            { id: 301, number: '301', status: 'Свободно' },
            { id: 302, number: '302', status: 'Забронировано' },
            { id: 303, number: '303', status: 'Свободно' },
            { id: 304, number: '304', status: 'Обслуживание' },
        ]},
        { level: 2, rooms: [
            { id: 201, number: '201', status: 'Свободно' },
            { id: 202, number: '202', status: 'Обслуживание' },
            { id: 203, number: '203', status: 'Забронировано' },
            { id: 204, number: '204', status: 'Свободно' },
        ]},
        { level: 1, rooms: [
            { id: 101, number: '101', status: 'Свободно' },
            { id: 102, number: '102', status: 'Забронировано' },
            { id: 103, number: '103', status: 'Свободно' },
            { id: 104, number: '104', status: 'Свободно' },
        ]},
    ],
    
    stats: [
        { level: 4, available: 3, total: 4 },
        { level: 3, available: 2, total: 4 },
        { level: 2, available: 2, total: 4 },
        { level: 1, available: 3, total: 4 },
    ]
};