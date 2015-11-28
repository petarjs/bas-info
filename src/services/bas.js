'use strict';

const Nightmare = require('nightmare');
const vo = require('vo');
const _ = require('lodash');
const moment = require('moment');

import TRAVEL_TYPES from '../constants/travel-types';
import countriesJson from '../data/countries';

const travelTypeRadioId = {
  [TRAVEL_TYPES.arrival]: '#rbDolasci',
  [TRAVEL_TYPES.departure]: '#rbPolasci',
};
const travelTypeTableId = {
  [TRAVEL_TYPES.arrival]: '#grdDolas',
  [TRAVEL_TYPES.departure]: '#grdPolasci',
};

export default class BAS {

  constructor() {
    // Hardcoded - Serbia
    this.countryId = _.findWhere(countriesJson, { id: '9' }).id;
  }

  /**
   * Gets the data about arrivals/departures
   * @param  {TRAVEL_TYPES} opts.travelType       - arrivals or departures
   * @param  {String}       opts.place            - Place text to search for
   * @param  {String}       opts.date             - in format 'MM/DD/YYYY', default is current day
   * @param  {Function}     callback
   */
  getData(opts, callback) {
    this.date = opts.date || moment().format('MM/DD/YYYY');
    this.chosenTravelType = opts.travelType || TRAVEL_TYPES.departure;
    this.place = opts.place;

    if (!opts.place) {
      throw new Error('BAS constructor: place must be provided');
    }

    this.nightmare = new Nightmare({ show: false });
    this.scrapeData(callback);
  }

  scrapeData(callback) {
    const that = this;
    vo(function *scrape() {
      const chosenTravelTypeId = travelTypeRadioId[that.chosenTravelType];
      const chosenTravelTypeTableId = travelTypeTableId[that.chosenTravelType];

      const link = yield that.nightmare
        .goto('http://www.bas.rs/redvoznje.aspx?lng=sl')
        .click(`${chosenTravelTypeId} + label`)
        .select('select[name="ddlDani"]', that.date)
        .select('select[name="ddlDrzava"]', that.countryId)
        .type('input[name="txtOdredSrch"]', that.place)
        .click('#btnTraziPD')
        .wait(1000)
        .evaluate(that.onScrapeCompleted, chosenTravelTypeTableId);
      yield that.nightmare.end();
      return link;
    })((err, results) => {
      if (err) return callback(err);
      callback(results);
    });
  }

  /**
   * Function that executes inside the browser, to get the data from the page
   * @param  {String} travelType Id of the table to search data in
   */
  onScrapeCompleted(travelType) {
    'use strict';

    if (document.querySelector('.modalPopup #txtPoruka')) {
      return {
        error: document.querySelector('.modalPopup #txtPoruka').value,
      };
    }

    return [].slice.call(document.querySelectorAll(`${travelType} tr`)).slice(1).map((row) => {
      let obj;
      const tds = [].slice.call(row.querySelectorAll('td'));
      if (travelType === '#grdDolas') {
        obj = {
          arriavalTime: tds[0].innerHTML,
          departureTime: tds[1].innerHTML,
          departureStation: tds[2].innerHTML,
          via: tds[3].innerHTML,
          company: tds[4].innerHTML,
        };
      } else {
        obj = {
          departureTime: tds[0].innerHTML,
          arriavalTime: tds[1].innerHTML,
          returnTicketAvailable: tds[2].innerHTML,
          platform: tds[3].innerHTML,
          distance: tds[4].innerHTML,
          departureStation: tds[5].innerHTML,
          via: tds[6].innerHTML,
          company: tds[7].innerHTML,
        };
      }

      return obj;
    });
  }
}

