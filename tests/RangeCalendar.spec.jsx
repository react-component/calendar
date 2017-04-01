import expect from 'expect.js';
import RangeCalendar from '../src/RangeCalendar';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import ReactDOM from 'react-dom';
const Simulate = TestUtils.Simulate;
import moment from 'moment';
const format = ('YYYY-MM-DD');
const $ = require('jquery');

describe('RangeCalendar', () => {
  let calendar;
  const container = document.createElement('div');
  document.body.appendChild(container);

  afterEach(() => {
    ReactDOM.unmountComponentAtNode(container);
  });

  beforeEach((done) => {
    ReactDOM.render(<RangeCalendar/>, container, function ok() {
      calendar = this;
      done();
    });
  });

  it('next month works', (done) => {
    let month = calendar.state.value[1].month();
    if (month === 11) {
      month = -1;
    }
    const rightCalendar = TestUtils.scryRenderedDOMComponentsWithClass(calendar,
      'rc-calendar-range-right')[0];
    Simulate.click($(rightCalendar).find('.rc-calendar-next-month-btn')[0]);
    setTimeout(() => {
      expect(calendar.state.value[1].month()).to.be(month + 1);
      done();
    }, 10);
  });

  it('previous month works', (done) => {
    let month = calendar.state.value[0].month();
    if (month === 0) {
      month = 12;
    }
    const leftCalendar = TestUtils.scryRenderedDOMComponentsWithClass(calendar,
      'rc-calendar-range-left')[0];
    Simulate.click($(leftCalendar).find('.rc-calendar-prev-month-btn')[0]);
    setTimeout(() => {
      expect(calendar.state.value[0].month()).to.be(month - 1);
      done();
    }, 10);
  });

  it('next year works', (done) => {
    const year = calendar.state.value[1].year();
    const rightCalendar = TestUtils.scryRenderedDOMComponentsWithClass(calendar,
      'rc-calendar-range-right')[0];
    Simulate.click($(rightCalendar).find('.rc-calendar-next-year-btn')[0]);
    setTimeout(() => {
      expect(calendar.state.value[1].year()).to.be(year + 1);
      done();
    }, 10);
  });

  it('previous year works', (done) => {
    const year = calendar.state.value[0].year();
    const leftCalendar = TestUtils.scryRenderedDOMComponentsWithClass(calendar,
      'rc-calendar-range-left')[0];
    Simulate.click($(leftCalendar).find('.rc-calendar-prev-year-btn')[0]);
    setTimeout(() => {
      expect(calendar.state.value[0].year()).to.be(year - 1);
      done();
    }, 10);
  });

  it('render works', () => {
    expect(TestUtils.scryRenderedDOMComponentsWithClass(calendar,
      'rc-calendar-cell').length).to.above(0);
  });

  it('onSelect works', (done) => {
    let day;

    function onSelect(d) {
      expect(d[0].format(format)).to.be('2015-09-04');
      expect(d[1].format(format)).to.be('2015-10-02');
      done();
    }

    const now = moment([2015, 8, 29]);
    ReactDOM.unmountComponentAtNode(container);
    calendar = ReactDOM.render(<RangeCalendar
      format={format}
      onSelect={onSelect}
      defaultValue={[now, now.clone().add(1, 'months')]}
      showWeekNumber
    />, container);
    const leftCalendar = TestUtils.scryRenderedDOMComponentsWithClass(calendar,
      'rc-calendar-range-left')[0];
    const leftInput = $(leftCalendar).find('.rc-calendar-input')[0];
    const rightCalendar = TestUtils.scryRenderedDOMComponentsWithClass(calendar,
      'rc-calendar-range-right')[0];
    const rightInput = $(rightCalendar).find('.rc-calendar-input')[0];
    day = $(leftCalendar).find('.rc-calendar-date')[5]; // 9.4
    Simulate.click(day);
    expect(ReactDOM.findDOMNode(leftInput).value).to.be('2015-09-04');
    day = $(rightCalendar).find('.rc-calendar-date')[5]; // 10.2
    Simulate.click(day);
    expect(ReactDOM.findDOMNode(rightInput).value).to.be('2015-10-02');
  });
});
