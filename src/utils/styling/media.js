import { css } from "styled-components";

import { screenSizes } from "constants/dimensions";

// Iterate through the sizes and create a media template
export default Object.keys(screenSizes).reduce((acc, label) => {
  acc[label] = (...args) => css`
    @media (max-width: ${screenSizes[label]}px) {
      ${css(...args)};
    }
  `;

  return acc;
}, {});
