import s from "./StatCards.module.css";
import { STATS } from "./StatCards.config";
import { type StatCardData } from "./StatCards.types";

const StatCard = ({ value, label, icon: Icon, color, status, statusColor, statusTextColor }: StatCardData) => {
    return (
        <div className={s.card}>
            <div className={s.statusCard} style={{background: statusColor, color: statusTextColor}}>
                {status}
            </div>
            <div className={s.iconBox} style={{ background: color }}>
                <Icon className={s.icon} />
            </div>
            {/* Основные данные */}
            <div className={s.value}>{value}</div>
            <div className={s.label}>{label}</div>
        </div>
    );
};

/**
 * Основной компонент-контейнер, который рендерит все 4 карточки.
 */
export function StatCards () {
    return (
        <div className={s.cardsContainer}>
            {/* 👈 Использование метода map для рендеринга массива данных */}
            {STATS.map((stat) => (
                <StatCard 
                    key={stat.id} // Обязательный 'key'
                    {...stat}    // Передача всех свойств объекта 'stat' как пропсов
                />
            ))}
        </div>
    );
}