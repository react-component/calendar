/* eslint react/no-multi-comp:0, no-console:0 */

import React from 'react';
import moment from 'moment';
import TimePickerPanel from 'rc-time-picker/lib/Panel';

import Picker from '../src/Picker';
import RangeCalendar from '../src/RangeCalendar';
import zhCN from '../src/locale/zh_CN';
import enUS from '../src/locale/en_US';
import '../assets/index.less';
import 'rc-time-picker/assets/index.css';

import 'moment/locale/zh-cn';
import 'moment/locale/en-gb';

const cn = window.location.search.indexOf('cn') !== -1;

if (cn) {
  moment.locale('zh-cn');
} else {
  moment.locale('en-gb');
}

const now = moment();
if (cn) {
  now.utcOffset(8);
} else {
  now.utcOffset(0);
}

const defaultCalendarValue = now.clone();
defaultCalendarValue.add(-1, 'month');

const timePickerElement = (
  <TimePickerPanel
    defaultValue={[moment('00:00:00', 'HH:mm:ss'), moment('23:59:59', 'HH:mm:ss')]}
  />
);

function newArray(start, end) {
  const result = [];
  for (let i = start; i < end; i += 1) {
    result.push(i);
  }
  return result;
}

function disabledDate(current) {
  const date = moment();
  date.hour(0);
  date.minute(0);
  date.second(0);
  return current.isBefore(date); // can not select days before today
}

function disabledTime(time, type) {
  console.log('disabledTime', time, type);
  if (type === 'start') {
    return {
      disabledHours() {
        const hours = newArray(0, 60);
        hours.splice(20, 4);
        return hours;
      },
      disabledMinutes(h) {
        if (h === 20) {
          return newArray(0, 31);
        }
        if (h === 23) {
          return newArray(30, 60);
        }
        return [];
      },
      disabledSeconds() {
        return [55, 56];
      },
    };
  }
  return {
    disabledHours() {
      const hours = newArray(0, 60);
      hours.splice(2, 6);
      return hours;
    },
    disabledMinutes(h) {
      if (h === 20) {
        return newArray(0, 31);
      }
      if (h === 23) {
        return newArray(30, 60);
      }
      return [];
    },
    disabledSeconds() {
      return [55, 56];
    },
  };
}

const formatStr = 'YYYY-MM-DD HH:mm:ss';
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

class Demo extends React.Component {
  state = {
    value: [],
    hoverValue: [],
    // control mode
    mode: ['date', 'date'],
  };

  onChange = value => {
    console.log('onChange', value);
    this.setState({ value });
  };

  onHoverChange = hoverValue => {
    this.setState({ hoverValue });
  };

  onPanelChange = (_, mode) => {
    console.log('onPanelChange', mode);
    this.setState({
      mode,
    });
  };

  render() {
    const { state } = this;
    const calendar = (
      <RangeCalendar
        hoverValue={state.hoverValue}
        onHoverChange={this.onHoverChange}
        showWeekNumber={false}
        dateInputPlaceholder={['start', 'end']}
        defaultValue={[now, now.clone().add(1, 'months')]}
        locale={cn ? zhCN : enUS}
        disabledTime={disabledTime}
        timePicker={timePickerElement}
        mode={this.state.mode}
        onPanelChange={this.onPanelChange}
      />
    );
    return (
      <Picker value={state.value} onChange={this.onChange} animation="slide-up" calendar={calendar}>
        {({ value }) => (
          <span>
            <input
              placeholder="please select"
              style={{ width: 350 }}
              disabled={state.disabled}
              readOnly
              className="ant-calendar-picker-input ant-input"
              value={(isValidRange(value) && `${format(value[0])} - ${format(value[1])}`) || ''}
            />
          </span>
        )}
      </Picker>
    );
  }
}

export default () => (
  <div>
    <h2>calendar</h2>
    <div style={{ margin: 10 }}>
      <RangeCalendar
        showToday={false}
        showWeekNumber
        dateInputPlaceholder={['start', 'end']}
        locale={cn ? zhCN : enUS}
        showOk={false}
        showClear
        format={formatStr}
        onChange={onStandaloneChange}
        onSelect={onStandaloneSelect}
        disabledDate={disabledDate}
        timePicker={timePickerElement}
        disabledTime={disabledTime}
        renderFooter={() => <span>extra footer</span>}
        // onPanelChange={(_,mode) => {
        //   console.log("onPanelChange", mode);
        // }}
      />
    </div>
    <br />

    <div style={{ margin: 20 }}>
      <Demo />
    </div>
  </div>
);
