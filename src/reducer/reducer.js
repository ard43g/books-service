import api from "../api/api";
const SET_TOTAL_COUNT = "SET_TOTAL_COUNT";
const SET_BOOKS = "SET_BOOKS";
const SET_ACTIVE_CATEGORIES = "SET_ACTIVE_CATEGORIES";
const SET_ACTIVE_SORT = "SET_ACTIVE_SORT";
const SET_LOAD_BOOKS_COUNT = "SET_LOAD_BOOK_COUNT";
const UPDATE_BOOKS = "UPDATE_BOOKS";
const SET_LOADING = "SET_LOADING";
const SET_ERROR = "SET_ERROR";
const SET_NOTIFICATION = "SET_NOTIFICATION";
const SET_PAGE_BOOK = "SET_PAGE_BOOK";
const ON_CLOSE_MODAL = "ON_CLOSE_MODAL";
const DELETE_BOOKSHELF = "DELETE_BOOKSHELF";
const DELETE_ACTIVE_BOOK = "DELETE_ACTIVE_BOOK";
const SET_CURRENT_POSITION = "SET_CURRENT_POSITION";

let initialState = {
    loading: false,
    error: false,
    notification: null,
    stepPage: 30,
    subjects: ["all", "art", "biography", "computers", "history", "medical", "poetry"],
    sort: ["relevance", "newest"],
    books: [],
    totalCount: 0,
    activeCategories: "all",
    activeSort: "relevance",
    activeBook: null,
    loadBooksCount: 0,
    currentPosition: 0,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_LOADING:
            return {
                ...state,
                loading: action.loading,
            };
        case SET_ERROR:
            return {
                ...state,
                error: action.error,
            };
        case SET_NOTIFICATION:
            return {
                ...state,
                notification: action.notification,
            };
        case SET_TOTAL_COUNT:
            return {
                ...state,
                totalCount: action.count,
            };
        case SET_BOOKS:
            return {
                ...state,
                books: action.items,
                loadBooksCount: action.items.length,
            };
        case SET_ACTIVE_CATEGORIES:
            return {
                ...state,
                activeCategories: action.categories,
            };
        case SET_ACTIVE_SORT:
            return {
                ...state,
                activeSort: action.activeSort,
            };
        case UPDATE_BOOKS:
            return {
                ...state,
                books: [...state.books, ...action.items],
            };
        case SET_LOAD_BOOKS_COUNT:
            return {
                ...state,
                loadBooksCount: action.count,
            };
        case SET_PAGE_BOOK:
            const id = action.activeBook;
            const ind = state.books.findIndex((i) => i.id === id);
            return {
                ...state,
                activeBook: state.books[ind],
            };
        case ON_CLOSE_MODAL:
            return {
                ...state,
                notification: null,
                error: false,
            };
        case DELETE_BOOKSHELF:
            return {
                ...state,
                books: [],
                totalCount: 0,
            };
        case SET_CURRENT_POSITION:
            return {
                ...state,
                currentPosition: action.position,
            };
        case DELETE_ACTIVE_BOOK:
            return {
                ...state,
                activeBook: null,
            };
        default:
            return state;
    }
};

export const setLoading = (loading) => {
    return {
        type: SET_LOADING,
        loading,
    };
};
const setError = (error) => {
    return {
        type: SET_ERROR,
        error,
    };
};
const setNotification = (notification) => {
    return {
        type: SET_NOTIFICATION,
        notification,
    };
};
const setTotalCount = (count) => {
    return {
        type: SET_TOTAL_COUNT,
        count,
    };
};

const setBooks = (items) => {
    return {
        type: SET_BOOKS,
        items,
    };
};
const updateBooks = (items) => {
    return {
        type: UPDATE_BOOKS,
        items,
    };
};
export const setLoadBooksCount = (count) => {
    return {
        type: SET_LOAD_BOOKS_COUNT,
        count,
    };
};
export const setActiveCategories = (categories) => {
    return {
        type: SET_ACTIVE_CATEGORIES,
        categories,
    };
};
export const setActiveSort = (activeSort) => {
    return {
        type: SET_ACTIVE_SORT,
        activeSort,
    };
};
export const setPageBook = (id) => {
    return {
        type: SET_PAGE_BOOK,
        activeBook: id,
    };
};
export const onCloseModal = () => {
    return {
        type: ON_CLOSE_MODAL,
    };
};
const deleteBookshelf = () => {
    return {
        type: DELETE_BOOKSHELF,
    };
};
export const deleteActiveBook = () => {
    return {
        type: DELETE_ACTIVE_BOOK,
    };
};

export const setCurrentPosition = (position) => {
    return {
        type: SET_CURRENT_POSITION,
        position,
    };
};

export const searchBookshelf = (term, categories, sort, count = 0, update = false) => {
    const activeCategories = categories === "all" ? "" : `+subject:${categories}`;
    const searchTerm = `intitle:${term}`;
    return async (dispatch) => {
        dispatch(setLoading(true));
        try {
            const res = await api.requestBooks(searchTerm, activeCategories, sort, count);

            if (res.totalItems === 0) {
                dispatch(setError(true));
                dispatch(setNotification("Совпадений не найдено"));
                dispatch(deleteBookshelf());
                dispatch(setLoading(false));
            }

            if (res.totalItems !== 0 && !res.error) {
                dispatch(setTotalCount(res.totalItems));
                if (update) {
                    dispatch(updateBooks(res.items));
                    dispatch(setLoading(false));
                } else {
                    dispatch(setCurrentPosition(0));
                    dispatch(setBooks(res.items));
                    dispatch(setLoading(false));
                }
            }
            if (res.error) {
                dispatch(setNotification(res.error.message));
                dispatch(setLoading(false));
                dispatch(setError(true));
            }
        } catch {
            dispatch(setError(true));
            dispatch(setLoading(false));
            dispatch(setNotification("Произошла ошибка"));
        }
    };
};

export default reducer;
