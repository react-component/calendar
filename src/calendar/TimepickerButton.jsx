import React from 'react';

export default function TimePickerButton({
  prefixCls, locale, showTimePicker,
  onOpenTimePicker, onCloseTimePicker }) {
  const className = `${prefixCls}-time-picker-btn`;
  return (<a
    className={className}
    role="button"
    onClick={showTimePicker ? onCloseTimePicker : onOpenTimePicker}
  >
    {showTimePicker ? locale.hideTimePicker : locale.showTimePicker}
  </a>);
}
