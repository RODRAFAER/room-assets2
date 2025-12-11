import s from "./bodyheader.module.css"
import clsx from "clsx"
import { UploadOutlined, DownloadOutlined} from "@mui/icons-material";
import AddIcon from '@mui/icons-material/Add';

export interface bodyHeaderProps {
    onExport: () => void;
    onImport: () => void;
    onAddAuditorium: () => void;
}

export function BodyHeader ({onExport, onImport, onAddAuditorium}: bodyHeaderProps){
    return (
        <div className={s.bodyHeaderContainer}>
            <div className={s.left}>
                <div className={s.leftUpText}>
                    Каталог аудиторий
                </div>
                <div className={s.leftBottomText}>
                    Управляйте информацией об аудиториях, их оборудованием и местоположением
                </div>

            </div>
            <div className={s.buttons}>
                <button 
                  className={clsx(s.button, s.exportButton)}
                  onClick={onExport}
                  type="button"
                >
                    <UploadOutlined className={s.buttonIcon} />
                    Экспорт JSON

                </button>

                <button
                  className={clsx(s.button, s.importButton)}
                  onClick={onImport}
                  type="button"
                >
                    <DownloadOutlined className={s.buttonIcon} />
                    Импорт JSON
                </button>

                <button 
                  className={clsx(s.button, s.addAuditoriumButton)}
                  onClick={onAddAuditorium}
                  type="button"
                >
                    <AddIcon className={s.buttonIcon} />
                    Добавить аудиторию
                </button>
            </div>
        </div>
    )
}