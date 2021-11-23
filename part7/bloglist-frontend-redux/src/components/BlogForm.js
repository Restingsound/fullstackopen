import React, { useState } from "react";
import PropTypes from "prop-types";
import { createBlog } from "../reducers/blogReducer";
import { useDispatch } from "react-redux";
import { Button, TextField } from "@mui/material";

const BlogForm = ({ createBlogVisToggle }) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const addBlog = (event) => {
    event.preventDefault();
    const blogObject = { title: title, author: author, url: url };
    dispatch(createBlog(blogObject));
    createBlogVisToggle();

    setTitle("");
    setAuthor("");
    setUrl("");
  };

  return (
    <div className="blogForm">
      <h2>create new blog</h2>
      <form onSubmit={addBlog}>
        <div>
          <TextField
            type="text"
            value={title}
            name="Title"
            id="title"
            label="Title"
            size="small"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          <TextField
            type="text"
            value={author}
            name="Author"
            id="author"
            label="Author"
            size="small"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          <TextField
            type="text"
            value={url}
            name="Url"
            id="url"
            label="Url"
            size="small"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <Button size="small" variant="outlined" id="create" type="submit">
          create
        </Button>
      </form>
    </div>
  );
};

BlogForm.propTypes = {
  createBlogVisToggle: PropTypes.func.isRequired,
};

export default BlogForm;
