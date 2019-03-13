import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Modal } from "carbon-components-react";
import { toggleDeleteStock } from "flux/ducks/modals";
import { deleteStocksListSelector } from "flux/ducks/stocks";
import combineSelectors from "utils/combineSelectors";

export class DeleteStockModal extends Component {
  static propTypes = {
    open: PropTypes.bool.isRequired,
    stocks: PropTypes.array.isRequired
  };

  handleDelete = () => {
    console.log(this.props.stocks);
  };
  render() {
    const { open } = this.props;

    return (
      <Modal
        shouldSubmitOnEnter={false}
        modalHeading="Delete Stock"
        primaryButtonText="Delete"
        secondaryButtonText="Cancel"
        iconDescription="Close the modal"
        onRequestClose={() => this.props.toggleDeleteStock([])}
        onRequestSubmit={this.handleDelete}
        open={open}
        danger
      >
        <p>Are you sure you want to delete these stocks?</p>
      </Modal>
    );
  }
}

const mapStateToProps = combineSelectors({
  stocks: deleteStocksListSelector
});

const mapDispatchToProps = {
  toggleDeleteStock
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DeleteStockModal);
