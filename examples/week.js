/* eslint react/no-multi-comp:0, no-console:0 */

import 'rc-calendar/assets/index.less';
import React from 'react';
import ReactDOM from 'react-dom';
import Calendar from 'rc-calendar';
import DatePicker from 'rc-calendar/src/Picker';
import zhCN from 'rc-calendar/src/locale/zh_CN';
import enUS from 'rc-calendar/src/locale/en_US';

import moment from 'moment';
import 'moment/locale/zh-cn';
import 'moment/locale/en-gb';

const format = 'YYYY-Wo';
const cn = location.search.indexOf('cn') !== -1;

const now = moment();
if (cn) {
  now.locale('zh-cn').utcOffset(8);
} else {
  now.locale('en-gb').utcOffset(0);
}

const style = `
.week-calendar {
  width: 386px;
}
.week-calendar .rc-calendar-tbody > tr:hover
.rc-calendar-date {
  background: #ebfaff;
}

.week-calendar .rc-calendar-tbody > tr:hover
.rc-calendar-selected-day .rc-calendar-date {
    background: #3fc7fa;
}

.week-calendar .week-calendar-sidebar {
  position:absolute;
  top:0;
  left:0;
  bottom:0;
  width:100px;
  border-right: 1px solid #ccc;
}
.week-calendar .rc-calendar-panel {
  margin-left: 100px;
}
`;

const Test = React.createClass({
  propTypes: {
    defaultValue: React.PropTypes.object,
    defaultCalendarValue: React.PropTypes.object,
  },

  getInitialState() {
    return {
      value: undefined,
      open: false,
    };
  },

  onChange(value) {
    console.log('DatePicker change: ', (value && value.format(format)));
    this.setState({
      value,
    });
  },

  onOpenChange(open) {
    this.setState({
      open,
    });
  },

  dateRender(current) {
    const selectedValue = this.state.value;
    if (selectedValue && current.year() === selectedValue.year() &&
      current.week() === selectedValue.week()) {
      return (<div className="rc-calendar-selected-day">
        <div className="rc-calendar-date">
          {current.date()}
        </div>
      </div>);
    }
    return (
      <div className="rc-calendar-date">
        {current.date()}
      </div>);
  },

  lastWeek() {
    const value = this.state.value || now;
    value.add(-1, 'weeks');
    this.setState({
      value,
      open: false,
    });
  },

  renderSidebar() {
    return (
      <div className="week-calendar-sidebar" key="sidebar">
        <button onClick={this.lastWeek} style={{ margin: 20 }}>上一周</button>
      </div>);
  },

  render() {
    const state = this.state;
    const calendar = (
      <Calendar
        className="week-calendar"
        showWeekNumber
        renderSidebar={this.renderSidebar}
        dateRender={this.dateRender}
        locale={cn ? zhCN : enUS}
        format={format}
        style={{ zIndex: 1000 }}
        dateInputPlaceholder="please input"
        defaultValue={now}
        showDateInput
      />);
    return (<div style={{ width: 400, margin: 20 }}>
      <div style={{
        boxSizing: 'border-box',
        position: 'relative',
        display: 'block',
        lineHeight: 1.5,
        marginBottom: 22,
      }}
      >
        <DatePicker
          onOpenChange={this.onOpenChange}
          open={this.state.open}
          animation="slide-up"
          calendar={calendar}
          value={state.value}
          onChange={this.onChange}
        >
          {
            ({ value }) => {
              return (
                <span tabIndex="0">
                <input
                  placeholder="please select week"
                  style={{ width: 250 }}
                  disabled={state.disabled}
                  readOnly
                  tabIndex="-1"
                  className="ant-calendar-picker-input ant-input"
                  value={value && value.format(format) || ''}
                />
                </span>
              );
            }
          }
        </DatePicker>
      </div>
    </div>);
  },
});

ReactDOM.render((<div
  style={{
    zIndex: 1000,
    position: 'relative',
    width: 900,
    margin: '20px auto',
  }}
>
  <style dangerouslySetInnerHTML={{ __html: style }} />
  <div>
    <Test />
  </div>
</div>), document.getElementById('__react-content'));
