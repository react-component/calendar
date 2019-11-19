/* eslint-disable no-undef */
import React from 'react';
import { mount } from 'enzyme';
import keyCode from 'rc-util/lib/KeyCode';
import moment from 'moment';
import QuarterCalendar from '../src/QuarterCalendar';

describe('QuarterCalendar', () => {
  it('year or decade panel work correctly', () => {
    const format = 'YYYY-Q';
    const wrapper = mount(<QuarterCalendar />);
    wrapper.find('.rc-calendar-quarter-panel-year-select').simulate('click');
    wrapper.find('.rc-calendar-year-panel-decade-select').simulate('click');
    wrapper.find('.rc-calendar-decade-panel-selected-cell').simulate('click');
    wrapper.find('.rc-calendar-year-panel-selected-cell').simulate('click');
    wrapper.find('.rc-calendar-quarter-panel-selected-cell').simulate('click');
    expect(wrapper.state('selectedValue').format(format)).toBe('2010-1');
  });
  describe('keyboard', () => {
    let wrapper;
    beforeEach(() => {
      const selected = moment().add(1, 'Q');
      wrapper = mount(<QuarterCalendar defaultValue={selected} />);
    });

    it('enter to select works', () => {
      const onSelect = jest.fn();
      wrapper = mount(<QuarterCalendar onSelect={onSelect} />);
      wrapper.simulate('keydown', {
        keyCode: keyCode.ENTER,
      });
      expect(onSelect).toHaveBeenCalledWith(wrapper.state('value'), undefined);
    });

    it('enter not to select disabled quarter', () => {
      const onSelect = jest.fn();
      function disabledDate(current) {
        if (!current) {
          return false;
        }
        return true;
      }

      wrapper = mount(<QuarterCalendar onSelect={onSelect} disabledDate={disabledDate} />);
      wrapper.simulate('keydown', {
        keyCode: keyCode.LEFT,
      });
      wrapper.simulate('keydown', {
        keyCode: keyCode.ENTER,
      });
      expect(onSelect).not.toHaveBeenCalled();
    });

    it('DOWN', () => {
      wrapper.simulate('keydown', {
        keyCode: keyCode.DOWN,
      });
      expect(wrapper.state().value.quarter()).toBe(2);
    });

    it('UP', () => {
      wrapper.simulate('keydown', {
        keyCode: keyCode.UP,
      });
      expect(wrapper.state().value.quarter()).toBe(2);
    });

    it('LEFT', () => {
      wrapper.simulate('keydown', {
        keyCode: keyCode.LEFT,
      });
      expect(wrapper.state().value.quarter()).toBe(1);
    });

    it('RIGHT', () => {
      wrapper.simulate('keydown', {
        keyCode: keyCode.RIGHT,
      });
      expect(wrapper.state().value.quarter()).toBe(3);
    });

    it('CTRL + LEFT', () => {
      wrapper.simulate('keydown', {
        keyCode: keyCode.LEFT,
        ctrlKey: 1,
      });
      expect(wrapper.state().value.quarter()).toBe(2);
      expect(wrapper.state().value.year()).toBe(2016);
    });

    it('CTRL + RIGHT', () => {
      wrapper.simulate('keydown', {
        keyCode: keyCode.RIGHT,
        ctrlKey: 1,
      });
      expect(wrapper.state().value.quarter()).toBe(2);
      expect(wrapper.state().value.year()).toBe(2018);
    });

    it('ignore other keys', () => {
      wrapper.simulate('keydown', {
        keyCode: keyCode.A,
      });
      expect(wrapper.state().value.quarter()).toBe(2);
      expect(wrapper.state().value.year()).toBe(2017);
    });
  });
});
