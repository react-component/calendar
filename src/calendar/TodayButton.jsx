import React from 'react';
import { getTodayTimeStr, getTodayTime, isAllowedDate } from '../util/';

export default function TodayButton({
  prefixCls, locale, value, timePicker, disabled,
  disabledDate, disabledTime, onToday, text,
}) {
  let disabledToday = false;
  let localeNow = text;
  if (!localeNow && timePicker) {
    localeNow = locale.now;
  }
  localeNow = localeNow || locale.today;
  let disabledTodayClass = '';
  if (disabledDate) {
    disabledToday = !isAllowedDate(getTodayTime(value), disabledDate, disabledTime);
    if (disabledToday || disabled) {
      disabledTodayClass = `${prefixCls}-today-btn-disabled`;
    }
  }
  return (<a
    className={`${prefixCls}-today-btn ${disabledTodayClass}`}
    role="button"
    onClick={disabledToday || disabled ? null : onToday}
    title={getTodayTimeStr(value)}
  >
    {localeNow}
  </a>);
}
