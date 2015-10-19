import 'rc-calendar/assets/index.less';

import RangeCalendar from 'rc-calendar/src/RangeCalendar';
import GregorianCalendarFormat from 'gregorian-calendar-format';
import React from 'react';
var formatter = new GregorianCalendarFormat('yyyy-MM-dd HH:mm:ss');
import GregorianCalendar from 'gregorian-calendar';
import zhCn from 'gregorian-calendar/lib/locale/zh-cn';
import CalendarLocale from 'rc-calendar/src/locale/zh-cn';
import Picker from 'rc-calendar/src/Picker';

var value = new GregorianCalendar(zhCn);
value.setTime(Date.now());

function disabledDate(current) {
  var date = new Date();
  date.setHours(0);
  date.setMinutes(0);
  date.setSeconds(0);
  return current.getTime() < date.getTime();  //can not select days before today
}

function onStandaloneChange(value) {
  console.log('onChange');
  console.log(value[0] && formatter.format(value[0]), value[1] && formatter.format(value[1]))
}

function onStandaloneSelect(value) {
  console.log('onSelect');
  console.log(formatter.format(value[0]), formatter.format(value[1]))
}

function onStandaloneOk(value) {
  console.log('onOk');
  console.log(formatter.format(value[0]), formatter.format(value[1]))
}

const Test = React.createClass({
  getInitialState(){
    const end = value.clone();
    end.addDayOfMonth(5);
    return {
      value: [value, end]
    };
  },

  onChange(value){
    this.setState({value});
  },

  render(){
    const state = this.state;
    const calendar = <RangeCalendar showWeekNumber={false}
                                    locale={CalendarLocale}
                                    disabledDate={disabledDate}
                                    showTime={true}/>;
    return (<Picker value={state.value}
                    onChange={this.onChange}
                    animation="slide-up"
                    calendar={calendar}>
      {
        ({value}) => {
          return (<span>
                <input placeholder="请选择日期" style={{width:350}}
                       disabled={state.disabled}
                       className="ant-calendar-picker-input ant-input"
                       value={value && (formatter.format(value[0])+' - '+formatter.format(value[1]))}/>
                <span className="ant-calendar-picker-icon" unselectable="true"/>
                </span>);
        }
      }
    </Picker>);
  }
});

React.render(
  <div>
    <h2>calendar (zh-cn)</h2>
    <link href="http://ant.design/dist/antd.css" rel="stylesheet" type="text/css"/>
    <div style={{margin:10}}>
      <RangeCalendar showWeekNumber={true}
                     locale={CalendarLocale}
                     onChange={onStandaloneChange}
                     onSelect={onStandaloneSelect}
                     onOk={onStandaloneOk}
                     disabledDate={disabledDate}
                     showTime={true}/>
    </div>
    <br/>

    <div style={{margin:20}}>
      <Test />
    </div>
  </div>, document.getElementById('__react-content'));

