/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes, Component } from 'react';
import ReactDOM from 'react-dom';
import withStyles from '../../decorators/withStyles';
import styles from './SearchPage.scss';
import _ from 'lodash';
import foldToAscii from 'fold-to-ascii';
import moment from 'moment';

const AutoComplete = require('material-ui/lib/auto-complete');
const DropDownMenu = require('material-ui/lib/drop-down-menu');
const DatePickerDialog = require('material-ui/lib/date-picker/date-picker-dialog');

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
    }]
  };

  constructor(props) {
    super(props);
  }

  onClickSearch(e) {
    console.log(ReactDOM.findDOMNode(this.refs.placesSelect).value);
  }

  onPlaceChange(text) {
    this.setState({
      places: _.take(allPlaces.filter(this.onPlaceFilter.bind(this, text)), 10)
    })
  }

  onPlaceFilter(q, place) {
    return foldToAscii.fold(place.toLowerCase()).indexOf(foldToAscii.fold(q).toLowerCase()) === 0;
  }

  onNewRequest(r) {
    console.log(r);
  }

  onDateChange(e, selectedIndex, menuItem) {
    console.log(menuItem);
    if(menuItem.payload === 'custom') {
      console.log('open datepicker');
      this.refs.datePicker.show();
    }
  }

  onDateAccept(date) {
    console.log('chosen date', moment(date).format('DD/MM/YYYY'));
  }

  render() {
    const title = 'Search';
    this.context.onSetTitle(title);
    return (
      <div className="SearchPage">
        <div className="SearchPage-container">
          <h1>{title}</h1>

          <AutoComplete
            animated={false}
            hintText = "Mesto"
            dataSource= {this.state.places}
            onUpdateInput={this.onPlaceChange.bind(this)}
            filter={this.onPlaceFilter.bind(this)}
            onNewRequest={this.onNewRequest.bind(this)} />

          <DropDownMenu
            menuItems={this.state.dates}
            onChange={this.onDateChange.bind(this)} />

          <DatePickerDialog
            ref='datePicker'
            hintText=""
            autoOk={true}
            onAccept={this.onDateAccept.bind(this)}
            // minDate={this.state.minDate}
            // maxDate={this.state.maxDate}
            showYearSelector={false} />

          <button onClick={this.onClickSearch.bind(this)}>Search</button>
          <p>...</p>
        </div>
      </div>
    );
  }

}

export default SearchPage;
