import React from 'react';
import DateTimeFormat from 'gregorian-calendar-format';

export function getTodayTime(value) {
  const today = value.clone();
  today.setTime(Date.now());
  return today;
}

export function getTitleString(value) {
  return value.getYear() + '-' + (value.getMonth() + 1) + '-' + value.getDayOfMonth();
}

function getTodayTimeStr(value) {
  const today = getTodayTime(value);
  return getTitleString(today);
}

export function compareByDay(v1, v2) {
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
}

export function getFormatter(format, locale) {
  if (typeof format === 'string') {
    return new DateTimeFormat(format, locale.format);
  }
  return format;
}

export function getTodayElement(componentProps) {
  const {prefixCls, locale, value} = componentProps;
  let disabledToday = false;
  let localeNow = locale.today;
  if (componentProps.showTime) {
    localeNow = locale.now || locale.today;
  }
  let disabledTodayClass = '';
  if (componentProps.disabledDate) {
    disabledToday = componentProps.disabledDate(getTodayTime(value), value);
    if (disabledToday) {
      disabledTodayClass = `${prefixCls}-today-btn-disabled`;
    }
  }
  return (<a className={`${prefixCls}-today-btn ${disabledTodayClass}`}
             role="button"
             onClick={disabledToday ? null : componentProps.onToday}
             title={getTodayTimeStr(componentProps.value)}>{localeNow}</a>);
}

export function getOkElement(componentProps) {
  const {prefixCls, locale} = componentProps;
  let className = `${prefixCls}-ok-btn`;
  if (componentProps.okDisabled) {
    className += ` ${prefixCls}-ok-btn-disabled`;
  }
  return (<a className={className}
             role="button"
             onClick={componentProps.okDisabled ? null : componentProps.onOk}>{locale.ok}</a>);
}

export function syncTime(from, to) {
  to.setHourOfDay(from.getHourOfDay());
  to.setMinutes(from.getMinutes());
  to.setSeconds(from.getSeconds());
}
