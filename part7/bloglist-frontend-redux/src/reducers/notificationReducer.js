const notificationAtStart = null;
let lastTimeout = 0;

const initialState = notificationAtStart;

const reducer = (state = initialState, action) => {
  let newState = { message: null, type: null };
  switch (action.type) {
    case "SET_NOTIFICATION":
      newState.message = action.data.message;
      newState.type = action.data.type;
      return newState;
    case "CLEAR_NOTIFICATION":
      return null;
    default:
      return state;
  }
};

export const setNotification = (message, type = "success", time = 5) => {
  return async (dispatch) => {
    dispatch({
      type: "SET_NOTIFICATION",
      data: {
        message: message,
        type: type,
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
