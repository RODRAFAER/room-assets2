import s from "./StatCardsBooking.module.css";
import { STATS } from "./StatCardsBooking.config";
import { type StatCardData } from "./StatCardsBooking.types";

const StatCard = ({ value, label, icon: Icon, color, backgroundColor, status, statusColor, statusTextColor }: StatCardData) => {
    return (
        <div className={s.card}>
            <div className={s.statusCard} style={{background: statusColor, color: statusTextColor}}>
                {status}
            </div>
            <div className={s.iconBox} style={{ background: backgroundColor, color: color }}>
                <Icon style={{width: 28, height: 28}}/>
            </div>
            <div className={s.value}>{value}</div>
            <div className={s.label}>{label}</div>
        </div>
    );
};

export function StatCardsBooking () {
    return (
        <div className={s.cardsContainer}>
            {STATS.map((stat) => (
                <StatCard 
                    key={stat.id}
                    {...stat}
                />
            ))}
        </div>
    );
}