export const SET_WIDTH = "SET_WIDTH";
export const SET_HEIGHT = "SET_HEIGHT";
export const SET_LOADED = "SET_LOADED";
export const SET_NAVBAR = "SET_NAVBAR";
export const SET_PAGEYOFFSET = "SET_PAGEYOFFSET";

export const setPageYOffSet = (offset) => (dispatch) => {
  dispatch({
    type: SET_PAGEYOFFSET,
    payload: offset,
  });
};

export const setNavbar = () => (dispatch) => {
  dispatch({
    type: SET_NAVBAR,
  });
};
export const setWidth = (width) => (dispatch) => {
  dispatch({
    type: SET_WIDTH,
    payload: width,
  });
};
export const setHeight = (height) => (dispatch) => {
  dispatch({
    type: SET_HEIGHT,
    payload: height,
  });
};
export const setLoaded = (type) => (dispatch) => {
  dispatch({
    type: SET_LOADED,
    payload: type,
  });
};

/* Model S actions */

export const SET_PAGE_TO_SHOW = "SET_PAGE_TO_SHOW";
export const SET_SILENT_SCROLL_TO = "SET_SILENT_SCROLL_TO";
export const SET_STOP_ANIMATION = "SET__STOP_ANIMATION";
export const SET_PAGEINDEX = "SET_PAGEINDEX";
export const SET_SHOWLEARNMORE = "";

export const setPageIndex = (index) => (dispatch) => {
  dispatch({
    type: SET_PAGEINDEX,
    payload: index,
  });
};

export const setPageToShow = (pageToShow) => (dispatch) => {
  dispatch({
    type: SET_PAGE_TO_SHOW,
    payload: pageToShow,
  });
};

export const setSilentScrollTo = (to) => (dispatch) => {
  dispatch({
    type: SET_SILENT_SCROLL_TO,
    payload: to,
  });
};

export const setStopAnimation = (show) => (dispatch) => {
  dispatch({
    type: SET_STOP_ANIMATION,
    payload: show,
  });
};
