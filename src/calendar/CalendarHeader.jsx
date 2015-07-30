'use strict';


import React from 'react';
import MonthPanel from '../month/MonthPanel';
import DateTimeFormat from 'gregorian-calendar-format';
import YearPanel from '../year/YearPanel';
import rcUtil from 'rc-util';
var toFragment = rcUtil.Children.mapSelf;

export default
class CalendarHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.yearFormatter = new DateTimeFormat(props.locale.yearFormat);
    this.monthFormatter = new DateTimeFormat(props.locale.monthFormat);
    this.showMonthPanel = this.showMonthPanel.bind(this);
    this.showYearPanel = this.showYearPanel.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    var locale = this.props.locale;
    if (nextProps.locale !== locale) {
      this.yearFormatter = new DateTimeFormat(locale.yearFormat);
      this.monthFormatter = new DateTimeFormat(locale.monthFormat);
    }
  }

  showMonthPanel() {
    this.setState({
      showMonthPanel: 1,
      showYearPanel: 0
    });
  }

  showYearPanel() {
    this.setState({
      showMonthPanel: 0,
      showYearPanel: 1
    });
  }

  getMonthYearElement() {
    var props = this.props;
    var prefixCls = props.prefixCls;
    var locale = props.locale;
    var value = this.props.value;
    var monthBeforeYear = locale.monthBeforeYear;
    var selectClassName = `${prefixCls}-${monthBeforeYear ? 'my-select' : 'ym-select'}`;
    var year = <a className = {`${prefixCls}-year-select`}
      role="button"
      onClick={this.showYearPanel}
      title={locale.monthSelect}>{this.yearFormatter.format(value)}</a>;
    var month = <a className ={`${prefixCls}-month-select`}
      role="button"
      onClick={this.showMonthPanel}
      title={locale.monthSelect}>{this.monthFormatter.format(value)}</a>;
    var my = [];
    if (monthBeforeYear) {
      my = [month, year];
    } else {
      my = [year, month];
    }
    return <span className={selectClassName}>
    {toFragment(my)}
    </span>;
  }

  handleSelect(value) {
    this.setState({
      showMonthPanel: 0,
      showYearPanel: 0
    });
    this.props.onValueChange(value);
  }

  render() {
    var props = this.props;
    var state = this.state;
    var prefixCls = props.prefixCls;
    var locale = props.locale;
    var value = props.value;
    var PanelClass = state.showMonthPanel ? MonthPanel : state.showYearPanel ? YearPanel : null;
    var panel;
    if (PanelClass) {
      panel = <PanelClass locale={locale} value={value} rootPrefixCls={prefixCls} onSelect={this.handleSelect}/>;
    }
    return <div className = {`${prefixCls}-header`}>
      <a className ={`${prefixCls}-prev-year-btn`}
        role="button"
        onClick={props.previousYear}
        title={locale.previousYear}>
        «
      </a>
      <a className = {`${prefixCls}-prev-month-btn`}
        role="button"
        onClick={props.previousMonth}
        title={locale.previousMonth}>
        ‹
      </a>
      {this.getMonthYearElement()}
      <a className = {`${prefixCls}-next-month-btn`}
        onClick={props.nextMonth}
        title={locale.nextMonth}>
        ›
      </a>
      <a className = {`${prefixCls}-next-year-btn`}
        onClick={props.nextYear}
        title={locale.nextYear}>
        »
      </a>
      {panel}
    </div>;
  }
}
