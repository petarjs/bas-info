import farmhash from 'farmhash';
export default class BusLine {
  static getHash(travelType, station, date) {
    return farmhash.hash32(`${travelType}-${station}-${date}`);
  }
}
