import React from 'react';
import {classSet as cx} from 'rc-util';

function choose(hour, e) {
  const next = this.state.value.clone();
  const method = this.props.setter;
  next[method](hour);
  this.props.onSelect(next, method);
  e.preventDefault();
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

    for (let i = 0; i < ROW; i++) {
      data[i] = [];
      for (let j = 0; j < COL; j++) {
        data[i][j] = i * COL + j;
      }
    }

    const hoursEls = data.map((row, index)=> {
      const tds = row.map(d => {
        const classNameMap = {
          [`${prefixCls}-cell`]: 1,
          [`${prefixCls}-selected-cell`]: d === currentHour,
        };
        return (<td
          key={d}
          onClick={choose.bind(this, d)}
          role="gridcell"
          className={cx(classNameMap)}>
          <a
            className={`${prefixCls}-time`}>
            {d}
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

TimePanel.defaultProps = {
  onSelect() {
  },
};
