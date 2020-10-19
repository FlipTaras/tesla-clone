import React, { useState, useEffect, useRef } from "react";
import OrderButton from "../Buttons/OrderButton";
import Image from "../../static/images/ModelS/Order/order.jpg";
import Footer from "../App/Footer";
import { connect } from "react-redux";

const mapStateToProps = (state) => ({
  pageIndex: state.models.pageIndex,
});

export default connect(mapStateToProps)(({ pageIndex, phoneLayout }) => {
  const [sectionTop, setSectionTop] = useState(NaN);
  const sectionRef = useRef(null);

  /* Get section offset, used for Animation on small screens  */
  useEffect(() => {
    const getAndShowTop = () => {
      const rectSection = sectionRef.current.getBoundingClientRect();
      setSectionTop(rectSection.top);
    };
    if (sectionRef.current) {
      window.addEventListener("wheel", getAndShowTop);
      window.addEventListener("scroll", getAndShowTop);
      window.addEventListener("touchmove", getAndShowTop);
    }
    return () => {
      window.removeEventListener("wheel", getAndShowTop);
      window.removeEventListener("scroll", getAndShowTop);
      window.removeEventListener("touchmove", getAndShowTop);
    };
  }, []);

  const checkRenderInfo =
    pageIndex === "8" || (phoneLayout && sectionTop <= 700);

  return (
    <section ref={sectionRef} className="section order">
      <div className="order__container">
        <div className="order__left">
          <div className="order__leftInnerContainer">
            <h1 className="title order__title">Order Model S</h1>
            <OrderButton classNames="order__orderButton" />
          </div>
        </div>
        <div className="order__right">
          <img className="order__backgroundImage" src={Image} alt="Model S" />
        </div>
        {checkRenderInfo && <Footer active={checkRenderInfo} />}
      </div>
    </section>
  );
});
