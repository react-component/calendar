import React from 'react';
import DateConstants from './DateConstants';
import moment from 'moment';

export default
class DateTHead extends React.Component {
  render() {
    const props = this.props;
    const {
      displayedValue,
    } = props;
    const localeData = displayedValue.localeData();
    const prefixCls = props.prefixCls;
    const veryShortWeekdays = [];
    const weekDays = [];
    const dateObjects = [];
    const firstDayOfWeek = localeData.firstDayOfWeek();
    let showWeekNumberEl;
    const now = moment();
    for (let dateColIndex = 0; dateColIndex < DateConstants.DATE_COL_COUNT; dateColIndex++) {
      const index = (firstDayOfWeek + dateColIndex) % DateConstants.DATE_COL_COUNT;
      now.day(index);
      veryShortWeekdays[dateColIndex] = localeData.weekdaysMin(now);
      weekDays[dateColIndex] = localeData.weekdaysShort(now);
      dateObjects[dateColIndex] = now.clone();
    }

    if (props.showWeekNumber) {
      showWeekNumberEl = (
        <th
          role="columnheader"
          className={`${prefixCls}-column-header ${prefixCls}-week-number-header`}
        >
          <span className={`${prefixCls}-column-header-inner`}>x</span>
        </th>);
    }
    const weekDaysEls = weekDays.map((day, xindex) => {
      return (
        <th
          key={xindex}
          role="columnheader"
          title={day}
          className={`${prefixCls}-column-header`}
        >
          {props.onWeekDaysSelect ? (
            <a
              className={`${prefixCls}-column-header-inner`}
              onClick={() => {
                props.onWeekDaysSelect({
                  month: displayedValue,
                  weekday: (firstDayOfWeek + xindex) % DateConstants.DATE_COL_COUNT,
                });
              }}
              onMouseEnter={() => {
                props.onWeekDaysMouseEnter({
                  month: displayedValue,
                  weekday: (firstDayOfWeek + xindex) % DateConstants.DATE_COL_COUNT,
                });
              }}
              onMouseLeave={props.onWeekDaysMouseLeave}
            >
              {veryShortWeekdays[xindex]}
            </a>
          ) : (
            <span className={`${prefixCls}-column-header-inner`}>
              {veryShortWeekdays[xindex]}
            </span>
          )}
        </th>);
    });
    return (<thead>
    <tr role="row">
      {showWeekNumberEl}
      {weekDaysEls}
    </tr>
    </thead>);
  }
}
