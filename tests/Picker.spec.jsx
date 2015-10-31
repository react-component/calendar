import {KeyCode as keyCode} from 'rc-util';
import expect from 'expect.js';
import Calendar from '../index';
import DatePicker from '../src/Picker';
import ReactDOM from 'react-dom';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
var Simulate = TestUtils.Simulate;
import async from 'async';
import DateTimeFormat from 'gregorian-calendar-format';
var formatter = new DateTimeFormat('yyyy-MM-dd');
import GregorianCalendar from 'gregorian-calendar';
import zhCn from 'gregorian-calendar/lib/locale/zh-cn';
import CalendarLocale from '../src/locale/zh-cn';
var value = new GregorianCalendar(zhCn);
value.set(2015, 5, 1);

describe('DatePicker', function () {
  var div;

  function noop(){}

  function renderPicker(props) {
    return ReactDOM.render(<DatePicker
      calendar={<Calendar
        locale={CalendarLocale}/>}
      defaultValue={value}
      {...props}
      >{({value}) => {
      return <input className="rc-calendar-picker-input"
                    onChange={noop}
                    readOnly
                    value={value  && formatter.format(value)}/>;
    }
    }
    </DatePicker>, div);
  }

  beforeEach(function () {
    div = document.createElement('div');
    document.body.appendChild(div);
  });

  afterEach(function () {
    ReactDOM.unmountComponentAtNode(div);
    document.body.removeChild(div);
  });

  it('popup correctly', function (done) {
    var change;
    var picker = renderPicker({
      onChange: function (v) {
        change = v;
      }
    });
    expect(picker.state.open).not.to.be.ok();
    var input = TestUtils.scryRenderedDOMComponentsWithClass(picker, 'rc-calendar-picker-input')[0];
    async.series([function (next) {
      Simulate.click(input);
      setTimeout(next, 100);
    }, function (next) {
      expect(TestUtils.scryRenderedDOMComponentsWithClass(picker.calendarInstance, 'rc-calendar')[0]).to.be.ok();
      expect(picker.state.open).to.be(true);
      var day = TestUtils.scryRenderedDOMComponentsWithClass(picker.calendarInstance, 'rc-calendar-date')[1];
      Simulate.mouseDown(day);
      setTimeout(next, 100);
    }, function (next) {
      expect(change).to.be.ok();
      expect(change.getYear()).to.be(2015);
      expect(change.getMonth()).to.be(5);
      expect(change.getDayOfMonth()).to.be(2);
      expect(ReactDOM.findDOMNode(input).value).to.be('2015-06-02');
      expect(picker.state.open).not.to.be.ok();
      next();
    }], function () {
      done();
    });
  });

  describe('render calendar to body', function () {
    it('support correctly', function (done) {
      var change;
      var picker = renderPicker({
        onChange: function (v) {
          change = v;
        }
      });
      expect(picker.state.open).not.to.be.ok();
      var input = TestUtils.scryRenderedDOMComponentsWithClass(picker, 'rc-calendar-picker-input')[0];
      async.series([function (next) {
        Simulate.click(input);
        setTimeout(next, 100);
      }, function (next) {
        expect(TestUtils.scryRenderedDOMComponentsWithClass(picker, 'rc-calendar')[0]).not.to.be.ok();
        expect(picker.state.open).to.be(true);
        var day = TestUtils.scryRenderedDOMComponentsWithClass(picker.calendarInstance, 'rc-calendar-date')[1];
        Simulate.mouseDown(day);
        setTimeout(next, 100);
      }, function (next) {
        expect(change).to.be.ok();
        expect(change.getYear()).to.be(2015);
        expect(change.getMonth()).to.be(5);
        expect(change.getDayOfMonth()).to.be(2);
        expect(ReactDOM.findDOMNode(input).value).to.be('2015-06-02');
        expect(picker.state.open).not.to.be.ok();
        next();
      }], function () {
        done();
      });
    });

    it('destroy correctly', function (done) {
      var change;
      var picker = renderPicker({
        onChange: function (v) {
          change = v;
        }
      });
      expect(picker.state.open).not.to.be.ok();
      var input = TestUtils.scryRenderedDOMComponentsWithClass(picker, 'rc-calendar-picker-input')[0];
      async.series([function (next) {
        Simulate.click(input);
        setTimeout(next, 100);
      }, function (next) {
        expect(TestUtils.scryRenderedDOMComponentsWithClass(picker, 'rc-calendar')[0]).not.to.be.ok();
        expect(picker.state.open).to.be(true);
        if (document.querySelectorAll) {
          expect(document.querySelectorAll('.rc-calendar-picker').length).not.to.be(0);
        }
        expect(TestUtils.scryRenderedDOMComponentsWithClass(picker.calendarInstance, 'rc-calendar-date')[0]).to.be.ok();
        ReactDOM.unmountComponentAtNode(div);
        setTimeout(next, 100);
      }, function (next) {
        if (document.querySelectorAll) {
          expect(document.querySelectorAll('.rc-calendar-picker').length).to.be(0);
        }
        expect(picker.calendarInstance).not.to.be.ok();
        next();
      }], function () {
        done();
      });
    });
  });
});