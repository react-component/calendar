/* eslint react/no-multi-comp:0, no-console:0 */

import '../assets/index.less';
import React from 'react';
import moment from 'moment';
import MonthCalendar from '../src/MonthCalendar';
import DatePicker from '../src/Picker';

import zhCN from '../src/locale/zh_CN';
import enUS from '../src/locale/en_US';

import 'moment/locale/zh-cn';
import 'moment/locale/en-gb';

const format = 'YYYY-MM';
const cn = window.location.search.indexOf('cn') !== -1;

const now = moment();
if (cn) {
  now.locale('zh-cn').utcOffset(8);
} else {
  now.locale('en-gb').utcOffset(0);
}

const defaultCalendarValue = now.clone();
defaultCalendarValue.add(-1, 'month');

class Demo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      disabled: false,
      value: props.defaultValue,
    };
  }

  onChange = value => {
    console.log(`DatePicker change: ${value && value.format(format)}`);
    this.setState({
      value,
    });
  };

  toggleDisabled = () => {
    const { disabled } = this.state;
    this.setState({
      disabled: !disabled,
    });
  };

  render() {
    const { state } = this;
    const calendar = <MonthCalendar locale={cn ? zhCN : enUS} style={{ zIndex: 1000 }} />;
    return (
      <div style={{ width: 240, margin: 20 }}>
        <div style={{ marginBottom: 10 }}>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <label htmlFor="disabled">
            <input
              id="disabled"
              checked={state.disabled}
              onChange={this.toggleDisabled}
              type="checkbox"
            />{' '}
            disabled
          </label>
        </div>
        <div
          style={{
            boxSizing: 'border-box',
            position: 'relative',
            display: 'block',
            lineHeight: 1.5,
            marginBottom: 22,
          }}
        >
          <DatePicker
            animation="slide-up"
            disabled={state.disabled}
            calendar={calendar}
            value={state.value}
            onChange={this.onChange}
          >
            {({ value }) => (
              <input
                style={{ width: 200 }}
                readOnly
                disabled={state.disabled}
                value={value && value.format(format)}
                placeholder="请选择日期"
              />
            )}
          </DatePicker>
        </div>
      </div>
    );
  }
}

function onStandaloneSelect(value) {
  console.log('month-calendar select', value && value.format(format));
}

function onStandaloneChange(value) {
  console.log('month-calendar change', value && value.format(format));
}

function disabledDate(value) {
  return value.year() > now.year() || (value.year() === now.year() && value.month() > now.month());
}

function onMonthCellContentRender(value) {
  // console.log('month-calendar onMonthCellContentRender', (value && value.format(format)));
  return `${value.month() + 1}月`;
}

export default () => (
  <div
    style={{
      zIndex: 1000,
      position: 'relative',
      width: 600,
      margin: '0 auto',
    }}
  >
    <MonthCalendar
      locale={cn ? zhCN : enUS}
      style={{ zIndex: 1000 }}
      disabledDate={disabledDate}
      onSelect={onStandaloneSelect}
      onChange={onStandaloneChange}
      monthCellContentRender={onMonthCellContentRender}
      defaultValue={defaultCalendarValue}
      renderFooter={() => 'extra footer'}
    />

    <div style={{ marginTop: 200 }}>
      <Demo defaultValue={now} />
    </div>
  </div>
);
