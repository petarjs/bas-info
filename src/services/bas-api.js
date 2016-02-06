import request from 'superagent';
import API from '../constants/api';
import TRAVEL_TYPES from '../constants/travel-types';

export default class BasApi {

  static getLines(data, cb) {
    return request
      .get(`${API.url}/bas`)
      .query({
        station: data.station,
        date: data.date,
        travelType: data.travelType,
      })
      .end((err, response) => {
        if (!response.body.error) {
          const results = response.body.map(result => {
            if (data.travelType === TRAVEL_TYPES.arrival) {
              result.arrivalStation = 'BEOGRAD';
              result.departureStation = result.departureStation === data.station ? result.departureStation : `${data.station} (${result.departureStation})`;
            } else {
              result.arrivalStation = data.station;
              result.departureStation = result.departureStation !== 'BEOGRAD' ? `BEOGRAD (${result.departureStation})` : result.departureStation;
            }

            return result;
          });

          cb(null, results);
        } else {
          cb(response.body.error);
        }
      });
  }
}
