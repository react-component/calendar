import React, {PropTypes} from 'react';
import {classSet as cx} from 'rc-util';
import YearPanel from '../year/YearPanel';
const ROW = 4;
const COL = 3;

function goYear(direction) {
  const next = this.state.value.clone();
  next.addYear(direction);
  this.setAndChangeValue(next);
}

function chooseMonth(month) {
  const next = this.state.value.clone();
  next.rollSetMonth(month);
  this.setAndSelectValue(next);
}

function noop() {

}

const MonthPanel = React.createClass({
  propTypes: {
    onChange: PropTypes.func,
    onSelect: PropTypes.func,
  },

  getDefaultProps() {
    return {
      onChange: noop,
      onSelect: noop,
    };
  },

  getInitialState() {
    const props = this.props;
    // bind methods
    this.nextYear = goYear.bind(this, 1);
    this.previousYear = goYear.bind(this, -1);
    this.prefixCls = props.rootPrefixCls + '-month-panel';
    return {
      value: props.value || props.defaultValue,
    };
  },

  componentWillReceiveProps(nextProps) {
    if ('value' in nextProps) {
      this.setState({
        value: nextProps.value,
      });
    }
  },

  onYearPanelSelect(current) {
    this.setState({
      showYearPanel: 0,
    });
    this.setAndChangeValue(current);
  },

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
  },

  setAndChangeValue(value) {
    this.setValue(value);
    this.props.onChange(value);
  },

  setAndSelectValue(value) {
    this.setValue(value);
    this.props.onSelect(value);
  },

  setValue(value) {
    if (!('value' in this.props)) {
      this.setState({
        value,
      });
    }
  },

  showYearPanel() {
    this.setState({
      showYearPanel: 1,
    });
  },

  render() {
    const props = this.props;
    const value = this.state.value;
    const locale = props.locale;
    const months = this.getMonths();
    const year = value.getYear();
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

    let yearPanel;
    if (this.state.showYearPanel) {
      yearPanel = (<YearPanel locale={locale} value={value} rootPrefixCls={props.rootPrefixCls}
                              onSelect={this.onYearPanelSelect}/>);
    }

    return (
      <div className={prefixCls} style={props.style}>
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
  },
});

export default MonthPanel;
