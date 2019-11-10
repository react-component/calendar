/* eslint react/no-multi-comp:0, no-console:0 */

import '../assets/index.less';
import React from 'react';
import moment from 'moment';
import TimePickerPanel from 'rc-time-picker/lib/Panel';

import Calendar from '../src';
import DatePicker from '../src/Picker';

import zhCN from '../src/locale/zh_CN';
import enUS from '../src/locale/en_US';
import 'rc-time-picker/assets/index.css';

import 'moment/locale/zh-cn';
import 'moment/locale/en-gb';

const format = 'YYYY-MM-DD HH:mm:ss';
const cn = window.location.search.indexOf('cn') !== -1;

const now = moment();
if (cn) {
  now.locale('zh-cn').utcOffset(8);
} else {
  now.locale('en-gb').utcOffset(0);
}

function getFormat(time) {
  return time ? format : 'YYYY-MM-DD';
}

const defaultCalendarValue = now.clone();
defaultCalendarValue.add(-1, 'month');

const timePickerElement = <TimePickerPanel />;

const SHOW_TIME = true;

const Picker = props => {
  const calendar = (
    <Calendar
      locale={cn ? zhCN : enUS}
      defaultValue={now}
      timePicker={props.showTime ? timePickerElement : null}
      disabledDate={props.disabledDate}
    />
  );
  return (
    <DatePicker
      animation="slide-up"
      disabled={props.disabled}
      calendar={calendar}
      value={props.value}
      onChange={props.onChange}
    >
      {({ value }) => (
        <span>
          <input
            placeholder="请选择日期"
            style={{ width: 250 }}
            disabled={props.disabled}
            readOnly
            value={(value && value.format(getFormat(props.showTime))) || ''}
          />
        </span>
      )}
    </DatePicker>
  );
};

class Demo extends React.Component {
  state = {
    startValue: null,
    endValue: null,
  };

  onChange = (field, value) => {
    console.log('onChange', field, value && value.format(getFormat(SHOW_TIME)));
    this.setState({
      [field]: value,
    });
  };

  disabledEndDate = endValue => {
    if (!endValue) {
      return false;
    }
    const { startValue } = this.state;
    if (!startValue) {
      return false;
    }
    return SHOW_TIME ? endValue.isBefore(startValue) : endValue.diff(startValue, 'days') <= 0;
  };

  disabledStartDate = startValue => {
    if (!startValue) {
      return false;
    }
    const { endValue } = this.state;
    if (!endValue) {
      return false;
    }
    return SHOW_TIME ? endValue.isBefore(startValue) : endValue.diff(startValue, 'days') <= 0;
  };

  render() {
    const { state } = this;
    return (
      <div style={{ width: 240, margin: 20 }}>
        <p>
          开始时间：
          <Picker
            disabledDate={this.disabledStartDate}
            value={state.startValue}
            onChange={value => this.onChange('startValue', value)}
          />
        </p>

        <p>
          结束时间：
          <Picker
            disabledDate={this.disabledEndDate}
            value={state.endValue}
            onChange={value => this.onChange('endValue', value)}
          />
        </p>
      </div>
    );
  }
}

export default Demo;
