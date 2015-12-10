import {
  SELECT_STATION,
  SELECT_DATE,
  SET_LINES,
  ERROR_LINES,
  CHANGE_TRAVEL_TYPE,
  START_LOADING,
  STOP_LOADING,
} from '../constants/ActionTypes';

import BasApi from '../services/bas-api';

const ERROR_DEFAULT = 'There was an error. Very informative, right?!';

export function startLoading() {
  return {
    type: START_LOADING,
  };
}

export function stopLoading() {
  return {
    type: STOP_LOADING,
  };
}

export function selectStation(station) {
  return {
    type: SELECT_STATION,
    station,
  };
}

export function selectDate(date) {
  return {
    type: SELECT_DATE,
    date,
  };
}

export function setLines(data) {
  return {
    type: SET_LINES,
    results: data,
  };
}

export function errorLines(err) {
  return {
    type: ERROR_LINES,
    error: err,
  };
}


export function findLines() {
  return function findLinesThunk(dispatch, getState) {
    const state = getState().bas;
    return BasApi.getLines({
      station: state.station,
      date: state.date,
      travelType: state.travelType,
    },
      (err, res) => {
        dispatch(stopLoading());
        if (err) {
          return dispatch(errorLines(err.response.body ? err.response.body.error : ERROR_DEFAULT));
        }
        dispatch(setLines(res));
      }
    );
  };
}

export function changeTravelType(travelType) {
  return {
    type: CHANGE_TRAVEL_TYPE,
    travelType,
  };
}
