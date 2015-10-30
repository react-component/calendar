import 'rc-calendar/assets/index.less';
import React from 'react';
import ReactDOM from 'react-dom';
import Calendar from 'rc-calendar';
import DatePicker from 'rc-calendar/src/Picker';
import zhCn from 'gregorian-calendar/lib/locale/zh-cn'; // spm error
import DateTimeFormat from 'gregorian-calendar-format';
import GregorianCalendar from 'gregorian-calendar';
import CalendarLocale from 'rc-calendar/src/locale/zh-cn';
var now = new GregorianCalendar(zhCn);
now.setTime(Date.now());

const formatter = new DateTimeFormat('yyyy-MM-dd HH:mm:ss');
const dateFormatter = new DateTimeFormat('yyyy-MM-dd');

function getFormatter(showTime) {
  return showTime ? formatter : dateFormatter;
}

var defaultCalendarValue = new GregorianCalendar(zhCn);
defaultCalendarValue.setTime(Date.now());
defaultCalendarValue.addMonth(-1);

function disabledDate(current, value) {
  if (!current) {
    // allow empty select
    return false;
  }
  var date = new Date();
  date.setHours(0);
  date.setMinutes(0);
  date.setSeconds(0);
  return current.getYear() + 10 < date.getFullYear();  //can not select days before today
}

var Test = React.createClass({
  onChange(value) {
    console.log('DatePicker change: ' + (value && formatter.format(value)));
    this.setState({value});
  },

  getInitialState() {
    return {
      showTime: true,
      disabled: false,
      value: this.props.defaultValue
    };
  },

  onShowTimeChange(e) {
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
                             defaultValue={this.props.defaultCalendarValue}
                             showTime={state.showTime}
                             showOk
                             disabledDate={disabledDate}
                             showClear/>;
    return <div style={{width: 240, margin: 20}} >
      <div style={{marginBottom:10}}>
        <span>
          <input type='checkbox' checked={state.showTime} onChange={this.onShowTimeChange}/>
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
          animation="slide-up"
          disabled={state.disabled}
          calendar={calendar}
          value={state.value}
          onChange={this.onChange}>
          {
            ({value})=> {
              return (
                <span>
                <input placeholder="请选择日期" style={{width:250}}
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
    </div>;
  }
});

function onStandaloneSelect(value) {
  console.log('onStandaloneSelect');
  console.log(value && formatter.format(value))
}

function onStandaloneChange(value) {
  console.log('onStandaloneChange');
  console.log(formatter.format(value))
}


ReactDOM.render(<div style={{zIndex:1000,position:'relative'}}>
  <h2>zh-cn</h2>

  <div style={{width:600}}>
    <div style={{margin:10}}>
      <Calendar showWeekNumber={false}
                locale={CalendarLocale}
                defaultValue={now}
                onChange={onStandaloneChange}
                disabledDate={disabledDate}
                onSelect={onStandaloneSelect}
                showTime/>
    </div>
    <div style={{float:'left',width:300}}>
      <Test defaultValue={now}/>
    </div>
    <div style={{float:'right',width:300}}>
      <Test defaultCalendarValue={defaultCalendarValue}/>
    </div>
    <div style={{clear:'both'}}></div>
  </div>
</div>, document.getElementById('__react-content'));
