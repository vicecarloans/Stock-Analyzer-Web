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

export default class IncomeStatement extends PureComponent {
  static propTypes = {
    totalInvestment: PropTypes.string,
    totalRevenue: PropTypes.string,
    realizedPL: PropTypes.string,
    taxExempt: PropTypes.string,
    taxPayable: PropTypes.string
  };

  static defaultProps = {
    totalInvestment: "$0",
    totalRevenue: "$0",
    realizedPL: "$0",
    taxExempt: "$0",
    taxPayable: "$0"
  };

  render() {
    const {
      totalInvestment,
      totalRevenue,
      realizedPL,
      taxExempt,
      taxPayable
    } = this.props;
    return (
      <IncomeDataWrapper>
        <IncomeTitle>Income Statement</IncomeTitle>
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
                <TableCell>Total Investment on Sold Position</TableCell>
                <TableCell>{totalInvestment}</TableCell>
              </TableRow>
              <TableRow className="sa--table-row sa--table-row-body">
                <TableCell>Total Revenue</TableCell>
                <TableCell>{totalRevenue}</TableCell>
              </TableRow>
              <TableRow className="sa--table-row sa--table-row-body">
                <TableCell>Realized P/L</TableCell>
                <TableCell>{realizedPL}</TableCell>
              </TableRow>
              <TableRow className="sa--table-row sa--table-row-body">
                <TableCell>Capital Gain Tax</TableCell>
                <TableCell>13%</TableCell>
              </TableRow>
              <TableRow className="sa--table-row sa--table-row-body">
                <TableCell>Amount Exempt From Tax</TableCell>
                <TableCell>{taxExempt}</TableCell>
              </TableRow>
              <TableRow className="sa--table-row sa--table-row-body">
                <TableCell>Tax Payable</TableCell>
                <TableCell>{taxPayable}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </IncomeDataWrapper>
    );
  }
}
