import React, { useEffect, useRef } from "react";
import Blog from "./components/Blog";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";
import { initializeBlogs } from "./reducers/blogReducer";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, initializeUser, logoutUser } from "./reducers/userReducer";
import { initializeUsersList } from "./reducers/userListReducer";
import UserList from "./components/UserList";
import SingleUsersBlogs from "./components/SingleUsersBlogs";
import { Link, Route, Routes, useMatch } from "react-router-dom";
import BlogDetails from "./components/BlogDetails";
import { AppBar, Button, Container, Toolbar } from "@mui/material";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(initializeBlogs());
  }, [dispatch]);
  useEffect(() => {
    dispatch(initializeUser());
  }, [dispatch]);
  useEffect(() => {
    dispatch(initializeUsersList());
  }, [dispatch]);
  const blogs = useSelector((state) => state.blogs);
  const user = useSelector((state) => state.user);
  const userList = useSelector((state) => state.userList);
  const blogFormRef = useRef();

  const handleLogin = async (loginObject) => {
    dispatch(loginUser(loginObject));
  };

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  const loginForm = () => (
    <div>
      <h2>log in to application</h2>
      <Notification />
      <LoginForm createLogin={handleLogin} />
    </div>
  );

  const handleCreateBlogVis = () => {
    blogFormRef.current.toggleVisibility();
  };

  const blogList = () => (
    <div>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );

  //console.log("current user", user);
  if (user === null) {
    return <div>{loginForm()}</div>;
  }

  const Home = () => {
    return (
      <div>
        <Togglable buttonLabel="create new blog" ref={blogFormRef}>
          <BlogForm createBlogVisToggle={handleCreateBlogVis} />
        </Togglable>
        {blogList()}
      </div>
    );
  };

  const BlogDetail = () => {
    let matchedBlog = null;
    //console.log("all blogs", blogs);
    if (blogs !== null) {
      const match = useMatch("/blogs/:id");
      matchedBlog = match
        ? blogs.find((blog) => blog.id === match.params.id)
        : null;
    }
    //console.log("matched", matchedBlog);
    if (!matchedBlog) {
      return <div></div>;
    }
    return (
      <div>
        <BlogDetails
          key={matchedBlog.id}
          blog={matchedBlog}
          currentUser={user}
        />
      </div>
    );
  };

  const Blogs = () => {
    let matchedUser = null;
    if (userList !== null) {
      const match = useMatch("/users/:id");
      matchedUser = match
        ? userList.find((user) => user.id === match.params.id)
        : null;
    }
    if (!matchedUser) {
      return <div></div>;
    }
    return (
      <div>
        <SingleUsersBlogs selectedUser={matchedUser.name} />
      </div>
    );
  };

  return (
    <Container
      maxWidth="false"
      disableGutters
      sx={{
        minWidth: 800,
        maxWidth: 800,
        minHeight: 500,
        backgroundColor: "lightgray",
        border: 3,
        borderRadius: 2,
        padding: 1,
      }}
    >
      <AppBar position="static">
        <Toolbar>
          <Button
            size="small"
            color="inherit"
            variant="outlined"
            component={Link}
            to="/"
          >
            blogs
          </Button>
          <Button
            size="small"
            color="inherit"
            variant="outlined"
            component={Link}
            to="/users"
          >
            users
          </Button>
          {user.name} logged-in
          <Button
            size="small"
            color="inherit"
            variant="outlined"
            onClick={handleLogout}
          >
            logout
          </Button>
        </Toolbar>
      </AppBar>
      <h2>blog app</h2>
      <Notification />
      <Routes>
        <Route path="/users/:id" element={<Blogs />} />
        <Route path="/blogs/:id" element={<BlogDetail />} />
        <Route path="/users" element={<UserList />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </Container>
  );
};

export default App;
