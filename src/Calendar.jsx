import React, {PropTypes} from 'react';
import GregorianCalendar from 'gregorian-calendar';
import {KeyCode} from 'rc-util';
import DateTable from './date/DateTable';
import CalendarHeader from './calendar/CalendarHeader';
import CalendarFooter from './calendar/CalendarFooter';
import CalendarMixin from './mixin/CalendarMixin';
import CommonMixin from './mixin/CommonMixin';
import DateInput from './date/DateInput';

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
  propTypes: {
    value: PropTypes.object,
    selectedValue: PropTypes.object,
    defaultValue: PropTypes.object,
    className: PropTypes.string,
    locale: PropTypes.object,
    showWeekNumber: PropTypes.bool,
    style: PropTypes.object,
    showToday: PropTypes.bool,
    showDateInput: PropTypes.bool,
    visible: PropTypes.bool,
    showTime: PropTypes.bool,
    onSelect: PropTypes.func,
    onOk: PropTypes.func,
    prefixCls: PropTypes.string,
    onKeyDown: PropTypes.func,
    onClear: PropTypes.func,
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
  },

  mixins: [CommonMixin, CalendarMixin],

  getDefaultProps() {
    return {
      showToday: true,
      showDateInput: true,
      onClear: noop,
      onOk: noop,
    };
  },

  getInitialState() {
    // bind methods
    this.nextMonth = goMonth.bind(this, 1);
    this.previousMonth = goMonth.bind(this, -1);
    this.nextYear = goYear.bind(this, 1);
    this.previousYear = goYear.bind(this, -1);
    return {};
  },

  onKeyDown(event) {
    if (event.target.nodeName.toLowerCase() === 'input') {
      return undefined;
    }
    const keyCode = event.keyCode;
    // mac
    const ctrlKey = event.ctrlKey || event.metaKey;
    switch (keyCode) {
    case KeyCode.DOWN:
      goWeek.call(this, 1);
      event.preventDefault();
      return 1;
    case KeyCode.UP:
      goWeek.call(this, -1);
      event.preventDefault();
      return 1;
    case KeyCode.LEFT:
      if (ctrlKey) {
        this.previousYear();
      } else {
        goDay.call(this, -1);
      }
      event.preventDefault();
      return 1;
    case KeyCode.RIGHT:
      if (ctrlKey) {
        this.nextYear();
      } else {
        goDay.call(this, 1);
      }
      event.preventDefault();
      return 1;
    case KeyCode.HOME:
      goStartMonth.call(this);
      event.preventDefault();
      return 1;
    case KeyCode.END:
      goEndMonth.call(this);
      event.preventDefault();
      return 1;
    case KeyCode.PAGE_DOWN:
      this.nextMonth();
      event.preventDefault();
      return 1;
    case KeyCode.PAGE_UP:
      this.previousMonth();
      event.preventDefault();
      return 1;
    case KeyCode.ENTER:
      this.onSelect(this.state.value);
      event.preventDefault();
      return 1;
    default:
      this.props.onKeyDown(event);
      return 1;
    }
  },

  onClear() {
    this.onSelect(null);
    this.props.onClear();
  },

  onOk() {
    const {selectedValue} = this.state;
    if (this.isAllowedDate(selectedValue)) {
      this.props.onOk(selectedValue);
    }
  },

  onDateInputChange(value) {
    if (Date.now() - this.dateTableSelectTime < 50) {
      // avoid blur by click date table
      return;
    }
    this.dateTableSelectTime = 0;
    this.onSelect(value);
  },

  onDateTableSelect(value) {
    this.dateTableSelectTime = Date.now();
    this.onSelect(value);
  },

  chooseToday() {
    const today = this.state.value.clone();
    today.setTime(Date.now());
    this.onSelect(today);
  },

  render() {
    const props = this.props;
    const {locale, prefixCls, disabledDate} = props;
    const state = this.state;
    const {value, selectedValue} = state;
    const dateInputElement = props.showDateInput ? (
      <DateInput formatter={this.getFormatter()}
                 gregorianCalendarLocale={value.locale}
                 locale={locale}
                 showClear
                 onClear={this.onClear}
                 prefixCls={prefixCls}
                 value={selectedValue}
                 onChange={this.onDateInputChange}/>
    ) : null;
    const children = (<div style={{outline: 'none'}}>
      {dateInputElement}
      <CalendarHeader
        locale={locale}
        onValueChange={this.setValue}
        value={value}
        prefixCls={prefixCls}/>

      <div className={`${prefixCls}-calendar-body`}>
        <DateTable
          locale={locale}
          value={value}
          prefixCls={prefixCls}
          dateRender={props.dateRender}
          onSelect={this.onDateTableSelect}
          disabledDate={disabledDate}
          showWeekNumber={props.showWeekNumber}/>
      </div>

      <CalendarFooter
        locale={locale}
        showOk={props.showOk}
        prefixCls={prefixCls}
        showToday={props.showToday}
        showTime={props.showTime}
        value={value}
        disabledDate={disabledDate}
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
});

export default Calendar;
