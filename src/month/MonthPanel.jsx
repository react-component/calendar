import React from 'react';
import {classSet as cx} from 'rc-util';
import YearPanel from '../year/YearPanel';
const ROW = 4;
const COL = 3;

function goYear(direction) {
  const next = this.state.value.clone();
  next.addYear(direction);
  this.setState({
    value: next,
  });
}

function showYearPanel() {
  this.setState({
    showYearPanel: 1,
  });
}

function chooseMonth(month) {
  const next = this.state.value.clone();
  next.setMonth(month);
  this.props.onSelect(next);
}

function onYearPanelSelect(current) {
  this.setState({
    value: current,
    showYearPanel: 0,
  });
}

export default
class MonthPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value,
    };
    // bind methods
    this.nextYear = goYear.bind(this, 1);
    this.previousYear = goYear.bind(this, -1);
    this.showYearPanel = showYearPanel.bind(this);
    this.onYearPanelSelect = onYearPanelSelect.bind(this);
    this.prefixCls = props.rootPrefixCls + '-month-panel';
  }

  getMonths() {
    const props = this.props;
    const value = this.state.value;
    const current = value.clone();
    const locale = props.locale;
    const months = [];
    const shortMonths = locale.format.shortMonths;
    let index = 0;
    for (let i = 0; i < ROW; i++) {
      months[i] = [];
      for (let j = 0; j < COL; j++) {
        current.setMonth(index);
        months[i][j] = {
          value: index,
          content: shortMonths[index],
          title: shortMonths[index],
        };
        index++;
      }
    }

    return months;
  }

  render() {
    const props = this.props;
    const value = this.state.value;
    const locale = props.locale;
    const months = this.getMonths();
    const year = value.getYear();
    const currentMonth = value.getMonth();
    const prefixCls = this.prefixCls;
    const monthsEls = months.map((month, index)=> {
      const tds = month.map(m => {
        const classNameMap = {
          [`${prefixCls}-cell`]: 1,
          [`${prefixCls}-selected-cell`]: m.value === currentMonth,
        };
        return (
          <td role="gridcell"
              key={m.value}
              onClick={chooseMonth.bind(this, m.value)}
              title={m.title}
              className={cx(classNameMap)}>
            <a
              className={`${prefixCls}-month`}>
              {m.content}
            </a>
          </td>);
      });
      return (<tr key={index} role="row">{tds}</tr>);
    });

    let yearPanel;
    if (this.state.showYearPanel) {
      yearPanel = (<YearPanel locale={locale} value={value} rootPrefixCls={props.rootPrefixCls}
                             onSelect={this.onYearPanelSelect}/>);
    }

    return (
      <div className={this.prefixCls}>
        <div>
          <div className={`${prefixCls}-header`}>
            <a className={`${prefixCls}-prev-year-btn`}
               role="button"
               onClick={this.previousYear}
               title={locale.previousYear}>
              «
            </a>

            <a className={`${prefixCls}-year-select`}
               role="button"
               onClick={this.showYearPanel}
               title={locale.yearSelect}>
              <span className={`${prefixCls}-year-select-content`}>{year}</span>
              <span className={`${prefixCls}-year-select-arrow`}>x</span>
            </a>

            <a className={`${prefixCls}-next-year-btn`}
               role="button"
               onClick={this.nextYear}
               title={locale.nextYear}>
              »
            </a>
          </div>
          <div className={`${prefixCls}-body`}>
            <table className={`${prefixCls}-table`} cellSpacing="0" role="grid">
              <tbody className={`${prefixCls}-tbody`}>
              {monthsEls}
              </tbody>
            </table>
          </div>
        </div>
        {yearPanel}
      </div>);
  }
}

MonthPanel.defaultProps = {
  onSelect() {
  },
};
