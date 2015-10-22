import {KeyCode as keyCode} from 'rc-util';
import expect from 'expect.js';
import Calendar from '../index';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import ReactDOM from 'react-dom';
var Simulate = TestUtils.Simulate;
import async from 'async';

describe('Time', function () {
  var calendar;
  var container = document.createElement('div');
  document.body.appendChild(container);

  beforeEach(function (done) {
    ReactDOM.render(<Calendar showToday={true} showWeekNumber={true} showTime={true}/>, container, function () {
      calendar = this;
      done();
    });
  });

  afterEach(function () {
    ReactDOM.unmountComponentAtNode(container);
  });

  describe('keyboard', function () {
    it('hour pane works for up', function (done) {
      var hour = calendar.state.value.getHourOfDay();
      if (hour === 0) {
        hour = 24;
      }
      Simulate.keyDown(TestUtils.scryRenderedDOMComponentsWithClass(calendar, 'rc-calendar-time-input')[0], {
        keyCode: keyCode.UP
      });
      setTimeout(function () {
        expect(calendar.state.value.getHourOfDay()).to.be(hour - 1);
        done();
      }, 10);
    });
    it('hour pane works for down', function (done) {
      var hour = calendar.state.value.getHourOfDay();
      if (hour === 23) {
        hour = -1;
      }
      Simulate.keyDown(TestUtils.scryRenderedDOMComponentsWithClass(calendar, 'rc-calendar-time-input')[0], {
        keyCode: keyCode.DOWN
      });
      setTimeout(function () {
        expect(calendar.state.value.getHourOfDay()).to.be(hour + 1);
        done();
      }, 10);
    });
    it('minute pane works for up', function (done) {
      var minute = calendar.state.value.getMinutes();
      if (minute === 0) {
        minute = 60;
      }
      Simulate.keyDown(TestUtils.scryRenderedDOMComponentsWithClass(calendar, 'rc-calendar-time-input')[1], {
        keyCode: keyCode.UP
      });
      setTimeout(function () {
        expect(calendar.state.value.getMinutes()).to.be(minute - 1);
        done();
      }, 10);
    });
    it('minute pane works for down', function (done) {
      var minute = calendar.state.value.getMinutes();
      if (minute === 59) {
        minute = -1;
      }
      Simulate.keyDown(TestUtils.scryRenderedDOMComponentsWithClass(calendar, 'rc-calendar-time-input')[1], {
        keyCode: keyCode.DOWN
      });
      setTimeout(function () {
        expect(calendar.state.value.getMinutes()).to.be(minute + 1);
        done();
      }, 10);
    });
    it('second pane works for up', function (done) {
      var second = calendar.state.value.getSeconds();
      if (second === 0) {
        second = 59;
      }
      Simulate.keyDown(TestUtils.scryRenderedDOMComponentsWithClass(calendar, 'rc-calendar-time-input')[2], {
        keyCode: keyCode.UP
      });
      setTimeout(function () {
        expect(calendar.state.value.getSeconds()).to.be(second - 1);
        done();
      }, 10);
    });
    it('second pane works for down', function (done) {
      var second = calendar.state.value.getSeconds();
      if (second === 59) {
        second = -1;
      }
      Simulate.keyDown(TestUtils.scryRenderedDOMComponentsWithClass(calendar, 'rc-calendar-time-input')[2], {
        keyCode: keyCode.DOWN
      });
      setTimeout(function () {
        expect(calendar.state.value.getSeconds()).to.be(second + 1);
        done();
      }, 10);
    });
  });

  it('hour pane shows', function (done) {
    Simulate.click(TestUtils.scryRenderedDOMComponentsWithClass(calendar, 'rc-calendar-time-input')[0]);
    async.series([function (done) {
      expect(TestUtils.scryRenderedDOMComponentsWithClass(calendar, 'rc-calendar-time-panel-time').length).to.be(24);
      Simulate.click(TestUtils.scryRenderedDOMComponentsWithClass(calendar, 'rc-calendar-time-panel-time')[2]);
      setTimeout(done, 10);
    }, function (done) {
      expect(calendar.state.value.getHourOfDay()).to.be(2);
      done();
    }], done);
  });

  it('minute pane shows', function (done) {
    Simulate.click(TestUtils.scryRenderedDOMComponentsWithClass(calendar, 'rc-calendar-time-input')[1]);
    setTimeout(function () {
      expect(TestUtils.scryRenderedDOMComponentsWithClass(calendar, 'rc-calendar-time-panel-time').length).to.be(60);
      done();
    }, 10);
  });

  it('second pane shows', function (done) {
    Simulate.click(TestUtils.scryRenderedDOMComponentsWithClass(calendar, 'rc-calendar-time-input')[2]);
    setTimeout(function () {
      expect(TestUtils.scryRenderedDOMComponentsWithClass(calendar, 'rc-calendar-time-panel-time').length).to.be(60);
      done();
    }, 10);
  });
});
