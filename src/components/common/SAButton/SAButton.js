import React from "react";
import PropTypes from "prop-types";

import { ButtonFlat, ButtonSticky } from "./SAButton.styles";

export default function SAButton({
  onClick,
  disabled,
  style,
  type,
  children,
  ...props
}) {
  if (type === "sticky") {
    return (
      <ButtonSticky onClick={onClick} disabled={disabled} {...style} {...props}>
        {children}
      </ButtonSticky>
    );
  }
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
