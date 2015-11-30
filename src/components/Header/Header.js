/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { Component } from 'react';
import styles from './Header.scss';
import withStyles from '../../decorators/withStyles';
import Link from '../Link';
import Navigation from '../Navigation';
const AppBar = require('material-ui/lib/app-bar');

@withStyles(styles)
class Header extends Component {

  render() {
    return (
      <div className="Header">
        <div className="Header-container">
          <AppBar
            zDepth={0}
            showMenuIconButton={false}
            title={
              <a className="Header-brand" href="/" onClick={Link.handleClick}>
                <img className="Header-brandImg" src={require('./logo-small.png')} width="38" height="38" alt="React" />
                <span className="Header-brandTxt">BAS PS</span>
              </a>
            }
            iconClassNameRight="muidocs-icon-navigation-expand-more" />
        </div>
      </div>
    );
  }

}

export default Header;
