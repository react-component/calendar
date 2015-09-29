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
  mixins: [CommonMixin, CalendarMixin],

  propTypes: {
    value: PropTypes.object,
    defaultValue: PropTypes.object,
    className: PropTypes.string,
    orient: PropTypes.arrayOf(PropTypes.oneOf(['left', 'top', 'right', 'bottom'])),
    locale: PropTypes.object,
    showWeekNumber: PropTypes.bool,
    style: PropTypes.object,
    showToday: PropTypes.bool,
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

  getDefaultProps() {
    return {
      showToday: true,
      onClear: noop,
      onOk: noop,
    };
  },

  getInitialState() {
    const props = this.props;
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
  },

  onKeyDown(e) {
    if (e.target.nodeName.toLowerCase() === 'input') {
      return undefined;
    }
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
    if (this.isAllowedDate(this.state.value)) {
      this.props.onOk(this.state.value);
    }
  },

  onDateInputChange(value) {
    this.onSelect(value);
  },

  render() {
    const props = this.props;
    const {locale, prefixCls, disabledDate} = props;
    const state = this.state;
    const value = state.value;
    const children = (<div style={{outline: 'none'}}>
      <div className={`${prefixCls}-input-wrap`}>
        <DateInput className={`${prefixCls}-input`}
                   formatter={this.getFormatter()}
                   value={value}
                   onChange={this.onDateInputChange}/>
        <i className={`${prefixCls}-input-icon`}/>
      </div>


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
          onSelect={this.onSelect}
          disabledDate={disabledDate}
          showWeekNumber={props.showWeekNumber}/>
      </div>
      <CalendarFooter
        locale={locale}
        showClear={props.showClear}
        showOk={props.showOk}
        prefixCls={prefixCls}
        showToday={props.showToday}
        showTime={props.showTime}
        value={value}
        disabledDate={disabledDate}
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
