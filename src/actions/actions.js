import {
  SELECT_STATION,
  SELECT_DATE,
  SET_LINES,
  ERROR_LINES,
  CHANGE_TRAVEL_TYPE,
} from '../constants/ActionTypes';

import BasApi from '../services/bas-api';

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
    return BasApi.getLines(
      getState().bas,
      (err, res) => {
        if (err) {
          return dispatch(errorLines(err.response.body.error));
        }
        dispatch(setLines(res.body));
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
