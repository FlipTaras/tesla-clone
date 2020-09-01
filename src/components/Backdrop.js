import React from "react";
import { Transition } from "react-transition-group";
const defaultStyle = {
  transition: "opacity .2s ease-in-out",
  opacity: 0,
  display: "none",
};
const transitionStyles = {
  entering: { opacity: 0.2, display: "block" },
  entered: { opacity: 1, display: "block" },
  exiting: { opacity: 0.3, display: "block" },
  exited: { opacity: 0, display: "none" },
};
export default ({ click, active }) => {
  return (
    <Transition in={active} timeout={200}>
      {(state) => (
        <div
          style={{ ...defaultStyle, ...transitionStyles[state] }}
          onClick={() => click()}
          className="backdrop"
        ></div>
      )}
    </Transition>
  );
};
