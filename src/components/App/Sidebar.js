import React, { useState, useCallback } from "react";
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
  navbarActive: state.page.navbarActive,
});

export default connect(mapStateToProps)(({ navbarActive, width }) => {
  const [moreActive, setMoreActive] = useState(false);
  const sidebarElementsBigScreen = [
    { title: "Used Inventory", link: "/" },
    { title: "trade-in", link: "/" },
    { title: "cybertruck", link: "/" },
    { title: "Roadster", link: "/" },
    { title: "Semi", link: "/" },
    { title: "PowerWall", link: "/" },
    { title: "Comercial Solar", link: "/" },
    { title: "Test Drive", link: "/" },
    { title: "Charging", link: "/" },
    { title: "Find us", link: "/" },
    { title: "Support", link: "/" },
  ];
  const sideBarElementsMediumScreen = [
    { title: "Model S", link: "/model-s" },
    { title: "Model 3", link: "/model-3" },
    { title: "Model X", link: "/model-x" },
    { title: "Model Y", link: "/model-y" },
    { title: "Solar Roof", link: "/solar-roof" },
    { title: "Solar Panels", link: "/solar-panels" },
    { title: "Shop", link: "/shop" },
  ];

  /* Render Functionality */
  const sidebarElementRender = useCallback(() => {
    if (width > 1200) {
      return sidebarElementsBigScreen.map((el) => (
        <SidebarElement key={el.title} text={el.title} link={el.link} />
      ));
    } else if (width < 600) {
      const combined = [].concat(
        sideBarElementsMediumScreen,
        sidebarElementsBigScreen
      );
      return (
        <>
          {combined.map((el) => (
            <SidebarElement key={el.title} text={el.title} link={el.link} />
          ))}
          <SidebarElement text="Sign In" link="/signin" />
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
              link="#"
            />
            {sidebarElementsBigScreen.map((el) => (
              <SidebarElement key={el.title} text={el.title} link={el.link} />
            ))}
          </>
        );
      } else
        return (
          <>
            {sideBarElementsMediumScreen.map((el) => (
              <SidebarElement key={el.title} text={el.title} link={el.link} />
            ))}
            <SidebarElement
              click={() => setMoreActive((prevState) => !prevState)}
              moreActive={moreActive}
              text="More"
              link="#"
            />
          </>
        );
    }
  }, [
    moreActive,
    sideBarElementsMediumScreen,
    sidebarElementsBigScreen,
    width,
  ]);

  return (
    <Transition in={navbarActive} timeout={200}>
      {(state) => (
        <div
          style={{ ...defaultStyle, ...transitionStyles[state] }}
          className="sidebar"
        >
          {sidebarElementRender()}
          <SidebarElement text="United States" link="/changeCountry" />
        </div>
      )}
    </Transition>
  );
});
