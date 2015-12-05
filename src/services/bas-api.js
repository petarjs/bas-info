import request from 'superagent';
import API from '../constants/api';

export default class BasApi {

  static getLines(data, cb) {
    return request
      .get(`${API.url}/bas`)
      .query({
        station: data.station,
        date: data.date
      })
      .end(cb);
  }

}
