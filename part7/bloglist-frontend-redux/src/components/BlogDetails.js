import React, { useState } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { likeBlog, deleteBlog, createComment } from "../reducers/blogReducer";
import { Button, List, ListItem, TextField } from "@mui/material";

const BlogDetails = ({ blog, currentUser }) => {
  const dispatch = useDispatch();
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    marginBottom: 5,
  };
  const [comment, setComment] = useState("");

  const addComment = (event) => {
    event.preventDefault();
    const commentObject = { comment: comment };
    dispatch(createComment(blog.id, commentObject));

    setComment("");
  };

  const showDeleteButton = {
    display: blog.user.name === currentUser.name ? "" : "none",
  };

  const handleLike = () => {
    dispatch(likeBlog(blog.id, blog));
  };

  const handleDelete = () => {
    if (
      window.confirm(
        `Are you sure you want to delete ${blog.title} by ${blog.author}?`
      )
    ) {
      dispatch(deleteBlog(blog));
    }
  };

  const showComments = () => {
    //console.log(blog.comments.length);
    if (blog.comments.length === 0 || !blog.comments) {
      return (
        <div>
          <h4>no comments yet</h4>
          <form onSubmit={addComment}>
            <input
              type="text"
              value={comment}
              name="Comment"
              id="comment"
              onChange={({ target }) => setComment(target.value)}
            />
            <Button size="small" variant="outlined" id="create" type="submit">
              add comment
            </Button>
          </form>
        </div>
      );
    }
    return (
      <div>
        <h4>comments</h4>
        <form onSubmit={addComment}>
          <TextField
            size="small"
            type="text"
            value={comment}
            name="Comment"
            id="comment"
            label="Comment Text"
            onChange={({ target }) => setComment(target.value)}
          />
          <Button size="small" variant="outlined" id="create" type="submit">
            add comment
          </Button>
        </form>
        <List>
          {blog.comments.map((comment, x) => (
            <ListItem key={x}>{comment}</ListItem>
          ))}
        </List>
      </div>
    );
  };

  return (
    <div style={blogStyle}>
      <h2>
        {blog.title} {blog.author}
      </h2>
      <a href={blog.url}>{blog.url}</a>
      <br />
      likes <span className="likeCount">{blog.likes}</span>{" "}
      <Button size="small" variant="outlined" onClick={handleLike}>
        like
      </Button>
      <br />
      added by {blog.user.name}
      <div style={showDeleteButton}>
        <Button size="small" variant="outlined" onClick={handleDelete}>
          remove
        </Button>
      </div>
      {showComments()}
    </div>
  );
};

BlogDetails.propTypes = {
  blog: PropTypes.object.isRequired,
  currentUser: PropTypes.object.isRequired,
};

export default BlogDetails;
