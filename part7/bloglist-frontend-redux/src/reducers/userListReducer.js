import userService from "../services/users";

const usersAtStart = null;

const initialState = usersAtStart;

const reducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case "INIT_USERS":
      newState = action.data;
      return newState;
    default:
      return state;
  }
};

export const initializeUsersList = () => {
  return async (dispatch) => {
    const users = await userService.getAll();
    dispatch({
      type: "INIT_USERS",
      data: users,
    });
  };
};

export default reducer;
