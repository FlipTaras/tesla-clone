import React, { useRef, useLayoutEffect, useEffect } from "react";
import ReactFullpage from "@fullpage/react-fullpage";
import Image from "../static/images/ModelS/Model-S.jpg";

/* Components */
import FullpageButton from "../components/FullpageButton";
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
  useEffect(() => {
    if (silentScrollTo === "safety") {
      window.fullpage_api.silentMoveTo(2);
      setPageIndex("1");
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

  /* Fixing  Sidebarbug */
  if (sideActive) {
    window.fullpage_api.setAutoScrolling(false);
  } else {
    if (window.fullpage_api) {
      window.fullpage_api.setAutoScrolling(true);
    }
  }

  /* Render functionality */
  const renderModelSPage = () => {
    console.log(pagetoShow);
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
                  <SafetySection />
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
  };

  return <>{loaded && renderModelSPage()}</>;
};

export default connect(mapStateToProps, mapActionToProps)(ModelSPage);
