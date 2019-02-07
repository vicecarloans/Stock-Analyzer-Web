import React from "react";
import Svg, { Path, G } from "svgs";
import PropTypes from "prop-types";

const Waves = ({ fill, width, height }) => (
  <Svg x="0" y="0" width={width} height={height} viewBox="0 0 1920 181.1">
    <G>
      <Path
        fill={fill}
        d="M0,80c0,0,28.9-4.2,43-13c14.3-9,71-35.7,137,5c17.3,7.7,33.3,13,48,11c17.3,0.3,50.3,4.7,66,23
            c20.3,9.7,68,40.3,134-12c24-11,59-16.3,104,2c21,7.3,85,27.7,117-14c24-30.7,62.7-55,141-12c26,10.3,72,14.7,110-14
            c37.7-19,89.7-29,122,53c23,32.7,47.7,66.3,97,26c24-22.7,51-78.3,137-38c0,0,28.3,15.7,52,15c23.7-0.7,50.7,4.3,76,41
            c19.7,19.7,71,36.7,121-2c0,0,22.3-16,55-12c0,0,32.7,6.7,56-71c23.3-76,79-92,122-29c9.3,13.7,25,42,62,43c37,1,51.7,25.3,67,48
            c15.3,22.7,51,22.7,53,23v28.1H0V80z"
      />
    </G>
  </Svg>
);

Waves.propTypes = {
  fill: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string
};

Waves.defaultProps = {
  fill: "#0E102B",
  width: "1920",
  height: "181.1"
};

export default Waves;
