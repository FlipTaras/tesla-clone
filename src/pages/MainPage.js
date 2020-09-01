import React, { useState, useEffect } from "react";

/* Components */
import SectionElement from "../components/SectionElement";
import Footer from "../components/Footer";
import OrderComponent from "../components/OrderComponent";

/* Images */
import ModelYImage from "../static/images/Desktop-ModelY.jpg";
import ModelXImage from "../static/images/Desktop-ModelX.jpg";
import Model3Image from "../static/images/Desktop-Model3.jpg";
import ModelSImage from "../static/images/Desktop-ModelS.jpg";
import SolarRoofImage from "../static/images/Desktop-SolarRoof.jpg";
import SolarPanelsImage from "../static/images/Desktop-SolarPanels.jpg";
import AccessoriesImage from "../static/images/Desktop-Accessories.jpg";

import ModelYImageMobile from "../static/images/Mobile-ModelY.jpg";
import ModelXImageMobile from "../static/images/Mobile-ModelX.jpg";
import Model3ImageMobile from "../static/images/Mobile-Model3.jpg";
import ModelSImageMobile from "../static/images/Mobile-ModelS.jpg";
import SolarRoofImageMobile from "../static/images/Mobile-SolarRoof.jpg";
import SolarPanelsImageMobile from "../static/images/Mobile-SolarPanels.jpg";
import AccessoriesImageMobile from "../static/images/Mobile-Accessories.jpg";

export default () => {
  const [activeFooter, setActiveFooter] = useState(false);
  const [activeComponent, setActiveComponent] = useState(true);
  const [title, setTitle] = useState("Model Y");
  const [subtitle, setSubtitle] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [windowHeight, setWindowHight] = useState(window.innerHeihg);

  /* Detect width change */
  useEffect(() => {
    window.addEventListener("resize", () => {
      let vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
      setWindowWidth(window.innerWidth);
      setWindowHight(window.innerHeight);
    });
  }, [windowWidth, windowHeight]);
  console.log(windowWidth, windowHeight);

  const onScroll = (e) => {
    /* OrderComponent */
    const array = Array.prototype.slice.call(e.target.childNodes);
    array.forEach((child) => {
      const rect = child.getBoundingClientRect();
      const title = child.getAttribute("data-title");
      const subtitle = child.getAttribute("data-subtitle");
      if (rect.top >= -100 && rect.top <= 100) {
        setTitle(title);
        setActiveComponent(true);
        setSubtitle(subtitle);
        return;
      } else if (rect.top <= -100) {
        setActiveComponent(false);
      }
    });
    /* Footer */
    const rect7 = e.target.childNodes[7].getBoundingClientRect();
    console.log(rect7.top);
    if (rect7.top < 500) {
      setActiveFooter(true);
    } else {
      setActiveFooter(false);
    }
  };

  return (
    <div onScroll={onScroll} className="sections">
      <OrderComponent
        subtitle={subtitle}
        active={activeComponent}
        title={title}
      />
      <SectionElement
        title="Model Y"
        image={windowWidth < 600 ? ModelYImageMobile : ModelYImage}
      />
      <SectionElement
        title="Model X"
        image={windowWidth < 600 ? ModelXImageMobile : ModelXImage}
      />
      <SectionElement
        title="Model 3"
        image={windowWidth < 600 ? Model3ImageMobile : Model3Image}
      />
      <SectionElement
        title="Model S"
        image={windowWidth < 600 ? ModelSImageMobile : ModelSImage}
      />
      <SectionElement
        subtitle={"Lowest Cost in America - Money-back guarantee"}
        title="Only $1.49/Watt for Solar on Existing Roofs"
        image={windowWidth < 600 ? SolarPanelsImageMobile : SolarPanelsImage}
      />
      <SectionElement
        subtitle={"Solar Roof Costs Less Than a New Roof Plus Solar Panels"}
        title="Solar for New Roofs"
        image={windowWidth < 600 ? SolarRoofImageMobile : SolarRoofImage}
      />
      <SectionElement
        title="Accessories"
        image={SolarRoofImage < 600 ? AccessoriesImageMobile : AccessoriesImage}
      />
      <Footer active={activeFooter} />
    </div>
  );
};

/* OrderComponent */
// const rect1 = e.target.childNodes[1].getBoundingClientRect();
// const rect2 = e.target.childNodes[2].getBoundingClientRect();
// const rect3 = e.target.childNodes[3].getBoundingClientRect();
// const rect4 = e.target.childNodes[4].getBoundingClientRect();
// const rect5 = e.target.childNodes[5].getBoundingClientRect();
// if (rect1.top >= -100 && rect1.top <= 100) {
//   setTitle("Model Y");
//   setActiveComponent(true);
//   setSubtitle(null);
// } else if (rect2.top >= -100 && rect2.top <= 100) {
//   setTitle("Model X");
//   setActiveComponent(true);
//   setSubtitle(null);
// } else if (rect3.top >= -100 && rect3.top <= 100) {
//   setTitle("Model 3");
//   setActiveComponent(true);
//   setSubtitle(null);
// } else if (rect4.top >= -100 && rect4.top <= 100) {
//   setTitle("Model S");
//   setActiveComponent(true);
//   setSubtitle(null);
// } else if (rect5.top >= -100 && rect5.top <= 100) {
//   setTitle("Only $1.49/Watt for Solar on Existing Roofs");
//   setSubtitle("Lowest Cost in America - Money-back guarantee");
//   setActiveComponent(true);
// } else if (rect6.top >= -100 && rect6.top <= 100) {
//   setActiveComponent(true);
//   setTitle("Accessories");
//   setSubtitle(null);
// } else {
//   setActiveComponent(false);
// }
