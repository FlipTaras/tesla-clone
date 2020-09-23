import React, { useRef, useLayoutEffect, useEffect, useCallback } from "react";
import ReactFullpage from "@fullpage/react-fullpage";
import Image from "../static/images/ModelS/Model-S.jpg";
import ImagePhone from "../static/images/ModelS/model-s@2x.jpg";
import ImageLand from "../static/images/ModelS/640.jpg";

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
  const topContainerSafetyRef = useRef(null);
  const bottomContainerSafetyRef = useRef(null);
  const bottomContainerPerfomanceRef = useRef(null);

  /* After close learn More section functionality */
  useEffect(() => {
    if (window.fullpage_api) {
      if (silentScrollTo === "safety") {
        window.fullpage_api.silentMoveTo(2);
        setPageIndex("1");
        topContainerSafetyRef.current.classList.add(
          "safety__topContainer--show"
        );
        bottomContainerSafetyRef.current.classList.add(
          "safety__bottomContainer--show"
        );
      } else if (silentScrollTo === "perfomance") {
        window.fullpage_api.silentMoveTo(3);
        setPageIndex("2");
        if (bottomContainerPerfomanceRef.current) {
          bottomContainerPerfomanceRef.current.classList.add(
            "perfomance__bottomContainerInner--show"
          );
          setStopAnimation(true);
        }
      } else if (silentScrollTo === "range") {
        window.fullpage_api.silentMoveTo(4);
        setPageIndex("3");
      } else {
        window.addEventListener("wheel", () => setStopAnimation(false));
      }
    }

    return () => {
      setSilentScrollTo(null);
    };
  }, [silentScrollTo, setPageIndex, setSilentScrollTo, setStopAnimation]);

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

  /* Render functionality */
  const renderModelSPage = useCallback(() => {
    if ((width <= 768 && height <= 1024) || (height <= 768 && width <= 1024)) {
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
            topContainerRef={topContainerSafetyRef}
            bottomContainerRef={bottomContainerSafetyRef}
            phoneLayout={true}
          />
          <PerfomanceSection
            phoneLayout={true}
            bottomContainerPerfomanceRef={bottomContainerPerfomanceRef}
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
    } else {
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
                        topContainerRef={topContainerSafetyRef}
                        bottomContainerRef={bottomContainerSafetyRef}
                        phoneLayout={false}
                      />
                      <PerfomanceSection
                        phoneLayout={false}
                        bottomContainerPerfomanceRef={
                          bottomContainerPerfomanceRef
                        }
                      />
                      <FirstSection phoneLayout={false} image={Image} />
                      <FirstSection phoneLayout={false} image={Image} />
                      <FirstSection phoneLayout={false} image={Image} />
                      <FirstSection phoneLayout={false} image={Image} />
                      <FirstSection phoneLayout={false} image={Image} />
                      <FirstSection phoneLayout={false} image={Image} />
                    </ReactFullpage.Wrapper>
                  );
                }}
              />
            </>
          );
        }
      } else {
        return null;
      }
    }
  }, [ImageComponent, pagetoShow, loaded, width, height]);

  return <>{renderModelSPage()}</>;
};

export default connect(mapStateToProps, mapActionToProps)(ModelSPage);
