import 'rc-calendar/assets/bootstrap.less';
import Calendar from 'rc-calendar';
import GregorianCalendarFormat from 'gregorian-calendar-format';
import React from 'react';
var formatter = new GregorianCalendarFormat('yyyy-MM-dd HH:mm:ss');

function onSelect(value) {
  console.log('onSelect');
  console.log(formatter.format(value))
}

function onChange(value) {
  console.log('onChange');
  console.log(formatter.format(value))
}

function disabledDate(current, value) {
  var date = new Date();
  date.setHours(0);
  date.setMinutes(0);
  date.setSeconds(0);
  return current.getTime() < date.getTime() + 24 * 60 * 60 * 1000;  //can not select days before today
}

React.render(
  <div>
    <h2>calendar (en-us, U.S.A. California San Francisco)</h2>
    <Calendar showWeekNumber={true}
              disabledDate={disabledDate}
              formatter={formatter}
              onChange={onChange}
              onSelect={onSelect}/>
  </div>, document.getElementById('__react-content'));
