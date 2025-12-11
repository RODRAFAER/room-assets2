import s from "./QuickActions.module.css";
import { ACTIONS } from './quickaction.config';
import type { buttonProps } from './quickaction.types';

const ActionButton = ({icon: Icon, label, secondLabel, backgroundColor, iconColor}: buttonProps) => {
    return (
        <div className={s.button}>
            <div className={s.iconBox} style={{background: backgroundColor, color: iconColor}}>
                <Icon className={s.icon} />
            </div>
            <div className={s.textWrapper}>
                <div className={s.label}>
                    {label}
                </div>
                <div className={s.secondLabel}>
                    {secondLabel}
                </div>  
            </div>
        </div>
    )
}

export function QuickActions () {
    return (
        <div className={s.quickAction}>
            <h1 className={s.title}> Быстрые действия </h1>
            <div className={s.buttonsRow}>
                {ACTIONS.map((action) => (
                    <ActionButton 
                        key={action.id}
                        {...action}
                    />
                ))}
            </div>
        </div>
    )
}