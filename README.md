# rc-calendar

calendar ui component for react, port from https://github.com/kissyteam/date-picker

[![NPM version][npm-image]][npm-url]
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

![rc-calendar](http://gtms04.alicdn.com/tps/i4/TB1WifJGVXXXXa3XXXX6tFy4VXX-328-742.png)

## Feature

* support date, month, year, decade select panel
* support week number
* support en-us and zh-cn locale (ui and timeOffset)
* support aria and keyboard accessibility

## install

[![rc-calendar](https://nodei.co/npm/rc-calendar.png)](https://npmjs.org/package/rc-calendar)

## Usage

```js
var Calendar = require('rc-calendar');
var React = require('react');
React.render(<Calendar />, container);
```

For details to see: [https://github.com/yiminghe/learning-react/tree/master/example/rc-calendar](https://github.com/yiminghe/learning-react/tree/master/example/rc-calendar)

## API

### props

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
          <td>locale</td>
          <td>Object</td>
          <td>require('rc-calendar/lib/locale/en-use')</td>
          <td>calendar locale</td>
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
           <td>focused</td>
           <td>Boolean</td>
           <td>false</td>
           <td>whether to focus on render</td>
        </tr>
        <tr>
          <td>onSelect</td>
          <td>Function(GregorianCalendar date)</td>
          <td>function(){}</td>
          <td>called when a date is selected from calendar</td>
        </tr>
        <tr>
           <td>onBlur</td>
           <td>Function()</td>
           <td>function(){}</td>
           <td>called when calendar loose focus</td>
         </tr>
    </tbody>
</table>

## Development

```
npm install
npm start
```

## Example

http://localhost:8001/examples/index.html


## Test Case

http://localhost:8001/tests/runner.html?coverage

## Coverage

http://localhost:8001/node_modules/node-jscover/lib/front-end/jscoverage.html?w=http://localhost:8001/tests/runner.html?coverage

## License

rc-calendar is released under the MIT license.