import {KeyCode as keyCode} from 'rc-util';
import expect from 'expect.js';
import Calendar from '../index';
import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
var Simulate = TestUtils.Simulate;
import async from 'async';
import DateTimeFormat from 'gregorian-calendar-format';
const formatter = new DateTimeFormat('yyyy-MM-dd HH:mm:ss');

describe('Calendar', function () {
  var calendar;
  var input;
  var container = document.createElement('div');
  document.body.appendChild(container);

  afterEach(function () {
    ReactDOM.unmountComponentAtNode(container);
  });

  describe('render', function () {
    describe('render', function () {
      it('render showToday false', function () {
        calendar = ReactDOM.render(<Calendar showToday={false}/>, container);
        expect(TestUtils.scryRenderedDOMComponentsWithClass(calendar, 'rc-calendar-today-btn').length).to.be(0);
      });
    });
  });

  describe('after render', function () {
    beforeEach(function (done) {
      ReactDOM.render(<Calendar showToday={true} showWeekNumber={true} showTime={true}/>, container, function () {
        calendar = this;
        input = TestUtils.scryRenderedDOMComponentsWithClass(calendar, 'rc-calendar-input')[0];
        done();
      });
    });

    describe('keyboard works', function () {
      it('left works', function (done) {
        var original = calendar.state.value;
        var expected = original.clone();
        expected.addDayOfMonth(-1);
        Simulate.keyDown(ReactDOM.findDOMNode(calendar), {
          keyCode: keyCode.LEFT
        });
        setTimeout(function () {
          expect(calendar.state.value.getDayOfMonth()).to.be(expected.getDayOfMonth());
          expect(ReactDOM.findDOMNode(input).value).to.be('');
          done();
        }, 10);
      });


      it('right works', function (done) {
        var original = calendar.state.value;
        var expected = original.clone();
        expected.addDayOfMonth(1);
        Simulate.keyDown(ReactDOM.findDOMNode(calendar), {
          keyCode: keyCode.RIGHT
        });
        setTimeout(function () {
          expect(calendar.state.value.getDayOfMonth()).to.be(expected.getDayOfMonth());
          expect(ReactDOM.findDOMNode(input).value).to.be('');
          done();
        }, 10);
      });

      it('up works', function (done) {
        var original = calendar.state.value;
        var expected = original.clone();
        expected.addDayOfMonth(-7);
        Simulate.keyDown(ReactDOM.findDOMNode(calendar), {
          keyCode: keyCode.UP
        });
        setTimeout(function () {
          expect(calendar.state.value.getDayOfMonth()).to.be(expected.getDayOfMonth());
          expect(ReactDOM.findDOMNode(input).value).to.be('');
          done();
        }, 10);
      });

      it('down works', function (done) {
        var original = calendar.state.value;
        var expected = original.clone();
        expected.addDayOfMonth(7);
        Simulate.keyDown(ReactDOM.findDOMNode(calendar), {
          keyCode: keyCode.DOWN
        });
        setTimeout(function () {
          expect(calendar.state.value.getDayOfMonth()).to.be(expected.getDayOfMonth());
          expect(ReactDOM.findDOMNode(input).value).to.be('');
          done();
        }, 10);
      });

      it('pageDown works', function (done) {
        var original = calendar.state.value;
        var expected = original.clone();
        expected.addMonth(1);
        Simulate.keyDown(ReactDOM.findDOMNode(calendar), {
          keyCode: keyCode.PAGE_DOWN
        });
        setTimeout(function () {
          expect(calendar.state.value.getMonth()).to.be(expected.getMonth());
          expect(ReactDOM.findDOMNode(input).value).to.be('');
          done();
        }, 10);
      });

      it('pageUp works', function (done) {
        var original = calendar.state.value;
        var expected = original.clone();
        expected.addMonth(-1);
        Simulate.keyDown(ReactDOM.findDOMNode(calendar), {
          keyCode: keyCode.PAGE_UP
        });
        setTimeout(function () {
          expect(calendar.state.value.getMonth()).to.be(expected.getMonth());
          expect(ReactDOM.findDOMNode(input).value).to.be('');
          done();
        }, 10);
      });

      it('ctrl left works', function (done) {
        var original = calendar.state.value;
        var expected = original.clone();
        expected.addYear(-1);
        Simulate.keyDown(ReactDOM.findDOMNode(calendar), {
          keyCode: keyCode.LEFT,
          ctrlKey: 1
        });
        setTimeout(function () {
          expect(calendar.state.value.getYear()).to.be(expected.getYear());
          expect(ReactDOM.findDOMNode(input).value).to.be('');
          done();
        }, 10);
      });


      it('ctrl right works', function (done) {
        var original = calendar.state.value;
        var expected = original.clone();
        expected.addYear(1);
        Simulate.keyDown(ReactDOM.findDOMNode(calendar), {
          keyCode: keyCode.RIGHT,
          ctrlKey: 1
        });
        setTimeout(function () {
          expect(calendar.state.value.getYear()).to.be(expected.getYear());
          expect(ReactDOM.findDOMNode(input).value).to.be('');
          done();
        }, 10);
      });
    });

    it('next month works', function (done) {
      var month = calendar.state.value.getMonth();
      if (month === 11) {
        month = -1;
      }
      Simulate.click(TestUtils.scryRenderedDOMComponentsWithClass(calendar, 'rc-calendar-next-month-btn')[0]);
      setTimeout(function () {
        expect(calendar.state.value.getMonth()).to.be(month + 1);
        expect(ReactDOM.findDOMNode(input).value).to.be('');
        done();
      }, 10);
    });

    it('previous month works', function (done) {
      var month = calendar.state.value.getMonth();
      if (month === 0) {
        month = 12;
      }
      Simulate.click(TestUtils.scryRenderedDOMComponentsWithClass(calendar, 'rc-calendar-prev-month-btn')[0]);
      setTimeout(function () {
        expect(calendar.state.value.getMonth()).to.be(month - 1);
        expect(ReactDOM.findDOMNode(input).value).to.be('');
        done();
      }, 10);
    });

    it('next year works', function (done) {
      var year = calendar.state.value.getYear();
      Simulate.click(TestUtils.scryRenderedDOMComponentsWithClass(calendar, 'rc-calendar-next-year-btn')[0]);
      setTimeout(function () {
        expect(calendar.state.value.getYear()).to.be(year + 1);
        done();
      }, 10);
    });

    it('previous year works', function (done) {
      var year = calendar.state.value.getYear();
      Simulate.click(TestUtils.scryRenderedDOMComponentsWithClass(calendar, 'rc-calendar-prev-year-btn')[0]);
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
        expect(d.getDayOfMonth()).to.be(parseInt(day.innerHTML), 10);
        done();
      }

      calendar = ReactDOM.render(<Calendar showToday={true}
                                        onSelect={onSelect}
                                        showWeekNumber={true} showTime={true}/>, container);
      day = TestUtils.scryRenderedDOMComponentsWithClass(calendar, 'rc-calendar-date')[5];
      Simulate.mouseDown(day);
      expect(ReactDOM.findDOMNode(input).value).to.be(formatter.format(calendar.state.value));
    });

    it('month panel shows', function (done) {
      expect(TestUtils.scryRenderedDOMComponentsWithClass(calendar, 'rc-calendar-month-panel').length).to.be(0);
      Simulate.click(TestUtils.findRenderedDOMComponentWithClass(calendar, 'rc-calendar-month-select'));
      async.series([function (next) {
        expect(TestUtils.scryRenderedDOMComponentsWithClass(calendar, 'rc-calendar-month-panel').length).to.be(1);
        expect(TestUtils.scryRenderedDOMComponentsWithClass(calendar, 'rc-calendar-month-panel-month').length).to.be(12);
        var m = TestUtils.scryRenderedDOMComponentsWithClass(calendar, 'rc-calendar-month-panel-month')[9];
        Simulate.click(m);
        setTimeout(next, 10);
      }, function (next) {
        expect(calendar.state.value.getMonth()).to.be(9);
        next();
      }], done);
    });

    it('top year panel shows', function (done) {
      var text;
      expect(TestUtils.scryRenderedDOMComponentsWithClass(calendar, 'rc-calendar-year-panel').length).to.be(0);
      Simulate.click(TestUtils.findRenderedDOMComponentWithClass(calendar, 'rc-calendar-year-select'));
      async.series([function (next) {
        expect(TestUtils.scryRenderedDOMComponentsWithClass(calendar, 'rc-calendar-year-panel').length).to.be(1);
        expect(TestUtils.scryRenderedDOMComponentsWithClass(calendar, 'rc-calendar-year-panel-year').length).to.be(12);
        var year = TestUtils.scryRenderedDOMComponentsWithClass(calendar, 'rc-calendar-year-panel-year')[9];
        text = year.innerHTML;
        Simulate.click(year);
        setTimeout(next, 10);
      }, function (next) {
        expect(calendar.state.value.getYear() + '').to.be(text);
        next();
      }], done);
    });

    it('year panel works', function (done) {
      var text;
      async.series([function (done) {
        Simulate.click(TestUtils.findRenderedDOMComponentWithClass(calendar, 'rc-calendar-month-select'));
        setTimeout(done, 10);
      }, function (done) {
        Simulate.click(TestUtils.findRenderedDOMComponentWithClass(calendar, 'rc-calendar-month-panel-year-select'));
        setTimeout(done, 10);
      }, function (done) {
        expect(TestUtils.scryRenderedDOMComponentsWithClass(calendar, 'rc-calendar-year-panel').length).to.be(1);
        expect(TestUtils.scryRenderedDOMComponentsWithClass(calendar, 'rc-calendar-year-panel-year').length).to.be(12);
        var year = TestUtils.scryRenderedDOMComponentsWithClass(calendar, 'rc-calendar-year-panel-year')[9];
        text = year.innerHTML;
        Simulate.click(year);
        setTimeout(done, 10);
      }, function (done) {
        var m = TestUtils.scryRenderedDOMComponentsWithClass(calendar, 'rc-calendar-month-panel-month')[9];
        Simulate.click(m);
        setTimeout(done, 10);
      }, function (done) {
        expect(calendar.state.value.getYear() + '').to.be(text);
        expect(ReactDOM.findDOMNode(input).value).to.be('');
        done();
      }], done);
    });

    it('decade panel works', function (done) {
      async.series([function (done) {
        Simulate.click(TestUtils.findRenderedDOMComponentWithClass(calendar, 'rc-calendar-month-select'));
        setTimeout(done, 10);
      }, function (done) {
        Simulate.click(TestUtils.findRenderedDOMComponentWithClass(calendar, 'rc-calendar-month-panel-year-select'));
        setTimeout(done, 10);
      }, function (done) {
        Simulate.click(TestUtils.findRenderedDOMComponentWithClass(calendar, 'rc-calendar-year-panel-decade-select'));
        setTimeout(done, 10);
      }, function (done) {
        expect(TestUtils.scryRenderedDOMComponentsWithClass(calendar, 'rc-calendar-decade-panel').length).to.be(1);
        expect(TestUtils.scryRenderedDOMComponentsWithClass(calendar, 'rc-calendar-decade-panel-decade').length).to.be(12);
        done();
      }], done);
    });
  });


  describe('input', function () {
    it('blur will fire onSelect/onChange', function (done) {
      let count = 0;
      const expected = '2017-01-21 17:20:21';

      function check() {
        count++;
        if (count == 2) {
          done();
        }
      }

      function onSelect(d) {
        expect(formatter.format(d)).to.be(expected);
        check();
      }

      function onChange(d) {
        expect(formatter.format(d)).to.be(expected);
        check();
      }

      ReactDOM.render(<Calendar showToday={true}
                             onSelect={onSelect}
                             onChange={onChange}
                             showTime={true}/>, container, function () {
        calendar = this;
        input = TestUtils.scryRenderedDOMComponentsWithClass(calendar, 'rc-calendar-input')[0];
      });
      ReactDOM.findDOMNode(input).value = expected;
      Simulate.change(input);
      Simulate.blur(input);
    });
  });
});
