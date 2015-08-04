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
    const props = this.props;
    let i;
    let j;
    let current;
    const dateTable = [];
    const showWeekNumber = props.showWeekNumber;
    const value = props.value;
    const today = value.clone();
    const prefixCls = props.prefixCls;
    const cellClass = prefixCls + '-cell';
    const weekNumberCellClass = prefixCls + ('-week-number-cell');
    const dateClass = prefixCls + ('-date');
    const dateRender = props.dateRender;
    const disabledDate = props.disabledDate;
    const dateFormatter = this.props.dateFormatter;
    const todayClass = prefixCls + ('-today');
    const selectedClass = prefixCls + ('-selected-day');
    const lastMonthDayClass = prefixCls + ('-last-month-cell');
    const nextMonthDayClass = prefixCls + ('-next-month-btn-day');
    const disabledClass = prefixCls + ('-disabled-cell');
    const firstDisableClass = prefixCls + ('-disabled-cell-first-of-row');
    const lastDisableClass = prefixCls + ('-disabled-cell-last-of-row');
    today.setTime(Date.now());
    const month1 = value.clone();
    month1.set(value.getYear(), value.getMonth(), 1);
    const day = month1.getDayOfWeek();
    const lastMonthDiffDay = (day + 7 - value.getFirstDayOfWeek()) % 7;
    // calculate last month
    const lastMonth1 = month1.clone();
    lastMonth1.addDayOfMonth(0 - lastMonthDiffDay);
    let passed = 0;
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
    const tableHtml = [];
    passed = 0;
    for (i = 0; i < DateConstants.DATE_ROW_COUNT; i++) {
      let weekNumberCell;
      const dateCells = [];
      if (showWeekNumber) {
        weekNumberCell = (
          <td key={dateTable[passed].getWeekOfYear()} role="gridcell"
              className={weekNumberCellClass}>{dateTable[passed].getWeekOfYear()}</td>
        );
      }
      for (j = 0; j < DateConstants.DATE_COL_COUNT; j++) {
        let next = null;
        let last = null;
        current = dateTable[passed];
        if (j < DateConstants.DATE_COL_COUNT - 1) {
          next = dateTable[passed + 1];
        }
        if (j > 0) {
          last = dateTable[passed - 1];
        }
        let cls = cellClass;
        let disabled = false;
        let selected = false;

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

        let dateHtml;
        if (dateRender) {
          dateHtml = dateRender(current, value);
        } else {
          dateHtml = (
            <span
              key={getIdFromDate(current)}
              className={dateClass}
              aria-selected={selected}
              aria-disabled={disabled}>
              {current.getDayOfMonth()}
            </span>);
        }

        dateCells.push(
          <td key={passed} onClick={disabled ? noop : handleDayClick.bind(this, current)} role="gridcell"
              title={dateFormatter.format(current)} className={cls}>
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
    return (<tbody className={prefixCls + ('tbody')}>
    {tableHtml}
    </tbody>);
  }
}

DateTBody.propTypes = {
  dateFormatter: React.PropTypes.object,
};
