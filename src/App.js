import { BrowserRouter as Router, Route } from "react-router-dom";
import SearchContainer from "./components/search-container/search-container";
import BooksContainer from "./components/books-container/books-container";
import BookPageContainer from "./components/book-page-container/book-page-container";
import "./App.css";

function App() {
    return (
        <Router>
            <SearchContainer />
            <Route exact path="/" component={BooksContainer} />
            <Route path="/book/:id" component={BookPageContainer} />
        </Router>
    );
}

export default App;
