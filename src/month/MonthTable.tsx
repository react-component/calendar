import React, { Component, ReactNode } from 'react';
import { Moment } from 'moment';

import classnames from 'classnames';
import { getTodayTime, getMonthName } from '../util/index';

const ROW = 4;
const COL = 3;

function chooseMonth(month) {
  const next = this.state.value.clone();
  next.month(month);
  this.setAndSelectValue(next);
}

interface MonthTableProps {
  value?: Moment;
  onSelect?: (value: Moment) => void;
  prefixCls?: string;
  locale?: { [key: string]: any };
  contentRender?: (value: Moment, locale: { [key: string]: any }) => ReactNode;
  cellRender?: (value: Moment, locale: { [key: string]: any }) => ReactNode;
  disabledDate?: (value: Moment) => boolean;
}
interface MonthTableState {
  value: Moment;
}

class MonthTable extends Component<MonthTableProps, MonthTableState> {
  constructor(props) {
    super(props);

    this.state = {
      value: props.value,
    };
  }

  static getDerivedStateFromProps(nextProps) {
    if ('value' in nextProps) {
      return {
        value: nextProps.value,
      };
    }
    return null;
  }

  setAndSelectValue(value) {
    this.setState({
      value,
    });
    const { onSelect } = this.props;
    if (onSelect) {
      onSelect(value);
    }
  }

  months() {
    const { value } = this.state;
    const current = value.clone();
    const months = [];
    let index = 0;
    for (let rowIndex = 0; rowIndex < ROW; rowIndex += 1) {
      months[rowIndex] = [];
      for (let colIndex = 0; colIndex < COL; colIndex += 1) {
        current.month(index);
        const content = getMonthName(current);
        months[rowIndex][colIndex] = {
          value: index,
          content,
          title: content,
        };
        index += 1;
      }
    }
    return months;
  }

  render() {
    const { props } = this;
    const { value } = this.state;
    const today = getTodayTime(value);
    const months = this.months();
    const currentMonth = value.month();
    const { prefixCls, locale, contentRender, cellRender } = props;
    const monthsEls = months.map((month, index) => {
      const tds = month.map(monthData => {
        let disabled = false;
        if (props.disabledDate) {
          const testValue = value.clone();
          testValue.month(monthData.value);
          disabled = props.disabledDate(testValue);
        }
        const classNameMap = {
          [`${prefixCls}-cell`]: 1,
          [`${prefixCls}-cell-disabled`]: disabled,
          [`${prefixCls}-selected-cell`]: monthData.value === currentMonth,
          [`${prefixCls}-current-cell`]:
            today.year() === value.year() && monthData.value === today.month(),
        };
        let cellEl;
        if (cellRender) {
          const currentValue = value.clone();
          currentValue.month(monthData.value);
          cellEl = cellRender(currentValue, locale);
        } else {
          let content;
          if (contentRender) {
            const currentValue = value.clone();
            currentValue.month(monthData.value);
            content = contentRender(currentValue, locale);
          } else {
            // eslint-disable-next-line prefer-destructuring
            content = monthData.content;
          }
          cellEl = <a className={`${prefixCls}-month`}>{content}</a>;
        }
        return (
          <td
            role="gridcell"
            key={monthData.value}
            onClick={disabled ? null : chooseMonth.bind(this, monthData.value)}
            title={monthData.title}
            className={classnames(classNameMap)}
          >
            {cellEl}
          </td>
        );
      });
      return (
        <tr key={index} role="row">
          {tds}
        </tr>
      );
    });

    return (
      <table className={`${prefixCls}-table`} cellSpacing="0" role="grid">
        <tbody className={`${prefixCls}-tbody`}>{monthsEls}</tbody>
      </table>
    );
  }
}

export default MonthTable;
