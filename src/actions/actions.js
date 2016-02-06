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

const ERROR_DEFAULT = 'Doslo je do greske. Propbajte ponovo! :)';

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
          let errorText;
          if (typeof err === 'string') {
            errorText = err;
          } else if (err.response && err.response.body) {
            errorText = err.response.body.error;
          } else {
            errorText = ERROR_DEFAULT;
          }

          return dispatch(errorLines(errorText));
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
