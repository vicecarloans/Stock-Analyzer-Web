import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { IncomeDataWrapper, IncomeTitle } from "./AccountingData.styles";
import "static/css/table.scss";
import { DataTable } from "carbon-components-react";

const {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  TableHeader
} = DataTable;

export default class CashflowStatement extends PureComponent {
  static propTypes = {
    totalInvestment: PropTypes.string,
    totalRevenue: PropTypes.string,
    netCashflow: PropTypes.string
  };

  static defaultProps = {
    totalInvestment: "$0",
    totalRevenue: "$0",
    netCashflow: "$0"
  };

  render() {
    const { totalInvestment, totalRevenue, netCashflow } = this.props;
    return (
      <IncomeDataWrapper>
        <IncomeTitle>Cashflow Statement</IncomeTitle>
        <TableContainer>
          <Table className="sa--table">
            <TableHead>
              <TableRow className="sa--table-row">
                <TableHeader>Item</TableHeader>
                <TableHeader>Amount</TableHeader>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow className="sa--table-row sa--table-row-body">
                <TableCell>Total Investment</TableCell>
                <TableCell>{totalInvestment}</TableCell>
              </TableRow>
              <TableRow className="sa--table-row sa--table-row-body">
                <TableCell>Total Revenue</TableCell>
                <TableCell>{totalRevenue}</TableCell>
              </TableRow>
              <TableRow className="sa--table-row sa--table-row-body">
                <TableCell>Net Cashflow</TableCell>
                <TableCell>{netCashflow}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </IncomeDataWrapper>
    );
  }
}
