
require('rc-calendar/assets/index.css');

var Calendar = require('rc-calendar');
var GregorianCalendarFormat = require('gregorian-calendar-format');
var React = require('react');
var formatter = new GregorianCalendarFormat('yyyy-MM-dd HH:mm:ss');
var GregorianCalendar = require('gregorian-calendar');
var zhCn = require('gregorian-calendar/lib/locale/zh-cn');
var CalendarLocale = require('rc-calendar/src/locale/zh-cn');

var value = new GregorianCalendar(zhCn);
value.setTime(Date.now());

function disabledDate(current,value){
  var date = new Date();
  date.setHours(0);
  date.setMinutes(0);
  date.setSeconds(0);
  return current.getTime() < date.getTime();  //can not select days before today
}

function onSelect(value) {
  console.log('onSelect');
  console.log(formatter.format(value))
}

React.render(
  <div>
    <h2>calendar (zh-cn)</h2>
    <Calendar showWeekNumber={false}
      locale={CalendarLocale}
      value={value}
      disabledDate={disabledDate}
      onSelect={onSelect} showTime={true}/>
  </div>, document.getElementById('__react-content'));

