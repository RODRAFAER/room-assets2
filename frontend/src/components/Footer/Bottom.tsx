import s from './Bottom.module.css';

export function Bottom () {
    return (
        <div className={s.bottom}>
            <div className={s.leftPart}>
                <div className={s.label}>
                    Нужна помощь с бронированием?
                </div>
                <div className={s.secondLabel}>
                    Ознакомьтесь с инструкциями или свяжитесь с администратором
                </div>
            </div>
            <div className={s.rightPart}>
                <button className={s.button}>
                    Инструкции
                </button>
                <button className={s.button}>
                    Связаться с администратором
                </button>
            </div>
        </div>
    )
}