import 'rc-calendar/assets/bootstrap.less';

import RangeCalendar from 'rc-calendar/src/RangeCalendar';
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

function onChange(value) {
  console.log('onChange');
  console.log(value[0] && formatter.format(value[0]), value[1] && formatter.format(value[1]))
}


function onOk(value) {
  console.log('onOk');
  console.log(formatter.format(value[0]), formatter.format(value[1]))
}

React.render(
  <div>
    <h2>calendar (zh-cn)</h2>
    <RangeCalendar showWeekNumber={false}
                   locale={CalendarLocale}
                   defaultValue={[value]}
                   formatter={formatter}
                   onChange={onChange}
                   onOk={onOk}
                   disabledDate={disabledDate}
                   showTime={true}/>
  </div>, document.getElementById('__react-content'));

