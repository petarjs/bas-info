import React, { PropTypes, Component } from 'react';
import styles from './CalendarDisplay.scss';
import withStyles from '../../decorators/withStyles';
import moment from 'moment';

@withStyles(styles)
class CalendarDisplay extends Component {

  static propTypes = {
    month: PropTypes.string,
    day: PropTypes.string,
    date: PropTypes.string,
    format: PropTypes.string,
  };

  constructor() {
    super();
    this.date = {};
  }

  componentWillMount() {
    if (this.props.date && this.props.format) {
      const momentDate = moment(this.props.date, this.props.format);
      this.date.month = momentDate.format('MMM');
      this.date.day = momentDate.format('DD');
    } else {
      this.date.month = this.props.month;
      this.date.day = this.props.day;
    }
  }

  render() {
    return (
      <div className="CalendarDisplay">
        <div className="date">
          <span className="binds"></span>
          <span className="month">{this.date.month}</span>
          <h1 className="day">{this.date.day || 1}</h1>
        </div>
      </div>
    );
  }

}

export default CalendarDisplay;
