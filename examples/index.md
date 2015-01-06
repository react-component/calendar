# rc-calendar@1.x demo
---

<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.1/css/bootstrap.min.css">

<link rel="stylesheet" href="../../assets/classic.css">

<link rel="stylesheet" href="../../assets/bootstrap.css">


## render standalone

````html
<div id='react-content-standalone'></div>
````

````js
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
    <Calendar showWeekNumber={true} onSelect={onSelect}/>
  </div>, document.getElementById('react-content-standalone'));
````

## render another theme

````html
<div id='react-content-standalone2'></div>
````

````js
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
    <Calendar showWeekNumber={true} onSelect={onSelect} prefixCls='classic-calendar'/>
  </div>, document.getElementById('react-content-standalone2'));
````


## render with input

please create your own CalendarInput

````html
<div id='react-content-input'></div>
````

````js
/** @jsx React.DOM */
var React = require('react');
var CalendarInput = require('./CalendarInput');
React.render(
  <div>
    <h2>input (zh-cn)</h2>
    <CalendarInput />
  </div>, document.getElementById('react-content-input'));
````