import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import "static/css/table.scss";
import { DataTable } from "carbon-components-react";
import { toggleDeleteStock, toggleSellStock } from "flux/ducks/modals";

const initialRows = [
  {
    id: "AAPL",
    name: "AAPL (Apple Inc.)",
    price: "$108.50",
    total: "$1,750.00",
    profitLoss: "$750.50",
    change: "10.80%",
    type: 0 //meaning Loss
  },
  {
    id: "GOOGL",
    name: "GOOGL (Google Inc.)",
    price: "$208.50",
    total: "$2,750.00",
    profitLoss: "$950.50",
    change: "8.10%",
    type: 1 //meaning Profitable
  }
];

const headers = [
  {
    // `key` is the name of the field on the row object itself for the header
    key: "name",
    // `header` will be the name you want rendered in the Table Header
    header: "Name"
  },
  {
    key: "price",
    header: "Price"
  },
  {
    key: "total",
    header: "Total Value"
  },
  {
    key: "profitLoss",
    header: "Profit/Loss"
  },
  {
    key: "change",
    header: "Change"
  }
];

const {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  TableHeader,
  TableToolbar,
  TableToolbarSearch,
  TableToolbarContent,
  TableToolbarAction,
  TableBatchActions,
  TableBatchAction,
  TableSelectAll,
  TableSelectRow
} = DataTable;

export class HistoricalTable extends Component {
  onDelete = rows => {
    console.log(rows);
    this.props.toggleDeleteStock(rows);
  };

  onSell = rows => {
    console.log(rows);
    this.props.toggleSellStock(rows);
  };
  renderTable = ({
    rows,
    headers,
    getHeaderProps,
    getSelectionProps,
    getBatchActionProps,
    onInputChange,
    ...data
  }) => {
    const { selectedRows } = data;
    return (
      <TableContainer>
        <TableToolbar>
          {/* make sure to apply getBatchActionProps so that the bar renders */}
          <TableBatchActions {...getBatchActionProps()}>
            {/* inside of you batch actinos, you can include selectedRows */}
            <TableBatchAction
              onClick={() => {
                this.onDelete(selectedRows);
              }}
              className="sa--table-batch-action"
            >
              Delete
            </TableBatchAction>
            <TableBatchAction
              onClick={() => this.onSell(selectedRows)}
              className="sa--table-batch-action"
            >
              Sell
            </TableBatchAction>
          </TableBatchActions>
          <TableToolbarSearch onChange={onInputChange} />
        </TableToolbar>
        <Table className="sa--table">
          <TableHead>
            <TableRow className="sa--table-row">
              <TableSelectAll {...getSelectionProps()} />
              {headers.map(header => (
                <TableHeader {...getHeaderProps({ header })}>
                  {header.header}
                </TableHeader>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(row => (
              <TableRow
                className="sa--table-row sa--table-row-body"
                key={row.id}
              >
                <TableSelectRow {...getSelectionProps({ row })} />
                {row.cells.map(cell => (
                  <TableCell key={cell.id}>{cell.value}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };
  render() {
    return (
      <DataTable
        rows={initialRows}
        headers={headers}
        render={this.renderTable}
      />
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {
  toggleDeleteStock,
  toggleSellStock
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HistoricalTable);
