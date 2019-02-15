import React, { Component } from "react";

export default class Construction extends Component {
  render() {
    return (
      <div
        style={{
          height: "80vh",
          backgroundImage: "url(/static/images/construction.png)",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          textAlign: "center"
        }}
      >
        <h2>
          Sorry this route is under construction. Come back later for more
          contents.
        </h2>
      </div>
    );
  }
}
