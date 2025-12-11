export interface categories {
    id: string;
    color: string;
    label: string;
}

type HourStatus = 'free' | 'busy' | 'preparation' | 'unavailable';

export interface AuditoriumData {
    number: string;
    label: string;
    schedule: HourStatus[];
}