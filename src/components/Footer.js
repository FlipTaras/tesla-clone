import React from "react";
import { Link } from "react-router-dom";
import { Transition } from "react-transition-group";
import { connect } from "react-redux";

/* Animation Settings */
const defaultStyle = {
  transition: "opacity .2s ease-in-out",
  opacity: 0,
  zIndex: "-1",
};
const transitionStyles = {
  entering: { opacity: 0.5, zIndex: "149" },
  entered: { opacity: 1, zIndex: "149" },
  exiting: { opacity: 0.5, zIndex: "149" },
  exited: { opacity: 0, zIndex: "-1" },
};

const mapStateToProps = (state) => ({
  width: state.page.width,
});

export default connect(mapStateToProps)(({ active, width }) => {
  let footerElements = [
    "Tesla © 2020",
    "Privacy & Legal",
    "Contact",
    "Careers",
    "Get Newsletter",
    "News",
    "Forums",
    "Locations",
  ];
  if (width < 600) {
    footerElements = ["Tesla © 2020", "Privacy & Legal", "News"];
  }
  return (
    <Transition in={active} timeout={200}>
      {(state) => (
        <div
          style={{ ...defaultStyle, ...transitionStyles[state] }}
          className="footer"
        >
          {footerElements.map((el) => (
            <Link key={el} className="footer__link" to="/">
              {el}
            </Link>
          ))}
        </div>
      )}
    </Transition>
  );
});
