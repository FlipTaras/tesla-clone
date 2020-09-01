import React from "react";
import { Link } from "react-router-dom";
import { Transition } from "react-transition-group";

/* Animation Settings */
const defaultStyle = { transition: "opacity .2s ease-in-out", opacity: 0 };
const transitionStyles = {
  entering: { opacity: 1 },
  entered: { opacity: 1 },
  exiting: { opacity: 0 },
  exited: { opacity: 0 },
};

export default ({ active }) => {
  return (
    <Transition in={active} timeout={200}>
      {(state) => (
        <div
          style={{ ...defaultStyle, ...transitionStyles[state] }}
          className="footer"
        >
          <Link className="footer__link" to="/">
            Tesla © 2020
          </Link>
          <Link className="footer__link" to="/">
            Privacy & Legal
          </Link>
          <Link className="footer__link" to="/">
            Contact
          </Link>
          <Link className="footer__link" to="/">
            Careers
          </Link>
          <Link className="footer__link" to="/">
            Get Newsletter
          </Link>
          <Link className="footer__link" to="/">
            News
          </Link>
          <Link className="footer__link" to="/">
            Forums
          </Link>
          <Link className="footer__link" to="/">
            Locations
          </Link>
        </div>
      )}
    </Transition>
  );
};
