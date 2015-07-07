'use strict';

import React from 'react';
import DateTimeFormat from 'gregorian-calendar-format';
import GregorianCalendar from 'gregorian-calendar';
import rcUtil, {KeyCode} from 'rc-util';
import DateTable from './date/DateTable';
import CalendarHeader from './calendar/CalendarHeader';
import CalendarFooter from './calendar/CalendarFooter';
import staticPrefixClsFn from './util/prefixClsFn';
import enUs from './locale/en-us';

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

export default
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
    this.nextMonth = goMonth.bind(this, 1);
    this.previousMonth = goMonth.bind(this, -1);
    this.nextYear = goYear.bind(this, 1);
    this.previousYear = goYear.bind(this, -1);

    ['handleBlur', 'handleFocus', 'prefixClsFn', 'chooseToday', 'handleClear', 'handleSelect', 'setValue', 'handleKeyDown', 'handleOk'].forEach((m) => {
      this[m] = this[m].bind(this);
    });
  }

  handleOk() {
    this.props.onOk(this.state.value);
  }

  setValue(current) {
    this.setState({
      value: current
    });
  }

  chooseToday() {
    var today = this.state.value.clone();
    today.setTime(Date.now());
    this.handleSelect(today);
  }

  handleSelect(current, keyDownEvent) {
    var props = this.props;
    this.setState({
      value: current
    });
    if (!keyDownEvent) {
      props.onSelect(current);
    }
  }

  handleKeyDown(e) {
    var keyCode = e.keyCode;
    // mac
    var ctrlKey = e.ctrlKey || e.metaKey;
    switch (keyCode) {
      case KeyCode.DOWN:
        goWeek.call(this, 1);
        e.preventDefault();
        return 1;
      case KeyCode.UP:
        goWeek.call(this, -1);
        e.preventDefault();
        return 1;
      case KeyCode.LEFT:
        if (ctrlKey) {
          this.previousYear();
        } else {
          goDay.call(this, -1);
        }
        e.preventDefault();
        return 1;
      case KeyCode.RIGHT:
        if (ctrlKey) {
          this.nextYear();
        } else {
          goDay.call(this, 1);
        }
        e.preventDefault();
        return 1;
      case KeyCode.HOME:
        goStartMonth.call(this);
        e.preventDefault();
        return 1;
      case KeyCode.END:
        goEndMonth.call(this);
        e.preventDefault();
        return 1;
      case KeyCode.PAGE_DOWN:
        this.nextMonth();
        e.preventDefault();
        return 1;
      case KeyCode.PAGE_UP:
        this.previousMonth();
        e.preventDefault();
        return 1;
      case KeyCode.ENTER:
        this.props.onSelect(this.state.value);
        e.preventDefault();
        return 1;
      default:
        this.props.onKeyDown(e);
        return 1;
    }
  }

  handleClear() {
    this.props.onClear();
  }

  prefixClsFn() {
    return staticPrefixClsFn.apply(this, arguments);
  }

  handleFocus() {
    if (this._blurTimer) {
      clearTimeout(this._blurTimer);
      this._blurTimer = null;
    } else {
      this.props.onFocus();
    }
  }

  handleBlur() {
    if (this._blurTimer) {
      clearTimeout(this._blurTimer);
    }
    this._blurTimer = setTimeout(()=> {
      this.props.onBlur();
    }, 100);
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
        tabIndex="0" onFocus={this.handleFocus}
        onBlur={this.handleBlur} onKeyDown={this.handleKeyDown}>
        <div style={{outline: 'none'}}>
          <CalendarHeader
            locale={locale}
            onValueChange={this.setValue}
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
          <CalendarFooter
            locale={locale}
            showClear={props.showClear}
            showOk={props.showOk}
            prefixClsFn={prefixClsFn}
            showToday={props.showToday}
            showTime={props.showTime}
            value={value}
            dateFormatter={this.dateFormatter}
            onClear={this.handleClear}
            onOk={this.handleOk}
            onSelect={this.handleSelect}
            onToday={this.chooseToday}
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
  locale: enUs,
  style: {},
  prefixCls: 'rc-calendar',
  onKeyDown: noop,
  className: '',
  showToday: true,
  onSelect: noop,
  onFocus: noop,
  onBlur: noop,
  onClear: noop,
  onOk: noop
};
