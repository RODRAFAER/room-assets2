import React from 'react';
import clsx from 'clsx';
import s from './RoomsSchema.module.css';
import { BUILDING_SCHEME_DATA } from './roomschema.config';
import { type RoomStatus, type Floor, type FloorStats } from './roomsschema.types';

const getStatusClass = (status: RoomStatus) => {
    switch (status) {
        case 'Свободно':
            return s.available;
        case 'Забронировано':
            return s.occupied;
        case 'Обслуживание':
            return s.maintenance;
        default:
            return s.occupied;
    }
};

const RoomBlock: React.FC<{ number: string, status: RoomStatus }> = ({ number, status }) => (
    <div className={clsx(s.roomBlock, getStatusClass(status))}>
        {number}
    </div>
);

const FloorRow: React.FC<Floor> = ({ level, rooms }) => (
    <div className={s.floorRow}>
        <div className={s.floorLabel}>{level} этаж</div>
        <div className={s.roomsContainer}>
            {rooms.map(room => (
                <RoomBlock key={room.id} number={room.number} status={room.status} />
            ))}
        </div>
    </div>
);

const Legend: React.FC = () => (
    <div className={s.legendContainer}>
        <h4 className={s.legendTitle}>Легенда</h4>
        <div className={s.legendItem}>
            <span className={clsx(s.legendColor, s.legendAvailable)}></span>
            <span className={s.legendLabel}>Свободно</span>
        </div>
        <div className={s.legendItem}>
            <span className={clsx(s.legendColor, s.legendOccupied)}></span>
            <span className={s.legendLabel}>Забронировано</span>
        </div>
        <div className={s.legendItem}>
            <span className={clsx(s.legendColor, s.legendMaintenance)}></span>
            <span className={s.legendLabel}>На обслуживании</span>
        </div>
        
    </div>
);

const Stats: React.FC<{ stats: FloorStats[] }> = ({ stats }) => (
    <div className={s.statsContainer}>
        <h4 className={s.legendTitle}>Статистика по этажам</h4>
        {stats.map(stat => (
            <div key={stat.level} className={s.statRow}>
                <div className={s.statLabel}>{stat.level} этаж</div>
                <div className={s.statValue}>
                    {stat.available}/{stat.total} доступно
                </div>
            </div>
        ))}
    </div>
);

export function RoomsSchema() {
    const { scheme, stats } = BUILDING_SCHEME_DATA;
    return (
        <div className={s.schemeContainer}>
            <h3 className={s.mainTitle}>Схема корпуса</h3>
            <div className={s.gridLayout}>
                <div className={s.schemeArea}>
                    <div className={s.schemeHeader}>Главный корпус</div>
                    {scheme.map(floor => (
                        <FloorRow key={floor.level} {...floor} />
                    ))}
                </div>
                <div className={s.sidebarArea}>
                    <Legend />
                    <Stats stats={stats} />
                </div>
            </div>
        </div>
    );
}