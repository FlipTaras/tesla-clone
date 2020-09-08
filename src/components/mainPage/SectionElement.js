import React from "react";

export default ({ image, title, subtitle = null }) => {
  return (
    <section
      data-title={title}
      data-subtitle={subtitle}
      className="mainPage__item"
      style={{ background: `url(${image})` }}
    ></section>
  );
};
