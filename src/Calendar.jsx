'use strict';

var React = require('react');
var DATE_ROW_COUNT = 6;
var DATE_COL_COUNT = 7;
var DateTimeFormat = require('gregorian-calendar-format');
var GregorianCalendar = require('gregorian-calendar');
var rcUtil = require('rc-util');
var KeyCode = rcUtil.KeyCode;
var MonthPanel = require('./MonthPanel');
var Time = require('./Time');

function noop() {
}

function getIdFromDate(d) {
  return 'rc-calendar-' + d.getYear() +
    '-' + d.getMonth() + '-' +
    d.getDayOfMonth();
}

function goStartMonth() {
  var next = this.state.value.clone();
  next.setDayOfMonth(1);
  this.setState({value: next});
}

function goEndMonth() {
  var next = this.state.value.clone();
  next.setDayOfMonth(next.getActualMaximum(GregorianCalendar.MONTH));
  this.setState({value: next});
}

function goMonth(direction) {
  var next = this.state.value.clone();
  next.addMonth(direction);
  this.setState({value: next});
}

function goYear(direction) {
  var next = this.state.value.clone();
  next.addYear(direction);
  this.setState({value: next});
}

function goWeek(direction) {
  var next = this.state.value.clone();
  next.addWeekOfYear(direction);
  this.setState({value: next});
}

function goDay(direction) {
  var next = this.state.value.clone();
  next.addDayOfMonth(direction);
  this.setState({value: next});
}

function isSameDay(one, two) {
  return one.getYear() === two.getYear() &&
    one.getMonth() === two.getMonth() &&
    one.getDayOfMonth() === two.getDayOfMonth();
}

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

function onFocus() {
  if (this._blurTimer) {
    clearTimeout(this._blurTimer);
    this._blurTimer = null;
  } else {
    this.props.onFocus();
  }
}

function onBlur() {
  if (this._blurTimer) {
    clearTimeout(this._blurTimer);
  }
  this._blurTimer = setTimeout(()=> {
    this.props.onBlur();
  }, 100);
}

function chooseToday() {
  var today = this.state.value.clone();
  today.setTime(Date.now());
  this.handleSelect(today);
}

function handleDayClick(current) {
  this.handleSelect(current);
}

function handleSelect(current, keyDownEvent) {
  var props = this.props;
  this.setState({
    value: current
  });
  if (!keyDownEvent) {
    props.onSelect(current);
  }
}

function clear() {
  this.props.onClear();
}

function onMonthPanelSelect(current) {
  this.setState({
    value: current,
    showMonthPanel: 0
  });
}

function handleKeyDown(e) {
  var keyCode = e.keyCode;
  // mac
  var ctrlKey = e.ctrlKey || e.metaKey;
  switch (keyCode) {
    case KeyCode.DOWN:
      goWeek.call(this, 1);
      e.preventDefault();
      return true;
    case KeyCode.UP:
      goWeek.call(this, -1);
      e.preventDefault();
      return true;
    case KeyCode.LEFT:
      if (ctrlKey) {
        this.previousYear();
      } else {
        goDay.call(this, -1);
      }
      e.preventDefault();
      return true;
    case KeyCode.RIGHT:
      if (ctrlKey) {
        this.nextYear();
      } else {
        goDay.call(this, 1);
      }
      e.preventDefault();
      return true;
    case KeyCode.HOME:
      goStartMonth.call(this);
      e.preventDefault();
      return true;
    case KeyCode.END:
      goEndMonth.call(this);
      e.preventDefault();
      return true;
    case KeyCode.PAGE_DOWN:
      this.nextMonth();
      e.preventDefault();
      return true;
    case KeyCode.PAGE_UP:
      this.previousMonth();
      e.preventDefault();
      return true;
    case KeyCode.ENTER:
      this.props.onSelect(this.state.value);
      e.preventDefault();
      return true;
    default:
      this.props.onKeyDown(e);
      return true;
  }
}

function showMonthPanel() {
  this.setState({
    showMonthPanel: 1
  });
}

class Calendar extends React.Component {
  constructor(props) {
    super(props);
    var value = props.value || props.defaultValue;
    if (!value) {
      value = new GregorianCalendar();
      value.setTime(Date.now());
    }
    this.dateFormatter = new DateTimeFormat(props.locale.dateFormat);
    this.state = {
      orient: props.orient,
      prefixCls: props.prefixCls || 'rc-calendar',
      value: value
    };
    // bind methods
    this.onBlur = onBlur.bind(this);
    this.onFocus = onFocus.bind(this);
    this.prefixClsFn = require('./prefixClsFn').bind(this);
    this.nextMonth = goMonth.bind(this, 1);
    this.previousMonth = goMonth.bind(this, -1);
    this.nextYear = goYear.bind(this, 1);
    this.previousYear = goYear.bind(this, -1);
    this.chooseToday = chooseToday.bind(this);
    this.clear = clear.bind(this);
    this.handleSelect = handleSelect.bind(this);
    this.onMonthPanelSelect = onMonthPanelSelect.bind(this);
    this.handleKeyDown = handleKeyDown.bind(this);
    this.showMonthPanel = showMonthPanel.bind(this);
  }

  shouldComponentUpdate() {
    return rcUtil.PureRenderMixin.shouldComponentUpdate.apply(this, arguments);
  }

  componentWillReceiveProps(nextProps) {
    var value = nextProps.value;
    if (value !== undefined) {
      if (!value) {
        value = this.state.value.clone();
        value.setTime(Date.now());
      }
      this.setState({
        value: value
      });
    }
    if (nextProps.orient) {
      this.setState({
        orient: nextProps.orient
      });
    }
    if (nextProps.locale !== this.props.locale) {
      this.dateFormatter = new DateTimeFormat(nextProps.locale.dateFormat);
    }
  }

  renderDates() {
    var props = this.props;
    var i, j, current;
    var dateTable = [];
    var showWeekNumber = props.showWeekNumber;
    var value = this.state.value;
    var today = value.clone();
    var prefixClsFn = this.prefixClsFn;
    var cellClass = prefixClsFn('cell');
    var weekNumberCellClass = prefixClsFn('week-number-cell');
    var dateClass = prefixClsFn('date');
    var dateRender = props.dateRender;
    var disabledDate = props.disabledDate;
    var dateFormatter = this.dateFormatter;
    var todayClass = prefixClsFn('today');
    var selectedClass = prefixClsFn('selected-day');
    var lastMonthDayClass = prefixClsFn('last-month-cell');
    var nextMonthDayClass = prefixClsFn('next-month-btn-day');
    var disabledClass = prefixClsFn('disabled-cell');
    var firstDisableClass = prefixClsFn('disabled-cell-first-of-row');
    var lastDisableClass = prefixClsFn('disabled-cell-last-of-row');
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
        weekNumberCell = (
          <td key={dateTable[passed].getWeekOfYear()} role="gridcell" className = {weekNumberCellClass}>{dateTable[passed].getWeekOfYear()}</td>
        );
      }
      for (j = 0; j < DATE_COL_COUNT; j++) {
        var next = null;
        var last = null;
        current = dateTable[passed];
        if (j < DATE_COL_COUNT - 1) {
          next = dateTable[passed + 1];
        }
        if (j > 0) {
          last = dateTable[passed - 1];
        }
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
        if (disabledDate) {
          if (disabledDate(current, value)) {
            cls += ' ' + disabledClass;
            disabled = true;


            if (!last || !disabledDate(last, value)) {
              cls += ' ' + firstDisableClass;
            }

            if (!next || !disabledDate(next, value)) {
              cls += ' ' + lastDisableClass;
            }
          }
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
          <td key={passed}  onClick={disabled ? noop : handleDayClick.bind(this, current)} role="gridcell" title={dateFormatter.format(current)} className = {cls}>
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
    this.dateTable = dateTable;
    return tableHtml;
  }

  getTodayTime() {
    var value = this.state.value;
    var today = value.clone();
    today.setTime(Date.now());
    return this.dateFormatter.format(today);
  }

  getMonthYear() {
    var locale = this.props.locale;
    var value = this.state.value;
    return new DateTimeFormat(locale.monthYearFormat).format(value);
  }

  render() {
    var showWeekNumberEl;
    var props = this.props;
    var locale = props.locale;
    var state = this.state;
    var value = state.value;
    var veryShortWeekdays = [];
    var weekDays = [];
    var firstDayOfWeek = value.getFirstDayOfWeek();
    var prefixCls = state.prefixCls;
    var prefixClsFn = this.prefixClsFn;

    for (var i = 0; i < DATE_COL_COUNT; i++) {
      var index = (firstDayOfWeek + i) % DATE_COL_COUNT;
      veryShortWeekdays[i] = locale.format.veryShortWeekdays[index];
      weekDays[i] = locale.format.weekdays[index];
    }

    if (props.showWeekNumber) {
      showWeekNumberEl = (
        <th role="columnheader" className = {prefixClsFn('column-header', 'week-number-header')}>
          <span className ={prefixClsFn('column-header-inner')}>x</span>
        </th>);
    }

    var weekDaysEls = weekDays.map((day, xindex)=> {
      return (
        <th key={xindex} role="columnheader" title={day} className ={prefixClsFn('column-header')}>
          <span className = {prefixClsFn('column-header-inner')}>
          {veryShortWeekdays[xindex]}
          </span>
        </th>);
    });

    var footerEl;
    if (props.showToday || props.showTime) {
      var todayEl;
      if (props.showToday) {
        todayEl = (<a className = {prefixClsFn('today-btn')}
          role="button"
          onClick={this.chooseToday}
          title={this.getTodayTime()}>{locale.today}</a>);
      }
      var clearEl;
      if (props.showClear) {
        clearEl = (<a className = {prefixClsFn('clear-btn')}
          role="button"
          onClick={this.clear}>{locale.clear}</a>);
      }
      var footerBtn;
      if (todayEl || clearEl) {
        footerBtn = <div className={prefixClsFn('footer-btn')}>{todayEl} {clearEl}</div>;
      }
      var timeEl;
      if (props.showTime) {
        timeEl = (<Time value={value} rootPrefixCls={prefixCls} prefixClsFn={prefixClsFn} locale={locale} onChange={this.handleSelect}/>);
      }
      footerEl = (
        <div className = {prefixClsFn('footer')}>
        {timeEl}
        {footerBtn}
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
    if (props.showWeekNumber) {
      className += ' ' + prefixClsFn('week-number');
    }
    var orient = state.orient;
    if (orient) {
      orient.forEach(o => {
        className += ' ' + prefixClsFn('orient-' + o);
      });
    }
    return (
      <div className={className} style={this.props.style}
        tabIndex="0" onFocus={this.onFocus}
        onBlur={this.onBlur} onKeyDown={this.handleKeyDown}>
        <div style={{outline: 'none'}}>
          <div className = {prefixClsFn('header')}>
            <a className ={prefixClsFn('prev-year-btn')}
              role="button"
              onClick={this.previousYear}
              title={locale.previousYear}>
              «
            </a>
            <a className = {prefixClsFn('prev-month-btn')}
              role="button"
              onClick={this.previousMonth}
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
              onClick={this.nextMonth}
              title={locale.nextMonth}>
              ›
            </a>
            <a className = {prefixClsFn('next-year-btn')}
              onClick={this.nextYear}
              title={locale.nextYear}>
              »
            </a>
          </div>
          <div className = {prefixClsFn('calendar-body')}>
            <table className = {prefixClsFn('table')} cellSpacing="0" role="grid">
              <thead>
                <tr role="row">
              {showWeekNumberEl}
              {weekDaysEls}
                </tr>
              </thead>
              <tbody className = {prefixClsFn('tbody')}>
            {this.renderDates()}
              </tbody>
            </table>
          </div>
        {footerEl}
        </div>
      {monthPanel}
      </div>);
  }
}

Calendar.propTypes = {
  value: React.PropTypes.object,
  defaultValue: React.PropTypes.object,
  className: React.PropTypes.string,
  orient: React.PropTypes.arrayOf(React.PropTypes.oneOf(['left', 'top', 'right', 'bottom'])),
  locale: React.PropTypes.object,
  showWeekNumber: React.PropTypes.bool,
  style: React.PropTypes.object,
  showToday: React.PropTypes.bool,
  showTime: React.PropTypes.bool,
  onSelect: React.PropTypes.func,
  onBlur: React.PropTypes.func
};

Calendar.defaultProps = {
  locale: require('./locale/en-us'),
  style: {},
  onKeyDown: noop,
  className: '',
  showToday: true,
  onSelect: noop,
  onFocus: noop,
  onBlur: noop,
  onClear: noop
};

module.exports = Calendar;
