import React, {
  useRef,
  useLayoutEffect,
  useEffect,
  useCallback,
  useState,
} from "react";
import ReactFullpage from "@fullpage/react-fullpage";
import Image from "../static/images/ModelS/Model-S.jpg";

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
  const topContainerSafetyRef = useRef(null);
  const bottomContainerSafetyRef = useRef(null);
  const [stopPerfomanceAnimation, setStopPerfomanceAnimation] = useState(false);
  const bottomContainerPerfomanceRef = useRef(null);

  /* After close learn More section functionality */
  useEffect(() => {
    if (silentScrollTo === "safety") {
      window.fullpage_api.silentMoveTo(2);
      setPageIndex("1");
      topContainerSafetyRef.current.classList.add("safety__topContainer--show");
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
        setStopPerfomanceAnimation(true);
      }
    } else if (silentScrollTo === "range") {
      window.fullpage_api.silentMoveTo(4);
      setPageIndex("3");
    } else {
      window.addEventListener("wheel", () => {
        setStopPerfomanceAnimation(false);
      });
    }

    return () => {
      setSilentScrollTo(null);
    };
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
                    <FirstSection title="Model S" image={Image} />
                    <SafetySection
                      topContainerRef={topContainerSafetyRef}
                      bottomContainerRef={bottomContainerSafetyRef}
                    />
                    <PerfomanceSection
                      stopPerfomanceAnimation={stopPerfomanceAnimation}
                      bottomContainerPerfomanceRef={
                        bottomContainerPerfomanceRef
                      }
                    />
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
  }, [ImageComponent, pagetoShow, loaded, stopPerfomanceAnimation]);

  return renderModelSPage();
};

export default connect(mapStateToProps, mapActionToProps)(ModelSPage);
