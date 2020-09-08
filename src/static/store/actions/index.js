export const SET_WIDTH = "SET_WIDTH";
export const SET_HEIGHT = "SET_HEIGHT";
export const SET_LOADED = "SET_LOADED";
export const SET_NAVBAR = "SET_NAVBAR";
export const SET_PAGEINDEX = "SET_PAGEINDEX";

export const setPageIndex = (index) => (dispatch) => {
  dispatch({
    type: SET_PAGEINDEX,
    payload: index,
  });
};

export const setNavbar = (type) => (dispatch) => {
  dispatch({
    type: SET_NAVBAR,
    payload: type,
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
