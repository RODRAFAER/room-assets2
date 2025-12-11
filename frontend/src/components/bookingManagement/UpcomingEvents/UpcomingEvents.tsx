import s from './UpcomingEvents.module.css';
import { UPCOMING_EVENT_DATA } from './UpcomingEvents.config';
import { type eventCardData } from './UpcomingEvents.types';

const EventCard = ({color, value, day, title, time: Icon, members: IconMembers, membersValue, teacherInitials, teacherBackgrounColor, teachersData}: eventCardData) => {
    return (
        <div className={s.eventCard}>
            <div className={s.eventCardHeader}>
                <div className={s.eventCardHeaderLeftPart}>
                    <div className={s.eventCardHeaderTitleIcon} style={{backgroundColor: color}} />
                    <div className={s.eventCardHeaderTitleAuditory}> {value}</div>
                </div>
                <div className={s.eventCardHeaderDay}>
                    {day}
                </div>
            </div>
            <div className={s.eventCardBody}>
                <span className={s.eventCardBodyTitle}> {title} </span>
                <div className={s.eventCardBodyTimeAndMembers}>
                    <Icon/>
                    <div style={{marginRight: '20px'}}> 10:00-12:00</div>
                    <IconMembers/>
                    <div> {membersValue} чел. </div>
                </div>
                <div className={s.eventCardBodyTeacher}>
                    <div className={s.eventCardBodyTeacherIcon} style={{backgroundColor: teacherBackgrounColor}}> {teacherInitials} </div>
                    <div> {teachersData}</div>
                </div>
            </div>
        </div>
    )
}

export function UpcomingEvents () {
    return (
        <div className={s.upcomingEvents}>
            <div className={s.header}>
                <h1 className={s.title}> Предстоящие мероприятия </h1>
                <button className={s.showAllButton}> Посмотреть все </button>
            </div>
            <div className={s.body}>
                {UPCOMING_EVENT_DATA.map((event) => (
                    <EventCard
                        key={event.id}
                        {...event}
                    />
                ))}
            </div>
        </div>
    )
}