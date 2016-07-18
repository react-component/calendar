import React from 'react';
import classnames from 'classnames';

export default function TimePickerButton({
  prefixCls, locale, showTimePicker,
  onOpenTimePicker, onCloseTimePicker, timePickerDisabled }) {
  const className = classnames({
    [`${prefixCls}-time-picker-btn`]: true,
    [`${prefixCls}-time-picker-btn-disabled`]: timePickerDisabled,
  });
  let onClick = null;
  if (!timePickerDisabled) {
    onClick = showTimePicker ? onCloseTimePicker : onOpenTimePicker;
  }
  return (<a
    className={className}
    role="button"
    onClick={onClick}
  >
    {showTimePicker ? locale.dateSelect : locale.timeSelect}
  </a>);
}
