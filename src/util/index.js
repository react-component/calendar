import React from 'react';

function getTodayTime(value) {
  const today = value.clone();
  today.setTime(Date.now());
  return today;
}

function getTitleString(value) {
  return value.getYear() + '-' + (value.getMonth() + 1) + '-' + value.getDayOfMonth();
}

function getTodayTimeStr(value) {
  const today = getTodayTime(value);
  return getTitleString(today);
}

export default {
  compareByDay(v1, v2) {
    if (v1.getYear() > v2.getYear()) {
      return 1;
    }
    if (v1.getYear() < v2.getYear()) {
      return -1;
    }
    if (v1.getMonth() > v2.getMonth()) {
      return 1;
    }
    if (v1.getMonth() < v2.getMonth()) {
      return -1;
    }

    if (v1.getDayOfMonth() > v2.getDayOfMonth()) {
      return 1;
    }
    if (v1.getDayOfMonth() < v2.getDayOfMonth()) {
      return -1;
    }

    return 0;
  },

  getTitleString(value) {
    return getTitleString(value);
  },

  getTodayTime(value) {
    return getTodayTime(value);
  },

  getTodayElement(props) {
    const {prefixCls, locale, value} = props;
    let disabledToday = false;
    let localeNow = locale.today;
    if (props.showTime) {
      localeNow = locale.now || locale.today;
    }
    let disabledTodayClass = '';
    if (props.disabledDate) {
      disabledToday = props.disabledDate(getTodayTime(value), value);
      if (disabledToday) {
        disabledTodayClass = `${prefixCls}-today-btn-disabled`;
      }
    }
    return (<a className={`${prefixCls}-today-btn ${disabledTodayClass}`}
               role="button"
               onClick={disabledToday ? null : props.onToday}
               title={getTodayTimeStr(props.value)}>{localeNow}</a>);
  },

  getOkElement(props) {
    const {prefixCls, locale} = props;
    let className = `${prefixCls}-ok-btn`;
    if (props.okDisabled) {
      className += ` ${prefixCls}-ok-btn-disabled`;
    }
    return (<a className={className}
               role="button"
               onClick={props.okDisabled ? null : props.onOk}>{locale.ok}</a>);
  },

  syncTime(from, to) {
    to.setHourOfDay(from.getHourOfDay());
    to.setMinutes(from.getMinutes());
    to.setSeconds(from.getSeconds());
  },
};
