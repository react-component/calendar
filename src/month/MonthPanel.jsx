'use strict';

import React from 'react';
var ROW = 4;
var COL = 3;
import rcUtil from 'rc-util';
var cx = rcUtil.classSet;
import YearPanel from '../year/YearPanel';

function goYear(direction) {
  var next = this.state.value.clone();
  next.addYear(direction);
  this.setState({
    value: next
  });
}

function showYearPanel() {
  this.setState({
    showYearPanel: 1
  });
}

function chooseMonth(month) {
  var next = this.state.value.clone();
  next.setMonth(month);
  this.props.onSelect(next);
}

function onYearPanelSelect(current) {
  this.setState({
    value: current,
    showYearPanel: 0
  });
}

export default
class MonthPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value
    };
    // bind methods
    this.nextYear = goYear.bind(this, 1);
    this.previousYear = goYear.bind(this, -1);
    this.showYearPanel = showYearPanel.bind(this);
    this.onYearPanelSelect = onYearPanelSelect.bind(this);
    this.prefixCls = props.rootPrefixCls + '-month-panel';
  }

  getMonths() {
    var props = this.props;
    var value = this.state.value;
    var current = value.clone();
    var locale = props.locale;
    var months = [];
    var shortMonths = locale.format.shortMonths;
    var index = 0;
    for (var i = 0; i < ROW; i++) {
      months[i] = [];
      for (var j = 0; j < COL; j++) {
        current.setMonth(index);
        months[i][j] = {
          value: index,
          content: shortMonths[index],
          title: shortMonths[index]
        };
        index++;
      }
    }

    return months;
  }

  render() {
    var props = this.props;
    var value = this.state.value;
    var locale = props.locale;
    var months = this.getMonths();
    var year = value.getYear();
    var currentMonth = value.getMonth();
    var prefixCls = this.prefixCls;
    var monthsEls = months.map((month, index)=> {
      var tds = month.map(m => {
        var classNameMap = {};
        classNameMap[`${prefixCls}-cell`] = 1;
        classNameMap[`${prefixCls}-selected-cell`] = m.value === currentMonth;
        return (
          <td role="gridcell"
            key={m.value}
            onClick={chooseMonth.bind(this, m.value)}
            title={m.title}
            className = {cx(classNameMap)}>
            <a
              className = {`${prefixCls}-month`}>
            {m.content}
            </a>
          </td>);
      });
      return (<tr key={index} role="row">{tds}</tr>);
    });

    var yearPanel;
    if (this.state.showYearPanel) {
      yearPanel = <YearPanel locale={locale} value={value} rootPrefixCls={props.rootPrefixCls} onSelect={this.onYearPanelSelect}/>;
    }

    return (
      <div className= {this.prefixCls}>
        <div>
          <div className = {`${prefixCls}-header`}>
            <a className = {`${prefixCls}-prev-year-btn`}
              role="button"
              onClick={this.previousYear}
              title={locale.previousYear}>
              «
            </a>

            <a className = {`${prefixCls}-year-select`}
              role="button"
              onClick={this.showYearPanel}
              title={locale.yearSelect}>
              <span className = {`${prefixCls}-year-select-content`}>{year}</span>
              <span className = {`${prefixCls}-year-select-arrow`}>x</span>
            </a>

            <a className = {`${prefixCls}-next-year-btn`}
              role="button"
              onClick={this.nextYear}
              title={locale.nextYear}>
              »
            </a>
          </div>
          <div className = {`${prefixCls}-body`}>
            <table className = {`${prefixCls}-table`} cellSpacing="0" role="grid">
              <tbody className = {`${prefixCls}-tbody`}>
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
  }
};
