import Calendar from '../index';
import DatePicker from '../src/Picker';
import RangeCalendar from '../src/RangeCalendar';
import ReactDOM from 'react-dom';
import React from 'react';
import TestUtils from 'react-dom/test-utils';
const Simulate = TestUtils.Simulate;
import async from 'async';
import CalendarLocale from '../src/locale/en_US';
import moment from 'moment';
const format = ('YYYY-MM-DD');
const VALUE = moment([2015, 5, 1]);

describe('DatePicker', () => {
  let div;

  function noop() {
  }

  function renderOne({ value }) {
    return (<input
      className="rc-calendar-picker-input"
      onChange={noop}
      readOnly
      value={value && value.format(format)}
    />);
  }

  function renderRange({ value }) {
    return (<input
      className="rc-calendar-picker-input"
      onChange={noop}
      readOnly
      value={value && `${value[0] &&
      value[0].format(format)} - ${value[1] && value[1].format(format)}`}
    />);
  }

  function renderPicker(props) {
    return ReactDOM.render(<DatePicker
      calendar={
        <Calendar
          locale={CalendarLocale}
        />
      }
      defaultValue={VALUE}
      {...props}
    >
      {renderOne}
    </DatePicker>, div);
  }

  function renderRangePicker(props) {
    return ReactDOM.render(<DatePicker
      calendar={
        <RangeCalendar
          locale={CalendarLocale}
        />
      }
      defaultValue={[VALUE, VALUE]}
      {...props}
    >
      {renderRange}
    </DatePicker>, div);
  }

  beforeEach(() => {
    div = document.createElement('div');
    document.body.appendChild(div);
  });

  afterEach(() => {
    ReactDOM.unmountComponentAtNode(div);
    document.body.removeChild(div);
  });

  it('popup correctly', (done) => {
    let change;
    const picker = renderPicker({
      onChange(v) {
        change = v;
      },
    });
    expect(picker.state.open).toBeFalsy();
    const input = TestUtils.scryRenderedDOMComponentsWithClass(picker,
      'rc-calendar-picker-input')[0];
    async.series([(next) => {
      Simulate.click(input);
      setTimeout(next, 100);
    }, (next) => {
      expect(TestUtils.scryRenderedDOMComponentsWithClass(picker.calendarInstance,
        'rc-calendar')[0]).not.toBeFalsy();
      expect(picker.state.open).toEqual(true);
      const day = TestUtils.scryRenderedDOMComponentsWithClass(picker.calendarInstance,
        'rc-calendar-date')[2];
      Simulate.click(day);
      setTimeout(next, 100);
    }, (next) => {
      expect(change).not.toBeFalsy();
      expect(change.year()).toEqual(2015);
      expect(change.month()).toEqual(5);
      expect(change.date()).toEqual(2);
      expect(ReactDOM.findDOMNode(input).value).toEqual('2015-06-02');
      expect(picker.state.open).toBeFalsy();
      next();
    }], () => {
      done();
    });
  });

  it('popup range calendar correctly', (done) => {
    if (navigator.userAgent.toLowerCase().indexOf('phantomjs') !== -1) {
      return done();
    }
    let change;
    const picker = renderRangePicker({
      onChange(v) {
        change = v;
      },
    });
    expect(picker.state.open).toBeFalsy();
    const input = TestUtils.scryRenderedDOMComponentsWithClass(picker,
      'rc-calendar-picker-input')[0];
    async.series([(next) => {
      Simulate.click(input);
      setTimeout(next, 10);
    }, (next) => {
      expect(TestUtils.scryRenderedDOMComponentsWithClass(picker.calendarInstance,
        'rc-calendar')[0]).not.toBeFalsy();
      expect(picker.state.open).toEqual(true);
      const day1 = TestUtils.scryRenderedDOMComponentsWithClass(picker.calendarInstance,
        'rc-calendar-date')[2];
      Simulate.click(day1);
      const day2 = TestUtils.scryRenderedDOMComponentsWithClass(picker.calendarInstance,
        'rc-calendar-date')[3];
      Simulate.click(day2);
      setTimeout(next, 10);
    }, (next) => {
      expect(change).not.toBeFalsy();
      expect(change.length).toEqual(2);
      expect(change[0].year()).toEqual(2015);
      expect(change[0].month()).toEqual(5);
      expect(change[0].date()).toEqual(2);
      expect(change[1].year()).toEqual(2015);
      expect(change[1].month()).toEqual(5);
      expect(change[1].date()).toEqual(3);
      expect(input.value).toEqual('2015-06-02 - 2015-06-03');
      expect(picker.state.open).toBeFalsy();
      next();
    }], () => {
      done();
    });
  });

  describe('render calendar to body', () => {
    it('support correctly', (done) => {
      let change;
      const picker = renderPicker({
        onChange(v) {
          change = v;
        },
      });
      expect(picker.state.open).toBeFalsy();
      const input = TestUtils.scryRenderedDOMComponentsWithClass(picker,
        'rc-calendar-picker-input')[0];
      async.series([(next) => {
        Simulate.click(input);
        setTimeout(next, 100);
      }, (next) => {
        expect(TestUtils.scryRenderedDOMComponentsWithClass(picker,
          'rc-calendar')[0]).toBeFalsy();
        expect(picker.state.open).toEqual(true);
        const day = TestUtils.scryRenderedDOMComponentsWithClass(picker.calendarInstance,
          'rc-calendar-date')[2];
        Simulate.click(day);
        setTimeout(next, 100);
      }, (next) => {
        expect(change).not.toBeFalsy();
        expect(change.year()).toEqual(2015);
        expect(change.month()).toEqual(5);
        expect(change.date()).toEqual(2);
        expect(ReactDOM.findDOMNode(input).value).toEqual('2015-06-02');
        expect(picker.state.open).toBeFalsy();
        next();
      }], () => {
        done();
      });
    });

    it('destroy correctly', (done) => {
      if (navigator.userAgent.toLowerCase().indexOf('phantomjs') !== -1) {
        return done();
      }
      const picker = renderPicker();
      expect(picker.state.open).toBeFalsy();
      const input = TestUtils.scryRenderedDOMComponentsWithClass(picker,
        'rc-calendar-picker-input')[0];
      async.series([(next) => {
        Simulate.click(input);
        setTimeout(next, 100);
      }, (next) => {
        expect(TestUtils.scryRenderedDOMComponentsWithClass(picker,
          'rc-calendar')[0]).toBeFalsy();
        expect(picker.state.open).toEqual(true);
        if (document.querySelectorAll) {
          expect(document.querySelectorAll('.rc-calendar-picker').length).not.toEqual(0);
        }
        expect(TestUtils.scryRenderedDOMComponentsWithClass(picker.calendarInstance,
          'rc-calendar-date')[0]).not.toBeFalsy();
        ReactDOM.unmountComponentAtNode(div);
        setTimeout(next, 100);
      }, (next) => {
        if (document.querySelectorAll) {
          expect(document.querySelectorAll('.rc-calendar-picker').length).toEqual(0);
        }
        expect(picker.calendarInstance).toBeFalsy();
        next();
      }], () => {
        done();
      });
    });
  });
});
