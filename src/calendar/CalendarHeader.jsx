import React, { PropTypes } from 'react';
import MonthPanel from '../month/MonthPanel';
import YearPanel from '../year/YearPanel';
import toFragment from 'rc-util/lib/Children/mapSelf';

function goMonth(direction) {
  const next = this.props.value.clone();
  next.add(direction, 'months');
  this.props.onValueChange(next);
}

function goYear(direction) {
  const next = this.props.value.clone();
  next.add(direction, 'years');
  this.props.onValueChange(next);
}

const CalendarHeader = React.createClass({
  propTypes: {
    enablePrev: PropTypes.any,
    enableNext: PropTypes.any,
    prefixCls: PropTypes.string,
    showTimePicker: PropTypes.bool,
    locale: PropTypes.object,
    value: PropTypes.object,
    onValueChange: PropTypes.func,
  },

  getDefaultProps() {
    return {
      enableNext: 1,
      enablePrev: 1,
    };
  },

  getInitialState() {
    this.nextMonth = goMonth.bind(this, 1);
    this.previousMonth = goMonth.bind(this, -1);
    this.nextYear = goYear.bind(this, 1);
    this.previousYear = goYear.bind(this, -1);
    return {};
  },

  onSelect(value) {
    this.setState({
      showMonthPanel: 0,
      showYearPanel: 0,
    });
    this.props.onValueChange(value);
  },

  monthYearElement(showTimePicker) {
    const props = this.props;
    const prefixCls = props.prefixCls;
    const locale = props.locale;
    const value = props.value;
    const monthBeforeYear = locale.monthBeforeYear;
    const selectClassName = `${prefixCls}-${monthBeforeYear ? 'my-select' : 'ym-select'}`;
    const year = (<a
      className={`${prefixCls}-year-select`}
      role="button"
      onClick={showTimePicker ? null : this.showYearPanel}
      title={locale.monthSelect}
    >
      {value.format(locale.yearFormat)}
    </a>);
    const month = (<a
      className={`${prefixCls}-month-select`}
      role="button"
      onClick={showTimePicker ? null : this.showMonthPanel}
      title={locale.monthSelect}
    >
      {value.format(locale.monthFormat)}
    </a>);
    let day;
    if (showTimePicker) {
      day = (<a
        className={`${prefixCls}-day-select`}
        role="button"
      >
        {value.format(locale.dayFormat)}
      </a>);
    }
    let my = [];
    if (monthBeforeYear) {
      my = [month, day, year];
    } else {
      my = [year, month, day];
    }
    return (<span className={selectClassName}>
    {toFragment(my)}
    </span>);
  },

  showIf(condition, el) {
    return condition ? el : null;
  },

  showMonthPanel() {
    this.setState({
      showMonthPanel: 1,
      showYearPanel: 0,
    });
  },

  showYearPanel() {
    this.setState({
      showMonthPanel: 0,
      showYearPanel: 1,
    });
  },

  render() {
    const props = this.props;
    const { enableNext, enablePrev, prefixCls, locale, value, showTimePicker } = props;
    const state = this.state;
    let PanelClass = null;
    if (state.showMonthPanel) {
      PanelClass = MonthPanel;
    } else if (state.showYearPanel) {
      PanelClass = YearPanel;
    }
    let panel;
    if (PanelClass) {
      panel = (<PanelClass
        locale={locale}
        defaultValue={value}
        rootPrefixCls={prefixCls}
        onSelect={this.onSelect}
      />);
    }
    return (<div className={`${prefixCls}-header`}>
      <div style={{ position: 'relative' }}>
        {this.showIf(enablePrev && !showTimePicker,
          <a
            className={`${prefixCls}-prev-year-btn`}
            role="button"
            onClick={this.previousYear}
            title={locale.previousYear}
          >
            «
          </a>)}
        {this.showIf(enablePrev && !showTimePicker,
          <a
            className={`${prefixCls}-prev-month-btn`}
            role="button"
            onClick={this.previousMonth}
            title={locale.previousMonth}
          >
            ‹
          </a>)}
        {this.monthYearElement(showTimePicker)}
        {this.showIf(enableNext && !showTimePicker,
          <a
            className={`${prefixCls}-next-month-btn`}
            onClick={this.nextMonth}
            title={locale.nextMonth}
          >
            ›
          </a>)}
        {this.showIf(enableNext && !showTimePicker,
          <a
            className={`${prefixCls}-next-year-btn`}
            onClick={this.nextYear}
            title={locale.nextYear}
          >
            »
          </a>)}
      </div>
      {panel}
    </div>);
  },
});

export default CalendarHeader;
