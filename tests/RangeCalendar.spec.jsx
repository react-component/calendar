/* eslint-disable no-undef, max-len, react/no-multi-comp */
import React from 'react';
import moment from 'moment';
import { mount, render } from 'enzyme';
import keyCode from 'rc-util/lib/KeyCode';
import TimePickerPanel from 'rc-time-picker/lib/Panel';
import RangeCalendar from '../src/RangeCalendar';

const format = ('YYYY-MM-DD');

describe('RangeCalendar', () => {
  it('render works', () => {
    const wrapper = mount(<RangeCalendar />);
    expect(wrapper.find('.rc-calendar-cell').length).toBeGreaterThan(0);
  });

  it('default sperator', () => {
    const wrapper = render(<RangeCalendar />);
    expect(wrapper.find('.rc-calendar-range-middle').text()).toBe('~');
  });

  it('custom sperator', () => {
    const wrapper = render(<RangeCalendar seperator="至" />);
    expect(wrapper.find('.rc-calendar-range-middle').text()).toBe('至');
  });

  it('render hoverValue correctly', () => {
    const wrapper = render(<RangeCalendar hoverValue={[moment(), moment().add(1, 'months')]} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('next month works', () => {
    const wrapper = mount(<RangeCalendar />);

    const currentEndMonth = wrapper.state('value')[1].clone();
    wrapper.find('.rc-calendar-range-right .rc-calendar-next-month-btn').simulate('click');
    expect(currentEndMonth.add(1, 'month').isSame(wrapper.state('value')[1], 'month'))
      .toBe(true);
    expect(wrapper.find('.rc-calendar-range-right .rc-calendar-prev-month-btn').length).toBe(1);

    const currentStartMonth = wrapper.state('value')[0].clone();
    wrapper.find('.rc-calendar-range-left .rc-calendar-next-month-btn').simulate('click');
    expect(currentStartMonth.add(1, 'month').isSame(wrapper.state('value')[0], 'month'))
      .toBe(true);
    expect(wrapper.find('.rc-calendar-range-left .rc-calendar-next-month-btn').length).toBe(0);
  });

  it('previous month works', () => {
    const wrapper = mount(<RangeCalendar />);

    const currentStartMonth = wrapper.state('value')[0].clone();
    wrapper.find('.rc-calendar-range-left .rc-calendar-prev-month-btn').simulate('click');
    expect(currentStartMonth.subtract(1, 'month').isSame(wrapper.state('value')[0], 'month'))
      .toBe(true);
    expect(wrapper.find('.rc-calendar-range-left .rc-calendar-next-month-btn').length).toBe(1);

    const currentEndMonth = wrapper.state('value')[1].clone();
    wrapper.find('.rc-calendar-range-right .rc-calendar-prev-month-btn').simulate('click');
    expect(currentEndMonth.subtract(1, 'month').isSame(wrapper.state('value')[1], 'month'))
      .toBe(true);
    expect(wrapper.find('.rc-calendar-range-right .rc-calendar-prev-month-btn').length).toBe(0);
  });

  it('next year works', () => {
    const wrapper = mount(<RangeCalendar />);

    const currentEndMonth = wrapper.state('value')[1].clone();
    wrapper.find('.rc-calendar-range-right .rc-calendar-next-year-btn').simulate('click');
    expect(currentEndMonth.add(1, 'year').isSame(wrapper.state('value')[1], 'month'))
      .toBe(true);
    expect(wrapper.find('.rc-calendar-range-right .rc-calendar-prev-year-btn').length).toBe(1);

    const currentStartMonth = wrapper.state('value')[0].clone();
    wrapper.find('.rc-calendar-range-left .rc-calendar-next-year-btn').simulate('click');
    expect(currentStartMonth.add(1, 'year').isSame(wrapper.state('value')[0], 'month'))
      .toBe(true);
    expect(wrapper.find('.rc-calendar-range-left .rc-calendar-next-year-btn').length).toBe(0);
  });

  it('previous year works', () => {
    const wrapper = mount(<RangeCalendar />);

    const currentStartMonth = wrapper.state('value')[0].clone();
    wrapper.find('.rc-calendar-range-left .rc-calendar-prev-year-btn').simulate('click');
    expect(currentStartMonth.subtract(1, 'year').isSame(wrapper.state('value')[0], 'month'))
      .toBe(true);
    expect(wrapper.find('.rc-calendar-range-left .rc-calendar-next-year-btn').length).toBe(1);

    const currentEndMonth = wrapper.state('value')[1].clone();
    wrapper.find('.rc-calendar-range-right .rc-calendar-prev-year-btn').simulate('click');
    expect(currentEndMonth.subtract(1, 'year').isSame(wrapper.state('value')[1], 'month'))
      .toBe(true);
    expect(wrapper.find('.rc-calendar-range-right .rc-calendar-prev-year-btn').length).toBe(0);
  });

  it('left panel show next btns when right panel show year panel or month panel', () => {
    let wrapper = null;
    wrapper = mount(<RangeCalendar />);
    wrapper.find('.rc-calendar-range-right .rc-calendar-month-select').simulate('click');
    expect(wrapper.find('.rc-calendar-range-left .rc-calendar-next-year-btn').length).toBe(1);
    expect(wrapper.find('.rc-calendar-range-left .rc-calendar-next-month-btn').length).toBe(1);

    wrapper = mount(<RangeCalendar />);
    wrapper.find('.rc-calendar-range-right .rc-calendar-year-select').simulate('click');
    expect(wrapper.find('.rc-calendar-range-left .rc-calendar-next-year-btn').length).toBe(1);
    expect(wrapper.find('.rc-calendar-range-left .rc-calendar-next-month-btn').length).toBe(1);
  });

  it('right panel show prev btns when left panel show year panel or month panel', () => {
    let wrapper = null;
    wrapper = mount(<RangeCalendar />);
    wrapper.find('.rc-calendar-range-left .rc-calendar-month-select').simulate('click');
    expect(wrapper.find('.rc-calendar-range-right .rc-calendar-next-year-btn').length).toBe(1);
    expect(wrapper.find('.rc-calendar-range-right .rc-calendar-next-month-btn').length).toBe(1);

    wrapper = mount(<RangeCalendar />);
    wrapper.find('.rc-calendar-range-left .rc-calendar-year-select').simulate('click');
    expect(wrapper.find('.rc-calendar-range-right .rc-calendar-next-year-btn').length).toBe(1);
    expect(wrapper.find('.rc-calendar-range-right .rc-calendar-next-month-btn').length).toBe(1);
  });

  it('left panel cannot select month after right panel', () => {
    const wrapper = mount(<RangeCalendar />);
    wrapper.find('.rc-calendar-range-left .rc-calendar-month-select').simulate('click');
    const monthCells = wrapper.find('.rc-calendar-range-left .rc-calendar-month-panel-cell');
    const rightPanelMonth = wrapper.state('value')[1].month();
    expect(monthCells.get(rightPanelMonth).props.className)
      .toMatch('rc-calendar-month-panel-cell');
    expect(monthCells.get(rightPanelMonth + 1).props.className)
      .toMatch('rc-calendar-month-panel-cell-disabled');
  });

  it('right panel cannot select month before left panel', () => {
    const wrapper = mount(<RangeCalendar />);
    wrapper.find('.rc-calendar-range-right .rc-calendar-month-select').simulate('click');
    const monthCells = wrapper.find('.rc-calendar-range-right .rc-calendar-month-panel-cell');
    const leftPanelMonth = wrapper.state('value')[0].month();
    expect(monthCells.get(leftPanelMonth).props.className)
      .toMatch('rc-calendar-month-panel-cell rc-calendar-month-panel-current-cell');
    expect(monthCells.get(leftPanelMonth - 1).props.className)
      .toMatch('rc-calendar-month-panel-cell-disabled');
  });

  it('onSelect works', () => {
    function onSelect(d) {
      expect(d[0].format(format)).toBe('2015-09-04');
      expect(d[1].format(format)).toBe('2015-10-02');
    }

    const now = moment([2015, 8, 29]);

    const wrapper = mount(
      <RangeCalendar
        format={format}
        onSelect={onSelect}
        defaultValue={[now, now.clone().add(1, 'months')]}
        showWeekNumber
      />
    );
    wrapper.find('.rc-calendar-range-left .rc-calendar-date').at(5).simulate('click'); // 9.4
    expect(wrapper.find('.rc-calendar-input').at(0).getDOMNode().value).toBe('2015-09-04');
    wrapper.find('.rc-calendar-range-right .rc-calendar-date').at(5).simulate('click'); // 10.2
    expect(wrapper.find('.rc-calendar-input').at(1).getDOMNode().value).toBe('2015-10-02');
  });

  it('onSelect works reversely', () => {
    function onSelect(d) {
      expect(d[0].format(format)).toBe('2015-09-04');
      expect(d[1].format(format)).toBe('2015-09-14');
    }

    const now = moment([2015, 8, 29]);

    const wrapper = mount(
      <RangeCalendar
        format={format}
        onSelect={onSelect}
        defaultValue={[now, now.clone().add(1, 'months')]}
        showWeekNumber
      />
    );

    wrapper.find('.rc-calendar-range-left .rc-calendar-date').at(15).simulate('click'); // 9.14
    expect(wrapper.find('.rc-calendar-input').at(0).getDOMNode().value).toBe('2015-09-14');

    wrapper.find('.rc-calendar-range-left .rc-calendar-date').at(5).simulate('click'); // 9.4
    expect(wrapper.find('.rc-calendar-input').at(0).getDOMNode().value).toBe('2015-09-04');
    expect(wrapper.find('.rc-calendar-input').at(1).getDOMNode().value).toBe('2015-09-14');
  });

  it('onHoverChange works', () => {
    let hoverValue = null;
    function onHoverChange(hv) {
      hoverValue = hv;
    }
    const wrapper = mount(<RangeCalendar onHoverChange={onHoverChange} />);
    wrapper.find('.rc-calendar-range-left .rc-calendar-cell').at(10).simulate('click');
    wrapper.find('.rc-calendar-range-left .rc-calendar-cell').at(20).simulate('mouseEnter');
    expect(hoverValue[0].format(format)).toBe('2017-03-08');
    expect(hoverValue[1].format(format)).toBe('2017-03-18');
  });

  describe('timePicker', () => {
    it('defaultOpenValue should follow RangeCalendar[selectedValue|defaultSelectedValue] when it is set', () => {
      const timePicker = <TimePickerPanel defaultValue={[moment('00:00:00', 'HH:mm:ss'), moment('23:59:59', 'HH:mm:ss')]} />;
      const wrapper = mount(<RangeCalendar timePicker={timePicker} defaultSelectedValue={[moment('01:01:01', 'HH:mm:ss'), moment('01:01:01', 'HH:mm:ss')]} />);
      wrapper.find('.rc-calendar-time-picker-btn').simulate('click');
      const selectedValues = wrapper.find('.rc-time-picker-panel-select-option-selected');
      for (let i = 0; i < selectedValues.length; i += 1) {
        expect(selectedValues.at(i).text()).toBe('01');
      }
    });

    it('selected start and end date can be same', () => {
      const timePicker = <TimePickerPanel defaultValue={[moment('00:00:00', 'HH:mm:ss'), moment('23:59:59', 'HH:mm:ss')]} />;
      const wrapper = mount(<RangeCalendar selectedValue={[moment('2000-09-03', format), moment('2000-09-03', format)]} timePicker={timePicker}/>);
      wrapper.find('.rc-calendar-time-picker-btn').simulate('click');
      expect(wrapper.find('.rc-calendar-year-select').at(0).text()).toBe('2000');
      expect(wrapper.find('.rc-calendar-month-select').at(0).text()).toBe('Sep');
      expect(wrapper.find('.rc-calendar-day-select').at(0).text()).toBe('3');
      expect(wrapper.find('.rc-calendar-year-select').at(1).text()).toBe('2000');
      expect(wrapper.find('.rc-calendar-month-select').at(1).text()).toBe('Sep');
      expect(wrapper.find('.rc-calendar-day-select').at(1).text()).toBe('3');
    });

    it('use timePicker\'s time', () => {
      const timePicker = <TimePickerPanel defaultValue={[moment('00:00:00', 'HH:mm:ss'), moment('23:59:59', 'HH:mm:ss')]} />;
      const wrapper = mount(<RangeCalendar timePicker={timePicker} />);

      wrapper.find('.rc-calendar-today').at(0).simulate('click').simulate('click');
      // use timePicker's defaultValue if users haven't select a time
      expect(wrapper.find('.rc-calendar-input').at(0).getDOMNode().value).toBe('3/29/2017 00:00:00');
      expect(wrapper.find('.rc-calendar-input').at(1).getDOMNode().value).toBe('3/29/2017 23:59:59');

      wrapper.find('.rc-calendar-time-picker-btn').simulate('click');

      // update time to timePicker's time
      wrapper.find('.rc-calendar-range-left .rc-time-picker-panel-select ul').at(0).find('li').at(6).simulate('click');
      expect(wrapper.find('.rc-calendar-input').at(0).getDOMNode().value).toBe('3/29/2017 06:00:00');

      wrapper.find('.rc-calendar-range-right .rc-time-picker-panel-select ul').at(0).find('li').at(6).simulate('click');
      expect(wrapper.find('.rc-calendar-input').at(1).getDOMNode().value).toBe('3/29/2017 06:59:59');

      wrapper.find('.rc-calendar-range-left .rc-calendar-cell').at(10).simulate('click');
      expect(wrapper.find('.rc-calendar-input').at(0).getDOMNode().value).toBe('3/8/2017 06:00:00');

      wrapper.find('.rc-calendar-range-left .rc-calendar-cell').at(20).simulate('click');
      expect(wrapper.find('.rc-calendar-input').at(1).getDOMNode().value).toBe('3/18/2017 06:59:59');
    });

    it('should combine disabledTime', () => {
      function newArray(start, end) {
        const result = [];
        for (let i = start; i < end; i++) {
          result.push(i);
        }
        return result;
      }
      function disabledTime(time, type) {
        if (type === 'start') {
          return {
            disabledHours() {
              const hours = newArray(0, 60);
              hours.splice(20, 4);
              return hours;
            },
            disabledMinutes(h) {
              if (h === 20) {
                return newArray(0, 31);
              } else if (h === 23) {
                return newArray(30, 60);
              }
              return [];
            },
            disabledSeconds() {
              return [55, 56];
            },
          };
        }
        return {
          disabledHours() {
            const hours = newArray(0, 60);
            hours.splice(2, 6);
            return hours;
          },
          disabledMinutes(h) {
            if (h === 20) {
              return newArray(0, 31);
            } else if (h === 23) {
              return newArray(30, 60);
            }
            return [];
          },
          disabledSeconds() {
            return [55, 56];
          },
        };
      }
      const timePicker = <TimePickerPanel defaultValue={[moment('00:00:00', 'HH:mm:ss'), moment('23:59:59', 'HH:mm:ss')]} />;
      const wrapper = mount(<RangeCalendar timePicker={timePicker} disabledTime={disabledTime} />);

      wrapper.find('.rc-calendar-today').at(0).simulate('click').simulate('click');
      wrapper.find('.rc-calendar-today').at(0).simulate('click').simulate('click');
      // use timePicker's defaultValue if users haven't select a time
      expect(wrapper.find('.rc-calendar-input').at(0).getDOMNode().value).toBe('3/29/2017 00:00:00');
      expect(wrapper.find('.rc-calendar-input').at(1).getDOMNode().value).toBe('3/29/2017 23:59:59');

      wrapper.find('.rc-calendar-time-picker-btn').simulate('click');

      // update time to timePicker's time
      wrapper.find('.rc-calendar-range-left .rc-time-picker-panel-select ul').at(0).find('li').at(23).simulate('click');
      expect(wrapper.find('.rc-calendar-input').at(0).getDOMNode().value).toBe('3/29/2017 23:00:00');
      wrapper.find('.rc-calendar-range-left .rc-time-picker-panel-select ul').at(1).find('li').at(25).simulate('click');
      expect(wrapper.find('.rc-calendar-input').at(0).getDOMNode().value).toBe('3/29/2017 23:25:00');
      wrapper.find('.rc-calendar-range-left .rc-time-picker-panel-select ul').at(2).find('li').at(3).simulate('click');
      expect(wrapper.find('.rc-calendar-input').at(0).getDOMNode().value).toBe('3/29/2017 23:25:03');

      wrapper.find('.rc-calendar-range-right .rc-time-picker-panel-select ul').at(1).find('li').at(25).simulate('click');
      expect(wrapper.find('.rc-calendar-input').at(1).getDOMNode().value).toBe('3/29/2017 23:25:59');

      const disabledTimeElements = wrapper.find('.rc-calendar-range-right .rc-time-picker-panel-select ul').at(2).find('.rc-time-picker-panel-select-option-disabled');
      const disabledTimeValus = disabledTimeElements.map(item => item.text());
      expect(disabledTimeValus).toEqual(['00', '01', '02', '55', '56']);
    });

    it('works fine when select reversely', () => {
      // see: https://github.com/ant-design/ant-design/issues/6440
      const timePicker = <TimePickerPanel defaultValue={[moment('00:00:00', 'HH:mm:ss'), moment('23:59:59', 'HH:mm:ss')]} />;
      const wrapper = mount(<RangeCalendar timePicker={timePicker} />);
      wrapper.find('.rc-calendar-cell').at(20).simulate('click');
      wrapper.find('.rc-calendar-cell').at(10).simulate('click');
      // It can only be re-produced at second time.
      wrapper.find('.rc-calendar-cell').at(20).simulate('click');
      wrapper.find('.rc-calendar-cell').at(10).simulate('click');
      expect(wrapper.find('.rc-calendar-input').at(0).getDOMNode().value).toBe('3/8/2017 00:00:00');
      expect(wrapper.find('.rc-calendar-input').at(1).getDOMNode().value).toBe('3/18/2017 23:59:59');
    });

    it('disabledTime when same day and different hour or different minute', () => {
      // see: https://github.com/ant-design/ant-design/issues/8915
      function newArray(start, end) {
        const result = [];
        for (let i = start; i < end; i++) {
          result.push(i);
        }
        return result;
      }
      function disabledTime(time, type) {
        if (type === 'start') {
          return {
            disabledHours() {
              return [];
            },
            disabledMinutes() {
              return newArray(30, 60);
            },
            disabledSeconds() {
              return [55, 56];
            },
          };
        }
        return {
          disabledHours() {
            return [];
          },
          disabledMinutes() {
            return newArray(30, 60);
          },
          disabledSeconds() {
            return [55, 56];
          },
        };
      }
      const timePicker = <TimePickerPanel defaultValue={[moment('00:00:00', 'HH:mm:ss'), moment('23:59:59', 'HH:mm:ss')]} />;
      const wrapper = mount(<RangeCalendar timePicker={timePicker} disabledTime={disabledTime} />);
      // update same day
      wrapper.find('.rc-calendar-today').at(0).simulate('click').simulate('click');
      wrapper.find('.rc-calendar-today').at(0).simulate('click').simulate('click');
      expect(wrapper.find('.rc-calendar-input').at(0).getDOMNode().value).toBe('3/29/2017 00:00:00');
      expect(wrapper.find('.rc-calendar-input').at(1).getDOMNode().value).toBe('3/29/2017 23:59:59');
      wrapper.find('.rc-calendar-time-picker-btn').simulate('click');
      // update same hour
      wrapper.find('.rc-calendar-range-left .rc-time-picker-panel-select ul').at(0).find('li').at(11).simulate('click');
      wrapper.find('.rc-calendar-range-left .rc-time-picker-panel-select ul').at(1).find('li').at(4).simulate('click');
      wrapper.find('.rc-calendar-range-left .rc-time-picker-panel-select ul').at(2).find('li').at(4).simulate('click');
      expect(wrapper.find('.rc-calendar-input').at(0).getDOMNode().value).toBe('3/29/2017 11:04:04');
      wrapper.find('.rc-calendar-range-right .rc-time-picker-panel-select ul').at(0).find('li').at(11).simulate('click');
      wrapper.find('.rc-calendar-range-right .rc-time-picker-panel-select ul').at(1).find('li').at(4).simulate('click');
      wrapper.find('.rc-calendar-range-right .rc-time-picker-panel-select ul').at(2).find('li').at(5).simulate('click');
      expect(wrapper.find('.rc-calendar-input').at(1).getDOMNode().value).toBe('3/29/2017 11:04:05');
      // disabled early seconds
      wrapper.find('.rc-calendar-range-right .rc-time-picker-panel-select ul').at(2).find('li').at(2).simulate('click');
      expect(wrapper.find('.rc-calendar-input').at(1).getDOMNode().value).toBe('3/29/2017 11:04:05');
      // disabledSeconds
      wrapper.find('.rc-calendar-range-right .rc-time-picker-panel-select ul').at(2).find('li').at(55).simulate('click');
      expect(wrapper.find('.rc-calendar-input').at(1).getDOMNode().value).toBe('3/29/2017 11:04:05');
      // disabled early minutes
      wrapper.find('.rc-calendar-range-right .rc-time-picker-panel-select ul').at(1).find('li').at(1).simulate('click');
      expect(wrapper.find('.rc-calendar-input').at(1).getDOMNode().value).toBe('3/29/2017 11:04:05');
      // disabledMinutes
      wrapper.find('.rc-calendar-range-right .rc-time-picker-panel-select ul').at(1).find('li').at(35).simulate('click');
      expect(wrapper.find('.rc-calendar-input').at(1).getDOMNode().value).toBe('3/29/2017 11:04:05');
      // different minutes for disabledSeconds
      wrapper.find('.rc-calendar-range-left .rc-time-picker-panel-select ul').at(1).find('li').at(3).simulate('click');
      wrapper.find('.rc-calendar-range-right .rc-time-picker-panel-select ul').at(2).find('li').at(55).simulate('click');
      expect(wrapper.find('.rc-calendar-input').at(1).getDOMNode().value).toBe('3/29/2017 11:04:05');
      // different hour for disabledMinutes
      wrapper.find('.rc-calendar-range-left .rc-time-picker-panel-select ul').at(0).find('li').at(10).simulate('click');
      wrapper.find('.rc-calendar-range-right .rc-time-picker-panel-select ul').at(1).find('li').at(35).simulate('click');
      expect(wrapper.find('.rc-calendar-input').at(1).getDOMNode().value).toBe('3/29/2017 11:04:05');
    });
  });

  describe('controlled panels', () => {
    it('render controlled panels correctly', () => {
      const RangeMonthPicker = mount(<RangeCalendar mode={['month', 'month']} />);
      expect(RangeMonthPicker.render()).toMatchSnapshot();
      RangeMonthPicker.find('.rc-calendar-month-panel-year-select').at(0).simulate('click');
      RangeMonthPicker.find('.rc-calendar-month-panel-year-select').at(1).simulate('click');
      expect(RangeMonthPicker.find('.rc-calendar-year-panel').length).toBe(0);
      expect(RangeMonthPicker.find('.rc-calendar-month-panel').length).toBe(2);

      const RangeYearPicker = mount(<RangeCalendar mode={['year', 'year']} />);
      expect(RangeYearPicker.render()).toMatchSnapshot();
      RangeYearPicker.find('.rc-calendar-year-panel-decade-select').at(0).simulate('click');
      RangeYearPicker.find('.rc-calendar-year-panel-decade-select').at(1).simulate('click');
      expect(RangeYearPicker.find('.rc-calendar-decade-panel').length).toBe(0);
      expect(RangeYearPicker.find('.rc-calendar-year-panel').length).toBe(2);

      const RangeTimePicker = mount(<RangeCalendar mode={['time', 'time']} />);
      expect(RangeTimePicker.find('.rc-calendar-time-picker').length).toBe(2);
    });

    it('should work when start time is null in defaultValue', () => {
      let wrapper = null;
      wrapper = mount(<RangeCalendar defaultValue={[null, moment().endOf('month')]} />);
      wrapper.find('.rc-calendar-range-right .rc-calendar-month-select').simulate('click');
      expect(wrapper.find('.rc-calendar-range-left .rc-calendar-next-year-btn').length).toBe(1);
      expect(wrapper.find('.rc-calendar-range-left .rc-calendar-next-month-btn').length).toBe(1);
      wrapper = mount(<RangeCalendar />);
      wrapper.find('.rc-calendar-range-right .rc-calendar-year-select').simulate('click');
      expect(wrapper.find('.rc-calendar-range-left .rc-calendar-next-year-btn').length).toBe(1);
      expect(wrapper.find('.rc-calendar-range-left .rc-calendar-next-month-btn').length).toBe(1);
    });

    it('should work when end time is null in defaultValue', () => {
      let wrapper = null;
      wrapper = mount(<RangeCalendar defaultValue={[moment().startOf('month'), null]} />);
      wrapper.find('.rc-calendar-range-right .rc-calendar-month-select').simulate('click');
      expect(wrapper.find('.rc-calendar-range-left .rc-calendar-next-year-btn').length).toBe(1);
      expect(wrapper.find('.rc-calendar-range-left .rc-calendar-next-month-btn').length).toBe(1);
      wrapper = mount(<RangeCalendar />);
      wrapper.find('.rc-calendar-range-right .rc-calendar-year-select').simulate('click');
      expect(wrapper.find('.rc-calendar-range-left .rc-calendar-next-year-btn').length).toBe(1);
      expect(wrapper.find('.rc-calendar-range-left .rc-calendar-next-month-btn').length).toBe(1);
    });

    it('should work when start time is undefined in defaultValue', () => {
      let wrapper = null;
      wrapper = mount(<RangeCalendar defaultValue={[undefined, moment().endOf('month')]} />);
      wrapper.find('.rc-calendar-range-right .rc-calendar-month-select').simulate('click');
      expect(wrapper.find('.rc-calendar-range-left .rc-calendar-next-year-btn').length).toBe(1);
      expect(wrapper.find('.rc-calendar-range-left .rc-calendar-next-month-btn').length).toBe(1);
      wrapper = mount(<RangeCalendar />);
      wrapper.find('.rc-calendar-range-right .rc-calendar-year-select').simulate('click');
      expect(wrapper.find('.rc-calendar-range-left .rc-calendar-next-year-btn').length).toBe(1);
      expect(wrapper.find('.rc-calendar-range-left .rc-calendar-next-month-btn').length).toBe(1);
    });

    it('should work when end time is undefined in defaultValue', () => {
      let wrapper = null;
      wrapper = mount(<RangeCalendar defaultValue={[moment().startOf('month'), undefined]} />);
      wrapper.find('.rc-calendar-range-right .rc-calendar-month-select').simulate('click');
      expect(wrapper.find('.rc-calendar-range-left .rc-calendar-next-year-btn').length).toBe(1);
      expect(wrapper.find('.rc-calendar-range-left .rc-calendar-next-month-btn').length).toBe(1);
      wrapper = mount(<RangeCalendar />);
      wrapper.find('.rc-calendar-range-right .rc-calendar-year-select').simulate('click');
      expect(wrapper.find('.rc-calendar-range-left .rc-calendar-next-year-btn').length).toBe(1);
      expect(wrapper.find('.rc-calendar-range-left .rc-calendar-next-month-btn').length).toBe(1);
    });

    it('support controlled mode', () => {
      let value = null;
      class ControlledRangeCalendar extends React.Component {
        state = { mode: ['date', 'date'] };

        handlePanelChange = (v, mode) => {
          value = v;
          this.setState({ mode });
        }

        render() {
          return <RangeCalendar mode={this.state.mode} onPanelChange={this.handlePanelChange} />;
        }
      }
      const wrapper = mount(<ControlledRangeCalendar />);

      wrapper.find('.rc-calendar-month-select').at(0).simulate('click');
      wrapper.find('.rc-calendar-month-select').at(1).simulate('click');
      expect(wrapper.find('.rc-calendar-month-panel').length).toBe(2);
      wrapper.find('.rc-calendar-month-panel-year-select').at(0).simulate('click');
      wrapper.find('.rc-calendar-month-panel-year-select').at(0).simulate('click');
      expect(wrapper.find('.rc-calendar-year-panel').length).toBe(2);
      wrapper.find('.rc-calendar-year-panel-decade-select').at(0).simulate('click');
      wrapper.find('.rc-calendar-year-panel-decade-select').at(0).simulate('click');
      expect(wrapper.find('.rc-calendar-decade-panel').length).toBe(2);
      expect(value[0].isSame(moment(), 'day')).toBe(true);
      expect(value[1].isSame(moment().add(1, 'month'), 'day')).toBe(true);
      wrapper.find('.rc-calendar-decade-panel-selected-cell').at(0).simulate('click');
      wrapper.find('.rc-calendar-decade-panel-selected-cell').at(0).simulate('click');
      expect(wrapper.find('.rc-calendar-decade-panel').length).toBe(0);
      wrapper.find('.rc-calendar-year-panel-selected-cell').at(0).simulate('click');
      wrapper.find('.rc-calendar-year-panel-selected-cell').at(0).simulate('click');
      expect(wrapper.find('.rc-calendar-year-panel').length).toBe(0);
      wrapper.find('.rc-calendar-month-panel-selected-cell').at(0).simulate('click');
      wrapper.find('.rc-calendar-month-panel-selected-cell').at(0).simulate('click');
      expect(wrapper.find('.rc-calendar-month-panel').length).toBe(0);
      expect(value[0].isSame(moment('2010-03-29'), 'day')).toBe(true);
      expect(value[1].isSame(moment('2010-04-29'), 'day')).toBe(true);

      wrapper.find('.rc-calendar-year-select').at(0).simulate('click');
      wrapper.find('.rc-calendar-year-select').at(1).simulate('click');
      expect(wrapper.find('.rc-calendar-year-panel').length).toBe(2);
      wrapper.find('.rc-calendar-year-panel-decade-select').at(0).simulate('click');
      wrapper.find('.rc-calendar-year-panel-decade-select').at(0).simulate('click');
      expect(wrapper.find('.rc-calendar-decade-panel').length).toBe(2);
      wrapper.find('.rc-calendar-decade-panel-selected-cell').at(0).simulate('click');
      wrapper.find('.rc-calendar-decade-panel-selected-cell').at(0).simulate('click');
      expect(wrapper.find('.rc-calendar-decade-panel').length).toBe(0);
      wrapper.find('.rc-calendar-year-panel-selected-cell').at(0).simulate('click');
      wrapper.find('.rc-calendar-year-panel-selected-cell').at(0).simulate('click');
      expect(wrapper.find('.rc-calendar-year-panel').length).toBe(0);
    });

    it('controlled value works correctly', () => {
      const wrapper = mount(<RangeCalendar value={[moment(), moment()]} />);
      const initialValue = wrapper.state('value');
      expect(initialValue[0].isSame(initialValue[1], 'month')).toBe(true);

      wrapper.setProps({ value: [moment(), moment()] });
      const updatedValue = wrapper.state('value');
      expect(updatedValue[0].isSame(updatedValue[1], 'month')).toBe(true);
    });

    // https://github.com/ant-design/ant-design/issues/15659
    it('controlled value works correctly with mode', () => {
      class Demo extends React.Component {
        state = {
          mode: ['month', 'month'],
          value: [moment().add(-1, 'day'), moment()],
        };

        handlePanelChange = (value, mode) => {
          this.setState({
            value,
            mode: [mode[0] === 'date' ? 'month' : mode[0], mode[1] === 'date' ? 'month' : mode[1]],
          });
        };

        render() {
          return (
            <RangeCalendar
              value={this.state.value}
              selectedValue={this.state.value}
              mode={this.state.mode}
              onPanelChange={this.handlePanelChange}
            />
          );
        }
      }

      const wrapper = mount(<Demo />);
      wrapper.find('.rc-calendar-month-panel-year-select').first().simulate('click');
      wrapper.find('.rc-calendar-year-panel-cell').at(1).simulate('click');
      expect(
        wrapper.find('.rc-calendar-month-panel-year-select-content').first(0).text()
      ).toBe('2010');
    });

    // https://github.com/ant-design/ant-design/issues/15659
    it('selected item style works correctly with mode year', () => {
      class Demo extends React.Component {
        state = {
          value: [moment().add(-1, 'year'), moment()],
        };

        handlePanelChange = (value) => {
          this.setState({
            value,
          });
        };

        render() {
          return (
            <RangeCalendar
              value={this.state.value}
              selectedValue={this.state.value}
              mode={['year', 'year']}
              onPanelChange={this.handlePanelChange}
            />
          );
        }
      }

      const wrapper = mount(<Demo />);
      wrapper.find('.rc-calendar-year-panel-cell').at(1).simulate('click');
      expect(
        wrapper.find('.rc-calendar-year-panel-selected-cell').first(0).text()
      ).toBe('2010');
    });
  });

  it('can hide date inputs with showDateInput={false}', () => {
    const wrapper = render(<RangeCalendar showDateInput={false} />);
    expect(wrapper).toMatchSnapshot();
  });

  describe('onInputSelect', () => {
    it('trigger when date is valid', () => {
      const handleInputSelect = jest.fn();
      const wrapper = mount(<RangeCalendar format={format} onInputSelect={handleInputSelect} />);
      wrapper.find('input').first().simulate('change', { target: { value: '2013-01-01' } });
      expect(
        handleInputSelect.mock.calls[0][0].length
      ).toBe(1);
      expect(
        handleInputSelect.mock.calls[0][0][0].isSame('2013-01-01')
      ).toBe(true);
    });

    it('not trigger when date is not valid', () => {
      const handleInputSelect = jest.fn();
      const wrapper = mount(<RangeCalendar format={format} onInputSelect={handleInputSelect} />);
      wrapper.find('input').first().simulate('change', { target: { value: '2013-01-0' } });
      expect(handleInputSelect).not.toBeCalled();
    });
  });

  it('controlled hoverValue changes', () => {
    const start = moment();
    const end = moment().add(2, 'day');
    const wrapper = mount(<RangeCalendar hoverValue={[start, end]} />);
    const nextEnd = end.clone().add(2, 'day');
    wrapper.setProps({ hoverValue: [start, nextEnd] });
    expect(wrapper.state().hoverValue[1]).toBe(nextEnd);
  });

  it('controlled selectedValue changes', () => {
    const start = moment();
    const end = moment().add(2, 'day');
    const wrapper = mount(<RangeCalendar selectedValue={[start, end]} />);
    const nextEnd = end.clone().add(2, 'day');
    wrapper.setProps({ selectedValue: [start, nextEnd] });
    expect(wrapper.state().selectedValue[1]).toBe(nextEnd);
    expect(wrapper.state().prevSelectedValue[1]).toBe(nextEnd);
  });

  describe('onHoverChange', () => {
    let handleHoverChange;
    let start;
    let end;
    let wrapper;

    beforeEach(() => {
      handleHoverChange = jest.fn();
      start = moment();
      end = moment().add(2, 'day');
      wrapper = mount(<RangeCalendar type="start" onHoverChange={handleHoverChange} selectedValue={[start, end]} />);
    });

    it('mouseEnter', () => {
      wrapper.find('.rc-calendar-date-panel').simulate('mouseEnter');
      expect(handleHoverChange).toHaveBeenCalledWith([start, end]);
    });

    it('mouseHover', () => {
      wrapper.find('.rc-calendar-date-panel').simulate('mouseLeave');
      expect(handleHoverChange).toHaveBeenCalledWith([]);
    });
  });

  it('key control', () => {
    const onChange = jest.fn();
    const onSelect = jest.fn();
    let keyDownEvent = 0;
    const wrapper = mount(
      <RangeCalendar
        defaultSelectedValue={[moment('2000-09-03', format), moment('2000-11-28', format)]}
        onChange={onChange}
        onSelect={onSelect}
        onKeyDown={() => keyDownEvent = 1}
      />
    );
    expect(wrapper.render()).toMatchSnapshot();

    const keyDown = (code, info) => {
      wrapper.find('.rc-calendar').simulate('keyDown', {
        ...info,
        keyCode: code,
      });
    };

    const keySimulateCheck = (code, month, date, info) => {
      keyDown(code, info);

      expect(wrapper.find('.rc-calendar-range-left .rc-calendar-month-select').text())
        .toEqual(String(month));
      expect(wrapper.find('.rc-calendar-selected-start-date .rc-calendar-date').text())
        .toEqual(String(date));
    };

    // 09-03 down 09-10
    keySimulateCheck(keyCode.DOWN, 'Sep', 10);

    // 09-03 left 09-09
    keySimulateCheck(keyCode.LEFT, 'Sep', 9);

    // 09-09 right 09-10
    keySimulateCheck(keyCode.RIGHT, 'Sep', 10);

    // 09-10 right 09-03
    keySimulateCheck(keyCode.UP, 'Sep', 3);

    // 09-10 home 09-01
    keySimulateCheck(keyCode.HOME, 'Sep', 1);

    // 09-10 end 09-30
    keySimulateCheck(keyCode.END, 'Sep', 30);

    // 09-30 page up 08-30
    keySimulateCheck(keyCode.PAGE_UP, 'Aug', 30);

    // 08-30 page down 09-30
    keySimulateCheck(keyCode.PAGE_DOWN, 'Sep', 30);

    keyDown(keyCode.BACKSLASH);
    expect(keyDownEvent).toEqual(1);

    keyDown(keyCode.ENTER);

    expect(onChange.mock.calls[0][0][0].format(format)).toEqual('2000-09-30');

    // 2000-09-30 ctrl+right 2001-09-30
    keySimulateCheck(keyCode.RIGHT, 'Sep', 30, {
      ctrlKey: true,
    });
    expect(wrapper.find('.rc-calendar-range-right .rc-calendar-year-select').text())
      .toEqual('2001');

    // 2001-09-30 ctrl+right 2000-09-30
    keySimulateCheck(keyCode.LEFT, 'Sep', 30, {
      ctrlKey: true,
    });

    keyDown(keyCode.ENTER);
    expect(onChange.mock.calls[1][0][0].format(format)).toEqual('2000-09-30');
    expect(onChange.mock.calls[1][0][1].format(format)).toEqual('2000-09-30');

    expect(onSelect.mock.calls[0][0][0].format(format)).toEqual('2000-09-30');
    expect(onSelect.mock.calls[0][0][1].format(format)).toEqual('2000-09-30');
  });

  it('change input trigger calendar close', () => {
    const value = [moment(), moment().add(1, 'months')];
    const onSelect = jest.fn();

    const wrapper = mount(
      <RangeCalendar
        value={value}
        selectedValue={value}
        onSelect={onSelect}
      />
    );

    wrapper.find('input').at(0).simulate('change', {
      target: {
        value: '1/1/2000',
      },
    });

    expect(onSelect.mock.calls[0][1].source).toEqual('dateInput');

    wrapper.find('input').at(0).simulate('keyDown', {
      keyCode: keyCode.ENTER,
    });
    expect(onSelect.mock.calls[1][1].source).toEqual('dateInputSelect');
  });

  it('date mode should not display same month', () => {
    const FORMAT = 'YYYY-MM-DD';
    const sameDay = moment('2000-01-01');
    const wrapper = mount(<RangeCalendar defaultValue={[sameDay, sameDay]} />);

    // Should in different month
    expect(wrapper.find('CalendarPart').at(0).props().value.format(FORMAT)).toEqual('2000-01-01');
    expect(wrapper.find('CalendarPart').at(1).props().value.format(FORMAT)).toEqual('2000-02-01');

    // Back end to month panel
    wrapper.find('CalendarPart').at(1).find('.rc-calendar-month-select').simulate('click');
    wrapper.find('CalendarPart').at(1).find('.rc-calendar-month-panel-month').at(0).simulate('click');
    expect(wrapper.find('CalendarPart').at(0).props().value.format(FORMAT)).toEqual('1999-12-01');
    expect(wrapper.find('CalendarPart').at(1).props().value.format(FORMAT)).toEqual('2000-01-01');

    // Back start to month panel
    wrapper.find('CalendarPart').at(0).find('.rc-calendar-month-select').simulate('click');
    wrapper.find('CalendarPart').at(0).find('.rc-calendar-month-panel-month').at(0).simulate('click');
    expect(wrapper.find('CalendarPart').at(0).props().value.format(FORMAT)).toEqual('2000-01-01');
    expect(wrapper.find('CalendarPart').at(1).props().value.format(FORMAT)).toEqual('2000-02-01');
  });

  it('render text correctly when range mode is both time', () => {
    const RangeTimePicker = mount(
      <RangeCalendar
        mode={['time', 'time']}
        timePicker={
          <TimePickerPanel
            defaultValue={[moment('00:00:00', 'HH:mm:ss'), moment('23:59:59', 'HH:mm:ss')]}
          />
        }
      />,
    );
    expect(RangeTimePicker.find('.rc-calendar-time-picker-btn').text()).toBe('select date');
  });
});
