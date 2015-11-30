/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes, Component } from 'react';
import ReactDOM from 'react-dom';
import withStyles from '../../decorators/withStyles';
import styles from './SearchPage.scss';
import _ from 'lodash';
import foldToAscii from 'fold-to-ascii';

const AutoComplete = require('material-ui/lib/auto-complete');

import placesJson from '../../data/places';

let allPlaces = _.pluck(placesJson, 'First');

@withStyles(styles)
class SearchPage extends Component {

  static contextTypes = {
    onSetTitle: PropTypes.func.isRequired,
  };

  state = {
    places: []
  };

  constructor(props) {
    super(props);
  }

  onClickSearch(e) {
    console.log(ReactDOM.findDOMNode(this.refs.placesSelect).value);
  }

  onPlaceChange(text) {
    this.setState({
      places: _.take(allPlaces.filter(this.onPlaceFilter.bind(this, text)), 10)
    })
  }

  onPlaceFilter(q, place) {
    return foldToAscii.fold(place.toLowerCase()).indexOf(foldToAscii.fold(q).toLowerCase()) === 0;
  }

  onNewRequest(r) {
    console.log(r);
  }

  render() {
    const title = 'Search';
    this.context.onSetTitle(title);
    return (
      <div className="SearchPage">
        <div className="SearchPage-container">
          <h1>{title}</h1>

          <AutoComplete
            animated={false}
            hintText = "Mesto"
            dataSource= {this.state.places}
            onUpdateInput={this.onPlaceChange.bind(this)}
            filter={this.onPlaceFilter.bind(this)}
            onNewRequest={this.onNewRequest.bind(this)}
             />

          <button onClick={this.onClickSearch.bind(this)}>Search</button>
          <p>...</p>
        </div>
      </div>
    );
  }

}

export default SearchPage;
