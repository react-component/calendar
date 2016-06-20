import React, { PropTypes } from 'react';
import GregorianCalendar from 'gregorian-calendar';
import KeyCode from 'rc-util/lib/KeyCode';
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
    disabledDate: PropTypes.func,
    disabledTime: PropTypes.any,
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
    onSelect: PropTypes.func,
    onOk: PropTypes.func,
    showOk: PropTypes.bool,
    prefixCls: PropTypes.string,
    onKeyDown: PropTypes.func,
    timePicker: PropTypes.element,
    dateInputPlaceholder: PropTypes.any,
    onClear: PropTypes.func,
    onChange: PropTypes.func,
  },

  mixins: [CommonMixin, CalendarMixin],

  getDefaultProps() {
    return {
      showToday: true,
      showDateInput: true,
      timePicker: null,
      onOk: noop,
    };
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
          goYear.call(this, -1);
        } else {
          goDay.call(this, -1);
        }
        event.preventDefault();
        return 1;
      case KeyCode.RIGHT:
        if (ctrlKey) {
          goYear.call(this, 1);
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
        goMonth.call(this, 1);
        event.preventDefault();
        return 1;
      case KeyCode.PAGE_UP:
        goMonth.call(this, -1);
        event.preventDefault();
        return 1;
      case KeyCode.ENTER:
        this.onSelect(this.state.value, {
          source: 'keyboard',
        });
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
    const { selectedValue } = this.state;
    if (this.isAllowedDate(selectedValue)) {
      this.props.onOk(selectedValue);
    }
  },

  onDateInputChange(value) {
    this.onSelect(value, {
      source: 'dateInput',
    });
  },

  onDateTableSelect(value) {
    this.onSelect(value);
  },

  chooseToday() {
    const today = this.state.value.clone();
    today.setTime(Date.now());
    this.onSelect(today, {
      source: 'todayButton',
    });
  },

  focus() {
    if (this.refs.root) {
      this.refs.root.focus();
    }
  },

  render() {
    const props = this.props;
    const {
      locale, prefixCls, disabledDate,
      dateInputPlaceholder, timePicker,
      disabledTime,
    } = props;
    const state = this.state;
    const { value, selectedValue } = state;
    const dateInputElement = props.showDateInput ? (
      <DateInput
        ref="dateInput"
        formatter={this.getFormatter()}
        key="date-input"
        timePicker={timePicker}
        gregorianCalendarLocale={value.locale}
        locale={locale}
        placeholder={dateInputPlaceholder}
        showClear
        disabledTime={disabledTime}
        disabledDate={disabledDate}
        onClear={this.onClear}
        prefixCls={prefixCls}
        selectedValue={selectedValue}
        onChange={this.onDateInputChange}
      />
    ) : null;
    const children = [
      dateInputElement,
      (<div
        key="date-panel"
        className={`${prefixCls}-date-panel`}
      >
        <CalendarHeader
          locale={locale}
          onValueChange={this.setValue}
          value={value}
          prefixCls={prefixCls}
        />

        <div className={`${prefixCls}-calendar-body`}>
          <DateTable
            locale={locale}
            value={value}
            selectedValue={selectedValue}
            prefixCls={prefixCls}
            dateRender={props.dateRender}
            onSelect={this.onDateTableSelect}
            disabledDate={disabledDate}
            showWeekNumber={props.showWeekNumber}
          />
        </div>

        <CalendarFooter
          showOk={props.showOk}
          locale={locale}
          prefixCls={prefixCls}
          showToday={props.showToday}
          disabledTime={disabledTime}
          gregorianCalendarLocale={value.locale}
          showDateInput={props.showDateInput}
          timePicker={timePicker}
          selectedValue={selectedValue}
          value={value}
          disabledDate={disabledDate}
          onOk={this.onOk}
          onSelect={this.onSelect}
          onToday={this.chooseToday}
        />
      </div>),
    ];

    return this.renderRoot({
      children,
      className: props.showWeekNumber ? `${prefixCls}-week-number` : '',
    });
  },
});

export default Calendar;
