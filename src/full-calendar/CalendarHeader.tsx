import React, { Component, ReactNode } from 'react';
import { Moment } from 'moment';
import { getMonthName } from '../util';
import { CalendarTypeMode } from '../date/DateInput';

function noop() {}

interface CalendarHeaderProps {
  value?: Moment;
  onValueChange?: (value: Moment) => void;
  yearSelectOffset?: number;
  yearSelectTotal?: number;
  prefixCls?: string;
  onTypeChange?: (value: CalendarTypeMode) => void;
  type?: CalendarTypeMode;
  locale?: {
    [key: string]: any;
  };
  showTypeSwitch?: boolean;
  headerComponents?: ReactNode;

  /**
   * 这个做成了组件有点奇怪，应该用 render 的
   */
  Select?: React.ComponentClass<any, any> & {
    Option: React.ComponentClass<any, any>;
  };
}

class CalendarHeader extends Component<CalendarHeaderProps, {}> {
  static defaultProps = {
    yearSelectOffset: 10,
    yearSelectTotal: 20,
    onValueChange: noop,
    onTypeChange: noop,
  };

  onYearChange = year => {
    const newValue = this.props.value.clone();
    newValue.year(parseInt(year, 10));
    this.props.onValueChange(newValue);
  };

  onMonthChange = (month: number) => {
    const newValue = this.props.value.clone();
    newValue.month(parseInt(`${month}`, 10));
    this.props.onValueChange(newValue);
  };

  yearSelectElement = (year: number) => {
    const { yearSelectOffset, yearSelectTotal, prefixCls, Select } = this.props;
    const start = year - yearSelectOffset;
    const end = start + yearSelectTotal;

    const options = [];
    for (let index = start; index < end; index += 1) {
      options.push(<Select.Option key={`${index}`}>{index}</Select.Option>);
    }
    if (options.length < 1) {
      return null;
    }
    return (
      <Select
        className={`${prefixCls}-header-year-select`}
        onChange={this.onYearChange}
        dropdownStyle={{ zIndex: 2000 }}
        dropdownMenuStyle={{ maxHeight: 250, overflow: 'auto', fontSize: 12 }}
        optionLabelProp="children"
        value={String(year)}
        showSearch={false}
      >
        {options}
      </Select>
    );
  };

  monthSelectElement = month => {
    const { props } = this;
    const t = props.value.clone();
    const { prefixCls } = props;
    const options = [];
    const { Select } = props;

    for (let index = 0; index < 12; index += 1) {
      t.month(index);
      options.push(<Select.Option key={`${index}`}>{getMonthName(t)}</Select.Option>);
    }

    return (
      <Select
        className={`${prefixCls}-header-month-select`}
        dropdownStyle={{ zIndex: 2000 }}
        dropdownMenuStyle={{ maxHeight: 250, overflow: 'auto', overflowX: 'hidden', fontSize: 12 }}
        optionLabelProp="children"
        value={String(month)}
        showSearch={false}
        onChange={this.onMonthChange}
      >
        {options}
      </Select>
    );
  };

  changeTypeToDate = () => {
    this.props.onTypeChange('date');
  };

  changeTypeToMonth = () => {
    this.props.onTypeChange('month');
  };

  render() {
    const { value, locale, prefixCls, type, showTypeSwitch, headerComponents } = this.props;
    const year = value.year();
    const month = value.month();
    const yearSelect = this.yearSelectElement(year);
    const monthSelect = type === 'month' ? null : this.monthSelectElement(month);
    const switchCls = `${prefixCls}-header-switcher`;
    const typeSwitcher = showTypeSwitch ? (
      <span className={switchCls}>
        {type === 'date' ? (
          <span className={`${switchCls}-focus`}>{locale.month}</span>
        ) : (
          <span onClick={this.changeTypeToDate.bind(this)} className={`${switchCls}-normal`}>
            {locale.month}
          </span>
        )}
        {type === 'month' ? (
          <span className={`${switchCls}-focus`}>{locale.year}</span>
        ) : (
          <span onClick={this.changeTypeToMonth.bind(this)} className={`${switchCls}-normal`}>
            {locale.year}
          </span>
        )}
      </span>
    ) : null;
    return (
      <div className={`${prefixCls}-header`}>
        {typeSwitcher}
        {monthSelect}
        {yearSelect}
        {headerComponents}
      </div>
    );
  }
}

export default CalendarHeader;
