import React, {Component, PropTypes} from 'react';
import {classSet as cx} from 'rc-util';

const ROW = 4;
const COL = 3;

function chooseMonth(month) {
  const next = this.state.value.clone();
  next.rollSetMonth(month);
  this.setAndSelectValue(next);
}

function noop() {

}

class MonthTable extends Component {
  constructor(props) {
    super(props);

    this.prefixCls = props.rootPrefixCls + '-month-panel';

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
  getMonths() {
    const props = this.props;
    const value = this.state.value;
    const current = value.clone();
    const locale = props.locale;
    const months = [];
    const shortMonths = locale.format.shortMonths;
    let index = 0;
    for (let rowIndex = 0; rowIndex < ROW; rowIndex++) {
      months[rowIndex] = [];
      for (let colIndex = 0; colIndex < COL; colIndex++) {
        current.rollSetMonth(index);
        months[rowIndex][colIndex] = {
          value: index,
          content: shortMonths[index],
          title: shortMonths[index],
        };
        index++;
      }
    }
    return months;
  }
  setAndSelectValue(value) {
    this.setState({
      value,
    });
    this.props.onSelect(value);
  }
  render() {
    const props = this.props;
    const value = this.state.value;
    const months = this.getMonths();
    const currentMonth = value.getMonth();
    const prefixCls = this.prefixCls;
    const monthsEls = months.map((month, index)=> {
      const tds = month.map(monthData => {
        let disabled = false;
        if (props.disabledDate) {
          const testValue = value.clone();
          testValue.rollSetMonth(monthData.value);
          disabled = props.disabledDate(testValue);
        }
        const classNameMap = {
          [`${prefixCls}-cell`]: 1,
          [`${prefixCls}-cell-disabled`]: disabled,
          [`${prefixCls}-selected-cell`]: monthData.value === currentMonth,
        };
        return (
          <td role="gridcell"
              key={monthData.value}
              onClick={disabled ? null : chooseMonth.bind(this, monthData.value)}
              title={monthData.title}
              className={cx(classNameMap)}>
            <a
              className={`${prefixCls}-month`}>
              {monthData.content}
            </a>
          </td>);
      });
      return (<tr key={index} role="row">{tds}</tr>);
    });

    return (
      <div className={`${prefixCls}-body`}>
        <table className={`${prefixCls}-table`} cellSpacing="0" role="grid">
          <tbody className={`${prefixCls}-tbody`}>
          {monthsEls}
          </tbody>
        </table>
      </div>
    );
  }
}

MonthTable.defaultProps = {
  onSelect: noop,
};
MonthTable.propTypes = {
  onSelect: PropTypes.func,
  rootPrefixCls: PropTypes.string,
  value: PropTypes.object,
};
export default MonthTable;
