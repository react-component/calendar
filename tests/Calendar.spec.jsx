import keyCode from 'rc-util/lib/KeyCode';
import expect from 'expect.js';
import Calendar from '../index';
import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
const Simulate = TestUtils.Simulate;
import async from 'async';
import DateTimeFormat from 'gregorian-calendar-format';
const formatter = new DateTimeFormat('yyyy-MM-dd');

describe('Calendar', () => {
  let calendar;
  let input;
  const container = document.createElement('div');
  document.body.appendChild(container);

  afterEach(() => {
    ReactDOM.unmountComponentAtNode(container);
  });

  describe('render', () => {
    describe('render', () => {
      it('render showToday false', () => {
        calendar = ReactDOM.render(<Calendar showToday={false}/>, container);
        expect(TestUtils.scryRenderedDOMComponentsWithClass(calendar,
          'rc-calendar-today-btn').length).to.be(0);
      });
    });
  });

  describe('after render', () => {
    beforeEach((done) => {
      ReactDOM.render(<Calendar showToday showWeekNumber/>, container, function ok() {
        calendar = this;
        input = TestUtils.scryRenderedDOMComponentsWithClass(calendar,
          'rc-calendar-input')[0];
        done();
      });
    });

    describe('keyboard works', () => {
      it('left works', (done) => {
        const original = calendar.state.value;
        const expected = original.clone();
        expected.addDayOfMonth(-1);
        Simulate.keyDown(ReactDOM.findDOMNode(calendar), {
          keyCode: keyCode.LEFT,
        });
        setTimeout(() => {
          expect(calendar.state.value.getDayOfMonth())
            .to.be(expected.getDayOfMonth());
          expect(ReactDOM.findDOMNode(input).value).to.be('');
          done();
        }, 10);
      });


      it('right works', (done) => {
        const original = calendar.state.value;
        const expected = original.clone();
        expected.addDayOfMonth(1);
        Simulate.keyDown(ReactDOM.findDOMNode(calendar), {
          keyCode: keyCode.RIGHT,
        });
        setTimeout(() => {
          expect(calendar.state.value.getDayOfMonth())
            .to.be(expected.getDayOfMonth());
          expect(ReactDOM.findDOMNode(input).value).to.be('');
          done();
        }, 10);
      });

      it('up works', (done) => {
        const original = calendar.state.value;
        const expected = original.clone();
        expected.addDayOfMonth(-7);
        Simulate.keyDown(ReactDOM.findDOMNode(calendar), {
          keyCode: keyCode.UP,
        });
        setTimeout(() => {
          expect(calendar.state.value.getDayOfMonth())
            .to.be(expected.getDayOfMonth());
          expect(ReactDOM.findDOMNode(input).value).to.be('');
          done();
        }, 10);
      });

      it('down works', (done) => {
        const original = calendar.state.value;
        const expected = original.clone();
        expected.addDayOfMonth(7);
        Simulate.keyDown(ReactDOM.findDOMNode(calendar), {
          keyCode: keyCode.DOWN,
        });
        setTimeout(() => {
          expect(calendar.state.value.getDayOfMonth())
            .to.be(expected.getDayOfMonth());
          expect(ReactDOM.findDOMNode(input).value).to.be('');
          done();
        }, 10);
      });

      it('pageDown works', (done) => {
        const original = calendar.state.value;
        const expected = original.clone();
        expected.addMonth(1);
        Simulate.keyDown(ReactDOM.findDOMNode(calendar), {
          keyCode: keyCode.PAGE_DOWN,
        });
        setTimeout(() => {
          expect(calendar.state.value.getMonth())
            .to.be(expected.getMonth());
          expect(ReactDOM.findDOMNode(input).value).to.be('');
          done();
        }, 10);
      });

      it('pageUp works', (done) => {
        const original = calendar.state.value;
        const expected = original.clone();
        expected.addMonth(-1);
        Simulate.keyDown(ReactDOM.findDOMNode(calendar), {
          keyCode: keyCode.PAGE_UP,
        });
        setTimeout(() => {
          expect(calendar.state.value.getMonth())
            .to.be(expected.getMonth());
          expect(ReactDOM.findDOMNode(input).value).to.be('');
          done();
        }, 10);
      });

      it('ctrl left works', (done) => {
        const original = calendar.state.value;
        const expected = original.clone();
        expected.addYear(-1);
        Simulate.keyDown(ReactDOM.findDOMNode(calendar), {
          keyCode: keyCode.LEFT,
          ctrlKey: 1,
        });
        setTimeout(() => {
          expect(calendar.state.value.getYear())
            .to.be(expected.getYear());
          expect(ReactDOM.findDOMNode(input).value).to.be('');
          done();
        }, 10);
      });
      it('ctrl right works', (done) => {
        const original = calendar.state.value;
        const expected = original.clone();
        expected.addYear(1);
        Simulate.keyDown(ReactDOM.findDOMNode(calendar), {
          keyCode: keyCode.RIGHT,
          ctrlKey: 1,
        });
        setTimeout(() => {
          expect(calendar.state.value.getYear())
            .to.be(expected.getYear());
          expect(ReactDOM.findDOMNode(input).value).to.be('');
          done();
        }, 10);
      });
    });

    it('next month works', (done) => {
      let month = calendar.state.value.getMonth();
      if (month === 11) {
        month = -1;
      }
      Simulate.click(TestUtils.scryRenderedDOMComponentsWithClass(calendar,
        'rc-calendar-next-month-btn')[0]);
      setTimeout(() => {
        expect(calendar.state.value.getMonth()).to.be(month + 1);
        expect(ReactDOM.findDOMNode(input).value).to.be('');
        done();
      }, 10);
    });

    it('previous month works', (done) => {
      let month = calendar.state.value.getMonth();
      if (month === 0) {
        month = 12;
      }
      Simulate.click(TestUtils.scryRenderedDOMComponentsWithClass(calendar,
        'rc-calendar-prev-month-btn')[0]);
      setTimeout(() => {
        expect(calendar.state.value.getMonth()).to.be(month - 1);
        expect(ReactDOM.findDOMNode(input).value).to.be('');
        done();
      }, 10);
    });

    it('next year works', (done) => {
      const year = calendar.state.value.getYear();
      Simulate.click(TestUtils.scryRenderedDOMComponentsWithClass(calendar,
        'rc-calendar-next-year-btn')[0]);
      setTimeout(() => {
        expect(calendar.state.value.getYear()).to.be(year + 1);
        done();
      }, 10);
    });

    it('previous year works', (done) => {
      const year = calendar.state.value.getYear();
      Simulate.click(TestUtils.scryRenderedDOMComponentsWithClass(calendar,
        'rc-calendar-prev-year-btn')[0]);
      setTimeout(() => {
        expect(calendar.state.value.getYear()).to.be(year - 1);
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
        expect(d.getDayOfMonth()).to.be(parseInt(day.innerHTML, 10));
        done();
      }

      calendar = ReactDOM.render(<Calendar
        formatter={formatter}
        showToday
        onSelect={onSelect}
        showWeekNumber
      />, container);
      day = TestUtils.scryRenderedDOMComponentsWithClass(calendar,
        'rc-calendar-date')[5];
      Simulate.click(day);
      expect(ReactDOM.findDOMNode(input).value)
        .to.be(formatter.format(calendar.state.value));
    });

    it('month panel shows', (done) => {
      expect(TestUtils.scryRenderedDOMComponentsWithClass(calendar,
        'rc-calendar-month-panel').length).to.be(0);
      Simulate.click(TestUtils.findRenderedDOMComponentWithClass(calendar,
        'rc-calendar-month-select'));
      async.series([(next) => {
        expect(TestUtils.scryRenderedDOMComponentsWithClass(calendar,
          'rc-calendar-month-panel').length).to.be(1);
        expect(TestUtils.scryRenderedDOMComponentsWithClass(calendar,
          'rc-calendar-month-panel-month').length).to.be(12);
        const m = TestUtils.scryRenderedDOMComponentsWithClass(calendar,
          'rc-calendar-month-panel-month')[9];
        Simulate.click(m);
        setTimeout(next, 10);
      }, (next) => {
        expect(calendar.state.value.getMonth()).to.be(9);
        next();
      }], done);
    });

    it('top year panel shows', (done) => {
      let text;
      expect(TestUtils.scryRenderedDOMComponentsWithClass(calendar,
        'rc-calendar-year-panel').length).to.be(0);
      Simulate.click(TestUtils.findRenderedDOMComponentWithClass(calendar,
        'rc-calendar-year-select'));
      async.series([(next) => {
        expect(TestUtils.scryRenderedDOMComponentsWithClass(calendar,
          'rc-calendar-year-panel').length).to.be(1);
        expect(TestUtils.scryRenderedDOMComponentsWithClass(calendar,
          'rc-calendar-year-panel-year').length).to.be(12);
        const year = TestUtils.scryRenderedDOMComponentsWithClass(calendar,
          'rc-calendar-year-panel-year')[9];
        text = year.innerHTML;
        Simulate.click(year);
        setTimeout(next, 10);
      }, (next) => {
        expect(String(calendar.state.value.getYear())).to.be(text);
        next();
      }], done);
    });

    it('year panel works', (done) => {
      let text;
      async.series([(next) => {
        Simulate.click(TestUtils.findRenderedDOMComponentWithClass(calendar,
          'rc-calendar-month-select'));
        setTimeout(next, 10);
      }, (next) => {
        Simulate.click(TestUtils.findRenderedDOMComponentWithClass(calendar,
          'rc-calendar-month-panel-year-select'));
        setTimeout(next, 10);
      }, (next) => {
        expect(TestUtils.scryRenderedDOMComponentsWithClass(calendar,
          'rc-calendar-year-panel').length).to.be(1);
        expect(TestUtils.scryRenderedDOMComponentsWithClass(calendar,
          'rc-calendar-year-panel-year').length).to.be(12);
        const year = TestUtils.scryRenderedDOMComponentsWithClass(calendar,
          'rc-calendar-year-panel-year')[9];
        text = year.innerHTML;
        Simulate.click(year);
        setTimeout(next, 10);
      }, (next) => {
        const m = TestUtils.scryRenderedDOMComponentsWithClass(calendar,
          'rc-calendar-month-panel-month')[9];
        Simulate.click(m);
        setTimeout(next, 10);
      }, (next) => {
        expect(String(calendar.state.value.getYear())).to.be(text);
        expect(ReactDOM.findDOMNode(input).value).to.be('');
        next();
      }], done);
    });

    it('decade panel works', (done) => {
      async.series([(next) => {
        Simulate.click(TestUtils.findRenderedDOMComponentWithClass(calendar,
          'rc-calendar-month-select'));
        setTimeout(next, 10);
      }, (next) => {
        Simulate.click(TestUtils.findRenderedDOMComponentWithClass(calendar,
          'rc-calendar-month-panel-year-select'));
        setTimeout(next, 10);
      }, (next) => {
        Simulate.click(TestUtils.findRenderedDOMComponentWithClass(calendar,
          'rc-calendar-year-panel-decade-select'));
        setTimeout(next, 10);
      }, (next) => {
        expect(TestUtils.scryRenderedDOMComponentsWithClass(calendar,
          'rc-calendar-decade-panel').length).to.be(1);
        expect(TestUtils.scryRenderedDOMComponentsWithClass(calendar,
          'rc-calendar-decade-panel-decade').length).to.be(12);
        next();
      }], done);
    });
  });


  describe('input', () => {
    it('blur will fire onSelect/onChange', (done) => {
      let count = 0;
      const expected = '2017-01-21';

      function check() {
        count++;
        if (count === 2) {
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

      ReactDOM.render(<Calendar
        formatter={formatter}
        showToday
        onSelect={onSelect}
        onChange={onChange}
      />, container, function ok() {
        calendar = this;
        input = TestUtils.scryRenderedDOMComponentsWithClass(calendar,
          'rc-calendar-input')[0];
      });
      ReactDOM.findDOMNode(input).value = expected;
      Simulate.change(input);
      Simulate.blur(input);
    });
  });
});
