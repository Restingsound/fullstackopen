import loginService from "../services/login";
import blogService from "../services/blogs";
import { setNotification } from "./notificationReducer";

const userAtStart = null;

const initialState = userAtStart;

const reducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case "SET_USER":
      newState = action.data.user;
      return newState;
    default:
      return state;
  }
};

export const loginUser = (loginObject) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login(loginObject);
      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      blogService.setToken(user.token);
      dispatch({
        type: "SET_USER",
        data: {
          user: user,
        },
      });
      dispatch(setNotification("Successfully Logged In"));
    } catch (exception) {
      dispatch({
        type: "SET_USER",
        data: {
          user: null,
        },
      });
      dispatch(setNotification("wrong username or password", "error"));
    }
  };
};

export const initializeUser = () => {
  return async (dispatch) => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      blogService.setToken(user.token);
      dispatch({
        type: "SET_USER",
        data: {
          user: user,
        },
      });
    } else {
      dispatch({
        type: "SET_USER",
        data: {
          user: null,
        },
      });
    }
  };
};

export const logoutUser = () => {
  return async (dispatch) => {
    window.localStorage.removeItem("loggedBlogappUser");
    dispatch({
      type: "SET_USER",
      data: {
        user: null,
      },
    });
    dispatch(setNotification("Successfully Logged Out"));
  };
};

export default reducer;
