import s from './StatsOnTime.module.css'

const STATS_ON_TIME = [
    {
        id: 'morning',
        label: 'Утренние (08:00-12:00)',
        color: 'rgba(0, 60, 255, 0.69)',
        load: '90%',
        value: 18,
    },
    {
        id: 'dai',
        label: 'Дневные (12:00-16:00',
        color: 'rgba(33, 236, 11, 0.72)',
        load:'75%',
        value: 15,
    },
    {
        id: 'evening',
        label: 'Вечерние (16:00-20:00)',
        color: 'rgba(255, 137, 2, 0.7)',
        load:'55%',
        value: 11,
    },
    {
        id: 'late',
        label: 'Поздние (20:00-22:00)',
        color: 'rgba(240, 8, 8, 0.7)',
        load: '15%',
        value: 3,
    }
]

export function StatsOnTime() {
    return (
        <div className={s.statsOnTime}>
            <h1 className={s.title}> Статистика по времени </h1>
            <div className={s.body}>
                {STATS_ON_TIME.map(stat => (
                    <div key={stat.id} className={s.bodyRow}> 
                        <div className={s.periodOfTime}> 
                            {stat.label}
                        </div> 
                        <div className={s.progressBarAndValue}> 
                            <div className={s.progressBarBackground}> 
                                <div className={s.progressBarFill} style={{width: stat.load, backgroundColor: stat.color}} />
                            </div>
                            <div className={s.value}> 
                                {stat.value}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}