import 'rc-calendar/assets/index.less';

import Calendar from 'rc-calendar';
import GregorianCalendarFormat from 'gregorian-calendar-format';
import React from 'react';
var formatter = new GregorianCalendarFormat('yyyy-MM-dd HH:mm:ss');
import GregorianCalendar from 'gregorian-calendar';
import zhCn from 'gregorian-calendar/lib/locale/zh-cn';
import CalendarLocale from 'rc-calendar/src/locale/zh-cn';

var value = new GregorianCalendar(zhCn);
value.setTime(Date.now());

function disabledDate(current, value) {
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

function onChange(value) {
  console.log('onChange');
  console.log(formatter.format(value))
}

React.render(
  <div>
    <h2>calendar (zh-cn)</h2>
    <Calendar showWeekNumber={false}
              locale={CalendarLocale}
              defaultValue={value}
              onChange={onChange}
              disabledDate={disabledDate}
              onSelect={onSelect} showTime={true}/>
  </div>, document.getElementById('__react-content'));

