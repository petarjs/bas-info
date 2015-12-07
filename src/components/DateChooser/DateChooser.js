/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes, Component } from 'react';
import ReactDOM from 'react-dom';
import withStyles from '../../decorators/withStyles';
import styles from './DateChooser.scss';
import _ from 'lodash';
import moment from 'moment';

import store from '../../stores/store';

import {
  selectDate,
 } from '../../actions/actions';

const DropDownMenu = require('material-ui/lib/drop-down-menu');
const DatePickerDialog = require('material-ui/lib/date-picker/date-picker-dialog');

const FontIcon = require('material-ui/lib/font-icon');

@withStyles(styles)
class DateChooser extends Component {

  state = {
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
  };

  constructor(props) {
    super(props);
  }

  componentWillMount() {
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

  render() {
    return (
      <div className="DateChooser">
        <div className="DateChooser-container">

          <div>
            <FontIcon style={{verticalAlign: 'super'}}>
              <i className="material-icons">date_range</i>
            </FontIcon>
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

        </div>
      </div>
    );
  }

}

export default DateChooser;
