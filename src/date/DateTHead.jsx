import React from 'react';
import DateConstants from './DateConstants';

export default
class DateTHead extends React.Component {
  render() {
    const props = this.props;
    const value = props.value;
    const locale = props.locale;
    const localeData = value.localeData();
    const prefixCls = props.prefixCls;
    const veryShortWeekdays = [];
    const weekDays = [];
    const firstDayOfWeek = value.getFirstDayOfWeek();
    let showWeekNumberEl;

    for (let dateColIndex = 0; dateColIndex < DateConstants.DATE_COL_COUNT; dateColIndex++) {
      const index = (firstDayOfWeek + dateColIndex) % DateConstants.DATE_COL_COUNT;
      veryShortWeekdays[dateColIndex] = localeData.weekdaysMin[index];
      weekDays[dateColIndex] = localeData.weekdaysShort[index];
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
          <span className={`${prefixCls}-column-header-inner`}>
          {veryShortWeekdays[xindex]}
          </span>
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
