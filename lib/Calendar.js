/** @jsx React.DOM */

/**
 * Calendar ui component for React
 * @author yiminghe@gmail.com
 */
var React = require('react');
var DATE_ROW_COUNT = 6;
var DATE_COL_COUNT = 7;
var DateTimeFormat = require('gregorian-calendar-format');
var GregorianCalendar = require('gregorian-calendar');

function getIdFromDate(d) {
  return 'rc-calendar-' + d.getYear() +
    '-' + d.getMonth() + '-' +
    d.getDayOfMonth();
}

function isSameDay(one, two) {
  return one.getYear() === two.getYear() &&
    one.getMonth() === two.getMonth() &&
    one.getDayOfMonth() === two.getDayOfMonth();
}
//
//function isSameMonth(one, two) {
//  return one.getYear() === two.getYear() &&
//    one.getMonth() === two.getMonth();
//}

function beforeCurrentMonthYear(current, today) {
  if (current.getYear() < today.getYear()) {
    return 1;
  }
  return current.getYear() === today.getYear() &&
    current.getMonth() < today.getMonth();
}

function afterCurrentMonthYear(current, today) {
  if (current.getYear() > today.getYear()) {
    return 1;
  }
  return current.getYear() === today.getYear() &&
    current.getMonth() > today.getMonth();
}

var Calendar = React.createClass({
  getInitialState: function () {
    var now = new GregorianCalendar();
    now.setTime(Date.now());
    return {
      value: now
    };
  },

  getDefaultProps: function () {
    return {
      locale: require('./locale/en-us')
    };
  },

  renderDates: function () {
    var props = this.props;
    var self = this,
      i, j,
      dateTable = [],
      current,
      showToday = props.showToday,
      showWeekNumber = props.showWeekNumber,
      locale = props.locale,
      value = this.state.value,
      today = value.clone(),
      cellClass = 'rc-calendar-cell',
      weekNumberCellClass = ('rc-calendar-week-number-cell'),
      dateClass = ('rc-calendar-date'),
      dateRender = props.dateRender,
      disabledDate = props.disabledDate,
      dateLocale = value.getLocale(),
      dateFormatter = new DateTimeFormat(locale.dateFormat, dateLocale),
      todayClass = ('rc-calendar-today'),
      selectedClass = ('rc-calendar-selected-day'),
      lastMonthDayClass = ('rc-calendar-last-month-cell'),
      nextMonthDayClass = ('rc-calendar-next-month-btn-day'),
      disabledClass = ('rc-calendar-disabled-cell');
    today.setTime(Date.now());
    var month1 = value.clone();
    month1.set(value.getYear(), value.getMonth(), 1);
    var day = month1.getDayOfWeek();
    var lastMonthDiffDay = (day + 7 - value.getFirstDayOfWeek()) % 7;
    // calculate last month
    var lastMonth1 = month1.clone();
    lastMonth1.addDayOfMonth(0 - lastMonthDiffDay);
    var passed = 0;
    for (i = 0; i < DATE_ROW_COUNT; i++) {
      for (j = 0; j < DATE_COL_COUNT; j++) {
        current = lastMonth1;
        if (passed) {
          current = current.clone();
          current.addDayOfMonth(passed);
        }
        dateTable.push(current);
        passed++;
      }
    }
    var tableHtml = [];
    passed = 0;
    for (i = 0; i < DATE_ROW_COUNT; i++) {
      var weekNumberCell;
      var dateCells = [];
      if (showWeekNumber) {
        weekNumberCell = (<td role="gridcell" className = {weekNumberCellClass}>{dateTable[passed].getWeekOfYear()}</td>);
      }
      for (j = 0; j < DATE_COL_COUNT; j++) {
        current = dateTable[passed];
        var cls = cellClass;
        var disabled = false;
        var selected = false;

        if (isSameDay(current, today)) {
          cls += ' ' + todayClass;
        }
        if (!showToday && isSameDay(current, value)) {
          cls += ' ' + selectedClass;
          selected = true;
        }
        if (beforeCurrentMonthYear(current, value)) {
          cls += ' ' + lastMonthDayClass;
        }
        if (afterCurrentMonthYear(current, value)) {
          cls += ' ' + nextMonthDayClass;
        }
        if (disabledDate && disabledDate(current, value)) {
          cls += ' ' + disabledClass;
          disabled = true;
        }

        var dateHtml;
        if (!(dateRender && (dateHtml = dateRender(current, value)))) {
          dateHtml = (
            <a
              id={getIdFromDate(current)}
              hidefocus="on"
              unselectable="on"
              tabindex="-1"
              className = {dateClass}
              href="#"
              aria-selected={selected}
              aria-disabled={disabled}>
              {current.getDayOfMonth()}
            </a>);
        }
        dateCells.push(
          <td role="gridcell" data-index={passed} title={dateFormatter.format(current)} className = {cls}>
        {dateHtml}
          </td>);

        passed++;
      }
      tableHtml.push(
        <tr role="row">
          {weekNumberCell} 
          {dateCells}
        </tr>);
    }
    self.dateTable = dateTable;
    return tableHtml;
  },

  getTodayTime: function () {
    var self = this;
    var locale = self.props.locale;
    var value = self.state.value;
    var dateLocale = value.getLocale();
    var today = value.clone();
    today.setTime(Date.now());
    return new DateTimeFormat(locale.dateFormat, dateLocale).format(today);
  },

  getMonthYear: function () {
    var self = this;
    var locale = self.props.locale;
    var value = self.state.value;
    var dateLocale = value.getLocale();
    return new DateTimeFormat(locale.monthYearFormat, dateLocale).format(value);
  },

  render: function () {
    var showWeekNumberEl;
    var props = this.props;
    var locale = props.locale;
    var value = this.state.value;
    var dateLocale = value.getLocale();
    var veryShortWeekdays = [];
    var weekDays = [];
    var firstDayOfWeek = value.getFirstDayOfWeek();

    for (var i = 0; i < DATE_COL_COUNT; i++) {
      var index = (firstDayOfWeek + i) % DATE_COL_COUNT;
      veryShortWeekdays[i] = locale.veryShortWeekdays[index];
      weekDays[i] = dateLocale.weekdays[index];
    }

    if (props.showWeekNumber) {
      showWeekNumberEl = (
        <th role="columnheader" className = {{"rc-calendar-column-header": 1, "rc-calendar-week-number-header": 1}}>
          <span className = "rc-calendar-column-header-inner">x</span>
        </th>);
    }
    var weekDaysEls = weekDays.map(function (value, xindex) {
      return (
        <th role="columnheader" title={value} className = "rc-calendar-column-header">
          <span className = "rc-calendar-column-header-inner">
          {veryShortWeekdays[xindex]}
          </span>
        </th>);
    });
    var todayEl;
    if (props.showToday) {
      todayEl = (
        <div className = "rc-calendar-footer">
          <a className = "rc-calendar-today-btn"
            role="button"
            hidefocus="on"
            tabIndex="-1"
            href="#"
            title={this.getTodayTime()}>{locale.today}</a>
          <a className = "rc-calendar-clear-btn"
            role="button"
            hidefocus="on"
            tabIndex="-1"
            href="#">{locale.clear}</a>
        </div>);
    }
    return (
      <div className = "rc-calendar">
        <div className = "rc-calendar-header">
          <a className = "rc-calendar-prev-year-btn"
            href="#"
            tabIndex="-1"
            role="button"
            title={locale.previousYear}
            hidefocus="on">
          </a>
          <a className = "rc-calendar-prev-month-btn"
            href="#"
            tabIndex="-1"
            role="button"
            title={locale.previousMonth}
            hidefocus="on">
          </a>
          <a className = "rc-calendar-month-select"
            role="button"
            href="#"
            tabIndex="-1"
            hidefocus="on"
            title={locale.monthSelect}>
            <span className = "rc-calendar-month-select-content">{this.getMonthYear()}</span>
            <span className = "rc-calendar-month-select-arrow">x</span>
          </a>
          <a className = "rc-calendar-next-month-btn"
            href="#"
            tabIndex="-1"
            role="button"
            title={locale.nextMonth}
            hidefocus="on">
          </a>
          <a className = "rc-calendar-next-year-btn"
            href="#"
            tabIndex="-1"
            role="button"
            title={locale.nextYear}
            hidefocus="on">
          </a>
        </div>
        <div className = "rc-calendar-body">
          <table className = "rc-calendar-table" cellspacing="0" role="grid">
            <thead>
              <tr role="row">
              {showWeekNumberEl}
              {weekDaysEls}
              </tr>
            </thead>
            <tbody className = "rc-calendar-tbody">
            {this.renderDates()}
            </tbody>
          </table>
        </div>
    {todayEl}
      </div>);
  }
});
module.exports = Calendar;
