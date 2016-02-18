/* eslint react/no-multi-comp:0, no-console:0 */

import 'rc-calendar/assets/index.less';
import RangeCalendar from 'rc-calendar/src/RangeCalendar';
import GregorianCalendarFormat from 'gregorian-calendar-format';
import React from 'react';
import ReactDOM from 'react-dom';
const formatter = new GregorianCalendarFormat('yyyy-MM-dd HH:mm:ss');
import GregorianCalendar from 'gregorian-calendar';
import zhCn from 'gregorian-calendar/lib/locale/zh_CN';
import CalendarLocale from 'rc-calendar/src/locale/zh_CN';
import TimePickerLocale from 'rc-time-picker/lib/locale/zh_CN';
import Picker from 'rc-calendar/src/Picker';

import 'rc-time-picker/assets/index.css';
import TimePicker from 'rc-time-picker';
const timePickerElement = <TimePicker placeholder="请选择时间" locale={TimePickerLocale}/>;

const now = new GregorianCalendar(zhCn);
now.setTime(Date.now());

function disabledDate(current) {
  const date = new Date();
  date.setHours(0);
  date.setMinutes(0);
  date.setSeconds(0);
  return current.getTime() < date.getTime();  // can not select days before today
}

function format(v) {
  return v ? formatter.format(v) : '';
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
    this.setState({value});
  },

  render() {
    const state = this.state;
    const calendar = (
      <RangeCalendar showWeekNumber={false}
                     dateInputPlaceholder={['开始日期', '结束日期']}
                     defaultValue={[now, now]}
                     locale={CalendarLocale}
                     disabledDate={disabledDate}
                     timePicker={timePickerElement}/>
    );
    return (<Picker value={state.value}
                    onChange={this.onChange}
                    animation="slide-up"
                    calendar={calendar}>
      {
        ({value}) => {
          return (<span>
                <input placeholder="请选择日期" style={{width: 350}}
                       disabled={state.disabled}
                       readOnly
                       className="ant-calendar-picker-input ant-input"
                       value={isValidRange(value) && (format(value[0]) + ' - ' + format(value[1]))}/>
                </span>);
        }
      }
    </Picker>);
  },
});

ReactDOM.render(
  <div>
    <h2>calendar (zh-cn)</h2>
    <div style={{margin: 10}}>
      <RangeCalendar showWeekNumber
                     defaultValue={now}
                     dateInputPlaceholder={['开始日期', '结束日期']}
                     locale={CalendarLocale}
                     showOk={false}
                     onChange={onStandaloneChange}
                     onSelect={onStandaloneSelect}
                     disabledDate={disabledDate}
                     timePicker={timePickerElement}/>
    </div>
    <br/>

    <div style={{margin: 20}}>
      <Test />
    </div>
  </div>, document.getElementById('__react-content'));
