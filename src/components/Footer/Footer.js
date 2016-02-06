/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes, Component } from 'react';
import styles from './Footer.scss';
import withViewport from '../../decorators/withViewport';
import withStyles from '../../decorators/withStyles';
import Link from '../Link';

@withViewport
@withStyles(styles)
class Footer extends Component {

  static propTypes = {
    viewport: PropTypes.shape({
      width: PropTypes.number.isRequired,
      height: PropTypes.number.isRequired,
    }).isRequired,
  };

  render() {

    return (
      <div className="Footer">
        <div className="Footer-container">
          <span className="Footer-text">
            <a className="Footer-link" href="https://petarslovic.com">© Petar Slovic</a>
          </span>
          <span className="Footer-spacer">·</span>
          <span className="Footer-text">BAS Red Voznje</span>
        </div>
      </div>
    );
  }

}

export default Footer;
