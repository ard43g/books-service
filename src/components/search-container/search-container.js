import { connect } from "react-redux";
import { onCloseModal, searchBookshelf, setActiveCategories, setActiveSort } from "../../reducer/reducer";
import FilterPanel from "../filter-panel/filter-panel";
import Modal from "../modal/modal";
import SearchPanel from "../search-panel/search-panel";
import Title from "../title/title";
import {
    getActiveCategories,
    getActiveSort,
    getBooksInShelfCount,
    getLoadBooksCount,
    getNotification,
    getSort,
    getStepPage,
    getSubjects,
    isError,
    isLoading,
} from "../../selectors/selectors";
import styles from "./search-container.module.css";

const SearchContainer = (props) => {
    return (
        <div className={styles.search__container}>
            <Title title="Library" />
            <SearchPanel
                onSearchBook={props.onSearchBook}
                activeCategories={props.activeCategories}
                activeSort={props.activeSort}
                loadBooksCount={props.loadBooksCount}
                loading={props.loading}
                stepPage={props.stepPage}
                booksInShelfCount={props.booksInShelfCount}
            />
            <div className={styles.search__filter}>
                <FilterPanel value={props.subjects} name="subjects" onSetCategories={props.onSetCategories} />
                <FilterPanel value={props.sort} name="date" onSetSort={props.onSetSort} />
            </div>
            {props.error && <Modal message={props.notification} onCloseModal={props.onCloseModal} />}
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        subjects: getSubjects(state),
        sort: getSort(state),
        activeCategories: getActiveCategories(state),
        activeSort: getActiveSort(state),
        loadBooksCount: getLoadBooksCount(state),
        loading: isLoading(state),
        stepPage: getStepPage(state),
        notification: getNotification(state),
        error: isError(state),
        booksInShelfCount: getBooksInShelfCount(state),
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onSearchBook: (term, categories, sort, count, update) => {
            dispatch(searchBookshelf(term, categories, sort, count, update));
        },
        onSetCategories: (categories) => {
            dispatch(setActiveCategories(categories));
        },
        onSetSort: (sort) => {
            dispatch(setActiveSort(sort));
        },
        onCloseModal: () => {
            dispatch(onCloseModal());
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchContainer);
