import {KeyCode as keyCode} from 'rc-util';
import expect from 'expect.js';
import RangeCalendar from '../src/RangeCalendar';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import ReactDOM from 'react-dom';
var Simulate = TestUtils.Simulate;
import async from 'async';
import GregorianCalendar from 'gregorian-calendar';
import DateTimeFormat from 'gregorian-calendar-format';
const formatter = new DateTimeFormat('yyyy-MM-dd');
const $ = require('jquery');

describe('RangeCalendar', function () {
  var calendar;
  var container = document.createElement('div');
  document.body.appendChild(container);

  afterEach(function () {
    ReactDOM.unmountComponentAtNode(container);
  });

  beforeEach(function (done) {
    ReactDOM.render(<RangeCalendar showTime={true}/>, container, function () {
      calendar = this;
      done();
    });
  });

  it('next month works', function (done) {
    var month = calendar.state.value.getMonth();
    if (month === 11) {
      month = -1;
    }
    var rightCalendar = TestUtils.scryRenderedDOMComponentsWithClass(calendar, 'rc-calendar-range-right')[0];
    Simulate.click($(rightCalendar).find('.rc-calendar-next-month-btn')[0]);
    setTimeout(function () {
      expect(calendar.state.value.getMonth()).to.be(month + 1);
      done();
    }, 10);
  });

  it('previous month works', function (done) {
    var month = calendar.state.value.getMonth();
    if (month === 0) {
      month = 12;
    }
    var leftCalendar = TestUtils.scryRenderedDOMComponentsWithClass(calendar, 'rc-calendar-range-left')[0];
    Simulate.click($(leftCalendar).find('.rc-calendar-prev-month-btn')[0]);
    setTimeout(function () {
      expect(calendar.state.value.getMonth()).to.be(month - 1);
      done();
    }, 10);
  });

  it('next year works', function (done) {
    var year = calendar.state.value.getYear();
    var rightCalendar = TestUtils.scryRenderedDOMComponentsWithClass(calendar, 'rc-calendar-range-right')[0];
    Simulate.click($(rightCalendar).find('.rc-calendar-next-year-btn')[0]);
    setTimeout(function () {
      expect(calendar.state.value.getYear()).to.be(year + 1);
      done();
    }, 10);
  });

  it('previous year works', function (done) {
    var year = calendar.state.value.getYear();
    var leftCalendar = TestUtils.scryRenderedDOMComponentsWithClass(calendar, 'rc-calendar-range-left')[0];
    Simulate.click($(leftCalendar).find('.rc-calendar-prev-year-btn')[0]);
    setTimeout(function () {
      expect(calendar.state.value.getYear()).to.be(year - 1);
      done();
    }, 10);
  });

  it('render works', function () {
    expect(TestUtils.scryRenderedDOMComponentsWithClass(calendar, 'rc-calendar-cell').length).to.above(0);
  });

  it('onSelect works', function (done) {
    var day;

    function onSelect(d) {
      expect(formatter.format(d[0])).to.be('2015-09-04');
      expect(formatter.format(d[1])).to.be('2015-10-02');
      done();
    }

    var now = new GregorianCalendar();
    now.set(2015, 8, 29);
    ReactDOM.unmountComponentAtNode(container);
    calendar = ReactDOM.render(<RangeCalendar
      onSelect={onSelect}
      defaultValue={now}
      showWeekNumber={true}/>, container);
    var leftCalendar = TestUtils.scryRenderedDOMComponentsWithClass(calendar, 'rc-calendar-range-left')[0];
    var leftInput =$(leftCalendar).find('.rc-calendar-input')[0];
    var rightCalendar = TestUtils.scryRenderedDOMComponentsWithClass(calendar, 'rc-calendar-range-right')[0];
    var rightInput = $(rightCalendar).find('.rc-calendar-input')[0];
    day = $(leftCalendar).find('.rc-calendar-date')[5]; // 9.4
    Simulate.mouseDown(day);
    expect(ReactDOM.findDOMNode(leftInput).value).to.be('2015-09-04');
    day =$(rightCalendar).find('.rc-calendar-date')[5]; // 10.2
    Simulate.mouseDown(day);
    expect(ReactDOM.findDOMNode(rightInput).value).to.be('2015-10-02');
  });
});
