import { combineReducers } from 'redux';
import {
  SELECT_STATION,
  SELECT_DATE,
  SET_LINES,
  ERROR_LINES,
  CHANGE_TRAVEL_TYPE,
  START_LOADING,
  STOP_LOADING
} from '../constants/ActionTypes';

import moment from 'moment';

import TRAVEL_TYPES from '../constants/travel-types';

function bas(state = {
  travelType: TRAVEL_TYPES.departure,
  results: [],
  station: '',
  resultsError: '',
  date: moment().format('DD/MM/YYYY'),
  loadingStatus: false,
}, action) {
  switch (action.type) {
  case SELECT_STATION:
    console.log(`Action: ${action.type} --- Payload: ${action.station}`);
    return {
      ...state,
      results: [],
      station: action.station,
    };
  case SELECT_DATE:
    console.log(`Action: ${action.type} --- Payload: ${action.date}`);
    return {
      ...state,
      results: [],
      date: action.date,
    };
  case SET_LINES:
    console.log(`Action: ${action.type} --- Payload: ${action.results}`);
    return {
      ...state,
      results: action.results,
    };
  case ERROR_LINES:
    console.log(`Action: ${action.type} --- Payload: ${action.error}`);
    return {
      ...state,
      resultsError: action.error,
    };
  case CHANGE_TRAVEL_TYPE:
    console.log(`Action: ${action.type} --- Payload: ${action.travelType}`);
    return {
      ...state,
      results: [],
      travelType: action.travelType,
    };
  case START_LOADING:
    console.log(`Action: ${action.type} --- `);
    return {
      ...state,
      loadingStatus: true,
    };
  case STOP_LOADING:
    console.log(`Action: ${action.type} --- `);
    return {
      ...state,
      loadingStatus: false,
    };
  default:
    return state;
  }
}

const basApp = combineReducers({
  bas,
});

export default basApp;
