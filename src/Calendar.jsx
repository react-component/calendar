import React from 'react';
import DateTimeFormat from 'gregorian-calendar-format';
import GregorianCalendar from 'gregorian-calendar';
import {KeyCode} from 'rc-util';
import DateTable from './date/DateTable';
import CalendarHeader from './calendar/CalendarHeader';
import CalendarFooter from './calendar/CalendarFooter';
import CalendarMixin from './mixin/CalendarMixin';

function noop() {
}

function goStartMonth() {
  const next = this.state.value.clone();
  next.setDayOfMonth(1);
  this.setValue(next);
}

function goEndMonth() {
  const next = this.state.value.clone();
  next.setDayOfMonth(next.getActualMaximum(GregorianCalendar.MONTH));
  this.setValue(next);
}

function goMonth(direction) {
  const next = this.state.value.clone();
  next.addMonth(direction);
  this.setValue(next);
}

function goYear(direction) {
  const next = this.state.value.clone();
  next.addYear(direction);
  this.setValue(next);
}

function goWeek(direction) {
  const next = this.state.value.clone();
  next.addWeekOfYear(direction);
  this.setValue(next);
}

function goDay(direction) {
  const next = this.state.value.clone();
  next.addDayOfMonth(direction);
  this.setValue(next);
}

const Calendar = React.createClass({
  mixins: [CalendarMixin],

  propTypes: {
    value: React.PropTypes.object,
    defaultValue: React.PropTypes.object,
    className: React.PropTypes.string,
    orient: React.PropTypes.arrayOf(React.PropTypes.oneOf(['left', 'top', 'right', 'bottom'])),
    locale: React.PropTypes.object,
    showWeekNumber: React.PropTypes.bool,
    style: React.PropTypes.object,
    showToday: React.PropTypes.bool,
    visible: React.PropTypes.bool,
    showTime: React.PropTypes.bool,
    onSelect: React.PropTypes.func,
    onOk: React.PropTypes.func,
    prefixCls: React.PropTypes.string,
    onKeyDown: React.PropTypes.func,
    onClear: React.PropTypes.func,
    onChange: React.PropTypes.func,
    onFocus: React.PropTypes.func,
    onBlur: React.PropTypes.func,
  },

  getDefaultProps() {
    return {
      showToday: true,
      onClear: noop,
      onOk: noop,
    };
  },

  getInitialState() {
    const props = this.props;
    this.dateFormatter = new DateTimeFormat(props.locale.dateFormat);
    const orient = props.orient;
    // bind methods
    this.nextMonth = goMonth.bind(this, 1);
    this.previousMonth = goMonth.bind(this, -1);
    this.nextYear = goYear.bind(this, 1);
    this.previousYear = goYear.bind(this, -1);
    return {orient};
  },

  componentWillReceiveProps(nextProps) {
    if (nextProps.orient) {
      this.setState({
        orient: nextProps.orient,
      });
    }
    if (nextProps.locale !== this.props.locale) {
      this.dateFormatter = new DateTimeFormat(nextProps.locale.dateFormat);
    }
  },

  onKeyDown(e) {
    const keyCode = e.keyCode;
    // mac
    const ctrlKey = e.ctrlKey || e.metaKey;
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
      this.onSelect(this.state.value);
      e.preventDefault();
      return 1;
    default:
      this.props.onKeyDown(e);
      return 1;
    }
  },

  onClear() {
    this.props.onClear();
  },

  onOk() {
    this.props.onOk(this.state.value);
  },

  render() {
    const props = this.props;
    const locale = props.locale;
    const state = this.state;
    const value = state.value;
    const prefixCls = props.prefixCls;
    const children = (<div style={{outline: 'none'}}>
      <CalendarHeader
        locale={locale}
        onValueChange={this.setValue}
        previousYear={this.previousYear}
        previousMonth={this.previousMonth}
        nextMonth={this.nextMonth}
        nextYear={this.nextYear}
        value={value}
        prefixCls={prefixCls}/>

      <div className={`${prefixCls}-calendar-body`}>
        <DateTable
          locale={locale}
          value={value}
          prefixCls={prefixCls}
          dateRender={props.dateRender}
          onSelect={this.onSelect}
          disabledDate={props.disabledDate}
          showWeekNumber={props.showWeekNumber}
          dateFormatter={this.dateFormatter}/>
      </div>
      <CalendarFooter
        locale={locale}
        showClear={props.showClear}
        showOk={props.showOk}
        prefixCls={prefixCls}
        showToday={props.showToday}
        showTime={props.showTime}
        value={value}
        disabledDate={props.disabledDate}
        dateFormatter={this.dateFormatter}
        onClear={this.onClear}
        onOk={this.onOk}
        onSelect={this.onSelect}
        onToday={this.chooseToday}
        />
    </div>);

    return this.renderRoot({
      children,
      className: props.showWeekNumber ? `${prefixCls}-week-number` : '',
    });
  },

  chooseToday() {
    const today = this.state.value.clone();
    today.setTime(Date.now());
    this.onSelect(today);
  },
});

export default Calendar;
