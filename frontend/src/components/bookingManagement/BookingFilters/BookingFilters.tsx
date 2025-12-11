import s from "./BookingFilters.module.css";
import SearchIcon from '@mui/icons-material/Search';
import { KeyboardArrowDownOutlined} from "@mui/icons-material";
import { useState } from 'react';
import { EQUIPMENT_TAGS } from "./BookingFilters.config";
import clsx from 'clsx';

const FilterDropdown = ({ label }: { label: string }) => {
    return (
        <div className={s.dropdownContainer}>
            <span className={s.dropdownLabel}>{label}</span>
            <KeyboardArrowDownOutlined className={s.dropdownIcon} />
        </div>
    );
};

export function BookingsFilters() {
    const [activeTagIds, setActiveTagIds] = useState<string[]>([]);

    const handleTagClick = (tagId: string) => {
        setActiveTagIds(prevActiveIds => {
            if (prevActiveIds.includes(tagId)) {
                return prevActiveIds.filter(id => id !== tagId);
            } 
            else {
                return [...prevActiveIds, tagId];
            }
        });
    };

    return (
        <div className={s.filtersContainer}>
            <div className={s.headerRow}>
                <h1 className={s.filterTitle}>Фильтры и поиск</h1>
                <button className={s.resetButton}>Сбросить все</button>
            </div>
            <div className={s.searchAndDropsRow}>
                <div className={s.searchBox}>
                    <SearchIcon className={s.searchIcon} style={{width: 24, height: 24}}/>
                    <input
                      type="text"
                      placeholder="Поиск по номеру или названию..." 
                      className={s.searchInput}
                    />
                </div>
                <FilterDropdown label="Все корпуса" />
                <FilterDropdown label="Все этажи" />
                <FilterDropdown label="Все статусы" />
            </div>
            
            <div className={s.bottomRow}>
                <div className={s.tagsContainer}>
                    {EQUIPMENT_TAGS.map((tag) => {
                        const isActive = activeTagIds.includes(tag.id);

                        return (
                            <button
                                key={tag.id}
                                type="button"
                                className={clsx(
                                    s.tagButton, 
                                    isActive && s.tagButtonActive 
                                )}
                                onClick={() => handleTagClick(tag.id)}
                                title={tag.label}
                            >
                                <tag.icon className={s.tagIcon} />
                                <span>{tag.label}</span>
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    )
}