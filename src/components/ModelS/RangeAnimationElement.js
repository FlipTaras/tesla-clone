import React, { useCallback, useRef, useEffect, useState } from "react";
import { connect } from "react-redux";
import TWEEN from "@tweenjs/tween.js";
import { setRangeActiveButton } from "../../static/store/actions";

import Image1 from "../../static/images/ModelS/Range/learnMoreSlider1.jpg";
import Image2 from "../../static/images/ModelS/Range/learnMoreSlider2.jpg";
// import Image3 from "../../static/images/ModelS/Range/learnMoreSlider3.jpg";
// import Image4 from "../../static/images/ModelS/Range/learnMoreSlider4.jpg";
// import Image5 from "../../static/images/ModelS/Range/learnMoreSlider5.jpg";

const mapStateToProps = (state) => ({
  rangeButtonActive: state.models.rangeButtonActive,
});

const mapActionToProps = {
  setRangeActiveButton,
};

function Icon({ page, rangeButtonActive, learnMoreOn, setRangeActiveButton }) {
  const [delay, setDelay] = useState(3000);

  const textContainerRef = useRef(null);
  const textRef = useRef(null);
  const lineRef = useRef(null);
  const animationElementRef = useRef(null);

  useEffect(() => {
    if (learnMoreOn) {
      function animate(time) {
        requestAnimationFrame(animate);
        TWEEN.update(time);
      }
      requestAnimationFrame(animate);
    }

    if (lineRef.current) {
      const u = { value: 0 };
      const totalLength = lineRef.current.getTotalLength();
      const coordInitial = lineRef.current.getPointAtLength(0);
      textContainerRef.current.style.transform = `translate(${coordInitial.x}px, ${coordInitial.y}px)`;

      // setTimeout(() => {
      new TWEEN.Tween(u)
        .to({ value: 100 }, 3000)
        .delay(delay)
        .easing(TWEEN.Easing.Quadratic.Out)
        .onStart(() => {
          //   animationElementRef.current.classList.remove(
          //     "range__animationElement--finished"
          //   );
          //   animationElementRef.current.classList.add(
          //     "range__animationElement--active"
          //   );
        })
        .onUpdate(() => {
          const coord = lineRef.current.getPointAtLength(
            (u.value / 100) * totalLength
          );
          lineRef.current.style.strokeDashoffset =
            totalLength - (totalLength * u.value) / 100;
          textContainerRef.current.style.transform = `translate(${coord.x}px, ${coord.y}px)`;
          textRef.current.textContent = `${Math.floor(
            (textRef.current.dataset.miles * u.value) / 100
          )} Miles`;
        })
        .onComplete(() => {
          animationElementRef.current.classList.add(
            "range__animationElement--finished"
          );
          setTimeout(() => {
            setDelay(2000);

            if (rangeButtonActive === 2) {
              setRangeActiveButton(1);
            } else {
              setRangeActiveButton(rangeButtonActive + 1);
            }
          }, 1000);
          setTimeout(() => {
            /* Reset */
            u.value = 0;
            const coord = lineRef.current.getPointAtLength(
              (u.value / 100) * totalLength
            );
            // lineRef.current.style.strokeDasharray = totalLength;
            lineRef.current.style.strokeDashoffset =
              lineRef.current.style.strokeDasharray;
            textContainerRef.current.style.transform = `translate(${coord.x}px, ${coord.y}px)`;
            textRef.current.textContent = `${Math.floor(
              (textRef.current.dataset.miles * u.value) / 100
            )} Miles`;
          }, 1001);
          setTimeout(() => {
            animationElementRef.current.classList.remove(
              "range__animationElement--finished"
            );
            animationElementRef.current.classList.add(
              "range__animationElement--active"
            );
          }, 1500);
        })
        .start();
      // }, 2000);
    }
  }, [learnMoreOn, rangeButtonActive, setRangeActiveButton, delay]);

  const renderSvg = useCallback(() => {
    if (rangeButtonActive === 1 && page === "Range") {
      return (
        <div className="range__containerAnimation">
          <img className="range__image" alt="map" src={Image1} />
          <svg
            className="range__svg"
            xmlns="http://www.w3.org/2000/svg"
            x="0"
            y="0"
            opacity="1"
            viewBox="0 0 1225 562"
          >
            <path
              className="range__line"
              ref={lineRef}
              fill="none"
              stroke="#000"
              strokeDasharray="530.603"
              strokeDashoffset="530.603"
              // strokeDashoffset="0"
              d="M297.5 120.5c1.02 0 1.57.137 2 .716.421.568 1.572-.064 2.425.295.735.31 1 .989 1.928.989.931 0 1.08.423 1.683 1 .655.627.977.824 1.464 1.5.513.712.937 1.242 1.667 1.667.671.39 1.606.772 1.829 1.48.277.885.6 1.26 1.004 1.778.394.506 1.294.288 2.053.632.763.346 1.504.787 1.947 1.296.464.533.713.94 1.057 1.7.346.763.864 1.479 1.518 1.936.703.493.997 1.235 1.592 1.844.597.611 1.258.67 1.833 1.224.613.59 1 1.028 1 1.922 0 .9.855.976 1 1.668.175.835.014 1.775.575 2.342.428.434.884.775 1.709 1.012.77.221 1.203.768 1.716 1.22.602.532 1.007 1.158 1.833 1.612.666.367 1.048.8 1.592 1.167.75.505 1.126 1.042 1.632 1.647.574.686 1.686.311 2.368.778.775.53 1.651.266 2.49.575.722.266 1.384.84 2.252 1 .787.144 1.054 1 2 1 .833 0 1.778-.213 2.549 0 .797.22 1.45 1 2.341 1 .886 0 1.473-.15 1.943-.716.452-.544.83-1.007 1.425-1.284.841-.391 1.439-.612 1.928-1 .554-.44 1.17-.83 1.648-1.284.581-.552.756-1.245 1.283-1.716.56-.499 1.073-.36 1.716-1.01.636-.644.716-.99 1.647-.99h2.706c.868 0 1.243-.371 1.931-.915.696-.55 1.312-.357 1.937-.964.574-.555 1.296-.612 1.779-1.288.497-.695.613-1.345 1.353-1.838.665-.442.55-1.492 1-2 .529-.598 1.083-.994 1.626-1.495.531-.49.842-.034 1.305.501.524.606 1.09.976 1.716 1.499.597.5.528 1.379 1.057 2.147.484.702 1.006.914 1.518 1.353.498.427 1.004.826 1.425 1.353.428.534.513.998 1.036 1.647.547.678 1.26.427 1.964 1.01.646.536.451 1.214 1.005 1.933.523.68 1.085.987 1.57 1.632.534.71 1.037 1.289 1.425 1.778.44.554.747 1.11 1.001 1.931.238.765.908 1.073.999 1.937.084.792.747 1.094 1 2 .216.774.648 1.175 1.167 1.779.52.607.563 1.337 1.117 1.915.54.562 1.075.472 1.705 1.121.632.65.75 1.355 1.011 2.248.263.9.533 1.437 1 2 .479.577.742 1.153 1.167 1.883.39.671.833 1.408 1.333 1.833.5.425 1.106.775 1.464 1.425.448.813.575 1.3.979 1.928.505.784.582 1.475 1.058 1.931.586.56 1.031 1.246 1.499 1.737.55.578 1.15 1.14 1.5 2.015.326.817.706 1.475 1 2.248.32.84.473 1.568 1.036 2.29.456.586.784 1.022.985 1.947.178.823.56 1.69 1.146 2.312.588.626.898 1.056 1.408 1.742.493.663.898.931 1.424 1.51.615.677.936.913 1.001 1.631.084.93.87 1.238 1.5 1.784.712.618 1.225 1.207 1.853 1.853.645.663 1.148 1.1 1.646 1.732.566.719.61 1.472 1.001 2.268.312.634.864.952 1.353 1.594.505.665.778 1.542 1.563 1.968.719.39 1.126.967 1.584 1.585.554.748 1.024 1.33 1.501 1.784.581.552.803 1.091 1 1.937.18.783.914 1.124 1.424 1.754.5.616 1.111 1.23 1.453 2.125.317.826.608 1.563 1.097 2.29.45.668.916 1.325 1.45 2.035.52.69 1.174 1.246 1.575 2 .316.596.6 1.106 1.167 1.575.642.533 1.258.503 1.833 1.057.613.59.667 1.235 1.284 1.858.534.539 1.173.722 1.716 1.252.573.558 1.167 1 1.716 1.549.637.637.927 1.531 1.505 2.162.561.613 1.284.742 1.779 1.343.506.615.798 1.082 1 1.946.182.779.883 1.062 1 1.918.112.816.971 1.266 1 2.136.031.945 0 1.8 0 2.694 0 .918.554 1.154 1 1.66.487.553 1.09.96 1.575 1.461.557.576 1.198.848 1.425 1.464.32.868-.032 1.785 0 2.721.029.838.647 1.426 1.284 2.063.68.68.845 1.274 1.432 1.716.525.396 1.163.528 1.931 1.057.702.484.694 1.236 1.353 1.776.569.466 1 .814 1 1.742 0 .85.353 1.425 1.284 1.425.883 0 1.302.549 1.937 1 .68.482 1.37.709 2.136 1.353.697.585 1.325 1.03 1.927 1.562.584.515 1.153.827 1.883 1.252.815.474 1.408.833 1.833 1.333.425.5.747.872 1.167 1.667.363.687.85 1.438 1.48 1.828.756.468.742 1.352 1.374 1.984.632.632 1.093.556 1.626 1.021.509.443.933.836 1.637 1.284.811.516.966 1.132 1.716 1.695.703.527 1.007.72 1.647 1.021.714.335 1.443.696 2.268 1 .722.266 1.37.966 2.306 1 .78.029 1.288.447 1.779 1.085.56.729-.433 1.914 0 2.631.378.626 1.146.875 1.647 1.341.655.609.498 1.468 1 2 .585.62-.036 1.676.353 2.518.275.596.872.86 1 1.709.112.741 1 .883 1 1.769 0 .911-.018 1.78 0 2.651.018.86.855 1.25 1 1.943.175.835-.152 1.79 0 2.706.112.674.502.994 1.02 1.647.552.693.98 1.057.98 1.943 0 .89.326 1.354.879 2.057.449.57.121 1.575.121 2.5s-.032 1.785 0 2.721c.029.838.67 1.378 1.425 1.779.596.316.859.99 1.742 1 .854.01 1.446.512 2.186 1.004.665.443.931 1.28 1.59 1.939.557.557 1.551.725 2.057 1.278.537.588.948.884 1.575 1.354.71.531 1.837.27 2.389.85.453.477 1.531.26 1.979.928.485.722.646 1.325 1.057 1.931.452.666.711 1.437 1.353 2.069.663.652 1.736.226 2.363.732.703.567.804 1.089 1.284 1.894.424.71.804 1.396 1 2.242.181.783.6 1.31 1.167 1.779.67.555 1.486.634 2.258 1 .58.274.812.83 1.742 1 .787.144 1.261.448 1.833 1.057.606.646.566 1.076 1 1.659.383.514.894 1.015 1.647 1.28.805.282 1.225.65 1.778 1.004.697.445 1.143 1 1.575 1.647.374.561 1.613.232 2 .706.447.547 1.167.814 1.716 1.363.637.637 1.232 1.39 1.859 1.859.71.531 1.06.958 1.646 1.425.611.486 1.286.448 1.779 1.085.56.724.748.95 1 1.631.287.776.711 1.64 1.284 2.199.543.53 1.008.751 1.63 1.369.54.535.681 1.252 1.307 1.716.63.466.996.918 1.946 1 .82.07.883.709 1.666 1 .781.29.877 1.295 1.224 2.057.346.76.748 1.45 1.164 2.164.469.803.786 1.57 1.612 1.779.791.2 1.31.553 1.883 1 .557.435 1.057.884 1.284 1.5.32.868 0 1.784 0 2.721 0 .864-.43 2 .167 2.612.596.612.833 1.082.833 1.883 0 .931.773 1.168 1 1.784.32.868-.13 1.887.425 2.464.482.5.149 1.504.742 2.036.622.558.39 1.213 1 1.833.597.608 1.303.529 1.833 1.203.56.713.916.95 1 1.68.098.853 0 1.784 0 2.71 0 .858-.229 1.963.353 2.517.51.486 1.111.842 1.648 1.341.587.545.868 1.103 1.424 1.68.482.5 1.118.627 1.575 1.203.554.697-.03 1.798 0 2.666.029.816.58 1.29 1 1.883.38.537 1.144.808 1.647 1.341.586.62 1.091 1.327 1.353 2.164.258.825.084 1.687.575 2.354.525.714.219 1.791.778 2.368.51.525.946 1.117 1.363 1.773.448.704.897 1.084 1.284 1.637.477.68.916 1.466 1 2.222.102.92.664 1.257.98 1.925.394.837.595 1.49 1.02 2 .425.51.738 1.037 1 1.925.19.647.84.873 1 1.742.144.787 1 1.054 1 1.89 0 .922.4 1.348 1 1.954.59.596.381 1.269 1 1.932.57.61 1.057.624 1.575 1.057.514.43 1.237.914 1.425 1.5.283.881.626 1.445 1 1.925.414.532.547 1.074 1.167 1.575.676.547 1.419.175 1.918.716.627.678.915 1.117.915 1.931 0 .928-.07 1.91.353 2.357.548.582.487 1.675 1.222 1.985.784.33 1.17.4 1.426 1.295.221.77.733 1.147 1.22 1.716.523.61 1.247.574 1.779 1.167.558.622.68.912 1 1.748.275.719.981 1.37 1 2.252.018.834.829 1.063 1 1.89.172.833.596 1.314 1.284 1.858.696.55 1.39.653 2.141 1.049.76.4 1.126.531 1.742 1.036.653.535 1.446.512 2.186 1.004.665.443 1.045.948 1.626 1.496.488.46 1.071.957 1.9 1.378.693.354 1.34.66 2.178 1.122.745.41 1.283.599 1.821 1.221.624.721.074 1.801.122 2.695.043.803.971 1.087 1 1.962.027.837 0 1.697.5 2.122.5.425 1.056.894 1.48 1.5.48.69.963 1.443 1.52 2l.501.784.424.68.575.32"
            ></path>
            <g ref={textContainerRef} className="tooltip range__text">
              <circle cy="0.8" r="4.4" fill="#231F20"></circle>
              <g fill="#EC1C24">
                <path d="M-38.2 5.5H38.099999999999994V27.6H-38.2z"></path>
                <path
                  d="M-4.4 1.7H4.5V10.6H-4.4z"
                  transform="rotate(-45.001 0 6.161)"
                ></path>
              </g>
              <text
                ref={textRef}
                data-miles={315}
                fill="#fff"
                fontFamily="Gotham Bold"
                fontSize="13"
                textAnchor="middle"
                transform="translate(0 21.252)"
              >
                0 Miles
              </text>
            </g>
          </svg>
        </div>
      );
    } else if (rangeButtonActive === 2 && page === "Range") {
      return (
        <div className="range__containerAnimation">
          <img alt="map" className="range__image" src={Image2} />
          <svg
            className="range__svg"
            xmlns="http://www.w3.org/2000/svg"
            x="0"
            y="0"
            opacity="1"
            viewBox="0 0 1225 562"
          >
            <path
              className="range__line"
              ref={lineRef}
              fill="none"
              stroke="#000"
              //   data-strokeDashoffset={711.514}
              strokeDashoffset="711.514"
              strokeDasharray="711.514, 711.514"
              d="M467 446.1l.1-3.5-2-3.2.1-3.1-2.5-11.3 2-2 1.8-5.2 6.3-3.5 7.3-10.3 4-2.9.1-4.5-1.1-3.1v-10l4.5-11.7 7-5.4 7.5-8.6.5-.3 13.1-7.4 8.2-11.7.4-6.7 3.6-6.7 7.5-3.3 44.6-45.4 9-5.6 34.9-8.8 4.3-9 9-6.5h16.3l4.2-2.7h3.8l21.5-25.9 2.7-5.9 25.7-25.5 1-4.8 9-3.3 6.1-7.7 1.9-6.1 6.3-6.9 4.8-7.5 1-5.2 2.3-2.1 1.7-9 4.4-9.8 2.9-9.8 2.5-2.9h2.5l7.3-4.8v-2.7l9.4-5.4 3.8-4.2h3.6l8.4-8.4v-2.5l5.6-4 1.7-2.5 1.7-3.3 6.9-3.1 2.3-2.5 10.5-3.3 6.1-4.4h2.9l8.4 6.7 3.1-.2 1.5-1.9h11.9l8.6-2.7 8.4-.6 5.6-3.8h6.7l3.6 3.1 2.1-1 2.9 1.5 4.6-1.5 4 1.9 5.2.8V75l-1.5 5.9 3.6 11.7v2.9l1 1.9v3.6l1.9 2.5h8.4"
            ></path>
            <g
              ref={textContainerRef}
              className="tooltip range__text"
              transform="translate(918 103.5)"
            >
              <circle cy="0.8" r="4.4" fill="#231F20"></circle>
              <g fill="#EC1C24">
                <path d="M-38.2 5.5H38.099999999999994V27.6H-38.2z"></path>
                <path
                  d="M-4.4 1.7H4.5V10.6H-4.4z"
                  transform="rotate(-45.001 0 6.161)"
                ></path>
              </g>
              <text
                ref={textRef}
                data-miles={135}
                fill="#fff"
                fontFamily="Gotham Bold"
                fontSize="13"
                textAnchor="middle"
                transform="translate(0 21.252)"
              >
                0 Miles
              </text>
            </g>
          </svg>
        </div>
      );
    }
  }, [rangeButtonActive, lineRef, page, textContainerRef, textRef]);

  return (
    <div ref={animationElementRef} className="range__animationElement">
      {renderSvg()}
    </div>
  );
}

export default connect(mapStateToProps, mapActionToProps)(Icon);