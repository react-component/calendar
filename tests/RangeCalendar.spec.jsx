/* eslint-disable no-undef */
import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import moment from 'moment';
import { mount } from 'enzyme';
import RangeCalendar from '../src/RangeCalendar';

const Simulate = TestUtils.Simulate;
const format = ('YYYY-MM-DD');
const $ = require('jquery');

describe('RangeCalendar', () => {
  let calendar;
  const container = document.createElement('div');
  document.body.appendChild(container);

  afterEach(() => {
    ReactDOM.unmountComponentAtNode(container);
  });

  beforeEach((done) => {
    ReactDOM.render(<RangeCalendar/>, container, function ok() {
      calendar = this;
      done();
    });
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

  it('left panel cannot select month same or after right panel', () => {
    const wrapper = mount(<RangeCalendar />);
    wrapper.find('.rc-calendar-range-left .rc-calendar-month-select').simulate('click');
    const monthCells = wrapper.find('.rc-calendar-range-left .rc-calendar-month-panel-cell');
    const rightPanelMonth = wrapper.state('value')[1].month();
    expect(monthCells.get(rightPanelMonth).className)
      .toMatch('rc-calendar-month-panel-cell-disabled');
    expect(monthCells.get(rightPanelMonth + 1).className)
      .toMatch('rc-calendar-month-panel-cell-disabled');
  });

  it('right panel cannot select month same or before left panel', () => {
    const wrapper = mount(<RangeCalendar />);
    wrapper.find('.rc-calendar-range-right .rc-calendar-month-select').simulate('click');
    const monthCells = wrapper.find('.rc-calendar-range-right .rc-calendar-month-panel-cell');
    const leftPanelMonth = wrapper.state('value')[0].month();
    expect(monthCells.get(leftPanelMonth).className)
      .toMatch('rc-calendar-month-panel-cell-disabled');
    expect(monthCells.get(leftPanelMonth - 1).className)
      .toMatch('rc-calendar-month-panel-cell-disabled');
  });

  it('left panel and right panel should not be the same month', () => {
    const wrapper = mount(<RangeCalendar />);
    wrapper.find('.rc-calendar-range-left .rc-calendar-today').simulate('click').simulate('click');
    const selectedValue = wrapper.state('selectedValue');
    expect(selectedValue[0].isSame(moment())).toBe(true);
    expect(selectedValue[1].isSame(moment())).toBe(true);
    const value = wrapper.state('value');
    expect(value[0].isSame(moment())).toBe(true);
    expect(value[1].isSame(moment().add(1, 'month'))).toBe(true);
  });

  it('render works', () => {
    expect(TestUtils.scryRenderedDOMComponentsWithClass(calendar,
      'rc-calendar-cell').length).toBeGreaterThan(0);
  });

  it('onSelect works', (done) => {
    let day;

    function onSelect(d) {
      expect(d[0].format(format)).toBe('2015-09-04');
      expect(d[1].format(format)).toBe('2015-10-02');
      done();
    }

    const now = moment([2015, 8, 29]);
    ReactDOM.unmountComponentAtNode(container);
    calendar = ReactDOM.render(<RangeCalendar
      format={format}
      onSelect={onSelect}
      defaultValue={[now, now.clone().add(1, 'months')]}
      showWeekNumber
    />, container);
    const leftCalendar = TestUtils.scryRenderedDOMComponentsWithClass(calendar,
      'rc-calendar-range-left')[0];
    const leftInput = $(leftCalendar).find('.rc-calendar-input')[0];
    const rightCalendar = TestUtils.scryRenderedDOMComponentsWithClass(calendar,
      'rc-calendar-range-right')[0];
    const rightInput = $(rightCalendar).find('.rc-calendar-input')[0];
    day = $(leftCalendar).find('.rc-calendar-date')[5]; // 9.4
    Simulate.click(day);
    expect(ReactDOM.findDOMNode(leftInput).value).toBe('2015-09-04');
    day = $(rightCalendar).find('.rc-calendar-date')[5]; // 10.2
    Simulate.click(day);
    expect(ReactDOM.findDOMNode(rightInput).value).toBe('2015-10-02');
  });
});
