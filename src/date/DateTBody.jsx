'use strict';

import React from 'react';
import DateConstants from './DateConstants';

function isSameDay(one, two) {
  return one.getYear() === two.getYear() &&
    one.getMonth() === two.getMonth() &&
    one.getDayOfMonth() === two.getDayOfMonth();
}

function beforeCurrentMonthYear(current, today) {
  if (current.getYear() < today.getYear()) {
    return 1;
  }
  return current.getYear() === today.getYear() &&
    current.getMonth() < today.getMonth();
}

function afterCurrentMonthYear(current, today) {
  if (current.getYear() > today.getYear()) {
    return 1;
  }
  return current.getYear() === today.getYear() &&
    current.getMonth() > today.getMonth();
}

function getIdFromDate(d) {
  return 'rc-calendar-' + d.getYear() +
    '-' + d.getMonth() + '-' +
    d.getDayOfMonth();
}

function noop() {
}

function handleDayClick(current) {
  this.props.onSelect(current);
}

export default
class DateTBody extends React.Component {
  render() {
    var props = this.props;
    var i, j, current;
    var dateTable = [];
    var showWeekNumber = props.showWeekNumber;
    var value = props.value;
    var today = value.clone();
    var prefixClsFn = props.prefixClsFn;
    var cellClass = prefixClsFn('cell');
    var weekNumberCellClass = prefixClsFn('week-number-cell');
    var dateClass = prefixClsFn('date');
    var dateRender = props.dateRender;
    var disabledDate = props.disabledDate;
    var dateFormatter = this.props.dateFormatter;
    var todayClass = prefixClsFn('today');
    var selectedClass = prefixClsFn('selected-day');
    var lastMonthDayClass = prefixClsFn('last-month-cell');
    var nextMonthDayClass = prefixClsFn('next-month-btn-day');
    var disabledClass = prefixClsFn('disabled-cell');
    var firstDisableClass = prefixClsFn('disabled-cell-first-of-row');
    var lastDisableClass = prefixClsFn('disabled-cell-last-of-row');
    today.setTime(Date.now());
    var month1 = value.clone();
    month1.set(value.getYear(), value.getMonth(), 1);
    var day = month1.getDayOfWeek();
    var lastMonthDiffDay = (day + 7 - value.getFirstDayOfWeek()) % 7;
    // calculate last month
    var lastMonth1 = month1.clone();
    lastMonth1.addDayOfMonth(0 - lastMonthDiffDay);
    var passed = 0;
    for (i = 0; i < DateConstants.DATE_ROW_COUNT; i++) {
      for (j = 0; j < DateConstants.DATE_COL_COUNT; j++) {
        current = lastMonth1;
        if (passed) {
          current = current.clone();
          current.addDayOfMonth(passed);
        }
        dateTable.push(current);
        passed++;
      }
    }
    var tableHtml = [];
    passed = 0;
    for (i = 0; i < DateConstants.DATE_ROW_COUNT; i++) {
      var weekNumberCell;
      var dateCells = [];
      if (showWeekNumber) {
        weekNumberCell = (
          <td key={dateTable[passed].getWeekOfYear()} role="gridcell" className = {weekNumberCellClass}>{dateTable[passed].getWeekOfYear()}</td>
        );
      }
      for (j = 0; j < DateConstants.DATE_COL_COUNT; j++) {
        var next = null;
        var last = null;
        current = dateTable[passed];
        if (j < DateConstants.DATE_COL_COUNT - 1) {
          next = dateTable[passed + 1];
        }
        if (j > 0) {
          last = dateTable[passed - 1];
        }
        var cls = cellClass;
        var disabled = false;
        var selected = false;

        if (isSameDay(current, today)) {
          cls += ' ' + todayClass;
        }
        if (isSameDay(current, value)) {
          cls += ' ' + selectedClass;
          selected = true;
        }
        if (beforeCurrentMonthYear(current, value)) {
          cls += ' ' + lastMonthDayClass;
        }
        if (afterCurrentMonthYear(current, value)) {
          cls += ' ' + nextMonthDayClass;
        }
        if (disabledDate) {
          if (disabledDate(current, value)) {
            cls += ' ' + disabledClass;
            disabled = true;


            if (!last || !disabledDate(last, value)) {
              cls += ' ' + firstDisableClass;
            }

            if (!next || !disabledDate(next, value)) {
              cls += ' ' + lastDisableClass;
            }
          }
        }

        var dateHtml;
        if (!(dateRender && (dateHtml = dateRender(current, value)))) {
          dateHtml = (
            <span
              key={getIdFromDate(current)}
              className = {dateClass}
              aria-selected={selected}
              aria-disabled={disabled}>
              {current.getDayOfMonth()}
            </span>);
        }

        dateCells.push(
          <td key={passed}  onClick={disabled ? noop : handleDayClick.bind(this, current)} role="gridcell"
            title={dateFormatter.format(current)} className = {cls}>
        {dateHtml}
          </td>);

        passed++;
      }
      tableHtml.push(
        <tr
          key={i}
          role="row">
          {weekNumberCell}
          {dateCells}
        </tr>);
    }
    return (<tbody className = {prefixClsFn('tbody')}>
      {tableHtml}
    </tbody>);
  }
}
