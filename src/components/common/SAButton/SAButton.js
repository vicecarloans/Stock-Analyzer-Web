import React from "react";
import PropTypes from "prop-types";

import { ButtonFlat } from "./SAButton.styles";

export default function SAButton({
  onClick,
  disabled,
  style,
  children,
  ...props
}) {
  return (
    <ButtonFlat onClick={onClick} disabled={disabled} {...style} {...props}>
      {children}
    </ButtonFlat>
  );
}

SAButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  style: PropTypes.shape()
};
SAButton.defaultProps = {
  disabled: false,
  style: {}
};
