import s from "./BodyHeaderBooking.module.css"
import clsx from "clsx"
import { UploadOutlined, CalendarMonth} from "@mui/icons-material";
import AddIcon from '@mui/icons-material/Add';

export interface bodyHeaderProps {
    onExport: () => void;
    onImport: () => void;
    onAddAuditorium: () => void;
}

export function BodyHeaderBooking ({onExport, onImport, onAddAuditorium}: bodyHeaderProps){
    return (
        <div className={s.bodyHeaderContainer}>
            <div className={s.left}>
                <div className={s.leftUpText}>
                    Управление бронированием
                </div>
                <div className={s.leftBottomText}>
                    Создавайте, изменяйте и отслеживайте бронирование аудиторий
                </div>

            </div>
            <div className={s.buttons}>
                <button 
                  className={clsx(s.button, s.exportButton)}
                  onClick={onExport}
                  type="button"
                >
                    <UploadOutlined className={s.buttonIcon} />
                    Экспорт расписания
                </button>

                <button
                  className={clsx(s.button, s.calendarButton)}
                  onClick={onImport}
                  type="button"
                >
                    <CalendarMonth className={s.buttonIcon} />
                    Календарный вид
                </button>

                <button 
                  className={clsx(s.button, s.addBookingButton)}
                  onClick={onAddAuditorium}
                  type="button"
                >
                    <AddIcon className={s.buttonIcon} />
                    Новое бронирование
                </button>
            </div>
        </div>
    )
}