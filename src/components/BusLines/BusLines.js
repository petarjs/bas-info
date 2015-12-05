/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes, Component } from 'react';
import ReactDOM from 'react-dom';
import withStyles from '../../decorators/withStyles';
import styles from './BusLines.scss';
import _ from 'lodash';
import moment from 'moment';

const Table = require('material-ui/lib/table/table');
const TableBody = require('material-ui/lib/table/table-body');
const TableFooter = require('material-ui/lib/table/table-footer');
const TableHeader = require('material-ui/lib/table/table-header');
const TableHeaderColumn = require('material-ui/lib/table/table-header-column');
const TableRow = require('material-ui/lib/table/table-row');
const TableRowColumn = require('material-ui/lib/table/table-row-column');

import store from '../../stores/store';

@withStyles(styles)
class BusLines extends Component {

  static contextTypes = {
    results: PropTypes.array,
  };

  state = {
    fixedHeader: true,
    stripedRows: true,
    showRowHover: false,
    multiSelectable: false,
    deselectOnClickaway: true,
    height: '600px',
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="BusLines">
        <div className="BusLines-container">
          <Table

            height={this.state.height}
            fixedHeader={this.state.fixedHeader}
            onRowSelection={this._onRowSelection}>

            <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
              <TableRow>
                <TableHeaderColumn colSpan="5" style={{textAlign: 'center'}}>
                  <h3>Rezultati pretrage:</h3>
                </TableHeaderColumn>
              </TableRow>

              <TableRow>
                <TableHeaderColumn style={{textAlign: 'center'}} tooltip='Vreme polaska'>Polazak</TableHeaderColumn>
                <TableHeaderColumn style={{textAlign: 'center'}} tooltip='Vreme dolaska'>Dolazak</TableHeaderColumn>
                <TableHeaderColumn style={{textAlign: 'center'}} tooltip='Naziv prevoznika'>Prevoznik</TableHeaderColumn>
                <TableHeaderColumn style={{textAlign: 'center'}} tooltip='Stanica sa koje polazi autobus'>Polazna stanica</TableHeaderColumn>
                <TableHeaderColumn style={{textAlign: 'center'}} tooltip='Mesta preko kojih ide autobus'>Preko</TableHeaderColumn>
              </TableRow>
            </TableHeader>

            <TableBody
              displayRowCheckbox={false}
              deselectOnClickaway={this.state.deselectOnClickaway}
              showRowHover={this.state.showRowHover}
              stripedRows={this.state.stripedRows}>

              {
                this.props.results ? this.props.results.map((result, i) =>
                  <TableRow key={i} hoverable={true} selectable={false}>
                    <TableRowColumn style={{textAlign: 'center'}}>{result.departureTime}</TableRowColumn>
                    <TableRowColumn style={{textAlign: 'center'}}>{result.arrivalTime}</TableRowColumn>
                    <TableRowColumn style={{textAlign: 'center'}}>{result.company}</TableRowColumn>
                    <TableRowColumn style={{textAlign: 'center'}}>{result.departureStation}</TableRowColumn>
                    <TableRowColumn style={{textAlign: 'center'}} title={result.via}>{result.via}</TableRowColumn>
                  </TableRow>
                ) : ()=>{}
              }

            </TableBody>

          </Table>
        </div>
      </div>
    );
  }

}

export default BusLines;
