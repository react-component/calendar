import React from 'react';
import { getTodayTimeStr, getTodayTime, isAllowedDate } from '../util/';

export default function TodayButton({prefixCls, locale, value, timePicker, disabledDate, disabledTime, onToday}) {
  let disabledToday = false;
  let localeNow = locale.today;
  if (timePicker) {
    localeNow = locale.now || locale.today;
  }
  let disabledTodayClass = '';
  if (disabledDate) {
    disabledToday = !isAllowedDate(getTodayTime(value), disabledDate, disabledTime);
    if (disabledToday) {
      disabledTodayClass = `${prefixCls}-today-btn-disabled`;
    }
  }
  return (<a className={`${prefixCls}-today-btn ${disabledTodayClass}`}
             role="button"
             onClick={disabledToday ? null : onToday}
             title={getTodayTimeStr(value)}>{localeNow}</a>);
}
