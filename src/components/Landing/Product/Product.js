import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import "static/css/animate.css";
import { ProductWrapper, Title } from "./Product.styles";
import FeatureTree from "./FeatureTree";

export default class Product extends PureComponent {
  render() {
    return (
      <ProductWrapper id="features" className="bx--grid">
        <div className="bx--row">
          <div className="bx--col-xs-12">
            <Title className="wow fadeInUp animated">Our Product</Title>
          </div>
          <div className="bx--col-xs-12 bx--col-md-12">
            <FeatureTree />
          </div>
        </div>
      </ProductWrapper>
    );
  }
}
