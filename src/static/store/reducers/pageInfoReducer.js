import * as actionType from "../actions";

const initialState = {
  width: window.innerWidth,
  height: window.innerHeight,
  loaded: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionType.SET_WIDTH:
      return { ...state, width: action.payload };
    case actionType.SET_HEIGHT:
      return { ...state, height: action.payload };
    case actionType.SET_LOADED:
      return { ...state, loaded: true };
    default:
      return state;
  }
};
