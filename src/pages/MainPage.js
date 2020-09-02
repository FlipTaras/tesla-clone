import React, { useState, useEffect } from "react";

/* Redux */
import { connect } from "react-redux";
import { setWidth, setHeight } from "../static/store/actions";
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

const mapStateToProps = (state) => ({
  width: state.page.width,
  height: state.page.height,
  loaded: state.page.loaded,
});

const mapActionToProps = {
  setWidth,
  setHeight,
};

export default connect(
  mapStateToProps,
  mapActionToProps
)(({ setWidth, setHeight, width, height }) => {
  const [activeFooter, setActiveFooter] = useState(false);
  const [activeComponent, setActiveComponent] = useState(true);
  const [title, setTitle] = useState("Model Y");
  const [subtitle, setSubtitle] = useState(false);

  /* Detect width and height change */
  useEffect(() => {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--height", `${vh}px`);

    window.addEventListener("resize", () => {
      vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--height", `${vh}px`);
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    });
  }, [setWidth, setHeight]);

  /* Fix IOS Scrolling Bug */
  window.addEventListener("touchmove", (e) => {
    window.scrollTo(0, 0);
  });

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
    if (rect7.top < 500 && height > 500) {
      setActiveFooter(true);
    } else if (rect7.top < 300) {
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
        image={width < 600 ? ModelYImageMobile : ModelYImage}
      />
      <SectionElement
        title="Model X"
        image={width < 600 ? ModelXImageMobile : ModelXImage}
      />
      <SectionElement
        title="Model 3"
        image={width < 600 ? Model3ImageMobile : Model3Image}
      />
      <SectionElement
        title="Model S"
        image={width < 600 ? ModelSImageMobile : ModelSImage}
      />
      <SectionElement
        subtitle={"Lowest Cost in America - Money-back guarantee"}
        title="Only $1.49/Watt for Solar on Existing Roofs"
        image={width < 600 ? SolarPanelsImageMobile : SolarPanelsImage}
      />
      <SectionElement
        subtitle={"Solar Roof Costs Less Than a New Roof Plus Solar Panels"}
        title="Solar for New Roofs"
        image={width < 600 ? SolarRoofImageMobile : SolarRoofImage}
      />
      <SectionElement
        title="Accessories"
        image={SolarRoofImage < 600 ? AccessoriesImageMobile : AccessoriesImage}
      />
      <Footer active={activeFooter} />
    </div>
  );
});
