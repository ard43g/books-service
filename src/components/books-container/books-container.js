import { connect } from "react-redux";
import { setCurrentPosition, setLoadBooksCount, setLoading, setPageBook } from "../../reducer/reducer";
import Books from "../books/books";
import Counter from "../counter/counter";
import ButtonMain from "../button-main/button-main";
import Spinner from "../spinner/spinner";
import {
    getTotalCount,
    getActiveBook,
    getBooks,
    getCurrentPosition,
    getLoadBooksCount,
    getStepPage,
    isLoading,
} from "../../selectors/selectors";

const BooksContainer = (props) => {
    return (
        <>
            <Counter count={props.totalCount} />
            {props.loading && <Spinner />}
            <Books
                items={props.books}
                setBookPage={props.setBookPage}
                currentPosition={props.currentPosition}
                setCurrentPosition={props.setCurrentPosition}
                setLoading={props.setLoading}
                activeBook={props.activeBook}
            />
            <ButtonMain
                name="load"
                setLoadBooksCount={props.setLoadBooksCount}
                loadBooksCount={props.loadBooksCount}
                totalCount={props.totalCount}
                stepPage={props.stepPage}
            />
        </>
    );
};

const mapStateToProps = (state) => {
    return {
        books: getBooks(state),
        totalCount: getTotalCount(state),
        loadBooksCount: getLoadBooksCount(state),
        loading: isLoading(state),
        stepPage: getStepPage(state),
        currentPosition: getCurrentPosition(state),
        activeBook: getActiveBook(state),
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setLoadBooksCount: (count) => {
            dispatch(setLoadBooksCount(count));
        },
        setBookPage: (id) => {
            dispatch(setPageBook(id));
        },
        setCurrentPosition: (position) => {
            dispatch(setCurrentPosition(position));
        },
        setLoading: (loading) => {
            dispatch(setLoading(loading));
        },
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(BooksContainer);
