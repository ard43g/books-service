import { connect } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { deleteActiveBook, setLoading } from "../../reducer/reducer";
import { getActiveBook } from "../../selectors/selectors";
import BookPage from "../book-page/book-page";

const BookPageContainer = ({ activeBook, setLoading, deleteActiveBook }) => {
    const history = useHistory();
    if (history.location.pathname !== "" && !activeBook) {
        return <Redirect to="/" />;
    }

    const title = activeBook.volumeInfo.title || "";
    const subtitle = activeBook.volumeInfo.subtitle || "";
    const image = activeBook.volumeInfo.imageLinks?.thumbnail || "";
    const categories = activeBook.volumeInfo.categories || "";
    const authors =
        activeBook.volumeInfo?.authors?.length > 1
            ? activeBook.volumeInfo.authors.reduce((acc, i) => `${acc}, ${i}`)
            : activeBook.volumeInfo.authors || "";
    const date = activeBook.volumeInfo.publishedDate || "";
    const descr = activeBook.searchInfo?.textSnippet || "";

    function backward() {
        setLoading(true);
        deleteActiveBook();
        history.push("/");
    }

    return (
        <BookPage
            click={backward}
            image={image}
            categories={categories}
            title={title}
            subtitle={subtitle}
            authors={authors}
            date={date}
            descr={descr}
        />
    );
};

const mapStateToProps = (state) => {
    return {
        activeBook: getActiveBook(state),
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setLoading: (loading) => {
            dispatch(setLoading(loading));
        },
        deleteActiveBook: () => {
            dispatch(deleteActiveBook());
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookPageContainer);
