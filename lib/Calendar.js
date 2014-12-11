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
var KeyCode = require('./util').KeyCode;
var MonthPanel = require('./MonthPanel');

function noop() {
}

function getIdFromDate(d) {
  return 'rc-calendar-' + d.getYear() +
    '-' + d.getMonth() + '-' +
    d.getDayOfMonth();
}

function goStartMonth(self) {
  var next = self.state.value.clone();
  next.setDayOfMonth(1);
  self.setState({value: next});
}

function goEndMonth(self) {
  var next = self.state.value.clone();
  next.setDayOfMonth(next.getActualMaximum(GregorianCalendar.MONTH));
  self.setState({value: next});
}

function goMonth(self, direction) {
  var next = self.state.value.clone();
  next.addMonth(direction);
  self.setState({value: next});
}

function goYear(self, direction) {
  var next = self.state.value.clone();
  next.addYear(direction);
  self.setState({value: next});
}

function goWeek(self, direction) {
  var next = self.state.value.clone();
  next.addWeekOfYear(direction);
  self.setState({value: next});
}

function goDay(self, direction) {
  var next = self.state.value.clone();
  next.addDayOfMonth(direction);
  self.setState({value: next});
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
    var value = this.props.value;
    if (!value) {
      value = new GregorianCalendar();
      value.setTime(Date.now());
    }
    return {
      value: value
    };
  },

  componentDidMount: function () {
    if (this.props.focused) {
      this.refs.main.getDOMNode().focus();
    }
  },

  getDefaultProps: function () {
    return {
      locale: require('./locale/en-us'),
      showToday: 1,
      onSelect: noop,
      onFocus: noop,
      onBlur: noop
    };
  },

  goMonth: function (direction) {
    var next = this.state.value.clone();
    next.addMonth(direction);
    this.setState({
      value: next
    });
  },

  goYear: function (direction) {
    var next = this.state.value.clone();
    next.addYear(direction);
    this.setState({
      value: next
    });
  },

  nextMonth: function (e) {
    e.preventDefault();
    this.goMonth(1);
  },

  previousMonth: function (e) {
    e.preventDefault();
    this.goMonth(-1);
  },

  nextYear: function (e) {
    e.preventDefault();
    this.goYear(1);
  },

  previousYear: function (e) {
    e.preventDefault();
    this.goYear(-1);
  },

  chooseDay: function (current, e) {
    e.preventDefault();
    var props = this.props;
    var disabledDate = props.disabledDate;
    if (disabledDate && disabledDate(current, this.state.value)) {
      return;
    }
    this.setState({
      value: current
    });
    props.onSelect(current);
  },

  chooseToday: function () {
    var today = this.state.value.clone();
    today.setTime(Date.now());
    this.setState({
      value: today
    });
  },

  preventDefault: function (e) {
    e.preventDefault();
  },

  onKeyDown: function (e) {
    var self = this;
    var keyCode = e.keyCode;
    var ctrlKey = e.ctrlKey;
    switch (keyCode) {
      case KeyCode.DOWN:
        goWeek(self, 1);
        e.preventDefault();
        return;
      case KeyCode.UP:
        goWeek(self, -1);
        e.preventDefault();
        return;
      case KeyCode.LEFT:
        if (ctrlKey) {
          goYear(self, -1);
        } else {
          goDay(self, -1);
        }
        e.preventDefault();
        return;
      case KeyCode.RIGHT:
        if (ctrlKey) {
          goYear(self, 1);
        } else {
          goDay(self, 1);
        }
        e.preventDefault();
        return;
      case KeyCode.HOME:
        goStartMonth(self);
        e.preventDefault();
        return;
      case KeyCode.END:
        goEndMonth(self);
        e.preventDefault();
        return;
      case KeyCode.PAGE_DOWN:
        goMonth(self, 1);
        e.preventDefault();
        return;
      case KeyCode.PAGE_UP:
        goMonth(self, -1);
        e.preventDefault();
        return;
      case KeyCode.ENTER:
        self.props.onSelect(self.state.value);
        e.preventDefault();
        return;
    }
  },

  showMonthPanel: function (e) {
    this.setState({
      showMonthPanel: 1
    });
    e.preventDefault();
  },

  onMonthPanelSelect: function (current) {
    this.setState({
      value: current,
      showMonthPanel: 0
    });
  },

  renderDates: function () {
    var props = this.props;
    var self = this,
      i, j,
      dateTable = [],
      current,
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
        weekNumberCell = (<td key={dateTable[passed].getWeekOfYear()} role="gridcell" className = {weekNumberCellClass}>{dateTable[passed].getWeekOfYear()}</td>);
      }
      for (j = 0; j < DATE_COL_COUNT; j++) {
        current = dateTable[passed];
        var cls = cellClass;
        var disabled = false;
        var selected = false;

        if (isSameDay(current, today)) {
          cls += ' ' + todayClass;
        }
        if (isSameDay(current, value)) {
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
              key={getIdFromDate(current)}
              hidefocus="on"
              unselectable="on"
              tabIndex="-1"
              className = {dateClass}
              href="#"
              aria-selected={selected}
              aria-disabled={disabled}>
              {current.getDayOfMonth()}
            </a>);
        }
        dateCells.push(
          <td key={passed}  onClick={this.chooseDay.bind(this, current)} role="gridcell" title={dateFormatter.format(current)} className = {cls}>
        {dateHtml}
          </td>);

        passed++;
      }
      tableHtml.push(
        <tr
          key={i}
          role="row">
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

  onFocus: function () {
    if (this._blurTimer) {
      clearTimeout(this._blurTimer);
      this._blurTimer = null;
    }
  },

  onBlur: function () {
    var self = this;
    this._blurTimer = setTimeout(function () {
      self.props.onBlur();
    }, 40);
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
        <th role="columnheader" className = "rc-calendar-column-header rc-calendar-week-number-header">
          <span className = "rc-calendar-column-header-inner">x</span>
        </th>);
    }
    var weekDaysEls = weekDays.map(function (value, xindex) {
      return (
        <th key={xindex} role="columnheader" title={value} className = "rc-calendar-column-header">
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
            onClick={this.chooseToday}
            hidefocus="on"
            tabIndex="-1"
            href="#"
            title={this.getTodayTime()}>{locale.today}</a>
        </div>);
    }

    var monthPanel;
    if (this.state.showMonthPanel) {
      monthPanel = <MonthPanel locale={locale} value={value} onSelect={this.onMonthPanelSelect}/>;
    }
    // TODO need focusin focusout
    // https://github.com/facebook/react/issues/2011
    return (
      <div className = "rc-calendar" tabIndex="-1" onFocus={this.onFocus} onBlur={this.onBlur}>
        <div style={{outline: 'none'}} tabIndex="0" ref='main' onKeyDown={this.onKeyDown}>
          <div className = "rc-calendar-header">
            <a className = "rc-calendar-prev-year-btn"
              href="#"
              tabIndex="-1"
              role="button"
              onClick={this.previousYear}
              title={locale.previousYear}
              hidefocus="on">
            </a>
            <a className = "rc-calendar-prev-month-btn"
              href="#"
              tabIndex="-1"
              role="button"
              onClick={this.previousMonth}
              title={locale.previousMonth}
              hidefocus="on">
            </a>
            <a className = "rc-calendar-month-select"
              role="button"
              href="#"
              tabIndex="-1"
              hidefocus="on"
              onClick={this.showMonthPanel}
              title={locale.monthSelect}>
              <span className = "rc-calendar-month-select-content">{this.getMonthYear()}</span>
              <span className = "rc-calendar-month-select-arrow">x</span>
            </a>
            <a className = "rc-calendar-next-month-btn"
              href="#"
              tabIndex="-1"
              role="button"
              onClick={this.nextMonth}
              title={locale.nextMonth}
              hidefocus="on">
            </a>
            <a className = "rc-calendar-next-year-btn"
              href="#"
              tabIndex="-1"
              role="button"
              onClick={this.nextYear}
              title={locale.nextYear}
              hidefocus="on">
            </a>
          </div>
          <div className = "rc-calendar-body">
            <table className = "rc-calendar-table" cellSpacing="0" role="grid">
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
        </div>
      {monthPanel}
      </div>);
  }
});
module.exports = Calendar;
