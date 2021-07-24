import { memo } from "react";
import styles from "./filter-panel.module.css";

const FilterPanel = memo(({ value, name, onSetCategories, onSetSort }) => {
    function onChange(e) {
        if (e.target.name === "subjects") {
            onSetCategories(e.target.value);
        } else if (e.target.name === "date") {
            onSetSort(e.target.value);
        }
    }
    return (
        <select className={styles.filter__select} type="select" name={name} onChange={onChange}>
            {value.map((i) => (
                <option key={i} value={i}>
                    {i}
                </option>
            ))}
        </select>
    );
});

export default FilterPanel;
