import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Modal } from "carbon-components-react";
import { reduxForm, Field, reset } from "redux-form";
import { SAInput } from "components/common";
import combineSelectors from "utils/combineSelectors";
import { STOCKS } from "constants/portfolio/stocks";
import {
  COMBO_BOX,
  TEXT_INPUT,
  DATE_PICKER,
  NUMBER_INPUT
} from "constants/fieldType";
import { toggleAddStock } from "flux/ducks/modals";
import { addStockValidation } from "utils/validation";
import { buyStock } from "flux/ducks/portfolio";

const onSubmit = (values, dispatch) => {
  dispatch(buyStock(values));
};

export class AddStockModal extends Component {
  static propTypes = {
    open: PropTypes.bool.isRequired,
    danger: PropTypes.bool,
    toggleAddStock: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired
  };

  static defaultProps = {
    danger: false
  };

  renderField = props => <SAInput {...props} />;

  render() {
    const { handleSubmit, open, danger, toggleAddStock, reset } = this.props;
    return (
      <Modal
        shouldSubmitOnEnter={false}
        modalHeading="Add Stock"
        primaryButtonText="Add"
        secondaryButtonText="Cancel"
        iconDescription="Close the modal"
        onRequestClose={() => {
          toggleAddStock();
          reset("add-stock");
        }}
        onRequestSubmit={handleSubmit}
        open={open}
        danger={danger}
      >
        <div className="sa--form">
          <Field
            component={this.renderField}
            name="stockname"
            type={COMBO_BOX}
            placeholder="Choose your stock"
            label="Stock Name"
            items={STOCKS}
          />
          <Field
            component={this.renderField}
            name="amount"
            type={NUMBER_INPUT}
            label="Amount"
            max={100}
          />
          <Field
            component={this.renderField}
            name="price"
            type={TEXT_INPUT}
            placeholder="e.g. 20.00"
            label="Buy Price"
          />
        </div>
      </Modal>
    );
  }
}

AddStockModal = reduxForm({
  form: "add-stock",
  validate: addStockValidation,
  onSubmit
})(AddStockModal);

const mapStateToProps = combineSelectors({});

const mapDispatchToProps = {
  toggleAddStock,
  reset
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddStockModal);
