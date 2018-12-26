import React from 'react';
import { getTodayTimeStr, getTodayTime, isAllowedDate } from '../util/';

export default function TodayButton({
  prefixCls,
  locale,
  value,
  currentDate,
  timePicker,
  disabled,
  disabledDate,
  onToday,
  text,
}) {
  const localeNow = (!text && timePicker ? locale.now : text) || locale.today;
  const disabledToday =
          disabledDate && !isAllowedDate(getTodayTime(value, currentDate), disabledDate);
  const isDisabled = disabledToday || disabled;
  const disabledTodayClass = isDisabled ?
          `${prefixCls}-today-btn-disabled` : '';
  return (
    <a
      className={`${prefixCls}-today-btn ${disabledTodayClass}`}
      role="button"
      onClick={isDisabled ? null : onToday}
      title={getTodayTimeStr(value, currentDate)}
    >
      {localeNow}
    </a>
  );
}
