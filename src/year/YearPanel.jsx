'use strict';

import React from 'react';
var ROW = 4;
var COL = 3;
import {classSet as cx} from 'rc-util';
import DecadePanel from '../decade/DecadePanel';
import staticPrefixClsFn from '../util/prefixClsFn';

function goYear(direction) {
  var next = this.state.value.clone();
  next.addYear(direction);
  this.setState({value: next});
}

function chooseYear(year) {
  var next = this.state.value.clone();
  next.setYear(year);
  this.props.onSelect(next);
}

export default
class YearPanel extends React.Component {
  constructor(props) {
    super(props);
    this.prefixClsFn = staticPrefixClsFn.bind(this);
    this.state = {
      value: props.value,
      prefixCls: props.rootPrefixCls + '-year-panel'
    };
    this.nextDecade = goYear.bind(this, 10);
    this.previousDecade = goYear.bind(this, -10);
    ['showDecadePanel', 'onDecadePanelSelect'].forEach(m => {
      this[m] = this[m].bind(this);
    });
  }

  showDecadePanel() {
    this.setState({
      showDecadePanel: 1
    });
  }

  onDecadePanelSelect(current) {
    this.setState({
      value: current,
      showDecadePanel: 0
    });
  }

  getYears() {
    var value = this.state.value;
    var currentYear = value.getYear();
    var startYear = parseInt(currentYear / 10, 10) * 10;
    var previousYear = startYear - 1;
    var endYear = startYear + 9;
    var years = [];
    var index = 0;
    for (var i = 0; i < ROW; i++) {
      years[i] = [];
      for (var j = 0; j < COL; j++) {
        var year = previousYear + index;
        var content;
        if (year < startYear) {
          content = '';
        } else if (year > endYear) {
          content = '';
        } else {

          content = year + '';
        }
        years[i][j] = {
          content: content,
          year: year,
          title: content
        };
        index++;
      }
    }
    return years;
  }

  render() {
    var props = this.props;
    var value = this.state.value;
    var locale = props.locale;
    var years = this.getYears();
    var currentYear = value.getYear();
    var startYear = parseInt(currentYear / 10, 10) * 10;
    var endYear = startYear + 9;
    var prefixClsFn = this.prefixClsFn;

    var yeasEls = years.map((row, index) => {
      var tds = row.map(y => {
        var classNameMap = {};
        classNameMap[prefixClsFn('cell')] = 1;
        classNameMap[prefixClsFn('selected-cell')] = y.year === currentYear;
        classNameMap[prefixClsFn('last-decade-cell')] = y.year < startYear;
        classNameMap[prefixClsFn('next-decade-cell')] = y.year > endYear;
        var clickHandler;
        if (y.year < startYear) {
          clickHandler = this.previousDecade;
        } else if (y.year > endYear) {
          clickHandler = this.nextDecade;
        } else {
          clickHandler = chooseYear.bind(this, y.year);
        }
        return (
          <td role="gridcell"
            title={y.title}
            key={y.content}
            onClick={clickHandler}
            className = {cx(classNameMap)}
          >
            <a
              className={prefixClsFn('year')}>
            {y.content}
            </a>
          </td>);
      });
      return (<tr key={index} role="row">{tds}</tr>);
    });

    var decadePanel;
    if (this.state.showDecadePanel) {
      decadePanel = <DecadePanel locale={locale} value={value} rootPrefixCls={props.rootPrefixCls} onSelect={this.onDecadePanelSelect}/>;
    }

    return (
      <div className={this.state.prefixCls}>
        <div>
          <div className = {prefixClsFn('header')}>
            <a className = {prefixClsFn('prev-decade-btn')}
              role="button"
              onClick={this.previousDecade}
              title={locale.previousDecade}>
              «
            </a>

            <a className = {prefixClsFn('decade-select')}
              role="button"
              onClick={this.showDecadePanel}
              title={locale.decadeSelect}>
              <span className = {prefixClsFn('decade-select-content')}>
                {startYear}-{endYear}
              </span>
              <span className = {prefixClsFn('decade-select-arrow')}>x</span>
            </a>

            <a className = {prefixClsFn('next-decade-btn')}
              role="button"
              onClick={this.nextDecade}
              title={locale.nextDecade}>
              »
            </a>
          </div>
          <div className = {prefixClsFn('body')}>
            <table className = {prefixClsFn('table')} cellSpacing="0" role="grid">
              <tbody className = {prefixClsFn('tbody')}>
              {yeasEls}
              </tbody>
            </table>
          </div>
        </div>
      {decadePanel}
      </div>);
  }
}

YearPanel.defaultProps = {
  onSelect() {
  }
};
