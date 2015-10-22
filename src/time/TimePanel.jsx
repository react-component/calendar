import React, {PropTypes} from 'react';
import {classSet as cx} from 'rc-util';

function choose(hour, event) {
  const next = this.state.value.clone();
  const method = this.props.setter;
  next[method](hour);
  this.props.onSelect(next, method);
  event.preventDefault();
}

export default
class TimePanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value,
    };
    this.prefixCls = props.rootPrefixCls + '-time-panel';
  }

  render() {
    const value = this.state.value;
    const props = this.props;
    const method = props.getter;
    const currentHour = value[method]();
    const data = [];
    const prefixCls = this.prefixCls;
    const ROW = props.rowCount;
    const COL = props.colCount;

    for (let rowIndex = 0; rowIndex < ROW; rowIndex++) {
      data[rowIndex] = [];
      for (let colIndex = 0; colIndex < COL; colIndex++) {
        data[rowIndex][colIndex] = rowIndex * COL + colIndex;
      }
    }

    const hoursEls = data.map((row, index)=> {
      const tds = row.map(hour => {
        const classNameMap = {
          [`${prefixCls}-cell`]: 1,
          [`${prefixCls}-selected-cell`]: hour === currentHour,
        };
        return (<td
          key={hour}
          onClick={choose.bind(this, hour)}
          role="gridcell"
          className={cx(classNameMap)}>
          <a
            className={`${prefixCls}-time`}>
            {hour}
          </a>
        </td>);
      });
      return (<tr key={index} role="row">{tds}</tr>);
    });

    return (
      <div className={prefixCls}>
        <div className={`${prefixCls}-header`}>
          <div className={`${prefixCls}-title`}>
            {props.title}
          </div>
        </div>
        <div className={`${prefixCls}-body`}>
          <table className={`${prefixCls}-table`} cellSpacing="0" role="grid">
            <tbody className={`${prefixCls}-tbody`}>
            {hoursEls}
            </tbody>
          </table>
        </div>
      </div>);
  }
}

TimePanel.propTypes = {
  value: PropTypes.object,
  rootPrefixCls: PropTypes.string,
};

TimePanel.defaultProps = {
  onSelect() {
  },
};
