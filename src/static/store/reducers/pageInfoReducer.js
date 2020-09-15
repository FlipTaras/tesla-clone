import * as actionType from "../actions";

const initialState = {
  width: window.innerWidth,
  height: window.innerHeight,
  loaded: false,
  navbarActive: false,
  pageYOffset: window.pageYOffset,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionType.SET_WIDTH:
      return { ...state, width: action.payload };
    case actionType.SET_HEIGHT:
      return { ...state, height: action.payload };
    case actionType.SET_LOADED:
      return { ...state, loaded: action.payload };
    case actionType.SET_NAVBAR:
      return { ...state, navbarActive: !state.navbarActive };
    case actionType.SET_PAGEYOFFSET:
      return { ...state, pageYOffset: action.payload };
    default:
      return state;
  }
};
