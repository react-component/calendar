import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { getTodayTime, getQuarterName } from '../util/index';

const ROW = 1;
const COL = 4;

function chooseQuarter(quarter) {
  const next = this.state.value.clone();
  next.quarter(quarter);
  this.setAndSelectValue(next);
}

function noop() {

}

class QuarterTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: props.value,
    };
  }

  componentWillReceiveProps(nextProps) {
    if ('value' in nextProps) {
      this.setState({
        value: nextProps.value,
      });
    }
  }

  setAndSelectValue(value) {
    this.setState({
      value,
    });
    this.props.onSelect(value);
  }

  quarters() {
    const value = this.state.value;
    const current = value.clone();
    const quarters = [];
    let index = 1;
    for (let rowIndex = 0; rowIndex < ROW; rowIndex++) {
      quarters[rowIndex] = [];
      for (let colIndex = 0; colIndex < COL; colIndex++) {
        current.quarters(index);
        const content = getQuarterName(current);
        quarters[rowIndex][colIndex] = {
          value: index,
          content,
          title: content,
        };
        index++;
      }
    }
    return quarters;
  }

  render() {
    const props = this.props;
    const value = this.state.value;
    const today = getTodayTime(value);
    const quarters = this.quarters();
    const currentQuarter = value.quarter();
    const { prefixCls, locale, contentRender, cellRender } = props;
    const quarterEls = quarters.map((quarter, index) => {
      const tds = quarter.map(quarterData => {
        let disabled = false;
        if (props.disabledDate) {
          const testValue = value.clone();
          testValue.quarter(quarterData.value);
          disabled = props.disabledDate(testValue);
        }
        const classNameMap = {
          [`${prefixCls}-cell`]: 1,
          [`${prefixCls}-cell-disabled`]: disabled,
          [`${prefixCls}-selected-cell`]: quarterData.value === currentQuarter,
          [`${prefixCls}-current-cell`]: today.year() === value.year() &&
          quarterData.value === today.quarter(),
        };
        let cellEl;
        if (cellRender) {
          const currentValue = value.clone();
          currentValue.quarter(quarterData.value);
          cellEl = cellRender(currentValue, locale);
        } else {
          let content;
          if (contentRender) {
            const currentValue = value.clone();
            currentValue.quarter(quarterData.value);
            content = contentRender(currentValue, locale);
          } else {
            content = quarterData.content;
          }
          cellEl = (
            <a className={`${prefixCls}-quarter`}>
              {content}
            </a>
          );
        }
        return (
          <td
            role="gridcell"
            key={quarterData.value}
            onClick={disabled ? null : chooseQuarter.bind(this, quarterData.value)}
            title={quarterData.title}
            className={classnames(classNameMap)}
          >
            {cellEl}
          </td>);
      });
      return (<tr key={index} role="row">{tds}</tr>);
    });

    return (
      <table className={`${prefixCls}-table`} cellSpacing="0" role="grid">
        <tbody className={`${prefixCls}-tbody`}>
        {quarterEls}
        </tbody>
      </table>
    );
  }
}

QuarterTable.defaultProps = {
  onSelect: noop,
};
QuarterTable.propTypes = {
  onSelect: PropTypes.func,
  cellRender: PropTypes.func,
  prefixCls: PropTypes.string,
  value: PropTypes.object,
};

export default QuarterTable;
