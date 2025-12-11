import s from "./Equipment.module.css";
import {type equipment } from "./equipment.types";
import { EQUIPMENT } from "./equipment.config";

const Equipments = ({icon: Icon, value, name, backgroundColor, color}: equipment) => {
    return (
        <div className={s.equipment}>
            <div className={s.iconBox} style={{background: backgroundColor, color: color}}>
                <Icon className={s.icon} />
            </div>
            <div className={s.value}>
                {value}
            </div>
            <div className={s.name}>
                {name}
            </div>
        </div>
    )
}

export function Equipment () {
    return (
        <div className={s.equipmentContainer}>
            <h1 className={s.title}> Обзор оборудования</h1>
            <div className={s.bodyRow}>
                {EQUIPMENT.map((equip) => (
                    <Equipments
                        key={equip.id}
                        {...equip}
                    />
                ))}
            </div>
        </div>
    )
}