import React from "react";
import PropTypes from "prop-types";

import { ButtonFlat } from "./SAButton.styles";

export default function SAButton({ onClick, disabled, style, children }) {
  const { width, height, fontSize } = style;
  return (
    <ButtonFlat
      onClick={onClick}
      disabled={disabled}
      width={width}
      height={height}
      fontSize={fontSize}
    >
      {children}
    </ButtonFlat>
  );
}

SAButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  style: PropTypes.object
};
SAButton.defaultProps = {
  disabled: false,
  style: {}
};
