# rc-calendar
---

calendar ui component for react, port from https://github.com/modulex/date-picker

[![NPM version][npm-image]][npm-url]
[![SPM version](http://spmjs.io/badge/rc-calendar)](http://spmjs.io/package/rc-calendar)
[![build status][travis-image]][travis-url]
[![Test coverage][coveralls-image]][coveralls-url]
[![gemnasium deps][gemnasium-image]][gemnasium-url]
[![node version][node-image]][node-url]
[![npm download][download-image]][download-url]

[npm-image]: http://img.shields.io/npm/v/rc-calendar.svg?style=flat-square
[npm-url]: http://npmjs.org/package/rc-calendar
[travis-image]: https://img.shields.io/travis/react-component/calendar.svg?style=flat-square
[travis-url]: https://travis-ci.org/react-component/calendar
[coveralls-image]: https://img.shields.io/coveralls/react-component/calendar.svg?style=flat-square
[coveralls-url]: https://coveralls.io/r/react-component/calendar?branch=master
[gemnasium-image]: http://img.shields.io/gemnasium/react-component/calendar.svg?style=flat-square
[gemnasium-url]: https://gemnasium.com/react-component/calendar
[node-image]: https://img.shields.io/badge/node.js-%3E=_0.10-green.svg?style=flat-square
[node-url]: http://nodejs.org/download/
[download-image]: https://img.shields.io/npm/dm/rc-calendar.svg?style=flat-square
[download-url]: https://npmjs.org/package/rc-calendar

## Screenshots

<img src="http://gtms02.alicdn.com/tps/i2/TB1luFKHXXXXXb3XXXXl4OqLpXX-574-596.png" width="288"/>

<img src="http://gtms04.alicdn.com/tps/i4/TB1yVNEHXXXXXc5XFXXbyv.ZFXX-528-586.png" width="288"/>

<img src="http://gtms03.alicdn.com/tps/i3/TB1lmz_GFXXXXbEXVXXbMpwQXXX-692-732.png" width="288"/>

## Feature

* support ie8,ie8+,chrome,firefox,safari
* support date, month, year, decade select panel
* support week number
* support en-us and zh-cn locale (ui and timeOffset)
* support aria and keyboard accessibility

### Keyboard

* Previous month (PageUp)
* Next month (PageDown)
* tab into hour input: Last hour(Up), Next hour(Down)
* tab into hour input: Last minute(Up), Next minute(Down)
* tab into hour input: Last second(Up), Next second(Down)
* Last year (Control + left)
* Next year (Control + right)

## install

[![rc-calendar](https://nodei.co/npm/rc-calendar.png)](https://npmjs.org/package/rc-calendar)

## Usage

```js
import Calendar from 'rc-calendar';
import React from 'react';
React.render(<Calendar />, container);
```

## Development

```
npm install
npm start
```

## Example

http://localhost:8001/examples/

online example:

http://react-component.github.io/calendar/examples/index.html

## API

### Calendar props

<table class="table table-bordered table-striped">
    <thead>
    <tr>
        <th style="width: 100px;">name</th>
        <th style="width: 50px;">type</th>
        <th style="width: 50px;">default</th>
        <th>description</th>
    </tr>
    </thead>
    <tbody>
        <tr>
          <td>prefixCls</td>
          <td>String</td>
          <td></td>
          <td>prefixCls of this component</td>
        </tr>
        <tr>
          <td>className</td>
          <td>String</td>
          <td></td>
          <td>additional css class of root dom node</td>
        </tr>
        <tr>
          <td>style</td>
          <td>Object</td>
          <td></td>
          <td>additional style of root dom node</td>
        </tr>
        <tr>
          <td>value</td>
          <td> <a href="https://github.com/yiminghe/gregorian-calendar">GregorianCalendar</a> </td>
          <td></td>
          <td>current value like input's value</td>
        </tr>
        <tr>
          <td>defaultValue</td>
          <td>GregorianCalendar</td>
          <td></td>
          <td>defaultValue like input's defaultValue</td>
        </tr>
        <tr>
          <td>orient</td>
          <td>String[]</td>
          <td></td>
          <td>affect the position of arrow. exp: ['left','top']</td>
        </tr>
        <tr>
          <td>locale</td>
          <td>Object</td>
          <td>import from 'rc-calendar/lib/locale/en-us'</td>
          <td>calendar locale</td>
        </tr>
        <tr>
          <td>disabledDate</td>
          <td>Function(current:GregorianCalendar):Boolean</td>
          <td>null</td>
          <td>whether to disable select of current date</td>
        </tr>
        <tr>
          <td>showWeekNumber</td>
          <td>Boolean</td>
          <td>false</td>
          <td>whether to show week number of year</td>
        </tr>
        <tr>
          <td>showToday</td>
          <td>Boolean</td>
          <td>true</td>
          <td>whether to show today button</td>
        </tr>
        <tr>
          <td>showTime</td>
          <td>Boolean</td>
          <td>true</td>
          <td>whether to support time select</td>
        </tr>
        <tr>
           <td>focused</td>
           <td>Boolean</td>
           <td>false</td>
           <td>whether to focus on render</td>
        </tr>
        <tr>
          <td>onSelect</td>
          <td>Function(date: GregorianCalendar)</td>
          <td>function(){}</td>
          <td>called when a date is selected from calendar</td>
        </tr>
        <tr>
          <td>onChange</td>
          <td>Function(date: GregorianCalendar)</td>
          <td>function(){}</td>
          <td>called when a date is changed inside calendar (next year/next month/keyboard)</td>
        </tr>
        <tr>
           <td>onBlur</td>
           <td>Function()</td>
           <td>function(){}</td>
           <td>called when calendar loose focus</td>
         </tr>
    </tbody>
</table>

### Calendar.MonthCalendar props

<table class="table table-bordered table-striped">
    <thead>
    <tr>
        <th style="width: 100px;">name</th>
        <th style="width: 50px;">type</th>
        <th style="width: 50px;">default</th>
        <th>description</th>
    </tr>
    </thead>
    <tbody>
        <tr>
          <td>prefixCls</td>
          <td>String</td>
          <td></td>
          <td>prefixCls of this component</td>
        </tr>
        <tr>
          <td>className</td>
          <td>String</td>
          <td></td>
          <td>additional css class of root dom node</td>
        </tr>
        <tr>
          <td>style</td>
          <td>Object</td>
          <td></td>
          <td>additional style of root dom node</td>
        </tr>
        <tr>
          <td>value</td>
          <td> <a href="https://github.com/yiminghe/gregorian-calendar">GregorianCalendar</a> </td>
          <td></td>
          <td>current value like input's value</td>
        </tr>
        <tr>
          <td>defaultValue</td>
          <td>GregorianCalendar</td>
          <td></td>
          <td>defaultValue like input's defaultValue</td>
        </tr>
        <tr>
          <td>orient</td>
          <td>String[]</td>
          <td></td>
          <td>affect the position of arrow. exp: ['left','top']</td>
        </tr>
        <tr>
          <td>locale</td>
          <td>Object</td>
          <td>import from 'rc-calendar/lib/locale/en-us'</td>
          <td>calendar locale</td>
        </tr>
        <tr>
          <td>disabledDate</td>
          <td>Function(current:GregorianCalendar):Boolean</td>
          <td>null</td>
          <td>whether to disable select of current month</td>
        </tr>
        <tr>
          <td>onSelect</td>
          <td>Function(date: GregorianCalendar)</td>
          <td>function(){}</td>
          <td>called when a date is selected from calendar</td>
        </tr>
        <tr>
          <td>onChange</td>
          <td>Function(date: GregorianCalendar)</td>
          <td>function(){}</td>
          <td>called when a date is changed inside calendar (next year/next month/keyboard)</td>
        </tr>
    </tbody>
</table>

### Calendar.Picker props

<table class="table table-bordered table-striped">
    <thead>
    <tr>
        <th style="width: 100px;">name</th>
        <th style="width: 50px;">type</th>
        <th style="width: 50px;">default</th>
        <th>description</th>
    </tr>
    </thead>
    <tbody>
        <tr>
          <td>prefixCls</td>
          <td>String</td>
          <td></td>
          <td>prefixCls of this component</td>
        </tr>
        <tr>
          <td>calendar</td>
          <td>Calendar React Element</td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td>disabled</td>
          <td>Boolean</td>
          <td></td>
          <td>whether picker is disabled</td>
        </tr>
        <tr>
          <td>adjustOrientOnCalendarOverflow</td>
          <td>Boolean</td>
          <td>true</td>
          <td>whether adjust calendar orient if there is not enough space to show. better false if animation is 'slide-up'</td>
        </tr>
        <tr>
          <td>animation</td>
          <td>String</td>
          <td></td>
          <td>index.css support 'slide-up'</td>
        </tr>
        <tr>
          <td>transitionName</td>
          <td>String</td>
          <td></td>
          <td>css class for animation</td>
        </tr>
        <tr>
          <td>formatter</td>
          <td> <a href="https://github.com/yiminghe/gregorian-calendar-format">GregorianCalendarFormatter</a> </td>
          <td></td>
          <td>use to format/parse value to/from input</td>
        </tr>
        <tr>
          <td>trigger</td>
          <td>React.Element</td>
          <td></td>
          <td>additional trigger appended to picker</td>
        </tr>
        <tr>
          <td>value</td>
          <td>GregorianCalendar</td>
          <td></td>
          <td>current value like input's value</td>
        </tr>
        <tr>
          <td>defaultValue</td>
          <td>GregorianCalendar</td>
          <td></td>
          <td>defaultValue like input's defaultValue</td>
        </tr>
        <tr>
          <td>onChange</td>
          <td>Function</td>
          <td></td>
          <td>called when select a different value</td>
        </tr>
        <tr>
          <td>onOpen</td>
          <td>Function</td>
          <td></td>
          <td>called when open picker</td>
        </tr>
        <tr>
          <td>onClose</td>
          <td>Function</td>
          <td></td>
          <td>called when close picker</td>
        </tr>                
        <tr>
          <td>open</td>
          <td>Boolean</td>
          <td></td>
          <td>current open state of picker. controlled prop</td>
        </tr>
    </tbody>
</table>


## Test Case

http://localhost:8001/tests/runner.html?coverage

## Coverage

http://localhost:8001/node_modules/rc-server/node_modules/node-jscover/lib/front-end/jscoverage.html?w=http://localhost:8001/tests/runner.html?coverage

## License

rc-calendar is released under the MIT license.
