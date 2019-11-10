import React from 'react';
import { Moment } from 'moment';

import { getTodayTimeStr, getTodayTime, isAllowedDate } from '../util';

export interface TodayButtonProps {
  prefixCls?: string;
  locale?: { [key: string]: any };
  value?: Moment;
  timePicker?: JSX.Element;
  disabled?: boolean;
  disabledDate?: (value: Moment) => boolean;
  onToday?: React.MouseEventHandler<HTMLAnchorElement>;
  text?: React.ReactNode;
}

const TodayButton: React.FC<TodayButtonProps> = ({
  prefixCls,
  locale,
  value,
  timePicker,
  disabled,
  disabledDate,
  onToday,
  text,
}) => {
  const localeNow = (!text && timePicker ? locale.now : text) || locale.today;
  const disabledToday = disabledDate && !isAllowedDate(getTodayTime(value), disabledDate);
  const isDisabled = disabledToday || disabled;
  const disabledTodayClass = isDisabled ? `${prefixCls}-today-btn-disabled` : '';
  return (
    <a
      className={`${prefixCls}-today-btn ${disabledTodayClass}`}
      role="button"
      onClick={isDisabled ? null : onToday}
      title={getTodayTimeStr(value)}
    >
      {localeNow}
    </a>
  );
};

export default TodayButton;
