import expect from 'expect.js';
import Calendar from '../index';
import DatePicker from '../src/Picker';
import ReactDOM from 'react-dom';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
const Simulate = TestUtils.Simulate;
import async from 'async';
import DateTimeFormat from 'gregorian-calendar-format';
const formatter = new DateTimeFormat('yyyy-MM-dd');
import GregorianCalendar from 'gregorian-calendar';
import zhCn from 'gregorian-calendar/lib/locale/zh_CN';
import CalendarLocale from '../src/locale/zh_CN';
const VALUE = new GregorianCalendar(zhCn);
VALUE.set(2015, 5, 1);

describe('DatePicker', () => {
  let div;

  function noop() {
  }

  function renderOne({ value }) {
    return (<input
      className="rc-calendar-picker-input"
      onChange={noop}
      readOnly
      value={value && formatter.format(value)}
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
    expect(picker.state.open).not.to.be.ok();
    const input = TestUtils.scryRenderedDOMComponentsWithClass(picker,
      'rc-calendar-picker-input')[0];
    async.series([(next) => {
      Simulate.click(input);
      setTimeout(next, 100);
    }, (next) => {
      expect(TestUtils.scryRenderedDOMComponentsWithClass(picker.calendarInstance,
        'rc-calendar')[0]).to.be.ok();
      expect(picker.state.open).to.be(true);
      const day = TestUtils.scryRenderedDOMComponentsWithClass(picker.calendarInstance,
        'rc-calendar-date')[1];
      Simulate.click(day);
      setTimeout(next, 100);
    }, (next) => {
      expect(change).to.be.ok();
      expect(change.getYear()).to.be(2015);
      expect(change.getMonth()).to.be(5);
      expect(change.getDayOfMonth()).to.be(2);
      expect(ReactDOM.findDOMNode(input).value).to.be('2015-06-02');
      expect(picker.state.open).not.to.be.ok();
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
      expect(picker.state.open).not.to.be.ok();
      const input = TestUtils.scryRenderedDOMComponentsWithClass(picker,
        'rc-calendar-picker-input')[0];
      async.series([(next) => {
        Simulate.click(input);
        setTimeout(next, 100);
      }, (next) => {
        expect(TestUtils.scryRenderedDOMComponentsWithClass(picker,
          'rc-calendar')[0]).not.to.be.ok();
        expect(picker.state.open).to.be(true);
        const day = TestUtils.scryRenderedDOMComponentsWithClass(picker.calendarInstance,
          'rc-calendar-date')[1];
        Simulate.click(day);
        setTimeout(next, 100);
      }, (next) => {
        expect(change).to.be.ok();
        expect(change.getYear()).to.be(2015);
        expect(change.getMonth()).to.be(5);
        expect(change.getDayOfMonth()).to.be(2);
        expect(ReactDOM.findDOMNode(input).value).to.be('2015-06-02');
        expect(picker.state.open).not.to.be.ok();
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
      expect(picker.state.open).not.to.be.ok();
      const input = TestUtils.scryRenderedDOMComponentsWithClass(picker,
        'rc-calendar-picker-input')[0];
      async.series([(next) => {
        Simulate.click(input);
        setTimeout(next, 100);
      }, (next) => {
        expect(TestUtils.scryRenderedDOMComponentsWithClass(picker,
          'rc-calendar')[0]).not.to.be.ok();
        expect(picker.state.open).to.be(true);
        if (document.querySelectorAll) {
          expect(document.querySelectorAll('.rc-calendar-picker').length).not.to.be(0);
        }
        expect(TestUtils.scryRenderedDOMComponentsWithClass(picker.calendarInstance,
          'rc-calendar-date')[0]).to.be.ok();
        ReactDOM.unmountComponentAtNode(div);
        setTimeout(next, 100);
      }, (next) => {
        if (document.querySelectorAll) {
          expect(document.querySelectorAll('.rc-calendar-picker').length).to.be(0);
        }
        expect(picker.calendarInstance).not.to.be.ok();
        next();
      }], () => {
        done();
      });
    });
  });
});
