import React from "react";
import { createAnecdote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";
import { connect } from "react-redux";

const AnecdoteForm = (props) => {
  const addAnecdote = async (event) => {
    event.preventDefault();
    const content = event.target.note.value;
    event.target.note.value = "";
    props.createAnecdote(content);

    props.setNotification(`you added '${content}'`, 10);
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input name="note" />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

const ConnectedAnecdoteForm = connect(null, {
  createAnecdote,
  setNotification,
})(AnecdoteForm);
export default ConnectedAnecdoteForm;
