import * as actionType from "../actions";

const initialState = {
  pagetoShow: null,
  silentScrollTo: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionType.SET_PAGE_TO_SHOW:
      return { ...state, pagetoShow: action.payload };
    case actionType.SET_SILENT_SCROLL_TO:
      return { ...state, silentScrollTo: action.payload };
    default:
      return state;
  }
};
