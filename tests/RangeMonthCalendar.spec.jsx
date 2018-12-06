/* eslint-disable no-undef, max-len */
import React from 'react';
import moment from 'moment';
import { mount, render } from 'enzyme';
import keyCode from 'rc-util/lib/KeyCode';
import RangeCalendar from '../src/RangeCalendar';

const format = ('YYYY-MM-DD');
const mformat = ('YYYY-MM');
describe('RangeCalendar', () => {
  it('render works', () => {
    const wrapper = mount(<RangeCalendar showPanel="month"/>);
    expect(wrapper.find('.rc-calendar-month-panel-month').length).toBeGreaterThan(0);
  });

  it('render hoverValue correctly', () => {
    const wrapper = render(<RangeCalendar showPanel="month" hoverValue={[moment(), moment().add(1, 'months')]} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('next year works', () => {
    const wrapper = mount(<RangeCalendar showPanel="month" />);

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
    const wrapper = mount(<RangeCalendar showPanel="month" />);

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
    wrapper = mount(<RangeCalendar showPanel="month" />);
    wrapper.find('.rc-calendar-range-right .rc-calendar-year-select').simulate('click');
    expect(wrapper.find('.rc-calendar-range-left .rc-calendar-next-year-btn').length).toBe(1);
  });

  it('right panel show prev btns when left panel show year panel or month panel', () => {
    let wrapper = null;
    wrapper = mount(<RangeCalendar showPanel="month" />);
    wrapper.find('.rc-calendar-range-left .rc-calendar-year-select').simulate('click');
    expect(wrapper.find('.rc-calendar-range-right .rc-calendar-next-year-btn').length).toBe(1);
  });

  it('onSelect works', () => {
    function onSelect(d) {
      expect(d[0].format(format)).toBe('2015-06-29');
      expect(d[1].format(format)).toBe('2016-06-29');
    }

    const now = moment([2015, 8, 29]);

    const wrapper = mount(
      <RangeCalendar showPanel="month"
        format={format}
        onSelect={onSelect}
        defaultValue={[now, now.clone().add(1, 'years')]}
        showWeekNumber
      />
    );
    wrapper.find('.rc-calendar-range-left .rc-calendar-month-panel-month').at(5).simulate('click'); // 9.4
    expect(wrapper.find('.rc-calendar-input').at(0).getDOMNode().value).toBe('2015-06-29');
    wrapper.find('.rc-calendar-range-right .rc-calendar-month-panel-month').at(5).simulate('click'); // 10.2
    expect(wrapper.find('.rc-calendar-input').at(1).getDOMNode().value).toBe('2016-06-29');
  });

  it('onSelect works reversely', () => {
    function onSelect(d) {
      expect(d[0].format(format)).toBe('2015-06-29');
      expect(d[1].format(format)).toBe('2015-08-29');
    }

    const now = moment([2015, 8, 29]);

    const wrapper = mount(
      <RangeCalendar showPanel="month"
        format={format}
        onSelect={onSelect}
        defaultValue={[now, now.clone().add(1, 'years')]}
        showWeekNumber
      />
    );

    wrapper.find('.rc-calendar-range-left .rc-calendar-month-panel-month').at(5).simulate('click'); // 9.14
    expect(wrapper.find('.rc-calendar-input').at(0).getDOMNode().value).toBe('2015-06-29');

    wrapper.find('.rc-calendar-range-left .rc-calendar-month-panel-month').at(7).simulate('click'); // 9.4
    expect(wrapper.find('.rc-calendar-input').at(0).getDOMNode().value).toBe('2015-06-29');
    expect(wrapper.find('.rc-calendar-input').at(1).getDOMNode().value).toBe('2015-08-29');
  });

  it('onHoverChange works', () => {
    let hoverValue = null;
    const now = moment([2015, 8, 29]);
    function onHoverChange(hv) {
      hoverValue = hv;
    }
    const wrapper = mount(<RangeCalendar defaultValue={[now, now.clone().add(1, 'years')]} showPanel="month" onHoverChange={onHoverChange} />);
    wrapper.find('.rc-calendar-range-left .rc-calendar-month-panel-cell').at(1).simulate('click');
    wrapper.find('.rc-calendar-range-left .rc-calendar-month-panel-cell').at(3).simulate('mouseEnter');
    expect(hoverValue[0].format(format)).toBe('2015-02-28');
    expect(hoverValue[1].format(format)).toBe('2015-04-28');
  });

  describe('controlled panels', () => {
    it('render controlled panels correctly', () => {
      const RangeYearPicker = mount(<RangeCalendar showPanel="month" mode={['year', 'year']} />);
      expect(RangeYearPicker.render()).toMatchSnapshot();
      RangeYearPicker.find('.rc-calendar-year-panel-decade-select').at(0).simulate('click');
      RangeYearPicker.find('.rc-calendar-year-panel-decade-select').at(1).simulate('click');
      expect(RangeYearPicker.find('.rc-calendar-decade-panel').length).toBe(0);
      expect(RangeYearPicker.find('.rc-calendar-year-panel').length).toBe(2);
    });

    it('support controlled mode', () => {
      let value = null;
      class ControlledRangeCalendar extends React.Component {
        state = { mode: ['month', 'month'] };

        handlePanelChange = (v, mode) => {
          value = v;
          this.setState({ mode });
        }

        render() {
          return <RangeCalendar showPanel="month" mode={this.state.mode} onPanelChange={this.handlePanelChange} />;
        }
      }
      const wrapper = mount(<ControlledRangeCalendar />);
      wrapper.find('.rc-calendar-year-select').at(0).simulate('click');
      wrapper.find('.rc-calendar-year-select').at(1).simulate('click');
      expect(wrapper.find('.rc-calendar-year-panel').length).toBe(2);
      wrapper.find('.rc-calendar-year-panel-decade-select').at(0).simulate('click');
      wrapper.find('.rc-calendar-year-panel-decade-select').at(0).simulate('click');
      expect(wrapper.find('.rc-calendar-decade-panel').length).toBe(2);
      expect(value[0].isSame(moment(), 'day')).toBe(true);
      expect(value[1].isSame(moment().add(1, 'year'), 'day')).toBe(true);
      wrapper.find('.rc-calendar-decade-panel-selected-cell').at(0).simulate('click');
      wrapper.find('.rc-calendar-decade-panel-selected-cell').at(0).simulate('click');
      expect(wrapper.find('.rc-calendar-decade-panel').length).toBe(0);
      wrapper.find('.rc-calendar-year-panel-selected-cell').at(0).simulate('click');
      wrapper.find('.rc-calendar-year-panel-selected-cell').at(0).simulate('click');
      expect(wrapper.find('.rc-calendar-year-panel').length).toBe(0);
      expect(wrapper.find('.rc-calendar-month-panel-table').length).toBe(2);
      expect(value[0].isSame(moment('2010-04-29'), 'year')).toBe(true);
      expect(value[1].isSame(moment('2011-04-29'), 'year')).toBe(true);

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
      const wrapper = mount(<RangeCalendar showPanel="month" value={[moment(), moment()]} />);
      const initialValue = wrapper.state('value');
      expect(initialValue[0].add(1, 'year').isSame(initialValue[1], 'year')).toBe(true);

      wrapper.setProps({ value: [moment(), moment()] });
      const updatedValue = wrapper.state('value');
      expect(updatedValue[0].add(1, 'year').isSame(updatedValue[1], 'year')).toBe(true);
    });
  });

  it('can hide date inputs with showDateInput={false}', () => {
    const wrapper = render(<RangeCalendar showPanel="month" showDateInput={false} />);
    expect(wrapper).toMatchSnapshot();
  });

  describe('onInputSelect', () => {
    it('trigger when date is valid', () => {
      const handleInputSelect = jest.fn();
      const wrapper = mount(<RangeCalendar showPanel="month" format={format} onInputSelect={handleInputSelect} />);
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
      const wrapper = mount(<RangeCalendar showPanel="month" format={format} onInputSelect={handleInputSelect} />);
      wrapper.find('input').first().simulate('change', { target: { value: '2013-01-0' } });
      expect(handleInputSelect).not.toBeCalled();
    });
  });

  it('controlled hoverValue changes', () => {
    const start = moment();
    const end = moment().add(2, 'day');
    const wrapper = mount(<RangeCalendar showPanel="month" hoverValue={[start, end]} />);
    const nextEnd = end.clone().add(2, 'day');
    wrapper.setProps({ hoverValue: [start, nextEnd] });
    expect(wrapper.state().hoverValue[1]).toBe(nextEnd);
  });

  it('controlled selectedValue changes', () => {
    const start = moment();
    const end = moment().add(2, 'day');
    const wrapper = mount(<RangeCalendar showPanel="month" selectedValue={[start, end]} />);
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
      wrapper = mount(<RangeCalendar showPanel="month" type="start" onHoverChange={handleHoverChange} selectedValue={[start, end]} />);
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
    const wrapper = mount(
      <RangeCalendar showPanel="month"
        defaultSelectedValue={[moment('2000-09', format), moment('2000-11-28', format)]}
        onChange={onChange}
        onSelect={onSelect}
      />
    );
    expect(wrapper.render()).toMatchSnapshot();

    const keyDown = (code, info) => {
      wrapper.find('.rc-calendar').simulate('keyDown', {
        ...info,
        keyCode: code,
      });
    };

    const keySimulateCheck = (code, month, year, info) => {
      keyDown(code, info);

      expect(wrapper.find('.rc-calendar-range-left .rc-calendar-year-select').text())
        .toEqual(String(year));
      expect(wrapper.find('.rc-calendar-range-left .rc-calendar-month-panel-selected-cell .rc-calendar-month-panel-month').text())
        .toEqual(String(month));
    };

    // 2000-09 down 2000-12
    keySimulateCheck(keyCode.DOWN, 'Dec', 2000);

    // 2000-12 left 2000-11
    keySimulateCheck(keyCode.LEFT, 'Nov', 2000);

    // 2000-11 left 2000-12
    keySimulateCheck(keyCode.RIGHT, 'Dec', 2000);

    // 2000-12 left 2000-01
    keySimulateCheck(keyCode.HOME, 'Jan', 2000);

    // 2000-01 left 2000-12
    keySimulateCheck(keyCode.END, 'Dec', 2000);

    // 2000-12 left 1999-12
    keySimulateCheck(keyCode.PAGE_UP, 'Dec', 1999);

    // 2001-12 left 2000-12
    keySimulateCheck(keyCode.PAGE_DOWN, 'Dec', 2000);

    keyDown(keyCode.ENTER);

    expect(onChange.mock.calls[0][0][0].format(mformat)).toEqual('2000-12');

    // 2000-12 ctrl+right 2000-12
    keySimulateCheck(keyCode.RIGHT, 'Dec', 2000, {
      ctrlKey: true,
    });
    expect(wrapper.find('.rc-calendar-range-right .rc-calendar-year-select').text())
      .toEqual('2001');

    // 2000-12 ctrl+right 2000-12
    keySimulateCheck(keyCode.LEFT, 'Dec', 2000, {
      ctrlKey: true,
    });

    keyDown(keyCode.ENTER);
    expect(onChange.mock.calls[1][0][0].format(mformat)).toEqual('2000-12');
    expect(onChange.mock.calls[1][0][1].format(mformat)).toEqual('2000-12');

    expect(onSelect.mock.calls[0][0][0].format(mformat)).toEqual('2000-12');
    expect(onSelect.mock.calls[0][0][1].format(mformat)).toEqual('2000-12');
  });
});
