import React, { useState, useRef, useLayoutEffect, useEffect } from "react";

/* Redux */
import { connect } from "react-redux";
import { setLoaded } from "../static/store/actions";

/* Components */
import SectionElement from "../components/mainPage/SectionElement";
import Footer from "../components/App/Footer";
import OrderComponent from "../components/mainPage/OrderComponent";

/* Images */
import ModelYImage from "../static/images/MainPage/Desktop-ModelY.jpg";
import ModelXImage from "../static/images/MainPage/Desktop-ModelX.jpg";
import Model3Image from "../static/images/MainPage/Desktop-Model3.jpg";
import ModelSImage from "../static/images/MainPage/Desktop-ModelS.jpg";
import SolarRoofImage from "../static/images/MainPage/Desktop-SolarRoof.jpg";
import SolarPanelsImage from "../static/images/MainPage/Desktop-SolarPanels.jpg";
import AccessoriesImage from "../static/images/MainPage/Desktop-Accessories.jpg";
import Image from "../static/images/ModelS/FirstSection/Model-S.jpg";

import ModelYImageMobile from "../static/images/MainPage/Mobile-ModelY.jpg";
import ModelXImageMobile from "../static/images/MainPage/Mobile-ModelX.jpg";
import Model3ImageMobile from "../static/images/MainPage/Mobile-Model3.jpg";
import ModelSImageMobile from "../static/images/MainPage/Mobile-ModelS.jpg";
import SolarRoofImageMobile from "../static/images/MainPage/Mobile-SolarRoof.jpg";
import SolarPanelsImageMobile from "../static/images/MainPage/Mobile-SolarPanels.jpg";
import AccessoriesImageMobile from "../static/images/MainPage/Mobile-Accessories.jpg";
import Navbar from "../components/App/Navbar";

const mapStateToProps = (state) => ({
  width: state.page.width,
  height: state.page.height,
  loaded: state.page.loaded,
});

const mapActionToProps = {
  setLoaded,
};

export default connect(
  mapStateToProps,
  mapActionToProps
)(({ width, height, setLoaded, loaded }) => {
  const [activeFooter, setActiveFooter] = useState(false);
  const [activeComponent, setActiveComponent] = useState(true);
  const [title, setTitle] = useState("Model Y");
  const [subtitle, setSubtitle] = useState(false);

  /* Wait till page load, to load content */
  const imageRef = useRef(null);
  const ImageComponent = (
    <img style={{ display: "none" }} ref={imageRef} src={Image} alt="" />
  );
  useLayoutEffect(() => {
    if (imageRef.current.addEventListener) {
      imageRef.current.addEventListener("load", () => {
        setLoaded(true);
      });
    } else if (imageRef.current.attachEvent) {
      imageRef.current.attachEvent("onload", () => setLoaded(true));
    } else {
      window.addEventListener("load", () => setLoaded(true));
    }
    return () => setLoaded(false);
  }, [setLoaded]);

  /* Fix IOS Scrolling Bug */
  useEffect(() => {
    const scrollFix = () => {
      window.scrollTo(0, 0);
    };
    window.addEventListener("touchend", scrollFix);
    return () => window.removeEventListener("touchend", scrollFix);
  }, []);

  const onScroll = (e) => {
    /* OrderComponent */
    const array = Array.prototype.slice.call(e.target.childNodes);
    array.forEach((child) => {
      const rect = child.getBoundingClientRect();
      const title = child.getAttribute("data-title");
      const subtitle = child.getAttribute("data-subtitle");
      if (rect.top >= -100 && rect.top <= 10) {
        setTitle(title);
        setActiveComponent(true);
        setSubtitle(subtitle);
        return;
      } else if (rect.top <= -100) {
        setActiveComponent(false);
      }
    });
    /* Footer */
    const rectLast = e.target.childNodes[8].getBoundingClientRect();
    if (rectLast.top < 400 && height > 400) {
      setActiveFooter(true);
    } else if (rectLast.top < 300) {
      setActiveFooter(true);
    } else {
      setActiveFooter(false);
    }
  };

  return (
    <>
      <Navbar />
      {ImageComponent}
      <div onScroll={onScroll} className="mainPage">
        <Footer active={activeFooter} />
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
          image={
            SolarRoofImage < 600 ? AccessoriesImageMobile : AccessoriesImage
          }
        />
      </div>
    </>
  );
});
