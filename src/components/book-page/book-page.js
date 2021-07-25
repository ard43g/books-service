import { useEffect } from "react";
import styles from "./book-page.module.css";

const BookPage = ({ click, image, categories, title, subtitle, authors, date, descr }) => {
    useEffect(() => {
        window.scrollTo(0, 300);
    }, []);
    return (
        <div className={styles.book__wrapper}>
            <button className={styles.button__back} onClick={() => click()}>
                <span>X</span>
            </button>
            <div className={styles.book__image}>
                <img src={image} alt={title} />
            </div>
            <div className={styles.book__descr}>
                <div className={styles.book__categories}>{categories}</div>
                <h2 className={styles.book__title}>{title}</h2>
                <h3 className={styles.book__subtitle}>{subtitle}</h3>
                <div className={styles.book__authors}>{authors}</div>
                <div className={styles.book__date}>Published date: {date}</div>
                {descr && <div className={styles.book__description}>{descr}</div>}
            </div>
        </div>
    );
};

export default BookPage;
