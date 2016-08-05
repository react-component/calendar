/* eslint react/no-multi-comp:0, no-console:0 */

import 'rc-calendar/assets/index.less';
import RangeCalendar from 'rc-calendar/src/RangeCalendar';
import React from 'react';
import ReactDOM from 'react-dom';
import Picker from 'rc-calendar/src/Picker';

import 'rc-time-picker/assets/index.css';

import zhCN from 'rc-calendar/src/locale/zh_CN';
import enUS from 'rc-calendar/src/locale/en_US';
import 'rc-time-picker/assets/index.css';
import TimePickerPanel from 'rc-time-picker/lib/Panel';

import moment from 'moment';
import 'moment/locale/zh-cn';
import 'moment/locale/en-gb';

const formatStr = 'YYYY-MM-DD HH:mm:ss';
const cn = location.search.indexOf('cn') !== -1;

const now = moment();
if (cn) {
  now.locale('zh-cn').utcOffset(8);
} else {
  now.locale('en-gb').utcOffset(0);
}

const defaultCalendarValue = now.clone();
defaultCalendarValue.add(-1, 'month');

const timePickerElement = <TimePickerPanel />;

function disabledDate(current) {
  const date = moment();
  date.hour(0);
  date.minute(0);
  date.second(0);
  return current.isBefore(date);  // can not select days before today
}

function format(v) {
  return v ? v.format(formatStr) : '';
}

function isValidRange(v) {
  return v && v[0] && v[1];
}

function onStandaloneChange(value) {
  console.log('onChange');
  console.log(value[0] && format(value[0]), value[1] && format(value[1]));
}

function onStandaloneSelect(value) {
  console.log('onSelect');
  console.log(format(value[0]), format(value[1]));
}

const Test = React.createClass({
  getInitialState() {
    return {
      value: [],
    };
  },

  onChange(value) {
    this.setState({ value });
  },

  render() {
    const state = this.state;
    const calendar = (
      <RangeCalendar
        showWeekNumber={false}
        dateInputPlaceholder={['start', 'end']}
        defaultValue={[now, now]}
        locale={cn ? zhCN : enUS}
        disabledDate={disabledDate}
        timePicker={timePickerElement}
      />
    );
    return (<Picker
      value={state.value}
      onChange={this.onChange}
      animation="slide-up"
      calendar={calendar}
    >
      {
        ({ value }) => {
          return (<span>
                <input
                  placeholder="please select"
                  style={{ width: 350 }}
                  disabled={state.disabled}
                  readOnly
                  className="ant-calendar-picker-input ant-input"
                  value={isValidRange(value) && `${format(value[0])} - ${format(value[1])}` || ''}
                />
                </span>);
        }
      }
    </Picker>);
  },
});

ReactDOM.render(
  <div>
    <h2>calendar (zh-cn)</h2>
    <div style={{ margin: 10 }}>
      <RangeCalendar
        showWeekNumber
        defaultValue={now}
        dateInputPlaceholder={['start', 'end']}
        locale={cn ? zhCN : enUS}
        showOk={false}
        showClear
        format={formatStr}
        onChange={onStandaloneChange}
        onSelect={onStandaloneSelect}
        disabledDate={disabledDate}
        timePicker={timePickerElement}
      />
    </div>
    <br/>

    <div style={{ margin: 20 }}>
      <Test />
    </div>
  </div>, document.getElementById('__react-content'));
