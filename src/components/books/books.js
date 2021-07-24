import { useHistory } from "react-router-dom";
import { memo, useEffect } from "react";
import styles from "./books.module.css";

const Books = memo(({ items, setBookPage, currentPosition, setCurrentPosition, setLoading, activeBook }) => {
    const history = useHistory();

    useEffect(() => {
        if (currentPosition !== 0 && !activeBook) {
            window.scrollTo(window.pageYOffset, currentPosition);
            setLoading(false);
        }
    }, [currentPosition]);

    function toBookPage(id) {
        setBookPage(id);
        setCurrentPosition(window.pageYOffset);
        history.push(`/book/${id}`);
    }

    if (items && items.length !== 0) {
        return (
            <div className={styles.books__wrapper}>
                {items.map((i) => {
                    const authors =
                        i.volumeInfo.authors?.length > 1
                            ? i.volumeInfo.authors.reduce((acc, i) => `${acc}, ${i}`)
                            : i.volumeInfo.authors;
                    return (
                        <div className={styles.book__wrapper} key={i.id}>
                            <div className={styles.book__image}>
                                <img
                                    src={i.volumeInfo.imageLinks?.smallThumbnail || ""}
                                    alt={i.volumeInfo.title || ""}
                                    onClick={() => toBookPage(i.id)}
                                />
                            </div>
                            <div className={styles.book__categories}>{i.volumeInfo.categories || ""}</div>
                            <h2 className={styles.book__title} onClick={() => toBookPage(i.id)}>
                                {i.volumeInfo.title || ""}
                            </h2>

                            {authors && <div className={styles.book__authors}>{authors}</div>}
                            <div>{i.id}</div>
                        </div>
                    );
                })}
            </div>
        );
    } else {
        return null;
    }
});

export default Books;
