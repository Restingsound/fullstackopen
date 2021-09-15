import React, { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState(null);
  const blogFormRef = useRef();

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const notifyWith = (message, type = "success") => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 5000);
  };

  const handleLike = async (blogObject) => {
    try {
      await blogService.update(blogObject.id, blogObject);
      //notifyWith(`blog ${blogObject.title} by ${blogObject.author} liked`);
    } catch (exception) {
      notifyWith("Unable to Like Blog", "error");
    }
    const newBlogList = await blogService.getAll();
    setBlogs(newBlogList);
  };

  const handleDelete = async (blogObject) => {
    if (
      window.confirm(
        `Are you sure you want to delete ${blogObject.title} by ${blogObject.author}?`
      )
    ) {
      try {
        await blogService.deleteObject(blogObject.id);
        notifyWith(`blog ${blogObject.title} by ${blogObject.author} deleted`);
      } catch (exception) {
        notifyWith("Unable to Delete Blog", "error");
      }
      const newBlogList = await blogService.getAll();
      setBlogs(newBlogList);
    }
  };

  const handleLogin = async (loginObject) => {
    try {
      const user = await loginService.login(loginObject);

      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));

      blogService.setToken(user.token);
      setUser(user);
      notifyWith("Successfully Logged In");
    } catch (exception) {
      notifyWith("wrong username or password", "error");
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem("loggedBlogappUser");
    setUser(null);
    notifyWith("Successfully Logged Out");
  };

  const loginForm = () => (
    <div>
      <h2>log in to application</h2>
      <Notification notification={notification} />
      <LoginForm createLogin={handleLogin} />
    </div>
  );

  const addBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility();
    try {
      const returnedBlog = await blogService.create(blogObject);
      //console.log(returnedBlog);
      setBlogs(blogs.concat(returnedBlog));
      notifyWith(
        `a new blog ${blogObject.title} by ${blogObject.author} added`
      );
    } catch (exception) {
      notifyWith("Unable to Add Blog", "error");
    }
  };

  const blogList = () => (
    <div>
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          putLike={handleLike}
          currentUser={user}
          deleteBlog={handleDelete}
        />
      ))}
    </div>
  );

  if (user === null) {
    return <div>{loginForm()}</div>;
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification notification={notification} />
      <p>
        {user.name} logged-in <button onClick={handleLogout}>logout</button>
      </p>
      <Togglable buttonLabel="create new blog" ref={blogFormRef}>
        <BlogForm createBlog={addBlog} />
      </Togglable>
      {blogList()}
    </div>
  );
};

export default App;
