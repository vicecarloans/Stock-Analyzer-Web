import React, { PureComponent } from "react";
import { FEATURES } from "constants/features";
import "static/css/product.scss";

export default class FeatureTree extends PureComponent {
  renderFeatures = () => {
    return FEATURES.map((feature, i) => {
      if (i % 2 == 0) {
        return (
          <li key={feature.id}>
            <div className="bx--row">
              <div className="bx--col-xs-6 wow fadeInUp left-content-box">
                <div className="content">
                  <h2>{feature.title}</h2>
                  <p>{feature.description}</p>
                </div>
              </div>
              <div className="bx--col-xs-6 wow fadeInUp content-box">
                <div className={feature.className} />
              </div>
            </div>
          </li>
        );
      } else {
        return (
          <li key={feature.id}>
            <div className="bx--row">
              <div className="bx--col-xs-6 wow fadeInUp left-content-box">
                <div className={feature.className} />
              </div>
              <div className="bx--col-xs-6 wow fadeInUp content-box">
                <div className="content">
                  <h2>{feature.title}</h2>
                  <p>{feature.description}</p>
                </div>
              </div>
            </div>
          </li>
        );
      }
    });
  };

  render() {
    return (
      <div className="bx--grid">
        <ul className="feature-list">{this.renderFeatures()}</ul>
      </div>
    );
  }
}
