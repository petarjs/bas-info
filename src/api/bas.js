import { Router } from 'express';
import _ from 'lodash';

import BAS from '../services/bas';
import TRAVEL_TYPES from '../constants/travel-types';
import placesJson from '../data/places';

const router = new Router();
const bas = new BAS();

router.get('/', async (req, res, next) => {
  try {
    const travelType = req.query.travelType;
    const placeText = req.query.place;
    const date = req.query.date;

    if (!placeText || placeText === 'undefined') {
      return res.status(400).send({error: `The 'place' query parameter cannot be empty.`});
    }

    if (travelType && !(travelType in TRAVEL_TYPES)) {
      return res.status(400).send({error: `The 'travelType' query parameter is not valid.`});
    }

    const place = _.findWhere(placesJson, {
      First: placeText,
    });
    if (!place) {
      return res.status(400).send({error: `The 'place' query parameter is not valid.`});
    }

    bas.getData({
      place: place.First,
      travelType: travelType,
      date: date,
    }, (results) => res.status(200).send(results));
  } catch (err) {
    next(err);
  }
});

export default router;

