import React, { useEffect, useState } from "react";
import {
  useApolloClient,
  useLazyQuery,
  useQuery,
  useSubscription,
} from "@apollo/client";
import { ALL_AUTHORS, ALL_BOOKS, BOOK_ADDED } from "./queries";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import LoginForm from "./components/LoginForm";
import RecommendedBooks from "./components/RecommendedBooks";

const App = () => {
  const [errorMessage, setErrorMessage] = useState(null);
  const authorsResult = useQuery(ALL_AUTHORS);
  const booksResult = useQuery(ALL_BOOKS);
  const [getRecommended, recommendResult] = useLazyQuery(ALL_BOOKS);
  const [recommendedBooks, setRecommended] = useState(null);

  const [page, setPage] = useState("authors");
  const [token, setToken] = useState(null);
  const [favoriteGenre, setFavoriteGenre] = useState(null);
  const client = useApolloClient();

  const updateCacheWith = (addedBook) => {
    const includedIn = (set, object) =>
      set.map((p) => p.id).includes(object.id);

    const dataInStore = client.readQuery({ query: ALL_BOOKS });
    if (!includedIn(dataInStore.allBooks, addedBook)) {
      client.writeQuery({
        query: ALL_BOOKS,
        data: { allBooks: dataInStore.allBooks.concat(addedBook) },
      });
    }
  };

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded;
      notify(`${addedBook.title} added`);
      updateCacheWith(addedBook);
    },
  });

  const showRecommendations = () => {
    getRecommended({ variables: { genre: favoriteGenre } });
  };

  useEffect(() => {
    if (recommendResult.data) {
      setRecommended(recommendResult.data.allBooks);
    }
  }, [recommendResult]);

  const notify = (message) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage(null);
    }, 10000);
  };

  if (authorsResult.loading) {
    return <div>loading...</div>;
  }

  if (booksResult.loading) {
    return <div>loading...</div>;
  }

  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
    setPage("authors");
  };

  const loginAction = () => {
    setPage("authors");
  };

  const NavBar = () => {
    if (!token) {
      return (
        <div>
          <button onClick={() => setPage("authors")}>authors</button>
          <button onClick={() => setPage("books")}>books</button>
          <button onClick={() => setPage("login")}>login</button>
        </div>
      );
    }

    return (
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        <button onClick={() => setPage("add")}>add book</button>
        <button
          onClick={() => {
            setPage("recommended");
            showRecommendations();
          }}
        >
          recommend
        </button>
        <button onClick={logout}>logout</button>
      </div>
    );
  };

  return (
    <div>
      <NavBar />
      <Notify errorMessage={errorMessage} />

      <LoginForm
        show={page === "login"}
        setToken={setToken}
        setFavoriteGenre={setFavoriteGenre}
        setError={notify}
        loginAction={loginAction}
      />

      <Authors
        show={page === "authors"}
        authors={authorsResult.data.allAuthors}
        setError={notify}
        token={token}
      />

      <Books show={page === "books"} books={booksResult.data.allBooks} />

      <RecommendedBooks
        show={page === "recommended"}
        books={recommendedBooks}
        favoriteGenre={favoriteGenre}
      />

      <NewBook show={page === "add"} setError={notify} />
    </div>
  );
};

const Notify = ({ errorMessage }) => {
  if (!errorMessage) {
    return null;
  }
  return <div style={{ color: "red" }}>{errorMessage}</div>;
};

export default App;
