const filterAtStart = "";

const initialState = filterAtStart;

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_FILTER":
      const newFilter = action.data.filter;
      return newFilter;
    default:
      return state;
  }
};

export const createFilter = (filter) => {
  return {
    type: "SET_FILTER",
    data: {
      filter: filter,
    },
  };
};

export default reducer;
