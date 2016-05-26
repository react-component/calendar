/* eslint react/no-multi-comp:0, no-console:0 */

import 'rc-calendar/assets/index.less';
import React from 'react';
import ReactDOM from 'react-dom';
import Calendar from 'rc-calendar';
import DatePicker from 'rc-calendar/src/Picker';
import zhCn from 'gregorian-calendar/lib/locale/zh_CN'; // spm error
import DateTimeFormat from 'gregorian-calendar-format';
import GregorianCalendar from 'gregorian-calendar';
import CalendarLocale from 'rc-calendar/src/locale/zh_CN';
import TimePickerLocale from 'rc-time-picker/lib/locale/zh_CN';
import 'rc-time-picker/assets/index.css';
import TimePicker from 'rc-time-picker';

const timePickerElement = <TimePicker locale={TimePickerLocale}/>;
const formatter = new DateTimeFormat('yyyy-MM-dd HH:mm:ss');
const dateFormatter = new DateTimeFormat('yyyy-MM-dd');
const SHOW_TIME = true;

const now = new GregorianCalendar(zhCn);
now.setTime(Date.now());

function getFormatter(showTime) {
  return showTime ? formatter : dateFormatter;
}

const Picker = React.createClass({
  getDefaultProps() {
    return {
      showTime: SHOW_TIME,
      disabled: false,
    };
  },
  render() {
    const props = this.props;
    const calendar = (<Calendar
      locale={CalendarLocale}
      defaultValue={now}
      timePicker={props.showTime ? timePickerElement : null}
      disabledDate={props.disabledDate}
    />);
    return (<DatePicker
      animation="slide-up"
      disabled={props.disabled}
      calendar={calendar}
      value={props.value}
      onChange={props.onChange}
    >
      {
        ({ value }) => {
          return (
            <span>
                <input
                  placeholder="请选择日期"
                  style={{ width: 250 }}
                  disabled={props.disabled}
                  readOnly
                  value={value && getFormatter(props.showTime).format(value) || ''}
                />
                </span>
          );
        }
      }
    </DatePicker>);
  },
});

const Test = React.createClass({
  getInitialState() {
    return {
      startValue: null,
      endValue: null,
    };
  },

  onChange(field, value) {
    console.log('onChange', field, value && getFormatter(SHOW_TIME).format(value));
    this.setState({
      [field]: value,
    });
  },

  disabledEndDate(endValue) {
    if (!endValue) {
      return false;
    }
    const startValue = this.state.startValue;
    if (!startValue) {
      return false;
    }
    // console.log(getFormatter(SHOW_TIME).format(startValue),
    // getFormatter(SHOW_TIME).format(endValue));
    return SHOW_TIME ? endValue.getTime() < startValue.getTime() :
    endValue.compareToDay(startValue) <= 0;
  },

  disabledStartDate(startValue) {
    if (!startValue) {
      return false;
    }
    const endValue = this.state.endValue;
    if (!endValue) {
      return false;
    }
    // console.log(getFormatter(SHOW_TIME).format(startValue),
    // getFormatter(SHOW_TIME).format(endValue));
    return SHOW_TIME ? endValue.getTime() < startValue.getTime() :
    startValue.compareToDay(endValue) >= 0;
  },

  render() {
    const state = this.state;
    return (<div style={{ width: 240, margin: 20 }}>
      <p>
        开始时间：
        <Picker
          disabledDate={this.disabledStartDate}
          value={state.startValue}
          onChange={this.onChange.bind(this, 'startValue')}
        />
      </p>

      <p>
        结束时间：
        <Picker
          disabledDate={this.disabledEndDate}
          value={state.endValue}
          onChange={this.onChange.bind(this, 'endValue')}
        />
      </p>
    </div>);
  },
});


ReactDOM.render(<Test />, document.getElementById('__react-content'));
