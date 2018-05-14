/* eslint react/no-multi-comp:0, no-console:0 */

import React from 'react';
import ReactDOM from 'react-dom';
import RangeCalendar from 'rc-calendar/src/RangeCalendar';
import zhCN from 'rc-calendar/src/locale/zh_CN';
import enUS from 'rc-calendar/src/locale/en_US';
import 'rc-calendar/assets/index.less';
import 'rc-time-picker/assets/index.css';

import moment from 'moment';
import 'moment/locale/zh-cn';
import 'moment/locale/en-gb';

const cn = location.search.indexOf('cn') !== -1;

const formatStr = 'YYYY-MM-DD';

class Demo extends React.Component {
  state = {
    value: [],
  };

  onChange = (value) => {
    this.setState({ value });
  };

  disabledDateWeekly = (current, hoverValue) => {
    const date = moment().startOf('day');
    const currentDate = current.startOf('day');
    if (currentDate.isBefore(date)) {
      return true;
    } else if (hoverValue && hoverValue.length !== 0) {
      if ((currentDate.diff(hoverValue[0].startOf('day'), 'days') % 7) !== 0) {
        return true;
      }
    }
  };

  dateRender = (current) => {
    const currentDate = current.startOf('day');
    const selectedValue = this.state.value;
    if (selectedValue.length === 2) {
      const start = selectedValue[0].startOf('day');
      const end = selectedValue[1].startOf('day');
      if (currentDate > start && currentDate < end
        && ((currentDate.diff(start, 'days') % 7) === 0)) {
        return (
          <div className="rc-calendar-selected-day">
            <div className="rc-calendar-date">
              {currentDate.date()}
            </div>
          </div>);
      }
    }
    return (
      <div className="rc-calendar-date">
        {currentDate.date()}
      </div>);
  };

  render() {
    return (
      <div>
        <h2>calendar</h2>
        <div style={{ margin: 10 }}>
          <RangeCalendar
            onChange={this.onChange}
            dateInputPlaceholder={['start', 'end']}
            locale={cn ? zhCN : enUS}
            format={formatStr}
            disabledDate={(current, value, hoverValue) =>
              this.disabledDateWeekly(current, hoverValue)}
            dateRender={(current) => this.dateRender(current)}
          />
        </div>
      </div>);
  }
}

ReactDOM.render(
  <div>
    <Demo />
  </div>, document.getElementById('__react-content'));
