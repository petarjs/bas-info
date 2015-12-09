/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes, Component } from 'react';
import ReactDOM from 'react-dom';
import withStyles from '../../decorators/withStyles';
import styles from './SearchPage.scss';
import _ from 'lodash';
import BasApi from '../../services/bas-api';
import TRAVEL_TYPES from '../../constants/travel-types';

import store from '../../stores/store';

import {
  findLines,
  startLoading,
 } from '../../actions/actions';

const FloatingActionButton = require('material-ui/lib/floating-action-button');
const RaisedButton = require('material-ui/lib/raised-button');
const FontIcon = require('material-ui/lib/font-icon');
const Snackbar = require('material-ui/lib/snackbar');
const CircularProgress = require('material-ui/lib/circular-progress');

import BusLines from '../BusLines';
import LineChooser from '../LineChooser';
import DateChooser from '../DateChooser';

@withStyles(styles)
class SearchPage extends Component {

  static contextTypes = {
    onSetTitle: PropTypes.func.isRequired,
  };

  state = {
    resultsError: '',
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
    store.dispatch(startLoading());
    setTimeout(() => store.dispatch(findLines()), 0);
  }

  render() {
    console.log('render search page');
    const title = 'Search';
    this.context.onSetTitle(title);

    return (
      <div className="SearchPage">
        <div className="SearchPage-container">
          <h1>{title}</h1>

          <LineChooser />

          <DateChooser />

          <div className="SearchLines">
            <div className="SearchLines-container">

              <CircularProgress mode="indeterminate" size={0.5} style={ this.state.loadingStatus ? {} : { display: 'none' } } className="SearchLines-loader" />

              <FloatingActionButton primary={true} onTouchTap={this.onClickSearch.bind(this)}>
                <FontIcon>
                  <i className="material-icons">search</i>
                </FontIcon>
              </FloatingActionButton>

            </div>
          </div>

          {
            this.state.results.length ?
              <BusLines results={this.state.results} station={this.state.station} date={this.state.date} travelType={this.state.travelType} />
            :
              <div><h4 className="ta-c">Izaberite mesto i datum, i pritisnite "Pretrazi"!</h4></div>
          }

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
