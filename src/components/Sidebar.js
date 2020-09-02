import React, { useState } from "react";
import { Transition } from "react-transition-group";
import SidebarElement from "./SidebarElement";
import { connect } from "react-redux";

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

const mapStateToProps = (state) => ({
  width: state.page.width,
});
export default connect(mapStateToProps)(({ active, width }) => {
  const [moreActive, setMoreActive] = useState(false);
  const sidebarElementsBigScreen = [
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
  ];
  const sideBarElementsMediumScreen = [
    "Model S",
    "Model 3",
    "Model X",
    "Model Y",
    "Solar Roof",
    "Solar Panels",
    "Shop",
  ];
  const sidebarElementRender = () => {
    if (width > 1200) {
      return sidebarElementsBigScreen.map((el) => (
        <SidebarElement key={el} text={el} />
      ));
    } else if (width < 600) {
      const combined = [].concat(
        sideBarElementsMediumScreen,
        sidebarElementsBigScreen
      );
      return (
        <>
          {combined.map((el) => (
            <SidebarElement key={el} text={el} />
          ))}
          <SidebarElement text="Sign In" />
        </>
      );
    } else {
      if (moreActive) {
        return (
          <>
            <SidebarElement
              click={() => setMoreActive((prevState) => !prevState)}
              moreActive={moreActive}
              text="More"
            />
            {sidebarElementsBigScreen.map((el) => (
              <SidebarElement key={el} text={el} />
            ))}
          </>
        );
      } else
        return (
          <>
            {sideBarElementsMediumScreen.map((el) => (
              <SidebarElement key={el} text={el} />
            ))}
            <SidebarElement
              click={() => setMoreActive((prevState) => !prevState)}
              moreActive={moreActive}
              text="More"
            />
          </>
        );
    }
  };

  return (
    <Transition in={active} timeout={200}>
      {(state) => (
        <div
          style={{ ...defaultStyle, ...transitionStyles[state] }}
          className="sidebar"
        >
          {sidebarElementRender()}
          <SidebarElement text="United States" />
        </div>
      )}
    </Transition>
  );
});
