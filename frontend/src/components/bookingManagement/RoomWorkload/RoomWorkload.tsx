import s from './RoomWorkload.module.css'

const AUDITORIUM_LOAD_DATA = [
    { 
        id: '101',
        label: '101 - Лекционная', 
        color: 'rgba(0, 60, 255, 0.69)', 
        load: 85,
    },
    { 
        id: '102', 
        label: '102 - Компьютерный', 
        color: 'rgba(33, 236, 11, 0.72)', 
        load: 70,
    }, 
    { 
        id: '201', 
        label: '201 - Конференц-зал', 
        color: 'rgba(195, 14, 240, 0.7)', 
        load: 60,
    },
    { 
        id: '202', 
        label: '202 - Семинарская', 
        color: 'rgba(255, 137, 2, 0.7)', 
        load: 45,
    }
];

export function RoomWorkload() {
    return (
        <div className={s.roomWorkload}>
            <h1 className={s.title}> Загруженность аудиторий </h1>
            <div className={s.body}>
                {AUDITORIUM_LOAD_DATA.map(auditory => (
                    <div key={auditory.id} className={s.auditory}>
                            <div className={s.colorIcon} style={{backgroundColor: auditory.color}} /> 
                            <span className={s.auditoryLabel}> {auditory.label} </span>
                        <div className={s.progressBarAndPercentage}>
                            <div className={s.progressBarBackground}>
                                <div 
                                    className={s.progressBarFill} 
                                    style={{ 
                                        width: `${auditory.load}%`,
                                        backgroundColor: auditory.color
                                    }} 
                                />
                            </div>
                            <span className={s.percentage}>{auditory.load}%</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}