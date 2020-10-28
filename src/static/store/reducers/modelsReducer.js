import * as actionType from "../actions";

const initialState = {
  pagetoShow: null,
  silentScrollTo: null,
  pageIndex: "0",
  chargers: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionType.SET_PAGE_TO_SHOW:
      return { ...state, pagetoShow: action.payload };
    case actionType.SET_SILENT_SCROLL_TO:
      return { ...state, silentScrollTo: action.payload };
    case actionType.SET_PAGEINDEX:
      return { ...state, pageIndex: action.payload };
    case actionType.SET_CHARGERS:
      return { ...state, chargers: action.payload };
    default:
      return state;
  }
};
