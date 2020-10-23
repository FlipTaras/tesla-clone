import axios from "axios";

export const SET_WIDTH = "SET_WIDTH";
export const SET_HEIGHT = "SET_HEIGHT";
export const SET_LOADED = "SET_LOADED";
export const SET_NAVBAR = "SET_NAVBAR";
export const SET_PAGEYOFFSET = "SET_PAGEYOFFSET";
export const SET_RANGE_ACTIVE_BUTTON = "SET_RANGE_ACTIVE_BUTTON";
export const SET_CHARGERS = "SET_CHARGERS";

export const setChargers = () => async (dispatch) => {
  const res = await axios.get("https://www.tesla.com/all-locations");
  console.log(res);
  const filteredRes = res.data
    .filter(
      (el) =>
        el.country === "United States" ||
        el.country === "Canada" ||
        el.country === "Mexico"
    )
    .slice(0, 1000)
    .map((el) => ({ lat: +el.latitude, lng: +el.longitude }));

  dispatch({
    type: SET_CHARGERS,
    payload: filteredRes,
  });
};

export const setRangeActiveButton = (payload) => (dispatch) => {
  dispatch({
    type: SET_RANGE_ACTIVE_BUTTON,
    payload,
  });
};

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
