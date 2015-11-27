import 'rc-calendar/assets/index.less';
import React from 'react';
import ReactDOM from 'react-dom';
import Calendar from 'rc-calendar';
import DatePicker from 'rc-calendar/src/Picker';
import zhCn from 'gregorian-calendar/lib/locale/zh_CN'; // spm error
import DateTimeFormat from 'gregorian-calendar-format';
import GregorianCalendar from 'gregorian-calendar';
import CalendarLocale from 'rc-calendar/src/locale/zh_CN';

import 'rc-time-picker/assets/index.css';
import TimePicker from 'rc-time-picker';
const timePickerElement = <TimePicker />;

const formatter = new DateTimeFormat('yyyy-MM-dd HH:mm:ss');
const dateFormatter = new DateTimeFormat('yyyy-MM-dd');

function getFormatter(showTime) {
  return showTime ? formatter : dateFormatter;
}

var Picker = React.createClass({
  getDefaultProps() {
    return {
      showTime: true,
      disabled: false
    };
  },
  render() {
    const props = this.props;
    var calendar = <Calendar locale={CalendarLocale}
                             timePicker={props.showTime?timePickerElement:null}
                             showOk
                             disabledDate={props.disabledDate}
                             />;
    return <DatePicker
      animation="slide-up"
      disabled={props.disabled}
      calendar={calendar}
      value={props.value}
      onChange={props.onChange}>
      {
        ({value})=> {
          return (
            <span>
                <input placeholder="请选择日期" style={{width:250}}
                       disabled={props.disabled}
                       readOnly
                       value={value && getFormatter(props.showTime).format(value)}/>
                </span>
          );
        }
      }
    </DatePicker>;
  }
});

var Test = React.createClass({
  getInitialState() {
    return {
      startValue: null,
      endValue: null
    };
  },

  disabledEndDate(endValue) {
    if(!endValue){
      return false;
    }
    if (!this.state.startValue) {
      return false;
    }
    return endValue.getTime() <= this.state.startValue.getTime();
  },

  disabledStartDate(startValue) {
    if(!startValue){
      return false;
    }
    if (!this.state.endValue) {
      return false;
    }
    return startValue.getTime() >= this.state.endValue.getTime();
  },

  onChange(field, value) {
    console.log('onChange', field, value && getFormatter().format(value))
    this.setState({
      [field]: value,
    });
  },

  render() {
    var state = this.state;
    return <div style={{width: 240, margin: 20}}>
      <p>
        开始时间：
        <Picker disabledDate={this.disabledStartDate} value={state.startValue}
                onChange={this.onChange.bind(this,'startValue')}/>
      </p>

      <p>
        结束时间：
        <Picker disabledDate={this.disabledEndDate} value={state.endValue}
                onChange={this.onChange.bind(this,'endValue')}/>
      </p>
    </div>;
  }
});


ReactDOM.render(<Test />, document.getElementById('__react-content'));
