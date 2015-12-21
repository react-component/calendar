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
import assign from 'object-assign';
import TimePickerLocale from 'rc-time-picker/lib/locale/zh_CN';

import 'rc-time-picker/assets/index.css';
import TimePicker from 'rc-time-picker';
const timePickerElement = <TimePicker locale={TimePickerLocale}/>;

function disabledTime(date) {
  if (date && (date.getDayOfMonth() === 15)) {
    return {
      disabledHours() {
        return [3, 4];
      },
    };
  }
  return {
    disabledHours() {
      return [1, 2];
    },
  };
}

const now = new GregorianCalendar(zhCn);
now.setTime(Date.now());

// change locale
const CalendarLocale2 = assign({}, CalendarLocale, {
  monthFormat: 'MMMM',
});

const dateFormatter = new DateTimeFormat('yyyy-MM-dd');
const formatter = new DateTimeFormat('yyyy-MM-dd HH:mm:ss');

function getFormatter(showTime) {
  return showTime ? formatter : dateFormatter;
}

const defaultCalendarValue = new GregorianCalendar(zhCn);
defaultCalendarValue.setTime(Date.now());
defaultCalendarValue.addMonth(-1);

function disabledDate(current) {
  if (!current) {
    // allow empty select
    return false;
  }
  const date = new Date();
  date.setHours(0);
  date.setMinutes(0);
  date.setSeconds(0);
  return current.getYear() + 10 < date.getFullYear();  // can not select days before today
}

const Test = React.createClass({
  propTypes: {
    defaultValue: React.PropTypes.object,
    defaultCalendarValue: React.PropTypes.object,
  },

  getInitialState() {
    return {
      showTime: true,
      showDateInput: true,
      disabled: false,
      value: this.props.defaultValue,
    };
  },

  onChange(value) {
    console.log('DatePicker change: ' + (value && formatter.format(value)));
    this.setState({value});
  },

  onShowTimeChange(e) {
    this.setState({
      showTime: e.target.checked,
    });
  },

  onShowDateInputChange(e) {
    this.setState({
      showDateInput: e.target.checked,
    });
  },

  toggleDisabled() {
    this.setState({
      disabled: !this.state.disabled,
    });
  },

  render() {
    const state = this.state;
    const calendar = (<Calendar locale={CalendarLocale2}
                             style={{zIndex: 1000}}
                             dateInputPlaceholder="请输入"
                             disabledTime={state.showTime ? disabledTime : null}
                             timePicker={state.showTime ? timePickerElement : null}
                             defaultValue={this.props.defaultCalendarValue}
                             showOk
                             showDateInput={state.showDateInput}
                             disabledDate={disabledDate}
    />);
    return (<div style={{width: 400, margin: 20}}>
      <div style={{marginBottom: 10}}>
        <label>
          <input type="checkbox" checked={state.showTime} onChange={this.onShowTimeChange}/>
          showTime
        </label>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <label>
          <input type="checkbox" checked={state.showDateInput} onChange={this.onShowDateInputChange}/>
          showDateInput
        </label>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <label><input checked={state.disabled} onChange={this.toggleDisabled} type="checkbox"/> disabled </label>
      </div>
      <div style={{
        'boxSizing': 'border-box',
        'position': 'relative',
        'display': 'block',
        'lineHeight': 1.5,
        marginBottom: 22,
      }}>
        <DatePicker
          animation="slide-up"
          disabled={state.disabled}
          calendar={calendar}
          value={state.value}
          onChange={this.onChange}>
          {
            ({value})=> {
              return (
                <span>
                <input placeholder="请选择日期" style={{width: 250}}
                       disabled={state.disabled}
                       readOnly
                       className="ant-calendar-picker-input ant-input"
                       value={value && getFormatter(state.showTime).format(value)}/>
                </span>
              );
            }
          }
        </DatePicker>
      </div>
    </div>);
  },
});

function onStandaloneSelect(value) {
  console.log('onStandaloneSelect');
  console.log(value && formatter.format(value));
}

function onStandaloneChange(value) {
  console.log('onStandaloneChange');
  console.log(value && formatter.format(value));
}


ReactDOM.render((<div style={{zIndex: 1000, position: 'relative', width: 900, margin: '20px auto'}}>
  <h2>zh-cn</h2>

  <div>
    <div style={{margin: 10}}>
      <Calendar showWeekNumber={false}
                locale={CalendarLocale}
                defaultValue={now}
                showOk
                disabledTime={disabledTime}
                showToday
                timePicker={timePickerElement}
                onChange={onStandaloneChange}
                disabledDate={disabledDate}
                onSelect={onStandaloneSelect}/>
    </div>
    <div style={{float: 'left', width: 300}}>
      <Test defaultValue={now}/>
    </div>
    <div style={{float: 'right', width: 300}}>
      <Test defaultCalendarValue={defaultCalendarValue}/>
    </div>
    <div style={{clear: 'both'}}></div>
  </div>
</div>), document.getElementById('__react-content'));
