import blogService from "../services/blogs";
import { setNotification } from "./notificationReducer";

const reducer = (state = [], action) => {
  let id;
  let changedBlog;
  let newComment;
  switch (action.type) {
    case "INIT_BLOGS":
      return action.data;
    case "LIKE":
      id = action.data.id;
      changedBlog = action.data.blog;
      return state.map((blog) => (blog.id !== id ? blog : changedBlog));
    case "DELETE_BLOG":
      console.log("in delete blog");
      id = action.data.id;
      return state.filter((blog) => blog.id !== id);
    case "NEW_BLOG":
      return [...state, action.data];
    case "NEW_COMMENT":
      id = action.data.id;
      newComment = action.data.comment;
      changedBlog = state.filter((blog) => blog.id === id)[0];
      changedBlog.comments.push(newComment);
      return state.map((blog) => (blog.id !== id ? blog : changedBlog));
    default:
      return state;
  }
};

export const likeBlog = (id, blogToChange) => {
  return async (dispatch) => {
    const changedBlog = {
      ...blogToChange,
      likes: blogToChange.likes + 1,
    };
    try {
      await blogService.update(id, changedBlog);
      dispatch({
        type: "LIKE",
        data: { blog: changedBlog, id: id },
      });

      // dispatch(
      //   setNotification(
      //     `blog ${blogToChange.title} by ${blogToChange.author} liked`
      //   )
      // );
    } catch (exception) {
      dispatch(setNotification("Unable to like blog", "error"));
    }
  };
};

export const createBlog = (content) => {
  return async (dispatch) => {
    try {
      const newBlog = await blogService.create(content);
      dispatch({
        type: "NEW_BLOG",
        data: newBlog,
      });
      dispatch(
        setNotification(
          `a new blog ${content.title} by ${content.author} added`
        )
      );
    } catch (exception) {
      dispatch(setNotification("Unable to add blog", "error"));
    }
  };
};

export const deleteBlog = (blog) => {
  return async (dispatch) => {
    try {
      await blogService.deleteObject(blog.id);

      dispatch({
        type: "DELETE_BLOG",
        data: { id: blog.id },
      });
      dispatch(setNotification(`blog ${blog.title} by ${blog.author} deleted`));
    } catch (exception) {
      dispatch(setNotification("Unable to delete blog", "error"));
    }
  };
};

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch({
      type: "INIT_BLOGS",
      data: blogs,
    });
  };
};

export const createComment = (id, content) => {
  return async (dispatch) => {
    try {
      await blogService.createComment(id, content);
      dispatch({
        type: "NEW_COMMENT",
        data: { comment: content.comment, id: id },
      });
      dispatch(setNotification(`a new comment ${content.comment} added`));
    } catch (exception) {
      dispatch(setNotification("Unable to add comment", "error"));
    }
  };
};

export default reducer;
