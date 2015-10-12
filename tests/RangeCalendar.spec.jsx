import {KeyCode as keyCode} from 'rc-util';
import expect from 'expect.js';
import RangeCalendar from '../src/RangeCalendar';
import React from 'react/addons';
var TestUtils = React.addons.TestUtils;
var Simulate = TestUtils.Simulate;
import async from 'async';
import GregorianCalendar from 'gregorian-calendar';
import DateTimeFormat from 'gregorian-calendar-format';
const formatter = new DateTimeFormat('yyyy-MM-dd');

describe('RangeCalendar', function () {
  var calendar;
  var container = document.createElement('div');
  document.body.appendChild(container);

  afterEach(function () {
    React.unmountComponentAtNode(container);
  });

  beforeEach(function (done) {
    React.render(<RangeCalendar showTime={true}/>, container, function () {
      calendar = this;
      done();
    });
  });

  it('next month works', function (done) {
    var month = calendar.state.anchor.getMonth();
    if (month === 11) {
      month = -1;
    }
    var rightCalendar = TestUtils.scryRenderedDOMComponentsWithClass(calendar, 'rc-calendar-range-right')[0];
    Simulate.click(TestUtils.scryRenderedDOMComponentsWithClass(rightCalendar, 'rc-calendar-next-month-btn')[0]);
    setTimeout(function () {
      expect(calendar.state.anchor.getMonth()).to.be(month + 1);
      done();
    }, 10);
  });

  it('previous month works', function (done) {
    var month = calendar.state.anchor.getMonth();
    if (month === 0) {
      month = 12;
    }
    var leftCalendar = TestUtils.scryRenderedDOMComponentsWithClass(calendar, 'rc-calendar-range-left')[0];
    Simulate.click(TestUtils.scryRenderedDOMComponentsWithClass(leftCalendar, 'rc-calendar-prev-month-btn')[0]);
    setTimeout(function () {
      expect(calendar.state.anchor.getMonth()).to.be(month - 1);
      done();
    }, 10);
  });

  it('next year works', function (done) {
    var year = calendar.state.anchor.getYear();
    var rightCalendar = TestUtils.scryRenderedDOMComponentsWithClass(calendar, 'rc-calendar-range-right')[0];
    Simulate.click(TestUtils.scryRenderedDOMComponentsWithClass(rightCalendar, 'rc-calendar-next-year-btn')[0]);
    setTimeout(function () {
      expect(calendar.state.anchor.getYear()).to.be(year + 1);
      done();
    }, 10);
  });

  it('previous year works', function (done) {
    var year = calendar.state.anchor.getYear();
    var leftCalendar = TestUtils.scryRenderedDOMComponentsWithClass(calendar, 'rc-calendar-range-left')[0];
    Simulate.click(TestUtils.scryRenderedDOMComponentsWithClass(leftCalendar, 'rc-calendar-prev-year-btn')[0]);
    setTimeout(function () {
      expect(calendar.state.anchor.getYear()).to.be(year - 1);
      done();
    }, 10);
  });

  it('render works', function () {
    expect(TestUtils.scryRenderedDOMComponentsWithClass(calendar, 'rc-calendar-cell').length).to.above(0);
  });

  it.only('onSelect works', function (done) {
    var day;

    function onSelect(d) {
      expect(formatter.format(d[0])).to.be('2015-09-04');
      expect(formatter.format(d[1])).to.be('2015-10-02');
      done();
    }

    var now = new GregorianCalendar();
    now.set(2015, 8, 29);
    calendar = React.render(<RangeCalendar
      onSelect={onSelect}
      anchor={now}
      showWeekNumber={true}/>, container);
    var leftCalendar = TestUtils.scryRenderedDOMComponentsWithClass(calendar, 'rc-calendar-range-left')[0];
    var leftInput = TestUtils.scryRenderedDOMComponentsWithClass(leftCalendar, 'rc-calendar-input')[0];
    var rightCalendar = TestUtils.scryRenderedDOMComponentsWithClass(calendar, 'rc-calendar-range-right')[0];
    var rightInput = TestUtils.scryRenderedDOMComponentsWithClass(rightCalendar, 'rc-calendar-input')[0];
    day = TestUtils.scryRenderedDOMComponentsWithClass(leftCalendar, 'rc-calendar-date')[5]; // 9.4
    Simulate.click(day);
    expect(React.findDOMNode(leftInput).value).to.be('2015-09-04');
    day = TestUtils.scryRenderedDOMComponentsWithClass(rightCalendar, 'rc-calendar-date')[5]; // 10.2
    Simulate.click(day);
    expect(React.findDOMNode(rightInput).value).to.be('2015-10-02');
  });
});
