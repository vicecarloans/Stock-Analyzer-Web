import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Modal } from "carbon-components-react";
import { reduxForm, Field } from "redux-form";
import { toggleSellStock } from "flux/ducks/modals";
import { SAInput } from "components/common";
import { sellStocksListSelector } from "flux/ducks/stocks";
import { NUMBER_INPUT } from "constants/fieldType";
import combineSelectors from "utils/combineSelectors";

const onSubmit = values => {};

export class SellStockModal extends Component {
  static propTypes = {
    open: PropTypes.bool.isRequired,
    stocks: PropTypes.array.isRequired,
    toggleSellStock: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired
  };

  renderStocks = () => {
    return this.props.stocks.map(stock => (
      <Field
        component={this.renderField}
        name={stock.id}
        label={stock.id}
        type={NUMBER_INPUT}
        key={stock.id}
      />
    ));
  };

  renderField = props => <SAInput {...props} />;

  render() {
    const { open, handleSubmit, toggleSellStock } = this.props;
    return (
      <Modal
        shouldSubmitOnEnter={false}
        modalHeading="Sell Stock"
        primaryButtonText="Sell"
        secondaryButtonText="Cancel"
        iconDescription="Close the modal"
        onRequestClose={() => toggleSellStock([])}
        onRequestSubmit={handleSubmit}
        open={open}
      >
        <p className="bx--modal-content__text">
          Insert the price for each stocks you want to sell
        </p>
        <div className="sa--form">{this.renderStocks()}</div>
      </Modal>
    );
  }
}

SellStockModal = reduxForm({
  form: "sell-stock",
  onSubmit
})(SellStockModal);

const mapStateToProps = combineSelectors({
  stocks: sellStocksListSelector
});

const mapDispatchToProps = {
  toggleSellStock
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SellStockModal);
