import React from 'react';
import moment, { Moment } from 'moment';
import DateConstants from './DateConstants';

export interface DateTHeadProps {
  prefixCls?: string;
  value?: Moment;
  showWeekNumber?: boolean;
}

const genKey = (day: string, index: number) => `${day}-${index}`;

const DateTHead: React.FC<DateTHeadProps> = props => {
  const { value, prefixCls } = props;
  const localeData = value.localeData();
  const veryShortWeekdays: string[] = [];
  const weekDays: string[] = [];
  const firstDayOfWeek = localeData.firstDayOfWeek();
  let showWeekNumberEl;

  const now = moment();

  // This function can be optimized and it takes a long time to understand.
  for (let dateColIndex = 0; dateColIndex < DateConstants.DATE_COL_COUNT; dateColIndex += 1) {
    const index = (firstDayOfWeek + dateColIndex) % DateConstants.DATE_COL_COUNT;
    now.day(index);
    veryShortWeekdays[dateColIndex] = localeData.weekdaysMin(now);
    weekDays[dateColIndex] = localeData.weekdaysShort(now);
  }

  if (props.showWeekNumber) {
    showWeekNumberEl = (
      <th
        role="columnheader"
        className={`${prefixCls}-column-header ${prefixCls}-week-number-header`}
      >
        <span className={`${prefixCls}-column-header-inner`}>x</span>
      </th>
    );
  }

  const weekDaysEls = weekDays.map((day: string, xIndex) => (
    <th
      key={genKey(day, xIndex)}
      role="columnheader"
      title={day}
      className={`${prefixCls}-column-header`}
    >
      <span className={`${prefixCls}-column-header-inner`}>{veryShortWeekdays[xIndex]}</span>
    </th>
  ));

  return (
    <thead>
      <tr role="row">
        {showWeekNumberEl}
        {weekDaysEls}
      </tr>
    </thead>
  );
};

export default DateTHead;
