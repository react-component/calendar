import React from 'react';
import { getTodayTimeStr, getTodayTime, isAllowedDate } from '../util/';

export default function TodayButton({
  prefixCls, locale, value, timePicker,
  disabledDate, disabledTime, onToday, text,
}) {
  const today = value.clone();
  today.setTime(Date.now());
  let disabledToday = false;
  let localeNow = text;
  if (!localeNow && timePicker) {
    localeNow = locale.now;
  }
  localeNow = localeNow || locale.today;
  let disabledTodayClass = '';
  if (disabledDate) {
    disabledToday = !isAllowedDate(getTodayTime(value), disabledDate, disabledTime);
    if (disabledToday) {
      disabledTodayClass = `${prefixCls}-today-btn-disabled`;
    }
  }
  return (<a
    className={`${prefixCls}-today-btn ${disabledTodayClass}`}
    role="button"
    onClick={disabledToday ? null : onToday}
    title={getTodayTimeStr(value)}
  >
    {localeNow}
  </a>);
}
