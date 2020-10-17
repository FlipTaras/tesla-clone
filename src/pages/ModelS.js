import React, {
  useRef,
  useLayoutEffect,
  useEffect,
  useCallback,
  useState,
} from "react";
import ReactFullpage from "@fullpage/react-fullpage";
import Image from "../static/images/ModelS/FirstSection/Model-S.jpg";
import ImagePhone from "../static/images/ModelS/FirstSection/model-s@2x.jpg";
import ImageLand from "../static/images/ModelS/FirstSection/640.jpg";
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
  setStopAnimation,
} from "../static/store/actions";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import RangeSection from "../components/ModelS/RangeSection";
import AutopilotSection from "../components/ModelS/AutopilotSection";

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
  setStopAnimation,
};

const ModelSPage = ({
  setLoaded,
  sideActive,
  loaded,
  pagetoShow,
  setPageIndex,
  silentScrollTo,
  setSilentScrollTo,
  setStopAnimation,
  width,
  height,
}) => {
  const [showSection, setShowSection] = useState(false);

  const bottomContainerPerfomanceRef = useRef(null);
  const rightContainerRangeRef = useRef(null);
  const bottomContainerAutopilotRef = useRef(null);

  const [indexPage, setIndex] = useState("0");
  const logoref = useRef(null);

  /* After close learn More section functionality */
  useEffect(() => {
    /* Set logo appear only on big screens */
    const setShow = () => {
      // setShowSection(false);

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
        // if (bottomContainerPerfomanceRef.current) {
        //   bottomContainerPerfomanceRef.current.classList.add(
        //     "perfomance__bottomContainerInner--show"
        //   );
        //   setStopAnimation(true);
        // }
      } else if (silentScrollTo === "range") {
        window.fullpage_api.silentMoveTo(4);
        setPageIndex("3");
        if (rightContainerRangeRef.current) {
          rightContainerRangeRef.current.classList.add(
            "range__rightContainer--show"
          );
        }
      } else if (silentScrollTo === "autopilot") {
        window.fullpage_api.silentMoveTo(5);
        setPageIndex("4");
      } else {
        // setShowSection(false);
        window.addEventListener("wheel", () => {
          if (showSection) {
            setShowSection(false);
          }
          setStopAnimation(false);
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
    setStopAnimation,
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
                      <FirstSection
                        title="Model S"
                        image={Image}
                        imagePhone={ImagePhone}
                        imageLand={ImageLand}
                        phoneLayout={false}
                      />
                      <SafetySection
                        showSection={showSection}
                        phoneLayout={false}
                      />
                      <PerfomanceSection
                        showSection={showSection}
                        phoneLayout={false}
                        // bottomContainerPerfomanceRef={
                        //   bottomContainerPerfomanceRef
                        // }
                      />
                      <RangeSection
                        showSection={showSection}
                        phoneLayout={false}
                        rightContainerRangeRef={rightContainerRangeRef}
                      />
                      <AutopilotSection
                        phoneLayout={false}
                        bottomContainerAutopilotRef={
                          bottomContainerAutopilotRef
                        }
                      />

                      <section
                        style={{
                          textAlign: "center",
                          background: "black",
                          color: "white",
                        }}
                        className="section"
                      >
                        Interior
                      </section>
                      <section
                        style={{ textAlign: "center" }}
                        className="section"
                      >
                        Exterior
                      </section>
                      <section
                        style={{
                          textAlign: "center",
                          background: "black",
                          color: "white",
                        }}
                        className="section"
                      >
                        Specs
                      </section>
                      <section
                        style={{ textAlign: "center" }}
                        className="section"
                      >
                        Order
                      </section>
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
          <FirstSection
            title="Model S"
            image={Image}
            imagePhone={ImagePhone}
            imageLand={ImageLand}
            phoneLayout={true}
          />
          <SafetySection
            // showSection={showSection}
            phoneLayout={true}
          />
          <PerfomanceSection
            // showSection={showSection}
            phoneLayout={true}
            // bottomContainerPerfomanceRef={bottomContainerPerfomanceRef}
          />
          <RangeSection
            showSection={showSection}
            phoneLayout={true}
            rightContainerRangeRef={rightContainerRangeRef}
          />
          <AutopilotSection
            phoneLayout={true}
            bottomContainerAutopilotRef={bottomContainerAutopilotRef}
          />
          <FirstSection
            title="Model S"
            image={Image}
            imagePhone={ImagePhone}
            imageLand={ImageLand}
            phoneLayout={true}
          />
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
