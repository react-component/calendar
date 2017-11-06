import React from 'react';
import moment from 'moment';
import { mount } from 'enzyme';
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

  function renderPicker(props) {
    return mount(<DatePicker
      calendar={
        <Calendar
          locale={CalendarLocale}
        />
      }
      defaultValue={VALUE}
      {...props}
    >
      {renderOne}
    </DatePicker>);
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
});
