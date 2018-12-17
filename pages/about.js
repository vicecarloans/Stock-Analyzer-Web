import { Component } from "react";
import { Title } from "components/Title.styles";
import { isEmpty } from "lodash";

export default class about extends Component {
  static async getInitialProps({ query }) {
    if (!isEmpty(query)) {
      return { query };
    }
  }

  render() {
    return (
      <div>
        <Title>{this.props.query}</Title>
      </div>
    );
  }
}
