'use strict';

var React = require('react');
var DateTimeFormat = require('gregorian-calendar-format');
var GregorianCalendar = require('gregorian-calendar');
var rcUtil = require('rc-util');
var KeyCode = rcUtil.KeyCode;
var DateTable = require('./date/DateTable');
var CalendarHeader = require('./calendar/CalendarHeader');
var CalendarFooter = require('./calendar/CalendarFooter');
var staticPrefixClsFn = require('./util/prefixClsFn');

function noop() {
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
    value: current
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

function getNow() {
  var value = new GregorianCalendar();
  value.setTime(Date.now());
  return value;
}

function getNowByCurrentStateValue(value) {
  value = value || getNow();
  value = value.clone();
  value.setTime(Date.now());
  return value;
}

class Calendar extends React.Component {
  constructor(props) {
    super(props);
    var value = props.value || props.defaultValue || getNow();
    this.dateFormatter = new DateTimeFormat(props.locale.dateFormat);
    this.state = {
      orient: props.orient,
      prefixCls: props.prefixCls,
      value: value
    };
    // bind methods
    this.onBlur = onBlur.bind(this);
    this.onFocus = onFocus.bind(this);
    this.prefixClsFn = staticPrefixClsFn.bind(this);
    this.nextMonth = goMonth.bind(this, 1);
    this.previousMonth = goMonth.bind(this, -1);
    this.nextYear = goYear.bind(this, 1);
    this.previousYear = goYear.bind(this, -1);
    this.chooseToday = chooseToday.bind(this);
    this.clear = clear.bind(this);
    this.handleSelect = handleSelect.bind(this);
    this.onMonthPanelSelect = onMonthPanelSelect.bind(this);
    this.handleKeyDown = handleKeyDown.bind(this);
  }

  shouldComponentUpdate() {
    return rcUtil.PureRenderMixin.shouldComponentUpdate.apply(this, arguments);
  }

  componentWillReceiveProps(nextProps) {
    var value = nextProps.value;
    if (value !== undefined) {
      value = value || nextProps.defaultValue || getNowByCurrentStateValue(this.state.value);
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

  render() {
    var props = this.props;
    var locale = props.locale;
    var state = this.state;
    var value = state.value;
    var prefixClsFn = this.prefixClsFn;

    var className = {
      [prefixClsFn()]: 1,
      [prefixClsFn('week-number')]: props.showWeekNumber
    };

    if (props.className) {
      className[props.className] = 1;
    }

    var orient = state.orient;
    if (orient) {
      orient.forEach(o => {
        className [prefixClsFn('orient-' + o)] = 1;
      });
    }

    return (
      <div className={rcUtil.classSet(className)} style={this.props.style}
        tabIndex="0" onFocus={this.onFocus}
        onBlur={this.onBlur} onKeyDown={this.handleKeyDown}>
        <div style={{outline: 'none'}}>
          <CalendarHeader locale={locale}
            onMonthPanelSelect={this.onMonthPanelSelect}
            previousYear={this.previousYear}
            previousMonth={this.previousMonth}
            nextMonth={this.nextMonth}
            nextYear={this.nextYear}
            value={value}
            prefixClsFn={prefixClsFn}/>
          <div className = {prefixClsFn('calendar-body')}>
            <DateTable
              locale={locale}
              value={value}
              prefixClsFn={prefixClsFn}
              dateRender={props.dateRender}
              onSelect={this.handleSelect}
              disabledDate={props.disabledDate}
              showWeekNumber={props.showWeekNumber}
              dateFormatter={this.dateFormatter}/>
          </div>
          <CalendarFooter locale={locale}
            showClear={props.showClear}
            prefixClsFn={prefixClsFn}
            showToday={props.showToday}
            showTime={props.showTime}
            value={value}
            dateFormatter={this.dateFormatter}
            clear={this.clear}
            handleSelect={this.handleSelect}
            chooseToday={this.chooseToday}
          />
        </div>
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
  prefixCls: 'rc-calendar',
  onKeyDown: noop,
  className: '',
  showToday: true,
  onSelect: noop,
  onFocus: noop,
  onBlur: noop,
  onClear: noop
};

module.exports = Calendar;
