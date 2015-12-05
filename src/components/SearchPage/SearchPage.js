/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes, Component } from 'react';
import ReactDOM from 'react-dom';
import withStyles from '../../decorators/withStyles';
import styles from './SearchPage.scss';
import _ from 'lodash';
import foldToAscii from 'fold-to-ascii';
import moment from 'moment';
import BasApi from '../../services/bas-api';
import TRAVEL_TYPES from '../../constants/travel-types';

import store from '../../stores/store';

import {
  selectStation,
  selectDate,
  findLines,
  changeTravelType,
 } from '../../actions/actions';

const AutoComplete = require('material-ui/lib/auto-complete');
const DropDownMenu = require('material-ui/lib/drop-down-menu');
const DatePickerDialog = require('material-ui/lib/date-picker/date-picker-dialog');
const RaisedButton = require('material-ui/lib/raised-button');
const FontIcon = require('material-ui/lib/font-icon');
const Snackbar = require('material-ui/lib/snackbar');
const FloatingActionButton = require('material-ui/lib/floating-action-button');

import BusLines from '../BusLines';

import placesJson from '../../data/places';

let allPlaces = _.pluck(placesJson, 'First');

@withStyles(styles)
class SearchPage extends Component {

  static contextTypes = {
    onSetTitle: PropTypes.func.isRequired,
  };

  state = {
    places: [],
    dates: [{
      payload: moment().format('MM/DD/YYYY'),
      text: `${moment().format('DD/MM/YYYY')} - Danas`
    }, {
      payload: moment().add(1, 'days').format('MM/DD/YYYY'),
      text: `${moment().add(1, 'days').format('DD/MM/YYYY')} - Sutra`
    }, {
      payload: moment().add(2, 'days').format('MM/DD/YYYY'),
      text: `${moment().add(2, 'days').format('DD/MM/YYYY')}`
    }, {
      payload: moment().add(3, 'days').format('MM/DD/YYYY'),
      text: `${moment().add(3, 'days').format('DD/MM/YYYY')}`
    }, {
      payload: 'custom',
      text: `Izaberi`
    }],
    minDate: moment().toDate(),
    maxDate: moment().add(6, 'months').toDate(),
    resultsError: ''
  };

  constructor(props) {
    super(props);

    store.subscribe(this.setPageState.bind(this));
  }

  componentWillMount() {
    this.setPageState();
  }

  setPageState() {

    this.setState(store.getState().bas);

    if(this.state.resultsError) {
      this.showResultsError();
    }
  }

  showResultsError() {
    this.refs.snackbar.show();
  }

  onClickSearch(e) {
    store.dispatch(findLines());
  }

  onPlaceChange(text) {
    this.setState({
      places: _.take(allPlaces.filter(this.onPlaceFilter.bind(this, text)), 10)
    });
  }

  onPlaceFilter(q, place) {
    return foldToAscii.fold(place.toLowerCase()).indexOf(foldToAscii.fold(q).toLowerCase()) === 0;
  }

  onPlaceSelected(place) {
    console.log(place);
    store.dispatch(selectStation(place));
  }

  onDateChange(e, selectedIndex, menuItem) {
    console.log(menuItem);
    if(menuItem.payload === 'custom') {
      console.log('open datepicker');
      this.refs.datePicker.show();
    } else {
      this.setState({
        dates: [
          ...this.state.dates.slice(0, -1),
          {
            payload: 'custom',
            text: `Izaberi`
          }
        ],
      });

      store.dispatch(selectDate(menuItem.payload));
    }
  }

  onDateAccept(date) {
    console.log('chosen date', moment(date).format('DD/MM/YYYY'));
    this.setState({
      dates: [
        ...this.state.dates.slice(0, -1),
        {
          payload: 'custom',
          text: `Izaberi - ${moment(date).format('DD/MM/YYYY')}`
        }
      ]
    });
  }

  onChangeTravelType() {
    const travelType = this.state.travelType === TRAVEL_TYPES.arrival ? TRAVEL_TYPES.departure : TRAVEL_TYPES.arrival;
    store.dispatch(changeTravelType(travelType))
  }

  render() {
    console.log('render search page');
    const title = 'Search';
    this.context.onSetTitle(title);

    let place1 = <AutoComplete
              searchText={this.state.station}
              animated={false}
              hintText = "Mesto"
              dataSource= {this.state.places}
              onUpdateInput={this.onPlaceChange.bind(this)}
              filter={this.onPlaceFilter.bind(this)}
              onNewRequest={this.onPlaceSelected.bind(this)} />;

    let place2 = <span>Beograd</span>;

    console.log(this.state.travelType);
    if(this.state.travelType === TRAVEL_TYPES.arrival) {
      let tmp = place1;
      place1 = place2;
      place2 = tmp;
    }

    return (
      <div className="SearchPage">
        <div className="SearchPage-container">
          <h1>{title}</h1>

          <div>
            {place1}

            <FloatingActionButton secondary={true} onTouchTap={this.onChangeTravelType.bind(this)} style={{verticalAlign: 'middle'}}>
              <FontIcon>
                <i className="material-icons">swap_horiz</i>
              </FontIcon>
            </FloatingActionButton>


            {place2}
          </div>

          <div>
            <DropDownMenu
              menuItems={this.state.dates}
              onChange={this.onDateChange.bind(this)} />
            <DatePickerDialog
              ref='datePicker'
              hintText=""
              autoOk={true}
              onAccept={this.onDateAccept.bind(this)}
              minDate={this.state.minDate}
              maxDate={this.state.maxDate}
              showYearSelector={false} />
          </div>


          <RaisedButton primary={true} label="Pretrazi" labelPosition="after" onTouchTap={this.onClickSearch.bind(this)}>
            <FontIcon onClick={this.onChangeTravelType.bind(this)} style={{color: '#FFFFFF'}}>
              <i className="material-icons">search</i>
            </FontIcon>
          </RaisedButton>

          <BusLines results={this.state.results} />

          <Snackbar
            ref="snackbar"
            message={this.state.resultsError}
            action="Ok"
            autoHideDuration={4000}
            onActionTouchTap={ () => this.refs.snackbar.dismiss() }/>
        </div>
      </div>
    );
  }

}

export default SearchPage;
