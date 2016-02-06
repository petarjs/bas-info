/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { Component } from 'react';
import styles from './Feedback.scss';
import withStyles from '../../decorators/withStyles';

@withStyles(styles)
class Feedback extends Component {

  render() {
    return (
      <div className="Feedback">
        <div className="Feedback-container">
          <a className="Feedback-link" href="https://github.com/petarslovic/bas-info/issues/new">Postavite pitanje</a>
          <span className="Feedback-spacer">|</span>
          <a className="Feedback-link" href="https://github.com/petarslovic/bas-info/issues/new">Prijavite gresku</a>
        </div>
      </div>
    );
  }

}

export default Feedback;
