export const SET_WIDTH = "SET_WIDTH";
export const SET_HEIGHT = "SET_HEIGHT";
export const SET_LOADED = "SET_LOADED";

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
export const setLoaded = () => (dispatch) => {
  dispatch({
    type: SET_LOADED,
  });
};
