import React from "react";
import PropTypes from "prop-types";

import { ButtonFlat } from "./SAButton.styles";

export default function SAButton({ onClick, disabled, style, children }) {
  return (
    <ButtonFlat onClick={onClick} disabled={disabled} {...style}>
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
