import React, { useState } from "react";
import PropTypes from "prop-types";

const Blog = ({ blog, putLike, currentUser, deleteBlog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const [showDetails, setShowDetails] = useState(false);

  //const hideWhenVisible = { display: showDetails ? "none" : "" };
  const showWhenVisible = { display: showDetails ? "" : "none" };
  const detailsButtonText = showDetails ? "hide" : "view";
  const showDeleteButton = {
    display: blog.user.name === currentUser.name ? "" : "none",
  };

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  const likeBlog = () => {
    const blogObject = { ...blog, likes: blog.likes + 1 };
    putLike(blogObject);
  };

  const setupDeleteBlog = () => {
    const blogObject = blog;
    deleteBlog(blogObject);
  };

  return (
    <div style={blogStyle} className="blog">
      {blog.title} {blog.author}&nbsp;
      <button onClick={toggleDetails}>{detailsButtonText}</button>
      <div className="blogDetails" style={showWhenVisible}>
        {blog.url}
        <br />
        likes <span className="likeCount">{blog.likes}</span>{" "}
        <button onClick={likeBlog}>like</button>
        <br />
        {blog.user.name}
        <div style={showDeleteButton}>
          <button onClick={setupDeleteBlog}>remove</button>
        </div>
      </div>
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  putLike: PropTypes.func.isRequired,
  currentUser: PropTypes.object.isRequired,
  deleteBlog: PropTypes.func.isRequired,
};

export default Blog;
