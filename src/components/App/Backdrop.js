import React from "react";
import { Transition } from "react-transition-group";
import { connect } from "react-redux";
import { setNavbar } from "../../static/store/actions";
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

const mapStateToProps = (state) => ({
  navbarActive: state.page.navbarActive,
});

const mapActionToProps = {
  setNavbar,
};

export default connect(
  mapStateToProps,
  mapActionToProps
)(({ navbarActive, setNavbar }) => {
  return (
    <Transition in={navbarActive} timeout={200}>
      {(state) => (
        <div
          style={{ ...defaultStyle, ...transitionStyles[state] }}
          onClick={() => setNavbar(false)}
          className="backdrop"
        ></div>
      )}
    </Transition>
  );
});
