import React from 'react';
import moment from 'moment';
import { mount } from 'enzyme';
import keyCode from 'rc-util/lib/KeyCode';
import Calendar from '../index';
import DatePicker from '../src/Picker';
import RangeCalendar from '../src/RangeCalendar';
import CalendarLocale from '../src/locale/en_US';

const format = ('YYYY-MM-DD');
const VALUE = moment([2015, 5, 1]);

describe('DatePicker', () => {
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

  function renderPicker(props, calendarProps, options) {
    return mount(
      <DatePicker
        calendar={
          <Calendar
            locale={CalendarLocale}
            showOk
            showClear
            {...calendarProps}
          />
        }
        defaultValue={VALUE}
        {...props}
      >
        {renderOne}
      </DatePicker>,
        options
    );
  }

  function renderRangePicker(props) {
    return mount(<DatePicker
      calendar={
        <RangeCalendar
          locale={CalendarLocale}
        />
      }
      defaultValue={[VALUE, VALUE]}
      {...props}
    >
      {renderRange}
    </DatePicker>);
  }

  it('popup correctly', () => {
    let change;
    const picker = renderPicker({
      onChange(v) {
        change = v;
      },
    });
    expect(picker.state().open).toBeFalsy();
    const input = picker.find('.rc-calendar-picker-input').hostNodes().first();
    input.simulate('click');
    expect(picker.find('.rc-calendar').hostNodes().first()).not.toBeFalsy();
    expect(picker.state().open).toEqual(true);
    const day = picker.find('.rc-calendar-date').hostNodes().at(2);
    day.simulate('click');
    expect(change).not.toBeFalsy();
    expect(change.year()).toEqual(2015);
    expect(change.month()).toEqual(5);
    expect(change.date()).toEqual(2);
    expect(input.getDOMNode().value).toEqual('2015-06-02');
    expect(picker.state().open).toBeFalsy();
  });

  it('popup range calendar correctly', () => {
    let change;
    const picker = renderRangePicker({
      onChange(v) {
        change = v;
      },
    });
    expect(picker.state().open).toBeFalsy();
    const input = picker.find('.rc-calendar-picker-input').hostNodes().first();
    input.simulate('click');
    expect(picker.find('.rc-calendar').hostNodes().first()).not.toBeFalsy();
    expect(picker.state().open).toEqual(true);
    const day1 = picker.find('.rc-calendar-date').hostNodes().at(2);
    const day2 = picker.find('.rc-calendar-date').hostNodes().at(3);
    day1.simulate('click');
    day2.simulate('click');
    expect(change).not.toBeFalsy();
    expect(change.length).toEqual(2);
    expect(change[0].year()).toEqual(2015);
    expect(change[0].month()).toEqual(5);
    expect(change[0].date()).toEqual(2);
    expect(change[1].year()).toEqual(2015);
    expect(change[1].month()).toEqual(5);
    expect(change[1].date()).toEqual(3);
    expect(input.getDOMNode().value).toEqual('2015-06-02 - 2015-06-03');
    expect(picker.state().open).toBeFalsy();
  });

  describe('render calendar to body', () => {
    it('destroy correctly', () => {
      const picker = renderPicker();
      expect(picker.state().open).toBeFalsy();
      const input = picker.find('.rc-calendar-picker-input').hostNodes().first();
      input.simulate('click');
      expect(picker.find('.rc-calendar').hostNodes().first()).not.toBeFalsy();
      expect(picker.state().open).toEqual(true);
      expect(picker.find('.rc-calendar-picker').length).not.toEqual(0);
      expect(picker.find('.rc-calendar-date').hostNodes().at(0)).not.toBeFalsy();
      picker.unmount();
      expect(document.querySelectorAll('.rc-calendar-picker').length).toEqual(0);
      expect(picker.calendarInstance).toBeFalsy();
    });
  });

  it('controlled value', () => {
    const value = moment().add(1, 'day');
    const picker = renderPicker({ value });
    expect(picker.state().value).toBe(value);
    const nextValue = value.clone().add(1, 'day');
    picker.setProps({ value: nextValue });
    expect(picker.state().value).toBe(nextValue);
  });

  it('controlled open', () => {
    const picker = renderPicker({ open: false });
    expect(picker.state().open).toBe(false);
    picker.setProps({ open: true });
    expect(picker.state().open).toBe(true);
  });

  it('triggers onOpenChange', () => {
    const handleOpenChange = jest.fn();
    const picker = renderPicker({ onOpenChange: handleOpenChange });
    picker.find('.rc-calendar-picker-input').simulate('click');
    expect(handleOpenChange).toHaveBeenCalledWith(true);
  });

  it('close by ESC key', () => {
    const picker = renderPicker();
    picker.find('.rc-calendar-picker-input').simulate('click');
    picker.find('.rc-calendar').simulate('keyDown', {
      keyCode: keyCode.ESC,
    });
    expect(picker.state().open).toBe(false);
  });

  describe('open by key', () => {
    [
      { name: 'Down', key: keyCode.DOWN },
      { name: 'Enter', key: keyCode.ENTER },
    ].forEach(({ name, key }) => {
      it(`open by ${name} key`, () => {
        const picker = renderPicker();
        picker.find('.rc-calendar-picker-input').simulate('keyDown', {
          keyCode: key,
        });
        expect(picker.state().open).toBe(true);
      });
    });
  });

  it('close on ok', () => {
    const picker = renderPicker({ value: moment() });
    picker.find('.rc-calendar-picker-input').simulate('click');
    picker.find('.rc-calendar-ok-btn').simulate('click');
    expect(picker.state().open).toBe(false);
  });

  it('close on clear', () => {
    const picker = renderPicker({ value: moment() });
    picker.find('.rc-calendar-picker-input').simulate('click');
    picker.find('.rc-calendar-clear-btn').simulate('click');
    expect(picker.state().open).toBe(false);
  });

  describe('DateInput', () => {
    it('close on enter', () => {
      const picker = renderPicker({ value: moment() });
      picker.find('.rc-calendar-picker-input').simulate('click');
      picker.find('.rc-calendar-input').simulate('keyDown', {
        keyCode: keyCode.ENTER,
      });
      expect(picker.state().open).toBe(false);
    });

    it('not close on enter if disabled date', () => {
      const picker = renderPicker({ value: moment() }, { disabledDate: () => true });
      picker.find('.rc-calendar-picker-input').simulate('click');
      picker.find('.rc-calendar-input').simulate('keyDown', {
        keyCode: keyCode.ENTER,
      });
      expect(picker.state().open).toBe(true);
    });
  });

  describe('on picker blur', () => {
    let container;

    beforeEach(() => {
      jest.useFakeTimers();
      container = document.createElement('div');
      container.setAttribute('tabindex', 0);
      document.body.appendChild(container);
    });

    afterEach(() => {
      jest.useRealTimers();
    });

    it('close panel when focus is outside of picker', () => {
      const picker = renderPicker({ value: moment() }, undefined, {
        attachTo: container,
      });
      picker.find('.rc-calendar-picker-input').simulate('click');

      jest.runAllTimers();
      container.focus();
      jest.runAllTimers();
      expect(picker.state().open).toBe(false);
    });

    it('call onBlur when focus is outside of picker', () => {
      const handleOnBlur = jest.fn();
      const picker = renderPicker({ value: moment() }, { onBlur: handleOnBlur }, {
        attachTo: container,
      });

      picker.find('.rc-calendar-picker-input').simulate('click');
      jest.runAllTimers();
      container.focus();
      jest.runAllTimers();
      expect(handleOnBlur).toBeCalled();
    });

    it('keep panel opened when clicking on calendar next month', () => {
      const picker = renderPicker({ value: moment() }, undefined, {
        attachTo: container,
      });

      picker.find('.rc-calendar-picker-input').simulate('click');

      jest.runAllTimers();
      const day = picker.find('.rc-calendar-next-month-btn');
      day.simulate('click');
      jest.runAllTimers();

      expect(picker.state().open).toBe(true);
    });

    it('does not call onBlur when clicking on calendar next month', () => {
      const handleOnBlur = jest.fn();
      const picker = renderPicker({ value: moment() }, { onBlur: handleOnBlur }, {
        attachTo: container,
      });

      picker.find('.rc-calendar-picker-input').simulate('click');
      jest.runAllTimers();

      const day = picker.find('.rc-calendar-next-month-btn');
      day.simulate('click');
      jest.runAllTimers();

      expect(handleOnBlur).not.toBeCalled();
    });
  });

  it('auto focuses the calendar input when opening', () => {
    jest.useFakeTimers();
    const picker = renderPicker({ value: moment() });
    picker.find('.rc-calendar-picker-input').simulate('click');
    jest.runAllTimers();
    expect(document.activeElement).toBeDefined();
    expect(document.activeElement.classList).toContain('rc-calendar-input');
  });

  it('auto focuses the calendar div when date input is not shown', () => {
    jest.useFakeTimers();
    const picker = renderPicker({ value: moment() }, { showDateInput: false });
    picker.find('.rc-calendar-picker-input').simulate('click');
    jest.runAllTimers();
    expect(document.activeElement).toBeDefined();
    expect(document.activeElement.classList).toContain('rc-calendar');
  });
});
