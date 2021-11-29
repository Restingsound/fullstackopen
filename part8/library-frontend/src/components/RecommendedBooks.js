import React from "react";

const RecommendedBooks = (props) => {
  const favoriteGenre = props.favoriteGenre;
  if (!props.show) {
    return null;
  }

  const books = props.books;

  if (books === null) {
    return null;
  }

  return (
    <div>
      <h2>recommendations</h2>
      books in your favorite genre <strong>{favoriteGenre}</strong>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
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

export default RecommendedBooks;
