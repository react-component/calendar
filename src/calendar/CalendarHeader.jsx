'use strict';

var React = require('react');
var MonthPanel = require('../month/MonthPanel');
var DateTimeFormat = require('gregorian-calendar-format');

class CalendarHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.formatter = new DateTimeFormat(props.locale.monthYearFormat);
    this.showMonthPanel = this.showMonthPanel.bind(this);
    this.onMonthPanelSelect = this.onMonthPanelSelect.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.locale !== this.props.locale) {
      this.formatter = new DateTimeFormat(nextProps.locale.monthYearFormat);
    }
  }

  showMonthPanel() {
    this.setState({
      showMonthPanel: 1
    });
  }

  getMonthYear() {
    var value = this.props.value;
    return this.formatter.format(value);
  }

  onMonthPanelSelect(value) {
    this.setState({
      showMonthPanel: 0
    });
    this.props.onMonthPanelSelect(value);
  }

  render() {
    var props = this.props;
    var prefixClsFn = props.prefixClsFn;
    var locale = props.locale;
    var value = props.value;
    var monthPanel;

    if (this.state.showMonthPanel) {
      monthPanel = <MonthPanel locale={locale} value={value} rootPrefixCls={prefixClsFn()} onSelect={this.onMonthPanelSelect}/>;
    }

    return <div className = {prefixClsFn('header')}>
      <a className ={prefixClsFn('prev-year-btn')}
        role="button"
        onClick={props.previousYear}
        title={locale.previousYear}>
        «
      </a>
      <a className = {prefixClsFn('prev-month-btn')}
        role="button"
        onClick={props.previousMonth}
        title={locale.previousMonth}>
        ‹
      </a>
      <a className = {prefixClsFn('month-select')}
        role="button"
        onClick={this.showMonthPanel}
        title={locale.monthSelect}>
        <span className = {prefixClsFn('month-select-content')}>{this.getMonthYear()}</span>
        <span className = {prefixClsFn('month-select-arrow')}>x</span>
      </a>
      <a className = {prefixClsFn('next-month-btn')}
        onClick={props.nextMonth}
        title={locale.nextMonth}>
        ›
      </a>
      <a className = {prefixClsFn('next-year-btn')}
        onClick={props.nextYear}
        title={locale.nextYear}>
        »
      </a>
      {monthPanel}
    </div>;
  }
}

module.exports = CalendarHeader;
