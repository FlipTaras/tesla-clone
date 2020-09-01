import React from "react";
import { Transition } from "react-transition-group";
import SidebarElement from "./SidebarElement";

/* Animation Settings */
const defaultStyle = {
  transition: "transform .2s ease-out",
  transform: "translateX(100%)",
};
const transitionStyles = {
  entering: {
    transform: "translateX(0)",
    transitionDelay: ".2s",
  },
  entered: {
    transform: "translateX(0)",
  },
  exiting: {
    transform: "translateX(0)",
    transitionDelay: "0s",
  },
  exited: {
    transform: "translateX(100%)",
  },
};

export default ({ active }) => {
  const sidebarElements = [
    "Used Inventory",
    "trade-in",
    "cybertruck",
    "Roadster",
    "Semi",
    "PowerWall",
    "Comercial Solar",
    "Test Drive",
    "Charging",
    "Find us",
    "Support",
    "United States",
  ];
  return (
    <Transition in={active} timeout={200}>
      {(state) => (
        <div
          style={{ ...defaultStyle, ...transitionStyles[state] }}
          className="sidebar"
        >
          {sidebarElements.map((el) => (
            <SidebarElement key={el} text={el} />
          ))}
        </div>
      )}
    </Transition>
  );
};
