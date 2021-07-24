export const getSubjects = (state) => {
    return state.subjects;
};
export const getSort = (state) => {
    return state.sort;
};
export const getBooks = (state) => {
    return state.books;
};
export const getActiveBook = (state) => {
    return state.activeBook;
};
export const getTotalCount = (state) => {
    return state.totalCount;
};
export const getActiveCategories = (state) => {
    return state.activeCategories;
};
export const getActiveSort = (state) => {
    return state.activeSort;
};
export const getLoadBooksCount = (state) => {
    return state.loadBooksCount;
};
export const isLoading = (state) => {
    return state.loading;
};
export const getBooksInShelfCount = (state) => {
    return state.books.length;
};
export const getStepPage = (state) => {
    return state.stepPage;
};
export const getNotification = (state) => {
    return state.notification;
};
export const getCurrentPosition = (state) => {
    return state.currentPosition;
};
export const isError = (state) => {
    return state.error;
};
