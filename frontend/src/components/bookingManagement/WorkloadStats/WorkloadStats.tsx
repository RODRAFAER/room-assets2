import { RoomWorkload } from "../RoomWorkload";
import { StatsOnTime } from "../StatsOnTime";
import s from './WorkloadStats.module.css'

export function WorkloadStats () {
    return (
        <div className={s.workloadStats}>
            <RoomWorkload />
            <StatsOnTime />
        </div>
    )
}