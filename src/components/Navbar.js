import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import TeslaLogo from "../static/images/Teslalogo.svg";
import { Fade as Hamburger } from "hamburger-react";
import Sidebar from "./Sidebar";
import Backdrop from "./Backdrop";

export default () => {
  const navBarProducts = [
    {
      title: "Model S",
      link: "/model-s",
    },
    {
      title: "Model 3",
      link: "/model-3",
    },
    {
      title: "Model X",
      link: "/model-x",
    },
    {
      title: "Model Y",
      link: "/model-y",
    },
    {
      title: "Solar Roof",
      link: "/solar-roof",
    },
    {
      title: "Solar Panels",
      link: "/solar-panels",
    },
  ];
  const [active, setActive] = useState(false);

  return (
    <>
      <Backdrop
        active={active}
        click={() => setActive((prevState) => !prevState)}
      />
      <nav className="navbar">
        <Sidebar active={active} />
        <div className="navbar__left">
          <img className="navbar__logo" src={TeslaLogo} alt="logo" />
        </div>
        <ul className="navbar__list">
          {navBarProducts.map((el) => (
            <li key={el.title} className="navbar__element">
              <NavLink className="navbar__link" to={`/${el.link}`}>
                {el.title}
              </NavLink>
            </li>
          ))}
          <div className="navbar__right">
            <li className="navbar__element">
              <NavLink className="navbar__link" to="/shop">
                Shop
              </NavLink>
            </li>
            <li className="navbar__element">
              <NavLink className="navbar__link" to="/signin">
                sign in
              </NavLink>
            </li>
          </div>
          <div className="navbar__hamburger">
            <Hamburger
              toggled={active}
              toggle={setActive}
              size={20}
              direction="right"
            />
          </div>
        </ul>
      </nav>
    </>
  );
};
