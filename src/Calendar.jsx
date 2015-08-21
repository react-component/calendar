import React from 'react';
import DateTimeFormat from 'gregorian-calendar-format';
import GregorianCalendar from 'gregorian-calendar';
import rcUtil, {KeyCode} from 'rc-util';
import DateTable from './date/DateTable';
import CalendarHeader from './calendar/CalendarHeader';
import CalendarFooter from './calendar/CalendarFooter';
import enUs from './locale/en-us';

function noop() {
}

function goStartMonth() {
  const next = this.state.value.clone();
  next.setDayOfMonth(1);
  this.setState({value: next});
}

function goEndMonth() {
  const next = this.state.value.clone();
  next.setDayOfMonth(next.getActualMaximum(GregorianCalendar.MONTH));
  this.setState({value: next});
}

function goMonth(direction) {
  const next = this.state.value.clone();
  next.addMonth(direction);
  this.setState({value: next});
}

function goYear(direction) {
  const next = this.state.value.clone();
  next.addYear(direction);
  this.setState({value: next});
}

function goWeek(direction) {
  const next = this.state.value.clone();
  next.addWeekOfYear(direction);
  this.setState({value: next});
}

function goDay(direction) {
  const next = this.state.value.clone();
  next.addDayOfMonth(direction);
  this.setState({value: next});
}

function getNow() {
  const value = new GregorianCalendar();
  value.setTime(Date.now());
  return value;
}

function getNowByCurrentStateValue(value) {
  let ret;
  if (value) {
    ret = value.clone();
    ret.setTime(Date.now());
  } else {
    ret = getNow();
  }
  return ret;
}

const Calendar = React.createClass({
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
    onFocus: React.PropTypes.func,
    onBlur: React.PropTypes.func,
  },

  getDefaultProps() {
    return {
      locale: enUs,
      style: {},
      visible: true,
      prefixCls: 'rc-calendar',
      onKeyDown: noop,
      className: '',
      showToday: true,
      onSelect: noop,
      onFocus: noop,
      onBlur: noop,
      onClear: noop,
      onOk: noop,
    };
  },

  getInitialState() {
    const props = this.props;
    const value = props.value || props.defaultValue || getNow();
    this.dateFormatter = new DateTimeFormat(props.locale.dateFormat);
    const orient = props.orient;
    // bind methods
    this.nextMonth = goMonth.bind(this, 1);
    this.previousMonth = goMonth.bind(this, -1);
    this.nextYear = goYear.bind(this, 1);
    this.previousYear = goYear.bind(this, -1);
    return {orient, value};
  },

  componentWillReceiveProps(nextProps) {
    let value = nextProps.value;
    if (value !== undefined) {
      value = value || nextProps.defaultValue || getNowByCurrentStateValue(this.state.value);
      this.setState({
        value,
      });
    }
    if (nextProps.orient) {
      this.setState({
        orient: nextProps.orient,
      });
    }
    if (nextProps.locale !== this.props.locale) {
      this.dateFormatter = new DateTimeFormat(nextProps.locale.dateFormat);
    }
  },

  shouldComponentUpdate() {
    return rcUtil.PureRenderMixin.shouldComponentUpdate.apply(this, arguments);
  },

  onSelect(value, keyDownEvent) {
    const props = this.props;
    this.setState({
      value,
    });
    if (!keyDownEvent) {
      props.onSelect(value);
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
      this.props.onSelect(this.state.value);
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

  onFocus() {
    if (this._blurTimer) {
      clearTimeout(this._blurTimer);
      this._blurTimer = null;
    } else {
      this.props.onFocus();
    }
  },

  onBlur() {
    if (this._blurTimer) {
      clearTimeout(this._blurTimer);
    }
    this._blurTimer = setTimeout(()=> {
      this.props.onBlur();
    }, 100);
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

    const className = {
      [prefixCls]: 1,
      [`${prefixCls}-week-number`]: props.showWeekNumber,
      [`${prefixCls}-hidden`]: !props.visible,
      [props.className]: !!props.className,
    };

    const orient = state.orient;
    if (orient) {
      orient.forEach(o => {
        className [`${prefixCls}-orient-${o}`] = 1;
      });
    }

    return (
      <div className={rcUtil.classSet(className)} style={this.props.style}
           tabIndex="0" onFocus={this.onFocus}
           onBlur={this.onBlur} onKeyDown={this.onKeyDown}>
        <div style={{outline: 'none'}}>
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
            dateFormatter={this.dateFormatter}
            onClear={this.onClear}
            onOk={this.onOk}
            onSelect={this.onSelect}
            onToday={this.chooseToday}
            />
        </div>
      </div>);
  },

  chooseToday() {
    const today = this.state.value.clone();
    today.setTime(Date.now());
    this.onSelect(today);
  },

  setValue(value) {
    this.setState({
      value,
    });
  },

  setOrient(orient) {
    // FIXME: hack to prevent breaking rc-animate
    if (this.state.orient === orient) {
      return;
    }
    this.state.orient = orient;
    const prefixCls = this.props.prefixCls;
    const root = React.findDOMNode(this);
    let className = root.className.replace(new RegExp(`${prefixCls}-orient-\\w+`, 'g'), '');
    if (orient) {
      orient.forEach(o => {
        className += ` ${prefixCls}-orient-${o}`;
      });
    }
    root.className = className;
  },
});

export default Calendar;
