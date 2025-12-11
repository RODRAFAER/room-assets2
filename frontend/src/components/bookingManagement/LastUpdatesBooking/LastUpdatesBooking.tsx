import s from "./LastUpdatesBooking.module.css"
import { UPDATES } from "./LastUpdatesBooking.config"
import { type lastUpdate } from "./LastUpdatesBooking.types"

const Update = ({icon: Icon, updateLabel, timeLabel, backgroundColor, iconColor}: lastUpdate) => {
    return (
        <div className={s.bodyRow}>
            <div className={s.update}>
                <div className={s.iconBox} style={{background: backgroundColor, color: iconColor}}>
                    <Icon className={s.icon} />
                </div>
                <div className={s.textWrapper}>
                    <div className={s.updateLabel}> {updateLabel} </div>
                    <div className={s.timeLabel}> {timeLabel} </div>
                </div>
            </div>
        </div>
    )
}

export function LastUpdatesBooking () {
    return (
        <div className={s.lastUpdatesContainer}>
            <div className={s.headerRow}>
                <h1 className={s.headerTitle}>Последние изменения</h1>
                <button className={s.showAllButton}> Показать все </button>
            </div>
            <div className={s.bodyRow}>
                {UPDATES.map((update) => (
                    <Update
                        key={update.id}
                        {...update}
                    />
                ))}
            </div>
        </div>
    )
}