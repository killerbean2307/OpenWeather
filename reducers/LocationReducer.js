import { SET_LOCATION } from "../actions/types";

const initState = { name: "" };
const locationReducer = (state = initState, action) => {
  switch (action.type) {
    case SET_LOCATION:
      return {
        ...state,
        name: action.location
      };

    default:
      return state;
  }
};

export default locationReducer;
