const notificationAtStart = null;
let lastTimeout = 0;

const initialState = notificationAtStart;

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_NOTIFICATION":
      const newNotification = action.data.message;
      return newNotification;
    case "CLEAR_NOTIFICATION":
      return null;
    default:
      return state;
  }
};

export const setNotification = (message, time) => {
  return async (dispatch) => {
    dispatch({
      type: "SET_NOTIFICATION",
      data: {
        message: message,
      },
    });
    if (lastTimeout !== 0) {
      clearTimeout(lastTimeout);
    }
    lastTimeout = setTimeout(() => {
      dispatch(clearNotification());
    }, time * 1000);
  };
};

export const clearNotification = () => {
  return {
    type: "CLEAR_NOTIFICATION",
    data: {},
  };
};

export default reducer;
