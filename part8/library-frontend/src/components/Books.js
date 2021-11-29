import React, { useState } from "react";

const Books = (props) => {
  const [genre, setGenre] = useState("all genres");
  if (!props.show) {
    return null;
  }

  const books = props.books;

  const genreList = [];

  if (books.length > 0) {
    for (let x = 0; x < books.length; x++) {
      if (books[x].genres !== null) {
        for (let y = 0; y < books[x].genres.length; y++) {
          if (!genreList.includes(books[x].genres[y])) {
            genreList.push(books[x].genres[y]);
          }
        }
      }
    }
  }
  genreList.push("all genres");
  //console.log(genreList);

  const assignGenre = (g) => {
    //console.log("assigning genre", g);
    setGenre(g);
  };

  const GenreMessage = () => {
    return (
      <div>
        in genre <strong>{genre}</strong>
      </div>
    );
  };

  let filteredBooks = [];
  if (genre !== "all genres") {
    filteredBooks = books
      .filter((book) => book.genres !== null)
      .filter((book) => book.genres.includes(genre));
    //console.log(filteredBooks);
  } else {
    filteredBooks = books;
  }

  if (filteredBooks === []) {
    return null;
  }

  return (
    <div>
      <h2>books</h2>
      <GenreMessage />
      {genreList.map((g) => (
        <button key={g} onClick={() => assignGenre(g)}>
          {g}
        </button>
      ))}
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {filteredBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Books;
