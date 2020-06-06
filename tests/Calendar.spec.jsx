/* eslint-disable no-undef */
import React from 'react';
import keyCode from 'rc-util/lib/KeyCode';
import moment from 'moment';
import { mount, render } from 'enzyme';
import TimePickerPanel from 'rc-time-picker/lib/Panel';
import Calendar from '../src/Calendar';
import zhCN from '../src/locale/zh_CN';
import enUS from '../src/locale/en_US';

const format = ('YYYY-MM-DD');

describe('Calendar', () => {
  describe('render', () => {
    it('render correctly', () => {
      const zhWrapper = render(
        <Calendar locale={zhCN} defaultValue={moment('2017-03-29').locale('zh-cn')} />
      );
      expect(zhWrapper).toMatchSnapshot();

      const enWrapper = render(
        <Calendar locale={enUS} defaultValue={moment('2017-03-29').locale('en')} />
      );
      expect(enWrapper).toMatchSnapshot();

      const customEnUSLocalWithMonthFormat = { ...enUS, monthFormat: 'MMMM' };
      const enWrapperWithMonthFormatWrapper = render(
        <Calendar
          locale={customEnUSLocalWithMonthFormat}
          defaultValue={moment('2017-03-29').local('en')}
        />
      );
      expect(enWrapperWithMonthFormatWrapper).toMatchSnapshot();
    });

    it('render correctly with invalid moment object', () => {
      const enWrapper = render(
          <Calendar locale={enUS} defaultValue={moment('invalid').locale('en')} />
      );
      expect(enWrapper).toMatchSnapshot();
    });

    it('render showToday false correctly', () => {
      const wrapper = mount(<Calendar showToday={false}/>);
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
        expect(selectedValues.at(i).text()).toBe('00');
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
        expect(selectedValues.at(i).text()).toBe('01');
      }
    });

    it('use timePicker\'s time', () => {
      const timePicker = <TimePickerPanel defaultValue={moment('00:00:00', 'HH:mm:ss')} />;
      const wrapper = mount(<Calendar timePicker={timePicker} />);

      wrapper.find('.rc-calendar-today').simulate('click');
      // use timePicker's defaultValue if users haven't select a time
      expect(
        wrapper.find('.rc-calendar-input').at(0).getDOMNode().value
      ).toBe('3/29/2017 00:00:00');

      wrapper.find('.rc-calendar-time-picker-btn').simulate('click');
      wrapper.find('.rc-time-picker-panel-select ul').at(0).find('li').at(6).simulate('click');
      // update time to timePicker's time
      expect(
        wrapper.find('.rc-calendar-input').at(0).getDOMNode().value
      ).toBe('3/29/2017 06:00:00');

      wrapper.find('.rc-calendar-cell').at(10).simulate('click');
      // still use timePicker's time
      expect(
        wrapper.find('.rc-calendar-input').at(0).getDOMNode().value
      ).toBe('3/8/2017 06:00:00');
    });
    it('timePicker date have no changes when hover', () => {
      const timePicker = <TimePickerPanel defaultValue={moment('00:00:00', 'HH:mm:ss')} />;
      const wrapper = mount(
        <Calendar defaultSelectedValue={moment('01:01:01', 'HH:mm:ss')} timePicker={timePicker} />,
      );
      wrapper.find('.rc-calendar-time-picker-btn').simulate('click');
      const dateBtns = wrapper.find('.rc-calendar-my-select a');
      const btnClassName = 'rc-calendar-time-status';
      for (let i = 0; i < dateBtns.length; i += 1) {
        dateBtns.at(i).simulate('mouseEnter');
        expect(dateBtns.get(i).props.title).toBeFalsy();
        expect(dateBtns.get(i).props.className).toEqual(expect.stringContaining(btnClassName));
      }
    });
  });

  describe('controlled panels', () => {
    it('render controlled panels correctly', () => {
      const MonthPicker = mount(<Calendar mode="month" />);
      expect(MonthPicker.render()).toMatchSnapshot();
      MonthPicker.find('.rc-calendar-month-panel-year-select').at(0).simulate('click');
      expect(MonthPicker.find('.rc-calendar-year-panel').length).toBe(0);
      expect(MonthPicker.find('.rc-calendar-month-panel').length).toBe(1);

      const YearPicker = mount(<Calendar mode="year" />);
      expect(YearPicker.render()).toMatchSnapshot();
      YearPicker.find('.rc-calendar-year-panel-decade-select').at(0).simulate('click');
      expect(YearPicker.find('.rc-calendar-decade-panel').length).toBe(0);
      expect(YearPicker.find('.rc-calendar-year-panel').length).toBe(1);
    });

    it('support controlled mode', () => {
      const timePicker = <TimePickerPanel defaultValue={moment('00:00:00', 'HH:mm:ss')} />;
      let value = null;
      class ControlledCalendar extends React.Component {
        state = { mode: 'date' };

        handlePanelChange = (v, mode) => {
          value = v;
          this.setState({ mode });
        }

        render() {
          return (
            <Calendar
              mode={this.state.mode}
              onPanelChange={this.handlePanelChange}
              timePicker={timePicker}
            />
          );
        }
      }
      const wrapper = mount(<ControlledCalendar />);

      wrapper.find('.rc-calendar-time-picker-btn').simulate('click');
      expect(wrapper.find('.rc-calendar-time-picker').length).toBe(0);

      wrapper.find('.rc-calendar-month-select').simulate('click');
      expect(wrapper.find('.rc-calendar-month-panel').length).toBe(1);
      wrapper.find('.rc-calendar-month-panel-year-select').simulate('click');
      expect(wrapper.find('.rc-calendar-year-panel').length).toBe(1);
      wrapper.find('.rc-calendar-year-panel-decade-select').simulate('click');
      expect(wrapper.find('.rc-calendar-decade-panel').length).toBe(1);
      expect(value.isSame(moment(), 'day'));
      wrapper.find('.rc-calendar-decade-panel-selected-cell').simulate('click');
      expect(wrapper.find('.rc-calendar-decade-panel').length).toBe(0);
      wrapper.find('.rc-calendar-year-panel-selected-cell').simulate('click');
      expect(wrapper.find('.rc-calendar-year-panel').length).toBe(0);
      wrapper.find('.rc-calendar-month-panel-selected-cell').simulate('click');
      expect(wrapper.find('.rc-calendar-month-panel').length).toBe(0);
      expect(value.isSame(moment('2010-03-29'), 'day'));

      wrapper.find('.rc-calendar-year-select').simulate('click');
      expect(wrapper.find('.rc-calendar-year-panel').length).toBe(1);
      wrapper.find('.rc-calendar-year-panel-decade-select').simulate('click');
      expect(wrapper.find('.rc-calendar-decade-panel').length).toBe(1);
      wrapper.find('.rc-calendar-decade-panel-selected-cell').simulate('click');
      expect(wrapper.find('.rc-calendar-decade-panel').length).toBe(0);
      wrapper.find('.rc-calendar-year-panel-selected-cell').simulate('click');
      expect(wrapper.find('.rc-calendar-year-panel').length).toBe(0);
    });
  });

  describe('after render', () => {
    let calendar;
    let input;
    beforeEach(() => {
      calendar = mount(<Calendar showToday showWeekNumber/>);
      input = calendar.find('.rc-calendar-input').hostNodes().at(0);
    });

    describe('keyboard works', () => {
      it('ignore event from input', () => {
        const original = calendar.state().value;
        const expected = original.clone();
        input.simulate('keyDown', { keyCode: keyCode.LEFT });
        expect(calendar.state().value.date()).toBe(expected.date());
      });

      it('triggers onKeyDown', () => {
        const handleKeyDown = jest.fn();
        calendar = mount(<Calendar showToday showWeekNumber onKeyDown={handleKeyDown} />);
        const original = calendar.state().value;
        const expected = original.clone();
        calendar.simulate('keyDown', { keyCode: keyCode.A });
        expect(calendar.state().value.date()).toBe(expected.date());
        expect(handleKeyDown).toHaveBeenCalledWith(expect.anything());
      });

      it('left works', () => {
        const original = calendar.state().value;
        const expected = original.clone();
        expected.add(-1, 'day');

        calendar.simulate('keyDown', { keyCode: keyCode.LEFT });
        expect(calendar.state().value.date()).toBe(expected.date());
        expect(input.getDOMNode().value).toBe('');
      });


      it('right works', () => {
        const original = calendar.state().value;
        const expected = original.clone();
        expected.add(1, 'day');
        calendar.simulate('keyDown', { keyCode: keyCode.RIGHT });
        expect(calendar.state().value.date()).toBe(expected.date());
        expect(input.getDOMNode().value).toBe('');
      });

      it('up works', () => {
        const original = calendar.state().value;
        const expected = original.clone();
        expected.add(-7, 'day');
      });

      it('left works', () => {
        const original = calendar.state().value;
        const expected = original.clone();
        expected.add(-1, 'day');

        calendar.simulate('keyDown', { keyCode: keyCode.LEFT });
        expect(calendar.state().value.date()).toBe(expected.date());
        expect(input.getDOMNode().value).toBe('');
      });


      it('right works', () => {
        const original = calendar.state().value;
        const expected = original.clone();
        expected.add(1, 'day');
        calendar.simulate('keyDown', { keyCode: keyCode.RIGHT });
        expect(calendar.state().value.date()).toBe(expected.date());
        expect(input.getDOMNode().value).toBe('');
      });

      it('up works', () => {
        const original = calendar.state().value;
        const expected = original.clone();
        expected.add(-7, 'day');
        calendar.simulate('keyDown', { keyCode: keyCode.UP });
        expect(calendar.state().value.date()).toBe(expected.date());
        expect(input.getDOMNode().value).toBe('');
      });

      it('down works', () => {
        const original = calendar.state().value;
        const expected = original.clone();
        expected.add(7, 'day');
        calendar.simulate('keyDown', { keyCode: keyCode.DOWN });
        expect(calendar.state().value.date()).toBe(expected.date());
        expect(input.getDOMNode().value).toBe('');
      });

      it('pageDown works', () => {
        const original = calendar.state().value;
        const expected = original.clone();
        expected.add(1, 'month');
        calendar.simulate('keyDown', { keyCode: keyCode.PAGE_DOWN });
        expect(calendar.state().value.month()).toBe(expected.month());
        expect(input.getDOMNode().value).toBe('');
      });

      it('pageUp works', () => {
        const original = calendar.state().value;
        const expected = original.clone();
        expected.add(-1, 'month');
        calendar.simulate('keyDown', { keyCode: keyCode.PAGE_UP });
        expect(calendar.state().value.month()).toBe(expected.month());
        expect(input.getDOMNode().value).toBe('');
      });

      it('ctrl left works', () => {
        const original = calendar.state().value;
        const expected = original.clone();
        expected.add(-1, 'year');
        calendar.simulate('keyDown', {
          keyCode: keyCode.LEFT,
          ctrlKey: 1,
        });
        expect(calendar.state().value.year()).toBe(expected.year());
        expect(input.getDOMNode().value).toBe('');
      });

      it('ctrl right works', () => {
        const original = calendar.state().value;
        const expected = original.clone();
        expected.add(1, 'year');
        calendar.simulate('keyDown', {
          keyCode: keyCode.RIGHT,
          ctrlKey: 1,
        });
        expect(calendar.state().value.year()).toBe(expected.year());
        expect(input.getDOMNode().value).toBe('');
      });

      it('HOME works', () => {
        const original = calendar.state().value;
        const expected = original.clone().startOf('month');
        calendar.setState({ value: original.add(2, 'day') });

        calendar.simulate('keyDown', {
          keyCode: keyCode.HOME,
        });
        expect(calendar.state().value.date()).toBe(expected.date());
      });

      it('END works', () => {
        const original = calendar.state().value;
        const expected = original.clone().endOf('month');
        calendar.setState({ value: original.add(2, 'day') });

        calendar.simulate('keyDown', {
          keyCode: keyCode.END,
        });
        expect(calendar.state().value.date()).toBe(expected.date());
      });

      it('enter to select works', () => {
        const onSelect = jest.fn();
        let today;
        calendar = mount(
          <Calendar onSelect={onSelect} />
        );
        today = calendar.state().value;

        calendar.simulate('keyDown', {
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

        calendar = mount(
          <Calendar onSelect={onSelect} disabledDate={disabledDate} />
        );

        calendar.simulate('keyDown', {
          keyCode: keyCode.LEFT,
        });
        calendar.simulate('keyDown', {
          keyCode: keyCode.ENTER,
        });

        expect(onSelect).not.toHaveBeenCalled();
      });
    });

    it('next month works', () => {
      let month = calendar.state().value.month();
      if (month === 11) {
        month = -1;
      }

      calendar.find('.rc-calendar-next-month-btn').hostNodes().at(0).simulate('click');

      expect(calendar.state().value.month()).toBe(month + 1);
      expect(input.getDOMNode().value).toBe('');
    });

    it('previous month works', () => {
      let month = calendar.state().value.month();
      if (month === 0) {
        month = 12;
      }

      calendar.find('.rc-calendar-prev-month-btn').hostNodes().at(0).simulate('click');

      expect(calendar.state().value.month()).toBe(month - 1);
      expect(input.getDOMNode().value).toBe('');
    });

    it('next year works', () => {
      const year = calendar.state().value.year();

      calendar.find('.rc-calendar-next-year-btn').hostNodes().at(0).simulate('click');

      expect(calendar.state().value.year()).toBe(year + 1);
    });

    it('previous year works', () => {
      const year = calendar.state().value.year();

      calendar.find('.rc-calendar-prev-year-btn').hostNodes().at(0).simulate('click');

      expect(calendar.state().value.year()).toBe(year - 1);
    });

    it('onSelect works', () => {
      let day;

      const onSelect = jest.fn();

      calendar = mount(
        <Calendar
          format={format}
          showToday
          onSelect={onSelect}
          showWeekNumber
        />
      );

      day = calendar.find('.rc-calendar-date').hostNodes().at(5);
      day.simulate('click');

      input = calendar.find('.rc-calendar-input').hostNodes().at(0);

      expect(input.getDOMNode().value).toBe(calendar.state().value.format(format));
      expect(onSelect.mock.calls[0][0].date()).toBe(parseInt(day.text(), 10));
    });

    it('month panel shows', () => {
      expect(calendar.find('.rc-calendar-month-panel').length).toBe(0);
      calendar.find('.rc-calendar-month-select').hostNodes().simulate('click');
      expect(calendar.find('.rc-calendar-month-panel').hostNodes().length).toBe(1);
      expect(calendar.find('.rc-calendar-month-panel-month').hostNodes().length).toBe(12);
      calendar.find('.rc-calendar-month-panel-month').hostNodes().at(9).simulate('click');
      expect(calendar.state().value.month()).toBe(9);
    });

    it('top year panel shows', () => {
      let text;
      expect(calendar.find('.rc-calendar-year-panel').length).toBe(0);
      calendar.find('.rc-calendar-year-select').hostNodes().simulate('click');
      expect(calendar.find('.rc-calendar-year-panel').hostNodes().length).toBe(1);
      expect(calendar.find('.rc-calendar-year-panel-year').hostNodes().length).toBe(12);
      const year = calendar.find('.rc-calendar-year-panel-year').hostNodes().at(9);
      year.simulate('click');
      text = year.text();
      expect(String(calendar.state().value.year())).toBe(text);
    });

    it('year panel works', () => {
      let text;
      calendar.find('.rc-calendar-month-select').hostNodes().simulate('click');
      calendar.find('.rc-calendar-month-panel-year-select').hostNodes().simulate('click');
      expect(calendar.find('.rc-calendar-year-panel').hostNodes().length).toBe(1);
      expect(calendar.find('.rc-calendar-year-panel-year').hostNodes().length).toBe(12);
      const year = calendar.find('.rc-calendar-year-panel-year').hostNodes().at(9);
      year.simulate('click');
      text = year.text();
      calendar.find('.rc-calendar-month-panel-month').hostNodes().at(9).simulate('click');
      expect(String(calendar.state().value.year())).toBe(text);
      expect(input.getDOMNode().value).toBe('');
    });

    it('decade panel works', () => {
      calendar.find('.rc-calendar-month-select').hostNodes().simulate('click');
      calendar.find('.rc-calendar-month-panel-year-select').hostNodes().simulate('click');
      calendar.find('.rc-calendar-year-panel-decade-select').hostNodes().simulate('click');

      expect(calendar.find('.rc-calendar-decade-panel').hostNodes().length).toBe(1);
      expect(calendar.find('.rc-calendar-decade-panel-decade').hostNodes().length).toBe(12);
    });

    it('numeric keyboard works', () => {
      const newCalendar = mount(<Calendar inputMode="numeric" />);
      expect(newCalendar.find('.rc-calendar-input').props().inputMode).toBe('numeric');
    });

    it('extra footer works', () => {
      const renderFooter = (mode) => (<span className="extra-node">{mode}</span>);

      calendar = mount(
        <Calendar
          format={format}
          showToday
          showWeekNumber
          renderFooter={renderFooter}
        />
      );

      let extraNode = calendar.find('.extra-node');
      expect(extraNode.length).toBe(1);
      expect(extraNode.text()).toBe('date');

      calendar.find('.rc-calendar-month-select').hostNodes().simulate('click');
      extraNode = calendar.find('.rc-calendar-month-panel .extra-node');
      expect(extraNode.length).toBe(1);
      expect(extraNode.text()).toBe('month');

      calendar.find('.rc-calendar-year-select').hostNodes().simulate('click');
      extraNode = calendar.find('.rc-calendar-year-panel .extra-node');
      expect(extraNode.length).toBe(1);
      expect(extraNode.text()).toBe('year');

      calendar.find('.rc-calendar-year-panel-decade-select').hostNodes().simulate('click');
      extraNode = calendar.find('.rc-calendar-decade-panel .extra-node');
      expect(extraNode.length).toBe(1);
      expect(extraNode.text()).toBe('decade');
    });
  });


  describe('input', () => {
    it('change will fire onSelect/onChange', () => {
      const expected = '2017-01-21';

      const onSelect = jest.fn();
      const onChange = jest.fn();

      const calendar = mount(<Calendar
        format={format}
        showToday
        onSelect={onSelect}
        onChange={onChange}
      />);
      const input = calendar.find('.rc-calendar-input').hostNodes().at(0);
      input.simulate('change', { target: { value: expected } });

      expect(onSelect.mock.calls[0][0].format(format)).toBe(expected);
      expect(onChange.mock.calls[0][0].format(format)).toBe(expected);
    });

    it('supports an array of formats when parsing and formats using the first format', () => {
      const expected = '21/01/2017';
      const value = '21/01/17';

      const onSelect = jest.fn();
      const onChange = jest.fn();

      const calendar = mount(<Calendar
        format={['DD/MM/YYYY', 'DD/MM/YY']}
        showToday
        onSelect={onSelect}
        onChange={onChange}
      />);
      const input = calendar.find('.rc-calendar-input').hostNodes().at(0);
      input.simulate('change', { target: { value } });

      expect(onSelect.mock.calls[0][0].format('DD/MM/YYYY')).toBe(expected);
      expect(onChange.mock.calls[0][0].format('DD/MM/YYYY')).toBe(expected);
    });

    it('only reformat the date when the input loses focus', () => {
      const value = '21/01/17';

      const onSelect = jest.fn();
      const onChange = jest.fn();

      const calendar = mount(<Calendar
        format={['DD/MM/YYYY', 'DD/MM/YY']}
        showToday
        onSelect={onSelect}
        onChange={onChange}
      />);

      const input = calendar.find('.rc-calendar-input').hostNodes().at(0);
      input.simulate('focus');
      input.simulate('change', { target: { value } });

      let inputValue = calendar.find('.rc-calendar-input').props().value;
      expect(inputValue).toBe('21/01/17');

      input.simulate('blur');

      inputValue = calendar.find('.rc-calendar-input').props().value;
      expect(inputValue).toBe('21/01/2017');
    });
  });

  it('handle clear', () => {
    const now = moment();
    const calendar = mount(
      <Calendar defaultSelectedValue={now} />
    );
    calendar.find('.rc-calendar-clear-btn').simulate('click');
    expect(calendar.state().selectedValue).toBe(null);
    expect(now.isSame(calendar.state().value)).toBe(true);
  });

  describe('onOk', () => {
    it('triggers onOk', () => {
      const selected = moment().add(1, 'day');
      const handleOk = jest.fn();
      const calendar = mount(
        <Calendar showOk defaultSelectedValue={selected} onOk={handleOk} />
      );
      calendar.find('.rc-calendar-ok-btn').simulate('click');
      expect(handleOk).toHaveBeenCalledWith(selected);
    });

    it('Ok Button disabled', () => {
      const calendar = mount(
        <Calendar showOk />
      );

      expect(
        calendar.find('OkButton').props().okDisabled
      ).toBe(true);
    });

    it('does not triggers onOk if selected date is disabled', () => {
      const selected = moment().add(1, 'day');
      const handleOk = jest.fn();
      const calendar = mount(
        <Calendar
          showOk
          defaultSelectedValue={selected}
          onOk={handleOk}
          disabledDate={() => true}
        />
      );
      calendar.find('.rc-calendar-ok-btn').simulate('click');
      expect(handleOk).not.toBeCalled();
    });
  });

  it('today button', () => {
    const selected = moment().add(1, 'day').utcOffset(480);
    const calendar = mount(
      <Calendar defaultSelectedValue={selected} />
    );
    calendar.find('.rc-calendar-today-btn').simulate('click');
    expect(moment().isSame(calendar.state().selectedValue)).toBe(true);
  });
});
