/** @jsx React.DOM */


/** @jsx React.DOM */


var Calendar = require('../');
var CalendarInput = require('./CalendarInput');
var GregorianCalendar = require('gregorian-calendar');
var GregorianCalendarFormat = require('gregorian-calendar-format');
var React = require('react');

var formatter = new GregorianCalendarFormat('yyyy-MM-dd');
var value = new GregorianCalendar();
value.setTime(Date.now());
function onSelect(value) {
  console.log('onSelect');
  console.log(formatter.format(value))
}
React.render(
  <div>
    <h2>calendar (en-us)</h2>
    <Calendar showWeekNumber="1" onSelect={onSelect}/>
    <h2>input (zh-cn)</h2>
    <CalendarInput />
  </div>, document.getElementById('body'));
