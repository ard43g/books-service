import styles from "./button-main.module.css";
const ButtonMain = ({ name, disabled, ...props }) => {
    if (name === "load") {
        const { loadBooksCount, setLoadBooksCount, totalCount, stepPage } = props;
        function click() {
            setLoadBooksCount(loadBooksCount + stepPage);
        }
        return (
            <>
                {loadBooksCount > 0 && loadBooksCount < totalCount && (
                    <button onClick={click} className={styles.button}>
                        Load more
                    </button>
                )}
            </>
        );
    }

    if (name === "search") {
        return (
            <button className={styles.button} disabled={disabled}>
                Поиск
            </button>
        );
    }
};

export default ButtonMain;
