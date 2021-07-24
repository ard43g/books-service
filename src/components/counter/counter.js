import styles from "./counter.module.css";

const Counter = ({ count }) => {
    return (
        <div className={styles.counter}>
            Найдено: <span>{count}</span>
        </div>
    );
};

export default Counter;
