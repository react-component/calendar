/** @jsx React.DOM */

/**
 * Calendar ui component for React
 */
var React = require('react');
var DATE_ROW_COUNT = 6;
var DATE_COL_COUNT = 7;
var DateTimeFormat = require('gregorian-calendar-format');
var GregorianCalendar = require('gregorian-calendar');
var KeyCode = require('rc-util').KeyCode;
var MonthPanel = require('./MonthPanel');
var Time = require('./Time');

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
  propTypes: {
    className: React.PropTypes.string,
    orient: React.PropTypes.arrayOf(React.PropTypes.oneOf(['left', 'top', 'right', 'bottom'])),
    locale: React.PropTypes.object,
    showWeekNumber: React.PropTypes.bool,
    showToday: React.PropTypes.bool,
    showTime: React.PropTypes.bool,
    onSelect: React.PropTypes.func,
    onBlur: React.PropTypes.func
  },

  prefixClsFn: require('./prefixClsFn'),

  getInitialState: function () {
    var value = this.props.value;
    if (!value) {
      value = new GregorianCalendar();
      value.setTime(Date.now());
    }
    return {
      orient: this.props.orient,
      prefixCls: this.props.prefixCls || 'rc-calendar',
      value: value
    };
  },

  getDefaultProps: function () {
    return {
      locale: require('./locale/en-us'),
      onKeyDown: noop,
      className: '',
      showToday: true,
      onSelect: noop,
      onFocus: noop,
      onBlur: noop
    };
  },

  componentWillReceiveProps: function (nextProps) {
    if (nextProps.value) {
      this.setState({
        value: nextProps.value
      });
    }
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

  nextMonth: function () {
    this.goMonth(1);
  },

  previousMonth: function () {
    this.goMonth(-1);
  },

  nextYear: function () {
    this.goYear(1);
  },

  previousYear: function () {
    this.goYear(-1);
  },

  handleSelect: function (current, byKeyBoard) {
    var props = this.props;
    this.setState({
      value: current
    });
    if (!byKeyBoard) {
      props.onSelect(current);
    }
  },

  handleDayClick: function (current) {
    this.handleSelect(current);
  },

  chooseToday: function () {
    var today = this.state.value.clone();
    today.setTime(Date.now());
    this.setState({
      value: today
    });
  },

  handleKeyDown: function (e) {
    var self = this;
    var keyCode = e.keyCode;
    // mac
    var ctrlKey = e.ctrlKey || e.metaKey;
    switch (keyCode) {
      case KeyCode.DOWN:
        goWeek(self, 1);
        e.preventDefault();
        return true;
      case KeyCode.UP:
        goWeek(self, -1);
        e.preventDefault();
        return true;
      case KeyCode.LEFT:
        if (ctrlKey) {
          goYear(self, -1);
        } else {
          goDay(self, -1);
        }
        e.preventDefault();
        return true;
      case KeyCode.RIGHT:
        if (ctrlKey) {
          goYear(self, 1);
        } else {
          goDay(self, 1);
        }
        e.preventDefault();
        return true;
      case KeyCode.HOME:
        goStartMonth(self);
        e.preventDefault();
        return true;
      case KeyCode.END:
        goEndMonth(self);
        e.preventDefault();
        return true;
      case KeyCode.PAGE_DOWN:
        goMonth(self, 1);
        e.preventDefault();
        return true;
      case KeyCode.PAGE_UP:
        goMonth(self, -1);
        e.preventDefault();
        return true;
      case KeyCode.ENTER:
        self.props.onSelect(self.state.value);
        e.preventDefault();
        return true;
    }
    self.props.onKeyDown(e);
  },

  showMonthPanel: function () {
    this.setState({
      showMonthPanel: 1
    });
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
      prefixClsFn = this.prefixClsFn,
      cellClass = prefixClsFn('cell'),
      weekNumberCellClass = prefixClsFn('week-number-cell'),
      dateClass = prefixClsFn('date'),
      dateRender = props.dateRender,
      disabledDate = props.disabledDate,
      dateLocale = value.getLocale(),
      dateFormatter = new DateTimeFormat(locale.dateFormat, dateLocale),
      todayClass = prefixClsFn('today'),
      selectedClass = prefixClsFn('selected-day'),
      lastMonthDayClass = prefixClsFn('last-month-cell'),
      nextMonthDayClass = prefixClsFn('next-month-btn-day'),
      disabledClass = prefixClsFn('disabled-cell');
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
            <span
              key={getIdFromDate(current)}
              className = {dateClass}
              aria-selected={selected}
              aria-disabled={disabled}>
              {current.getDayOfMonth()}
            </span>);
        }

        dateCells.push(
          <td key={passed}  onClick={disabled ? noop : this.handleDayClick.bind(this, current)} role="gridcell" title={dateFormatter.format(current)} className = {cls}>
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
    } else {
      this.props.onFocus();
    }
  },

  onBlur: function () {
    if (this._blurTimer) {
      clearTimeout(this._blurTimer);
    }
    var self = this;
    this._blurTimer = setTimeout(function () {
      self.props.onBlur();
    }, 100);
  },

  render: function () {
    var showWeekNumberEl;
    var props = this.props;
    var locale = props.locale;
    var state = this.state;
    var value = state.value;
    var dateLocale = value.getLocale();
    var veryShortWeekdays = [];
    var weekDays = [];
    var firstDayOfWeek = value.getFirstDayOfWeek();
    var prefixCls = state.prefixCls;
    var prefixClsFn = this.prefixClsFn;

    for (var i = 0; i < DATE_COL_COUNT; i++) {
      var index = (firstDayOfWeek + i) % DATE_COL_COUNT;
      veryShortWeekdays[i] = locale.veryShortWeekdays[index];
      weekDays[i] = dateLocale.weekdays[index];
    }

    if (props.showWeekNumber) {
      showWeekNumberEl = (
        <th role="columnheader" className = {prefixClsFn("column-header", "week-number-header")}>
          <span className ={prefixClsFn("column-header-inner")}>x</span>
        </th>);
    }
    var weekDaysEls = weekDays.map(function (value, xindex) {
      return (
        <th key={xindex} role="columnheader" title={value} className ={prefixClsFn("column-header")}>
          <span className = {prefixClsFn("column-header-inner")}>
          {veryShortWeekdays[xindex]}
          </span>
        </th>);
    });
    var footerEl;
    if (props.showToday || props.showTime) {
      var todayEl;
      if (props.showToday) {
        todayEl = (<a className = {prefixClsFn("today-btn")}
          role="button"
          onClick={this.chooseToday}
          title={this.getTodayTime()}>{locale.today}</a>);
      }
      var timeEl;
      if (props.showTime) {
        timeEl = (<Time value={value} rootPrefixCls={prefixCls} prefixClsFn={prefixClsFn} locale={locale} onChange={this.handleSelect}/>);
      }
      footerEl = (
        <div className = {prefixClsFn("footer")}>
        {timeEl}
        {todayEl}
        </div>);
    }

    var monthPanel;
    if (state.showMonthPanel) {
      monthPanel = <MonthPanel locale={locale} value={value} rootPrefixCls={state.prefixCls} onSelect={this.onMonthPanelSelect}/>;
    }

    var className = prefixCls;
    if (props.className) {
      className += ' ' + props.className;
    }
    var orient = state.orient;
    if (orient) {
      orient.forEach(function (o) {
        className += ' ' + prefixClsFn('orient-' + o);
      });
    }
    return (
      <div className = {className} tabIndex="0" onFocus={this.onFocus} onBlur={this.onBlur} onKeyDown={this.handleKeyDown}>
        <div style={{outline: 'none'}}>
          <div className = {prefixClsFn("header")}>
            <a className ={prefixClsFn("prev-year-btn")}
              role="button"
              onClick={this.previousYear}
              title={locale.previousYear}>
              «
            </a>
            <a className = {prefixClsFn("prev-month-btn")}
              role="button"
              onClick={this.previousMonth}
              title={locale.previousMonth}>
              ‹
            </a>
            <a className = {prefixClsFn("month-select")}
              role="button"
              onClick={this.showMonthPanel}
              title={locale.monthSelect}>
              <span className = {prefixClsFn("month-select-content")}>{this.getMonthYear()}</span>
              <span className = {prefixClsFn("month-select-arrow")}>x</span>
            </a>
            <a className = {prefixClsFn("next-month-btn")}
              onClick={this.nextMonth}
              title={locale.nextMonth}>
              ›
            </a>
            <a className = {prefixClsFn("next-year-btn")}
              onClick={this.nextYear}
              title={locale.nextYear}>
              »
            </a>
          </div>
          <div className = {prefixClsFn("calendar-body")}>
            <table className = {prefixClsFn("table")} cellSpacing="0" role="grid">
              <thead>
                <tr role="row">
              {showWeekNumberEl}
              {weekDaysEls}
                </tr>
              </thead>
              <tbody className = {prefixClsFn("tbody")}>
            {this.renderDates()}
              </tbody>
            </table>
          </div>
        {footerEl}
        </div>
      {monthPanel}
      </div>);
  }
});
module.exports = Calendar;
