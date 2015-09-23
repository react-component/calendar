import 'rc-calendar/assets/index.less';
import React from 'react';
import Calendar from 'rc-calendar';
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


function disabledDate(current, value) {
  var date = new Date();
  date.setHours(0);
  date.setMinutes(0);
  date.setSeconds(0);
  return current.getTime() < date.getTime();  //can not select days before today
}

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
      formatter: new DateTimeFormat('yyyy-MM-dd HH:mm:ss')
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
    var calendar = <Calendar locale={CalendarLocale}
                             style={{zIndex:1000}}
                             orient={['top', 'left']}
                             defaultValue={defaultCalendarValue}
                             showTime={this.state.showTime}
                             showOk={true}
                             disabledDate={disabledDate}
                             onOk={this.handleCalendarOk}
                             onSelect={this.handleCalendarSelect}
                             onClear={this.handleCalendarSelect.bind(this, null)} showClear={true}/>;
    return <div style={{width: 240, margin: 20}} data-time={this.state.time}>
      <div style={{marginBottom:10}}>
        <span>
          <input type='checkbox' checked={this.state.showTime} onChange={this.handleShowTimeChange}/>
          showTime
        </span>
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
    </div>;
  }
});

React.render(<div style={{zIndex:1000,position:'relative'}}>
  <h2>zh-cn</h2>

  <div style={{marginTop:200,width:600}}>
    <div style={{float:'left',width:300}}>
      <Test defaultValue={now}/>
    </div>
    <div style={{float:'right',width:300}}>
      <Test/>
    </div>
    <div style={{clear:'both'}}></div>
  </div>
</div>, document.getElementById('__react-content'));
