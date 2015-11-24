import React from 'react';
import { getTodayTimeStr, getTodayTime } from '../util/';

export default function TodayButton({prefixCls, locale, value, showTime, disabledDate, onToday}) {
  let disabledToday = false;
  let localeNow = locale.today;
  if (showTime) {
    localeNow = locale.now || locale.today;
  }
  let disabledTodayClass = '';
  if (disabledDate) {
    disabledToday = disabledDate(getTodayTime(value), value);
    if (disabledToday) {
      disabledTodayClass = `${prefixCls}-today-btn-disabled`;
    }
  }
  return (<a className={`${prefixCls}-today-btn ${disabledTodayClass}`}
             role="button"
             onClick={disabledToday ? null : onToday}
             title={getTodayTimeStr(value)}>{localeNow}</a>);
}
