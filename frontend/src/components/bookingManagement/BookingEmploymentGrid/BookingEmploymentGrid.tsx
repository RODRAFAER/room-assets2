import s from './BookingEmploymentGrid.module.css'
import type { categories, AuditoriumData } from './BookingEmploymentGrid.types'
import { CATEGORIES, STATUS_COLOR_MAP, HOURS, AUDITORIUMS } from './BookingEmploymentGrid.config'
import clsx from 'clsx'

const Category = (
    {
        color,
        label,
    }: categories) => {

        return (
            <div className={s.categoryBox}>
                <div className={s.categoryIcon} style={{backgroundColor: color}}>
                </div>
                {label}
            </div>
        )
    }

const StatusCell = ({statusID}: {statusID: string}) => {
    const color = STATUS_COLOR_MAP[statusID];
    return (
        <div className={s.scheduleColumn}>
            <div className={s.statusBlock} style={{backgroundColor: color}}></div>
        </div>
    )
}

const TimeHeader = () => {
    return (
        <div className={clsx(s.gridRow, s.timeRow)}>
            <div className={s.headerTitle}> Аудитория </div>
            {HOURS.map((hour) =>(
                <div key={hour} className={s.scheduleColumn}>
                    {hour}
                </div>
            ))}
        </div>
    )
}

const AuditoriumRow = ({
    number,
    label,
    schedule,
}: AuditoriumData) => {
    return (
        <div className={clsx(s.gridRow, s.auditoriumGridRow)}>
            <div className={s.scheduleColumn}>
                <div className={s.auditoriumNumber}> {number} </div>
                <div className={s.auditoriumLabel}> {label} </div>
            </div>

            {schedule.map((statusId, index) => (
                <StatusCell key={index} statusID={statusId} />
            ))}
        </div>
    )
}

export function BookingEmploymentGrid () {

    return (
        <div className={s.bookingEmploymentGrid}>
            <div className={s.header}>
                <div className={s.title}>
                    Сетка занятости аудиторий
                </div>
                <div className={s.categories}>
                    {CATEGORIES.map((category) => (
                        <Category   
                            key={category.id}
                            {...category}
                        />
                    ))}
                </div>
            </div>
            <div className={s.gridContainer}>
                <TimeHeader />
                {AUDITORIUMS.map((auditory) => (
                    <AuditoriumRow
                        key={auditory.number}
                        {...auditory}
                    />
                ))}
            </div>
        </div>
    )
}