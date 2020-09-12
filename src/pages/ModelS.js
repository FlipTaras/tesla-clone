import React, { useRef, useLayoutEffect, useEffect, useCallback } from "react";
import ReactFullpage from "@fullpage/react-fullpage";
import Image from "../static/images/ModelS/Model-S.jpg";

/* Components */
import FullpageButton from "../components/Buttons/FullpageButton";
import FirstSection from "../components/ModelS/FirstSection";
import SafetySection from "../components/ModelS/SafetySection";

/* Redux */
import {
  setLoaded,
  setPageIndex,
  setSilentScrollTo,
} from "../static/store/actions";
import { connect } from "react-redux";

const mapStateToProps = (state) => ({
  sideActive: state.page.navbarActive,
  loaded: state.page.loaded,
  pagetoShow: state.models.pagetoShow,
  silentScrollTo: state.models.silentScrollTo,
});
const mapActionToProps = {
  setLoaded,
  setPageIndex,
  setSilentScrollTo,
};

const ModelSPage = ({
  setLoaded,
  sideActive,
  loaded,
  pagetoShow,
  setPageIndex,
  silentScrollTo,
  setSilentScrollTo,
}) => {
  const topContainerRef = useRef(null);
  const bottomContainerRef = useRef(null);
  /* After close learn More section functionality */
  useEffect(() => {
    if (silentScrollTo === "safety") {
      window.fullpage_api.silentMoveTo(2);
      setPageIndex("1");
      topContainerRef.current.classList.add("safety__topContainer--show");
      bottomContainerRef.current.classList.add("safety__bottomContainer--show");
    } else if (silentScrollTo === "perfomance") {
      window.fullpage_api.silentMoveTo(3);
      setPageIndex("2");
    }
    return () => setSilentScrollTo(null);
  }, [silentScrollTo, setPageIndex, setSilentScrollTo]);

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
  if (sideActive) {
    window.fullpage_api.setAutoScrolling(false);
  } else {
    if (window.fullpage_api) {
      window.fullpage_api.setAutoScrolling(true);
    }
  }

  /* Render functionality */
  const renderModelSPage = useCallback(() => {
    if (loaded) {
      if (pagetoShow === "safety") {
        return <SafetySection learnMoreOn />;
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
                    <FirstSection title="Model S" image={Image} />
                    <SafetySection
                      topContainerRef={topContainerRef}
                      bottomContainerRef={bottomContainerRef}
                    />
                    <FirstSection image={Image} />
                    <FirstSection image={Image} />
                    <FirstSection image={Image} />
                    <FirstSection image={Image} />
                    <FirstSection image={Image} />
                    <FirstSection image={Image} />
                    <FirstSection image={Image} />
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
  }, [ImageComponent, pagetoShow, loaded]);

  return renderModelSPage();
};

export default connect(mapStateToProps, mapActionToProps)(ModelSPage);
