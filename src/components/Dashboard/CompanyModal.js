import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  ComposedModal,
  ModalHeader,
  ModalBody,
  SkeletonText
} from "carbon-components-react";
import {
  companyDataSelector,
  companyLoadingSelector
} from "flux/ducks/company";
import { toggleCompanyModal, companyModalSelector } from "flux/ducks/modals";
import combineSelectors from "utils/combineSelectors";
import {
  DataTitle,
  Data,
  CompanyWebsite,
  StockDescription
} from "./Dashboard.styles";

export class CompanyModal extends Component {
  static propTypes = {
    open: PropTypes.bool.isRequired,
    data: PropTypes.object.isRequired,
    loading: PropTypes.bool.isRequired,
    toggleCompanyModal: PropTypes.func.isRequired
  };

  renderHeader = () => {
    const { data } = this.props;
    return (
      <ModalHeader
        label="Stock Detail"
        title={data.name}
        iconDescription="Close"
        buttonOnClick={toggleCompanyModal}
      />
    );
  };
  renderBody = () => {
    const { data } = this.props;
    return (
      <ModalBody>
        <StockDescription>{data.description}</StockDescription>
        <hr />
        <div className="bx--grid">
          <div className="bx--row sa--company-detail-row">
            <div className="bx--col-xs-6">
              <DataTitle>Exchange</DataTitle>
              <Data>{data.exchange}</Data>
            </div>
            <div className="bx--col-xs-6">
              <DataTitle>Employees</DataTitle>
              <Data>{data.employees}</Data>
            </div>
          </div>
          <div className="bx--row sa--company-detail-row">
            <div className="bx--col-xs-6">
              <DataTitle>Sector</DataTitle>
              <Data>{data.sector}</Data>
            </div>
            <div className="bx--col-xs-6">
              <DataTitle>Industry</DataTitle>
              <Data>{data.industry}</Data>
            </div>
          </div>
          <div className="bx--row sa--company-detail-row">
            <div className="bx--col-xs-12">
              <DataTitle>Website</DataTitle>
              <CompanyWebsite href={data.website} target="_blank">
                {data.website}
              </CompanyWebsite>
            </div>
          </div>
          <hr />
          <div className="bx--row sa--company-detail-row">
            <div className="bx--col-xs-6">
              <DataTitle>Volume</DataTitle>
              <Data>{data.volume}</Data>
            </div>
            <div className="bx--col-xs-6">
              <DataTitle>Market Cap</DataTitle>
              <Data>{data.volume}</Data>
            </div>
          </div>

          <div className="bx--row sa--company-detail-row">
            <div className="bx--col-xs-6">
              <DataTitle>Dividend Yield</DataTitle>
              <Data>{data.dividendYield}</Data>
            </div>
            <div className="bx--col-xs-6">
              <DataTitle>Next Earning Date</DataTitle>
              <Data>{data.nextEarningsDate}</Data>
            </div>
          </div>
          <div className="bx--row sa--company-detail-row">
            <div className="bx--col-xs-12">
              <DataTitle>52 Week Range</DataTitle>
              <Data>{data.week52Range}</Data>
            </div>
          </div>
        </div>
      </ModalBody>
    );
  };

  render() {
    const { open, loading, toggleCompanyModal } = this.props;
    return (
      <ComposedModal open={open} onClose={toggleCompanyModal}>
        {loading ? <SkeletonText /> : this.renderHeader()}
        {loading ? <SkeletonText /> : this.renderBody()}
      </ComposedModal>
    );
  }
}

const mapStateToProps = combineSelectors({
  data: companyDataSelector,
  loading: companyLoadingSelector,
  open: companyModalSelector
});

const mapDispatchToProps = {
  toggleCompanyModal
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CompanyModal);
