/* eslint-disable no-undef */
import React from 'react';
import { mount } from 'enzyme';
import keyCode from 'rc-util/lib/KeyCode';
import moment from 'moment';
import MonthCalendar from '../src/MonthCalendar';

describe('MonthCalendar', () => {
  describe('keyboard', () => {
    it('enter to select works', () => {
      const onSelect = jest.fn();
      const wrapper = mount(<MonthCalendar onSelect={onSelect} />);
      wrapper.simulate('keydown', {
        keyCode: keyCode.ENTER,
      });
      expect(onSelect).toHaveBeenCalledWith(wrapper.state('value'), undefined);
    });

    it('enter not to select disabled month', () => {
      const onSelect = jest.fn();
      function disabledDate(current) {
        if (!current) {
          return false;
        }
        const date = moment();
        return current.month() < date.month();
      }

      const wrapper = mount(<MonthCalendar onSelect={onSelect} disabledDate={disabledDate} />);
      wrapper.simulate('keydown', {
        keyCode: keyCode.LEFT,
      });
      wrapper.simulate('keydown', {
        keyCode: keyCode.ENTER,
      });
      expect(onSelect).not.toHaveBeenCalled();
    });
  });
});
