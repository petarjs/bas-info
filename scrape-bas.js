'use strict';

const Nightmare = require('nightmare');
const vo = require('vo');
const _ = require('lodash');
const moment = require('moment');

const countriesJson = require('./src/data/countries.json');
const placesJson = require('./src/data/places.json');

const TRAVEL_TYPE = {
  ARRIVAL: 'arrival',
  DEPARTURE: 'departure',
};

const travelTypeRadioId = {
  [TRAVEL_TYPE.ARRIVAL]: '#rbDolasci',
  [TRAVEL_TYPE.DEPARTURE]: '#rbPolasci',
};
const travelTypeTableId = {
  [TRAVEL_TYPE.ARRIVAL]: '#grdDolas',
  [TRAVEL_TYPE.DEPARTURE]: '#grdPolasci',
};

vo(function *scrape() {
  const chosenTravelType = TRAVEL_TYPE.DEPARTURE;

  const chosenTravelTypeId = travelTypeRadioId[chosenTravelType];
  const chosenTravelTypeTableId = travelTypeTableId[chosenTravelType];
  const countryId = _.findWhere(countriesJson, { id: '9' }).id;
  const placeText = _.findWhere(placesJson, { Second: '1131' }).First;
  const date = moment().add(1, 'days').format('MM/DD/YYYY');

  const nightmare = new Nightmare({ show: true });
  const link = yield nightmare
    .goto('http://www.bas.rs/redvoznje.aspx?lng=sl')
    .click(`${chosenTravelTypeId} + label`)
    .select('select[name="ddlDani"]', date)
    .select('select[name="ddlDrzava"]', countryId)
    .type('input[name="txtOdredSrch"]', placeText)
    .click('#btnTraziPD')
    .wait(chosenTravelTypeTableId)
    .evaluate((travelType) => {
      'use strict';
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
    }, chosenTravelTypeTableId);
  yield nightmare.end();
  return link;
})((err, results) => {
  if (err) return console.log(err);
  console.log(results);
});
