import React, { useRef, useLayoutEffect } from "react";
import ReactFullpage from "@fullpage/react-fullpage";
import Image from "../static/images/ModelS/Model-S.jpg";

/* Components */
import FullpageButton from "../components/FullpageButton";
import FirstSection from "../components/ModelS/FirstSection";
import SaferySection from "../components/ModelS/SaferySection";

/* Redux */
import { setLoaded } from "../static/store/actions";
import { connect } from "react-redux";

const mapStateToProps = (state) => ({
  sideActive: state.page.navbarActive,
  loaded: state.page.loaded,
});
const mapActionToProps = {
  setLoaded,
};

const ModelSPage = ({ setLoaded, sideActive, loaded }) => {
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

  /* Fixing  Sidebarbug */
  if (sideActive) {
    window.fullpage_api.setAutoScrolling(false);
  } else {
    if (window.fullpage_api) {
      window.fullpage_api.setAutoScrolling(true);
    }
  }

  return (
    <>
      {loaded && <FullpageButton />}
      {ImageComponent}
      <ReactFullpage
        //fullpage options
        licenseKey={process.env.REACT_APP_FULLPAGE}
        scrollingSpeed={400} /* Options here */
        render={({ state, fullpageApi }) => {
          return (
            <ReactFullpage.Wrapper>
              <FirstSection title="Model S" image={Image} />
              <SaferySection />
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
};

export default connect(mapStateToProps, mapActionToProps)(ModelSPage);
