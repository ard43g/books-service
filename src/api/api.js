const baseUrl = "https://www.googleapis.com/books/v1/";

const api = {
    async requestBooks(searchTerm, activeCategories, sort, count) {
        return await fetch(
            `${baseUrl}volumes?q=${searchTerm}${activeCategories}&maxResults=30&orderBy=${sort}&startIndex=${count}`
        ).then((data) => data.json());
    },
};

export default api;
