import type { categories, AuditoriumData } from "./BookingEmploymentGrid.types";

export const CATEGORIES: categories[] = [
    {
        id: 'free',
        color: 'rgba(82, 214, 30, 0.7)',
        label: 'Свободно',
    },
    {
        id: 'busy',
        color: 'rgba(0, 153, 255, 1)',
        label: 'Занято',
    },
    {
        id: 'preparation',
        color: 'rgba(255, 123, 0, 0.7)',
        label: 'Подготовка',
    },
    {
        id: 'unavailable',
        color: 'rgba(228, 18, 18, 0.7)',
        label: 'Недоступно',
    }
]

export const HOURS = [
    '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00',
    '15:00', '16:00', '17:00', '18:00', '19:00'
];

export const AUDITORIUMS: AuditoriumData[] = [
    { 
        number: '101', 
        label: 'Лекционная',
        schedule: [
            'free', 'preparation', 'busy', 'busy', 'free', 'free', 
            'free', 'free', 'busy', 'busy', 'free', 'free'
        ]
    },
    { 
        number: '102', 
        label: 'Компьютерный',
        schedule: [
            'busy', 'busy', 'busy', 'busy', 'busy', 'busy', 
            'free', 'free', 'free', 'free', 'busy', 'busy'
        ]
    },
    { 
        number: '201', 
        label: 'Конференц-зал',
        schedule: [
            'free', 'free', 'free', 'preparation', 'busy', 'busy', 
            'busy', 'busy', 'free', 'free', 'free', 'free',
        ]
    },
    { 
        number: '202', 
        label: 'Семинарская',
        schedule: [
            'busy', 'busy', 'free', 'free', 'free', 'preparation', 
            'busy', 'busy', 'busy', 'busy', 'free', 'free',
        ]
    },
    { 
        number: '301', 
        label: 'Большая',
        schedule: [
            'free', 'free', 'free', 'free', 'free', 'free', 
            'free', 'free', 'free', 'free', 'free', 'free', 
        ]
    },
];

export const STATUS_COLOR_MAP = CATEGORIES.reduce((acc, category) => {
    acc[category.id] = category.color;
    return acc;
}, {} as Record<string, string>);
