import React from 'react';
import DateConstants from './DateConstants';
import { getTitleString } from '../util/';

function isSameDay(one, two) {
  return one && two && one.compareToDay(two) === 0;
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

function getIdFromDate(date) {
  return `rc-calendar-${date.getYear()}-${date.getMonth()}-${date.getDayOfMonth()}`;
}

function noop() {
}

function handleDayClick(current) {
  this.props.onSelect(current);
}

function handleCellMouseEnter(current) {
  this.props.onDayHover(current);
}

const DateTBody = React.createClass({
  getDefaultProps() {
    return {
      onDayHover: noop,
    };
  },

  render() {
    const props = this.props;
    let iIndex;
    let jIndex;
    let current;
    const dateTable = [];
    const showWeekNumber = props.showWeekNumber;
    const value = props.value;
    const selectedValue = props.selectedValue;
    const today = value.clone();
    const prefixCls = props.prefixCls;
    const cellClass = `${prefixCls}-cell`;
    const weekNumberCellClass = `${prefixCls}-week-number-cell`;
    const dateClass = `${prefixCls}-date`;
    const dateRender = props.dateRender;
    const disabledDate = props.disabledDate;
    const todayClass = `${prefixCls}-today`;
    const selectedClass = `${prefixCls}-selected-day`;
    const inRangeClass = `${prefixCls}-in-range-cell`;
    const lastMonthDayClass = `${prefixCls}-last-month-cell`;
    const nextMonthDayClass = `${prefixCls}-next-month-btn-day`;
    const disabledClass = `${prefixCls}-disabled-cell`;
    const firstDisableClass = `${prefixCls}-disabled-cell-first-of-row`;
    const lastDisableClass = `${prefixCls}-disabled-cell-last-of-row`;
    today.setTime(Date.now());
    const month1 = value.clone();
    month1.set(value.getYear(), value.getMonth(), 1);
    const day = month1.getDayOfWeek();
    const lastMonthDiffDay = (day + 7 - value.getFirstDayOfWeek()) % 7;
    // calculate last month
    const lastMonth1 = month1.clone();
    lastMonth1.addDayOfMonth(0 - lastMonthDiffDay);
    let passed = 0;
    for (iIndex = 0; iIndex < DateConstants.DATE_ROW_COUNT; iIndex++) {
      for (jIndex = 0; jIndex < DateConstants.DATE_COL_COUNT; jIndex++) {
        current = lastMonth1;
        if (passed) {
          current = current.clone();
          current.addDayOfMonth(passed);
        }
        dateTable.push(current);
        passed++;
      }
    }
    const tableHtml = [];
    passed = 0;
    for (iIndex = 0; iIndex < DateConstants.DATE_ROW_COUNT; iIndex++) {
      let weekNumberCell;
      const dateCells = [];
      if (showWeekNumber) {
        weekNumberCell = (
          <td
            key={dateTable[passed].getWeekOfYear()}
            role="gridcell"
            className={weekNumberCellClass}
          >
            {dateTable[passed].getWeekOfYear()}
          </td>
        );
      }
      for (jIndex = 0; jIndex < DateConstants.DATE_COL_COUNT; jIndex++) {
        let next = null;
        let last = null;
        current = dateTable[passed];
        if (jIndex < DateConstants.DATE_COL_COUNT - 1) {
          next = dateTable[passed + 1];
        }
        if (jIndex > 0) {
          last = dateTable[passed - 1];
        }
        let cls = cellClass;
        let disabled = false;
        let selected = false;

        if (isSameDay(current, today)) {
          cls += ` ${todayClass}`;
        }

        const isBeforeCurrentMonthYear = beforeCurrentMonthYear(current, value);
        const isAfterCurrentMonthYear = afterCurrentMonthYear(current, value);

        if (selectedValue && Array.isArray(selectedValue)) {
          if (!isBeforeCurrentMonthYear && !isAfterCurrentMonthYear) {
            const startValue = selectedValue[0];
            const endValue = selectedValue[1];
            if (startValue) {
              if (isSameDay(current, startValue)) {
                selected = true;
              }
            }
            if (startValue && endValue) {
              if (isSameDay(current, endValue) && !selectedValue.hovering) {
                selected = true;
              } else if (current.compareToDay(startValue) > 0 &&
                current.compareToDay(endValue) < 0) {
                cls += ` ${inRangeClass}`;
              }
            }
          }
        } else if (isSameDay(current, selectedValue)) {
          selected = true;
        }
        if (isBeforeCurrentMonthYear) {
          cls += ` ${lastMonthDayClass}`;
        }
        if (isAfterCurrentMonthYear) {
          cls += ` ${nextMonthDayClass}`;
        }

        if (disabledDate) {
          if (disabledDate(current, value)) {
            disabled = true;

            if (!last || !disabledDate(last, value)) {
              cls += ` ${firstDisableClass}`;
            }

            if (!next || !disabledDate(next, value)) {
              cls += ` ${lastDisableClass}`;
            }
          }
        }

        if (selected) {
          cls += ` ${selectedClass}`;
        }

        if (disabled) {
          cls += ` ${disabledClass}`;
        }

        let dateHtml;
        if (dateRender) {
          dateHtml = dateRender(current, value);
        } else {
          let dateContent;
          if(props.contentRender) {
            dateContent = props.contentRender(current,value);
          }         
          dateHtml = (
            <span
              key={getIdFromDate(current)}
              className={dateClass}
              aria-selected={selected}
              aria-disabled={disabled}
            >
              {current.getDayOfMonth()}
              {dateContent}
            </span>);
        }

        dateCells.push(
          <td
            key={passed}
            onClick={disabled ? noop : handleDayClick.bind(this, current)}
            onMouseEnter={disabled ? noop : handleCellMouseEnter.bind(this, current)}
            role="gridcell"
            title={getTitleString(current)} className={cls}
          >
            {dateHtml}
          </td>);

        passed++;
      }
      tableHtml.push(
        <tr
          key={iIndex}
          role="row"
        >
          {weekNumberCell}
          {dateCells}
        </tr>);
    }
    return (<tbody className={`${prefixCls}tbody`}>
    {tableHtml}
    </tbody>);
  },
});

export default DateTBody;
