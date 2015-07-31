import 'rc-calendar/assets/classic.less';
import Calendar from 'rc-calendar';
import GregorianCalendarFormat from 'gregorian-calendar-format';
import React from 'react';
var formatter = new GregorianCalendarFormat('yyyy-MM-dd HH:mm:ss');

function onSelect(value) {
  console.log('onSelect');
  console.log(formatter.format(value))
}

React.render(
  <div>
    <h2>calendar (en-us, U.S.A.  California  San Francisco)</h2>
    <Calendar showWeekNumber={true}
      showTime={true}
      showOk={0}
      showClear={0}
      onSelect={onSelect} prefixCls="classic-calendar"/>
  </div>, document.getElementById('__react-content'));
