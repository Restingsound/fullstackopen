import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { createVote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";

const AnecdoteList = () => {
  const dispatch = useDispatch();
  const anecdotes = useSelector((state) => state.anecdotes);
  const filter = useSelector((state) => state.filter);

  const vote = (id) => {
    const andecdoteToChange = anecdotes.find((n) => n.id === id);
    dispatch(createVote(id, andecdoteToChange));

    dispatch(setNotification(`you voted '${andecdoteToChange.content}'`, 10));
  };

  return (
    <div>
      {anecdotes
        .filter((anecdote) =>
          anecdote.content.toUpperCase().includes(filter.toUpperCase())
        )
        .sort((a, b) => b.votes - a.votes)
        .map((anecdote) => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={() => vote(anecdote.id)}>vote</button>
            </div>
          </div>
        ))}
    </div>
  );
};

export default AnecdoteList;
