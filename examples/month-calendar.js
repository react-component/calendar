import 'rc-calendar/assets/index.less';
import React from 'react';
import MonthCalendar from 'rc-calendar/src/MonthCalendar';
import DatePicker from 'rc-calendar/src/Picker';
import zhCn from 'gregorian-calendar/lib/locale/zh-cn'; // spm error
import DateTimeFormat from 'gregorian-calendar-format';
import GregorianCalendar from 'gregorian-calendar';
import CalendarLocale from 'rc-calendar/src/locale/zh-cn';
var now = new GregorianCalendar(zhCn);
now.setTime(Date.now());

var defaultCalendarValue = new GregorianCalendar(zhCn);
defaultCalendarValue.setTime(Date.now());
defaultCalendarValue.addMonth(-1);

var Test = React.createClass({
  handleChange(value) {
    console.log('DatePicker change: ' + (value && this.props.formatter.format(value)));
  },

  handleCalendarSelect(value) {
    console.log('calendar select: ' + (value && this.props.formatter.format(value)));
    // controlled value
    this.setState({
      time: Date.now(),
      value: value
    });
  },

  handleCalendarOk(value) {
    console.log('calendar ok: ' + (value && this.props.formatter.format(value)));
    // controlled value
    this.setState({
      time: Date.now(),
      value: value
    });
  },

  getDefaultProps() {
    return {
      formatter: new DateTimeFormat('yyyy-MM')
    }
  },

  getInitialState() {
    return {
      time: Date.now(),
      showTime: true,
      disabled: false,
      value: this.props.defaultValue
    };
  },

  handleShowTimeChange(e) {
    this.setState({
      showTime: e.target.checked
    });
  },

  toggleDisabled(){
    this.setState({
      disabled: !this.state.disabled
    });
  },

  render() {
    var state = this.state;
    var calendar = <MonthCalendar locale={CalendarLocale}
                                  style={{zIndex:1000}}
                                  orient={['top', 'left']}
                                  defaultValue={defaultCalendarValue}/>;
    return (<div style={{width: 240, margin: 20}} data-time={this.state.time}>
      <div style={{marginBottom:10}}>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <label><input checked={state.disabled} onChange={this.toggleDisabled} type='checkbox'/> disabled </label>
      </div>
      <div style={{
        'boxSizing': 'border-box',
        'position': 'relative',
        'display': 'block',
        'lineHeight': 1.5,
        marginBottom: 22
      }}>
        <DatePicker
          adjustOrientOnCalendarOverflow={true}
          animation="slide-up"
          disabled={state.disabled}
          trigger={<span className="rc-calendar-picker-icon" />}
          formatter={this.props.formatter} calendar={calendar}
          value={state.value} onChange={this.handleChange}>
          <input className="rc-calendar-picker-input" style={{width:200}} disabled={state.disabled}
                 placeholder="请选择日期"/>
        </DatePicker>
      </div>
    </div>);
  }
});

function onSelect(value){
  console.log('month-calendar select',value);
}

function onChange(value){
  console.log('month-calendar change',value);
}

function disabledDate(value){
  return value.getTime()>Date.now();
}

React.render(
  <div style={{zIndex:1000,position:'relative',width:600,margin:'0 auto'}}>
    <h2>zh-cn</h2>
    <MonthCalendar locale={CalendarLocale}
                   style={{zIndex:1000}}
                   orient={['top', 'left']}
                   disabledDate={disabledDate}
                   onSelect={onSelect}
                   onChange={onChange}
                   defaultValue={defaultCalendarValue}/>
    <div style={{marginTop:200}}>
      <Test defaultValue={now}/>
    </div>
  </div>
  , document.getElementById('__react-content'));
