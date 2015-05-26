
require('rc-calendar/assets/classic.css');
var Calendar = require('rc-calendar');
var GregorianCalendarFormat = require('gregorian-calendar-format');
var React = require('react');
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
      onSelect={onSelect} prefixCls="classic-calendar"/>
  </div>, document.getElementById('__react-content'));
