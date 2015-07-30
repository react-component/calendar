'use strict';

import React from 'react';
import DateConstants from './DateConstants';

export default
class DateTHead extends React.Component {
  render() {
    var props = this.props;
    var value = props.value;
    var locale = props.locale;
    var prefixCls = props.prefixCls;
    var veryShortWeekdays = [];
    var weekDays = [];
    var firstDayOfWeek = value.getFirstDayOfWeek();
    var showWeekNumberEl;

    for (var i = 0; i < DateConstants.DATE_COL_COUNT; i++) {
      var index = (firstDayOfWeek + i) % DateConstants.DATE_COL_COUNT;
      veryShortWeekdays[i] = locale.format.veryShortWeekdays[index];
      weekDays[i] = locale.format.weekdays[index];
    }

    if (props.showWeekNumber) {
      showWeekNumberEl = (
        <th role="columnheader" className = {`${prefixCls}-column-header ${prefixCls}-week-number-header`}>
          <span className ={`${prefixCls}-column-header-inner`}>x</span>
        </th>);
    }
    var weekDaysEls = weekDays.map((day, xindex)=> {
      return (
        <th key={xindex} role="columnheader" title={day} className ={`${prefixCls}-column-header`}>
          <span className = {`${prefixCls}-column-header-inner`}>
          {veryShortWeekdays[xindex]}
          </span>
        </th>);
    });
    return <thead>
      <tr role="row">
              {showWeekNumberEl}
              {weekDaysEls}
      </tr>
    </thead>;
  }
}
