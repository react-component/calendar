/* eslint-disable no-undef */
import React from 'react';
import Select from 'rc-select';
import { render, mount } from 'enzyme';
import moment from 'moment';
import FullCalendar from '../src/FullCalendar';

describe('FullCalendar', () => {
  it('renders month mode correctly', () => {
    const wrapper = render(
      <FullCalendar
        type="month"
        Select={Select}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('renders date mode correctly', () => {
    const wrapper = render(
      <FullCalendar
        type="date"
        Select={Select}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('renders fullscreen correctly', () => {
    const wrapper = render(
      <FullCalendar
        fullscreen
        Select={Select}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('renders custom header correctly', () => {
    const wrapper = render(
      <FullCalendar
        Select={Select}
        headerRender={() => <div key="header">custom header</div>}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });

  describe('type', () => {
    it('renders defaultType correctly', () => {
      const wrapper = render(
        <FullCalendar
          defaultType="date"
          Select={Select}
        />
      );
      expect(wrapper).toMatchSnapshot();
    });

    it('controlled type', () => {
      const wrapper = mount(
        <FullCalendar
          type="date"
          Select={Select}
        />
      );
      wrapper.setProps({ type: 'month' });
      expect(wrapper.state().type).toBe('month');
    });

    it('fires onTypeChange', () => {
      const handleTypeChange = jest.fn();
      const wrapper = mount(
        <FullCalendar
          onTypeChange={handleTypeChange}
          Select={Select}
        />
      );
      wrapper.find('.rc-calendar-full-header-switcher-normal').simulate('click');
      expect(handleTypeChange).toHaveBeenCalledWith('month');
    });
  });

  it('select month', () => {
    const selected = moment().add(1, 'month');
    const wrapper = mount(
      <FullCalendar
        type="month"
        Select={Select}
      />
    );
    wrapper.selectMonth(selected.month());
    expect(selected.isSame(wrapper.state().selectedValue)).toBe(true);
    expect(selected.isSame(wrapper.state().value)).toBe(true);
  });

  it('default today', () => {
    const today = moment().add(1, 'day');
    const wrapper = mount(
      <FullCalendar
        type="month"
        Select={Select}
        defaultToday={today}
      />
    );
    expect(today.isSame(wrapper.state().value)).toBe(true);
  });
});
