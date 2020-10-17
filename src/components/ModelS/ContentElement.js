import React from "react";
import classnames from "classnames";

export default ({ horizontal, children, customContentElementClassNames }) => {
  const contentElementClassNames = classnames(
    "contentElement",
    horizontal && "contentElement--horizontal",
    customContentElementClassNames && customContentElementClassNames
  );

  return <div className={contentElementClassNames}>{children}</div>;
};
