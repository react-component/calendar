/* eslint-disable no-undef */
import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-dom/test-utils';
import keyCode from 'rc-util/lib/KeyCode';
import moment from 'moment';
import { mount, render } from 'enzyme';
import { renderToJson } from 'enzyme-to-json';
import async from 'async';
import TimePickerPanel from 'rc-time-picker/lib/Panel';
import Calendar from '../index';
import zhCN from '../src/locale/zh_CN';
import enUS from '../src/locale/en_US';

const Simulate = TestUtils.Simulate;
const format = ('YYYY-MM-DD');

describe('Calendar', () => {
  let calendar;
  let input;
  const container = document.createElement('div');
  document.body.appendChild(container);

  afterEach(() => {
    ReactDOM.unmountComponentAtNode(container);
  });

  describe('render', () => {
    it('render correctly', () => {
      const zhWrapper = render(
        <Calendar locale={zhCN} defaultValue={moment('2017-03-29').locale('zh-cn')} />
      );
      expect(renderToJson(zhWrapper)).toMatchSnapshot();

      const enWrapper = render(
        <Calendar locale={enUS} defaultValue={moment('2017-03-29').locale('en')} />
      );
      expect(renderToJson(enWrapper)).toMatchSnapshot();
    });

    it('render showToday false correctly', () => {
      const wrapper = mount(<Calendar showToday={false}/>, container);
      expect(wrapper.find('.rc-calendar-today-btn').length).toBe(0);
    });
  });

  describe('timePicker', () => {
    it('set defaultOpenValue if timePicker.props.defaultValue is set', () => {
      const timePicker = <TimePickerPanel defaultValue={moment('00:00:00', 'HH:mm:ss')} />;
      const wrapper = mount(<Calendar timePicker={timePicker} />);
      wrapper.find('.rc-calendar-time-picker-btn').simulate('click');
      const selectedValues = wrapper.find('.rc-time-picker-panel-select-option-selected');
      for (let i = 0; i < selectedValues.length; i += 1) {
        expect(selectedValues.get(i).innerHTML).toBe('00');
      }
    });

    it('follow Calendar[selectedValue|defaultSelectedValue] when it is set', () => {
      const timePicker = <TimePickerPanel defaultValue={moment('00:00:00', 'HH:mm:ss')} />;
      const wrapper = mount(
        <Calendar timePicker={timePicker} defaultSelectedValue={moment('01:01:01', 'HH:mm:ss')} />
      );
      wrapper.find('.rc-calendar-time-picker-btn').simulate('click');
      const selectedValues = wrapper.find('.rc-time-picker-panel-select-option-selected');
      for (let i = 0; i < selectedValues.length; i += 1) {
        expect(selectedValues.get(i).innerHTML).toBe('01');
      }
    });

    it('use timePicker\'s time', () => {
      const timePicker = <TimePickerPanel defaultValue={moment('00:00:00', 'HH:mm:ss')} />;
      const wrapper = mount(<Calendar timePicker={timePicker} />);

      wrapper.find('.rc-calendar-today').simulate('click');
      // use timePicker's defaultValue if users haven't select a time
      expect(wrapper.find('.rc-calendar-input').get(0).value).toBe('3/29/2017 00:00:00');

      wrapper.find('.rc-calendar-time-picker-btn').simulate('click');
      wrapper.find('.rc-time-picker-panel-select ul').at(0).find('li').at(6).simulate('click');
      // update time to timePicker's time
      expect(wrapper.find('.rc-calendar-input').get(0).value).toBe('3/29/2017 06:00:00');

      wrapper.find('.rc-calendar-cell').at(10).simulate('click');
      // still use timePicker's time
      expect(wrapper.find('.rc-calendar-input').get(0).value).toBe('3/8/2017 06:00:00');
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
        expected.add(-1, 'day');
        Simulate.keyDown(ReactDOM.findDOMNode(calendar), {
          keyCode: keyCode.LEFT,
        });
        setTimeout(() => {
          expect(calendar.state.value.date())
            .toBe(expected.date());
          expect(ReactDOM.findDOMNode(input).value).toBe('');
          done();
        }, 10);
      });


      it('right works', (done) => {
        const original = calendar.state.value;
        const expected = original.clone();
        expected.add(1, 'day');
        Simulate.keyDown(ReactDOM.findDOMNode(calendar), {
          keyCode: keyCode.RIGHT,
        });
        setTimeout(() => {
          expect(calendar.state.value.date())
            .toBe(expected.date());
          expect(ReactDOM.findDOMNode(input).value).toBe('');
          done();
        }, 10);
      });

      it('up works', (done) => {
        const original = calendar.state.value;
        const expected = original.clone();
        expected.add(-7, 'day');
        Simulate.keyDown(ReactDOM.findDOMNode(calendar), {
          keyCode: keyCode.UP,
        });
        setTimeout(() => {
          expect(calendar.state.value.date())
            .toBe(expected.date());
          expect(ReactDOM.findDOMNode(input).value).toBe('');
          done();
        }, 10);
      });

      it('down works', (done) => {
        const original = calendar.state.value;
        const expected = original.clone();
        expected.add(7, 'day');
        Simulate.keyDown(ReactDOM.findDOMNode(calendar), {
          keyCode: keyCode.DOWN,
        });
        setTimeout(() => {
          expect(calendar.state.value.date())
            .toBe(expected.date());
          expect(ReactDOM.findDOMNode(input).value).toBe('');
          done();
        }, 10);
      });

      it('pageDown works', (done) => {
        const original = calendar.state.value;
        const expected = original.clone();
        expected.add(1, 'month');
        Simulate.keyDown(ReactDOM.findDOMNode(calendar), {
          keyCode: keyCode.PAGE_DOWN,
        });
        setTimeout(() => {
          expect(calendar.state.value.month())
            .toBe(expected.month());
          expect(ReactDOM.findDOMNode(input).value).toBe('');
          done();
        }, 10);
      });

      it('pageUp works', (done) => {
        const original = calendar.state.value;
        const expected = original.clone();
        expected.add(-1, 'month');
        Simulate.keyDown(ReactDOM.findDOMNode(calendar), {
          keyCode: keyCode.PAGE_UP,
        });
        setTimeout(() => {
          expect(calendar.state.value.month())
            .toBe(expected.month());
          expect(ReactDOM.findDOMNode(input).value).toBe('');
          done();
        }, 10);
      });

      it('ctrl left works', (done) => {
        const original = calendar.state.value;
        const expected = original.clone();
        expected.add(-1, 'year');
        Simulate.keyDown(ReactDOM.findDOMNode(calendar), {
          keyCode: keyCode.LEFT,
          ctrlKey: 1,
        });
        setTimeout(() => {
          expect(calendar.state.value.year())
            .toBe(expected.year());
          expect(ReactDOM.findDOMNode(input).value).toBe('');
          done();
        }, 10);
      });
      it('ctrl right works', (done) => {
        const original = calendar.state.value;
        const expected = original.clone();
        expected.add(1, 'year');
        Simulate.keyDown(ReactDOM.findDOMNode(calendar), {
          keyCode: keyCode.RIGHT,
          ctrlKey: 1,
        });
        setTimeout(() => {
          expect(calendar.state.value.year())
            .toBe(expected.year());
          expect(ReactDOM.findDOMNode(input).value).toBe('');
          done();
        }, 10);
      });

      it('enter to select works', () => {
        const onSelect = jest.fn();
        let today;
        calendar = ReactDOM.render(
          <Calendar onSelect={onSelect} />,
          container
        );
        today = calendar.state.value;

        Simulate.keyDown(ReactDOM.findDOMNode(calendar), {
          keyCode: keyCode.ENTER,
        });
        expect(onSelect).toHaveBeenCalledWith(today, {
          source: 'keyboard',
        });
      });

      it('enter not to select disabled date', () => {
        const onSelect = jest.fn();
        function disabledDate(current) {
          if (!current) {
            return false;
          }
          const date = moment();
          date.hour(0);
          date.minute(0);
          date.second(0);
          return current.valueOf() < date.valueOf();
        }

        calendar = ReactDOM.render(
          <Calendar onSelect={onSelect} disabledDate={disabledDate} />,
          container
        );

        Simulate.keyDown(ReactDOM.findDOMNode(calendar), {
          keyCode: keyCode.LEFT,
        });
        Simulate.keyDown(ReactDOM.findDOMNode(calendar), {
          keyCode: keyCode.ENTER,
        });

        expect(onSelect).not.toHaveBeenCalled();
      });
    });

    it('next month works', (done) => {
      let month = calendar.state.value.month();
      if (month === 11) {
        month = -1;
      }
      Simulate.click(TestUtils.scryRenderedDOMComponentsWithClass(calendar,
        'rc-calendar-next-month-btn')[0]);
      setTimeout(() => {
        expect(calendar.state.value.month()).toBe(month + 1);
        expect(ReactDOM.findDOMNode(input).value).toBe('');
        done();
      }, 10);
    });

    it('previous month works', (done) => {
      let month = calendar.state.value.month();
      if (month === 0) {
        month = 12;
      }
      Simulate.click(TestUtils.scryRenderedDOMComponentsWithClass(calendar,
        'rc-calendar-prev-month-btn')[0]);
      setTimeout(() => {
        expect(calendar.state.value.month()).toBe(month - 1);
        expect(ReactDOM.findDOMNode(input).value).toBe('');
        done();
      }, 10);
    });

    it('next year works', (done) => {
      const year = calendar.state.value.year();
      Simulate.click(TestUtils.scryRenderedDOMComponentsWithClass(calendar,
        'rc-calendar-next-year-btn')[0]);
      setTimeout(() => {
        expect(calendar.state.value.year()).toBe(year + 1);
        done();
      }, 10);
    });

    it('previous year works', (done) => {
      const year = calendar.state.value.year();
      Simulate.click(TestUtils.scryRenderedDOMComponentsWithClass(calendar,
        'rc-calendar-prev-year-btn')[0]);
      setTimeout(() => {
        expect(calendar.state.value.year()).toBe(year - 1);
        done();
      }, 10);
    });

    it('onSelect works', (done) => {
      let day;

      function onSelect(d) {
        expect(d.date()).toBe(parseInt(day.innerHTML, 10));
        done();
      }

      calendar = ReactDOM.render(
        <Calendar
          format={format}
          showToday
          onSelect={onSelect}
          showWeekNumber
        />, container);
      day = TestUtils.scryRenderedDOMComponentsWithClass(calendar,
        'rc-calendar-date')[5];
      Simulate.click(day);
      expect(ReactDOM.findDOMNode(input).value)
        .toBe(calendar.state.value.format(format));
    });

    it('month panel shows', (done) => {
      expect(TestUtils.scryRenderedDOMComponentsWithClass(calendar,
        'rc-calendar-month-panel').length).toBe(0);
      async.series([(next) => {
        Simulate.click(TestUtils.findRenderedDOMComponentWithClass(calendar,
          'rc-calendar-month-select'));
        setTimeout(next, 10);
      }, (next) => {
        expect(TestUtils.scryRenderedDOMComponentsWithClass(calendar,
          'rc-calendar-month-panel').length).toBe(1);
        expect(TestUtils.scryRenderedDOMComponentsWithClass(calendar,
          'rc-calendar-month-panel-month').length).toBe(12);
        const m = TestUtils.scryRenderedDOMComponentsWithClass(calendar,
          'rc-calendar-month-panel-month')[9];
        Simulate.click(m);
        setTimeout(next, 10);
      }, (next) => {
        expect(calendar.state.value.month()).toBe(9);
        next();
      }], done);
    });

    it('top year panel shows', (done) => {
      let text;
      expect(TestUtils.scryRenderedDOMComponentsWithClass(calendar,
        'rc-calendar-year-panel').length).toBe(0);
      async.series([(next) => {
        Simulate.click(TestUtils.findRenderedDOMComponentWithClass(calendar,
          'rc-calendar-year-select'));
        setTimeout(next, 10);
      }, (next) => {
        expect(TestUtils.scryRenderedDOMComponentsWithClass(calendar,
          'rc-calendar-year-panel').length).toBe(1);
        expect(TestUtils.scryRenderedDOMComponentsWithClass(calendar,
          'rc-calendar-year-panel-year').length).toBe(12);
        const year = TestUtils.scryRenderedDOMComponentsWithClass(calendar,
          'rc-calendar-year-panel-year')[9];
        text = year.innerHTML;
        Simulate.click(year);
        setTimeout(next, 10);
      }, (next) => {
        expect(String(calendar.state.value.year())).toBe(text);
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
          'rc-calendar-year-panel').length).toBe(1);
        expect(TestUtils.scryRenderedDOMComponentsWithClass(calendar,
          'rc-calendar-year-panel-year').length).toBe(12);
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
        expect(String(calendar.state.value.year())).toBe(text);
        expect(ReactDOM.findDOMNode(input).value).toBe('');
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
          'rc-calendar-decade-panel').length).toBe(1);
        expect(TestUtils.scryRenderedDOMComponentsWithClass(calendar,
          'rc-calendar-decade-panel-decade').length).toBe(12);
        next();
      }], done);
    });
  });


  describe('input', () => {
    it('change will fire onSelect/onChange', (done) => {
      let count = 0;
      const expected = '2017-01-21';

      function check() {
        count++;
        if (count === 2) {
          done();
        }
      }

      function onSelect(d) {
        expect(d.format(format)).toBe(expected);
        check();
      }

      function onChange(d) {
        expect(d.format(format)).toBe(expected);
        check();
      }

      ReactDOM.render(<Calendar
        format={format}
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
    });
  });
});
