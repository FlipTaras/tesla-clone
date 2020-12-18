import React, {
  useRef,
  useLayoutEffect,
  useEffect,
  useCallback,
  useState,
} from "react";
import ReactFullpage from "@fullpage/react-fullpage";
import Image from "../static/images/ModelS/FirstSection/Model-S.jpg";
import TeslaLogo from "../static/images/Teslalogo.svg";
import TeslaLogoWhite from "../static/images/TeslalogoWhite.svg";

/* Components */
import FullpageButton from "../components/Buttons/FullpageButton";
import FirstSection from "../components/ModelS/FirstSection";
import SafetySection from "../components/ModelS/SafetySection";
import PerfomanceSection from "../components/ModelS/PerfomanceSection";

/* Redux */
import {
  setLoaded,
  setPageIndex,
  setSilentScrollTo,
  setChargers,
} from "../static/store/actions";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import RangeSection from "../components/ModelS/RangeSection";
import AutopilotSection from "../components/ModelS/AutopilotSection";
import InteriorSection from "../components/ModelS/InteriorSection";
import ExtreriorSection from "../components/ModelS/ExtreriorSection";
import SpecsSection from "../components/ModelS/SpecsSection";
import OrderSection from "../components/ModelS/OrderSection";

const mapStateToProps = (state) => ({
  sideActive: state.page.navbarActive,
  loaded: state.page.loaded,
  pagetoShow: state.models.pagetoShow,
  silentScrollTo: state.models.silentScrollTo,
  width: state.page.width,
  height: state.page.height,
});

const mapActionToProps = {
  setLoaded,
  setPageIndex,
  setSilentScrollTo,
  setChargers,
};

const ModelSPage = ({
  setLoaded,
  sideActive,
  loaded,
  pagetoShow,
  setPageIndex,
  silentScrollTo,
  setSilentScrollTo,
  width,
  height,
  setChargers,
}) => {
  const [showSection, setShowSection] = useState(false);
  const [indexPage, setIndex] = useState("0");
  const logoref = useRef(null);

  /* Axios call to set Chargers for Range Section */
  useEffect(() => {
    setChargers();
  }, [setChargers]);

  /* After close learn More section functionality */
  useEffect(() => {
    /* Set logo appear only on big screens */
    const setShow = () => {
      const index = document
        .querySelector("body")
        .classList.value.split(" ")[0]
        .split("-")[2];
      if (index) {
        if (width > 1024) {
          setTimeout(() => {
            setIndex(index);
          }, 450);
          setTimeout(() => {
            if (index === "0") {
              logoref.current.classList.remove("show");
            } else {
              logoref.current.classList.add("show");
            }
          }, 450);
        }
      }
    };

    if (width > 1024) {
      window.addEventListener("wheel", setShow);
      window.addEventListener("touchmove", setShow);
      window.addEventListener("click", setShow);
    }

    /* Learn More Close Next functionality handler */
    if (window.fullpage_api) {
      if (silentScrollTo === "safety") {
        window.fullpage_api.silentMoveTo(2);
        setPageIndex("1");
        setShowSection(true);
      } else if (silentScrollTo === "perfomance") {
        window.fullpage_api.silentMoveTo(3);
        setPageIndex("2");
        setShowSection(true);
      } else if (silentScrollTo === "range") {
        window.fullpage_api.silentMoveTo(4);
        setPageIndex("3");
        setShowSection(true);
      } else if (silentScrollTo === "autopilot") {
        window.fullpage_api.silentMoveTo(5);
        setPageIndex("4");
        setShowSection(true);
      } else if (silentScrollTo === "interior") {
        window.fullpage_api.silentMoveTo(6);
        setPageIndex("5");
        setShowSection(true);
      } else if (silentScrollTo === "exterior") {
        window.fullpage_api.silentMoveTo(7);
        setPageIndex("6");
        setShowSection(true);
      } else if (silentScrollTo === "specs") {
        window.fullpage_api.silentMoveTo(8);
        setPageIndex("7");
        setShowSection(true);
      } else if (silentScrollTo === "order") {
        window.fullpage_api.silentMoveTo(9);
        setPageIndex("8");
        setShowSection(true);
      } else {
        window.addEventListener("wheel", () => {
          if (showSection) {
            setShowSection(false);
          }
          /* Small fix when resize while learn more section is open */
          document.querySelector("body").style.overflow = "";
          document.querySelector("html").style.overflow = "";
        });
      }
    }

    return () => {
      setSilentScrollTo(null);
      window.removeEventListener("wheel", setShow);
      window.removeEventListener("touchmove", setShow);
      window.removeEventListener("click", setShow);
    };
  }, [
    silentScrollTo,
    setPageIndex,
    setSilentScrollTo,
    loaded,
    showSection,
    height,
    width,
  ]);

  /* Wait till page load, to load content */
  const imageRef = useRef(null);
  const ImageComponent = (
    <img style={{ display: "none" }} ref={imageRef} src={Image} alt="" />
  );

  useLayoutEffect(() => {
    if (imageRef.current && imageRef.current.addEventListener) {
      imageRef.current.addEventListener("load", () => {
        setLoaded(true);
      });
    } else if (imageRef.current && imageRef.current.attachEvent) {
      imageRef.current.attachEvent("onload", () => setLoaded(true));
    } else {
      window.addEventListener("load", () => setLoaded(true));
    }
    return () => setLoaded(false);
  }, [setLoaded]);

  /* Fixing  Sidebar bug */
  if (window.fullpage_api) {
    if (sideActive) {
      window.fullpage_api.setAutoScrolling(false);
    } else {
      if (window.fullpage_api) {
        window.fullpage_api.setAutoScrolling(true);
      }
    }
  }
  const checkIpad = width >= 1024 && height >= 1366;

  /* Render functionality */
  const renderModelSPage = useCallback(() => {
    if (checkIpad || width > 1025) {
      if (loaded) {
        if (pagetoShow === "safety") {
          return <SafetySection learnMoreOn />;
        } else if (pagetoShow === "perfomance") {
          return <PerfomanceSection learnMoreOn />;
        } else if (pagetoShow === "range") {
          return <RangeSection learnMoreOn />;
        } else if (pagetoShow === "autopilot") {
          return <AutopilotSection learnMoreOn />;
        } else if (pagetoShow === "interior") {
          return <InteriorSection learnMoreOn />;
        } else if (pagetoShow === "exterior") {
          return <ExtreriorSection learnMoreOn />;
        } else {
          return (
            <>
              {ImageComponent}
              <FullpageButton />
              <ReactFullpage
                //fullpage options
                licenseKey={process.env.REACT_APP_FULLPAGE}
                scrollingSpeed={400} /* Options here */
                render={({ state, fullpageApi }) => {
                  return (
                    <ReactFullpage.Wrapper>
                      <FirstSection title="Model S" phoneLayout={false} />
                      <SafetySection
                        showSection={showSection}
                        phoneLayout={false}
                      />
                      <PerfomanceSection
                        showSection={showSection}
                        phoneLayout={false}
                      />
                      <RangeSection
                        showSection={showSection}
                        phoneLayout={false}
                      />
                      <AutopilotSection
                        showSection={showSection}
                        phoneLayout={false}
                      />
                      <InteriorSection
                        showSection={showSection}
                        phoneLayout={false}
                      />
                      <ExtreriorSection
                        showSection={showSection}
                        phoneLayout={false}
                      />
                      <SpecsSection
                        showSection={showSection}
                        phoneLayout={false}
                      />
                      <OrderSection
                        showSection={showSection}
                        phoneLayout={false}
                      />
                    </ReactFullpage.Wrapper>
                  );
                }}
              />
            </>
          );
        }
      }
    } else {
      return (
        <>
          {ImageComponent}
          <FirstSection title="Model S" phoneLayout={true} />
          <SafetySection phoneLayout={true} />
          <PerfomanceSection phoneLayout={true} />
          <RangeSection phoneLayout={true} />
          <AutopilotSection phoneLayout={true} />
          <InteriorSection phoneLayout={true} />
          <ExtreriorSection phoneLayout={true} />
          <SpecsSection phoneLayout={true} />
          <OrderSection phoneLayout={true} />
        </>
      );
    }
  }, [ImageComponent, pagetoShow, loaded, width, checkIpad, showSection]);

  const renderLogoElement = useCallback(() => {
    return (
      <NavLink to="/">
        <img
          ref={logoref}
          className="modelS__logo"
          src={
            indexPage === "5"
              ? TeslaLogoWhite
              : indexPage === "7"
              ? TeslaLogoWhite
              : TeslaLogo
          }
          alt="logo"
        />
      </NavLink>
    );
  }, [indexPage]);
  return (
    <>
      {renderLogoElement()}
      {ImageComponent}
      {renderModelSPage()}
    </>
  );
};

export default connect(mapStateToProps, mapActionToProps)(ModelSPage);
