import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import ButtonMain from "../button-main/button-main";
import styles from "./search-panel.module.css";
const SearchPanel = ({
    onSearchBook,
    activeCategories,
    activeSort,
    loadBooksCount,
    loading,
    stepPage,
    booksInShelfCount,
}) => {
    const [term, setTerm] = useState("");
    const [countBooksLoaded, setCountBooksLoaded] = useState(loadBooksCount);
    function changeSearch(e) {
        setTerm(e.target.value);
    }

    const history = useHistory();
    useEffect(() => {
        setCountBooksLoaded(loadBooksCount);
        if (countBooksLoaded !== loadBooksCount && loadBooksCount > stepPage) {
            onSearchBook(term, activeCategories, activeSort, booksInShelfCount, true);
        }
    }, [loadBooksCount]);
    function searchBooks(e) {
        e.preventDefault();
        history.push("/");

        onSearchBook(term, activeCategories, activeSort, 0, false);
    }

    return (
        <div className={styles.search__wrapper}>
            <form onSubmit={searchBooks}>
                <input className={styles.search__input} type="text" onChange={changeSearch} value={term}></input>
                <ButtonMain disabled={!term || loading} name="search" />
            </form>
        </div>
    );
};

export default SearchPanel;
