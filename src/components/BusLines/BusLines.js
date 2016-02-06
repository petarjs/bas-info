/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes, Component } from 'react';
import ReactDOM from 'react-dom';
import withStyles from '../../decorators/withStyles';
import styles from './BusLines.scss';
import _ from 'lodash';
import moment from 'moment';
import TRAVEL_TYPES from '../../constants/travel-types';
import Responsive from '../../services/responsive';

import CalendarDisplay from '../CalendarDisplay/CalendarDisplay';

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
    expanded: []
  };

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.setState({
      expanded: this.props.results.map(r => false)
    });
  }

  toggleExpended(i) {
    if(!Responsive.is('xs')) {
      return;
    }
    let expanded = this.state.expanded;
    expanded[i] = !expanded[i];
    this.setState({
      expanded
    });
  }

  render() {
    return (
      <div className="BusLines">
        <CalendarDisplay date={this.props.date} format="DD/MM/YYYY" />
        <div className="BusLines-lineInfo fl-l">
          {
            this.props.travelType === TRAVEL_TYPES.arrival ?
              <div className="BusLines-lineInfoText lineBefore">
                <h3>{this.props.station}</h3>
                <h3>Beograd</h3>
                <h3>Broj linija: {_.size(this.props.results)}</h3>
              </div>
              :
              <div className="BusLines-lineInfoText lineBefore">
                <h3>Beograd</h3>
                <h3>{this.props.station}</h3>
                <h3>Broj linija: {_.size(this.props.results)}</h3>
              </div>
          }
        </div>

        {
          _.size(this.props.results) > 1 ?
            <div className="BusLines-lineInfo fl-r">
              <div className="BusLines-lineInfoText">
                <h3 className="fw-n">Iz: {_.capitalize(_.first(this.props.results).departureStation.toLowerCase())}</h3>
                <h3 className="fw-n">Prvi polazak: {_.first(this.props.results).departureTime}</h3>
                <h3 className="fw-n">Poslednji polazak: {_.last(this.props.results).departureTime}</h3>
              </div>
            </div>
            : null
        }

        <div className="BusLines-container">

          {
            this.props.results ? this.props.results.map((result, i) => {
              let busLinesClass = `BusLines-line ${this.state.expanded[i] ? ' BusLines-line-isExpanded': ''}`;
              let lineDetails =
                <div>
                  <div>Preko: <span className="fw-b">{result.via}</span></div>
                  <div>Prevoznik: <span className="fw-b">{result.company}</span></div>
                  { result.platform ? <div>Peron: <span className="fw-b">{result.platform}</span></div> : null }
                  { result.returnTicketAvailable ? <div>Povratna karta: <span className="fw-b">{result.returnTicketAvailable}</span></div> : null }
                  { result.distance ? <div>Daljina: <span className="fw-b">{result.distance} km</span></div> : null }
                </div>;

              return <div className={busLinesClass} key={i} onClick={this.toggleExpended.bind(this, i)}>
                <div className="BusLines-lineDetails">
                  <div className="BusLines-departure">
                    <span className="BusLines-time">{result.departureTime}</span>
                    <span className="BusLines-station">{result.departureStation}</span>
                  </div>
                  <div className="BusLines-arrival">
                    <span className="BusLines-time">{result.arrivalTime}</span>
                    <span className="BusLines-station">{result.arrivalStation}</span>
                  </div>

                  {
                    Responsive.isGt('xs') ?
                      <div><br/>{lineDetails}</div> :
                      null
                  }
                </div>

                {
                  (this.state.expanded && this.state.expanded[i] && Responsive.is('xs')) ?
                    <div className="BusLines-lineDetailsExpanded">lineDetails</div>
                    : null
                }
              </div>
            }) : <h3>No results</h3>
          }

        </div>
      </div>
    );
  }

}

export default BusLines;
