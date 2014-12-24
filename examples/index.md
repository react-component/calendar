# rc-calendar@1.x demo
---

````html
<div id='skin'></div>
````

````js
require('./skin');
````

## 单独渲染

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
    <Calendar showWeekNumber="1" onSelect={onSelect}/>
  </div>, document.getElementById('react-content-standalone'));
````

## 和 input 结合

请参考 demo 并自行封装 CalendarInput

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