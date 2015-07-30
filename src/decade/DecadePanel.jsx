'use strict';

import React from 'react';
var ROW = 4;
var COL = 3;
import rcUtil from 'rc-util';
var cx = rcUtil.classSet;

function goYear(direction) {
  var next = this.state.value.clone();
  next.addYear(direction);
  this.setState({
    value: next
  });
}

function chooseDecade(year, e) {
  var next = this.state.value.clone();
  next.setYear(year);
  this.props.onSelect(next);
  e.preventDefault();
}

export default
class DecadePanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value
    };

    // bind methods
    this.prefixCls = props.rootPrefixCls + '-decade-panel';
    this.nextCentury = goYear.bind(this, 100);
    this.previousCentury = goYear.bind(this, -100);
  }

  render() {
    var value = this.state.value;
    var locale = this.props.locale;
    var currentYear = value.getYear();
    var startYear = parseInt(currentYear / 100, 10) * 100;
    var preYear = startYear - 10;
    var endYear = startYear + 99;
    var decades = [];
    var index = 0;
    var prefixCls = this.prefixCls;

    for (var i = 0; i < ROW; i++) {
      decades[i] = [];
      for (var j = 0; j < COL; j++) {
        var startDecade = preYear + index * 10;
        var endDecade = preYear + index * 10 + 9;
        decades[i][j] = {
          startDecade: startDecade,
          endDecade: endDecade
        };
        index++;
      }
    }

    var decadesEls = decades.map((row, decadeIndex) => {
      var tds = row.map(d => {
        var dStartDecade = d.startDecade;
        var dEndDecade = d.endDecade;
        var classNameMap = {};
        classNameMap[`${prefixCls}-cell`] = 1;
        classNameMap[`${prefixCls}-selected-cell`] = dStartDecade <= currentYear && currentYear <= dEndDecade;
        var isLast = dStartDecade < startYear;
        var isNext = dEndDecade > endYear;
        classNameMap[`${prefixCls}-last-century-cell`] = isLast;
        classNameMap[`${prefixCls}-next-century-cell`] = isNext;
        var content;
        var clickHandler;
        if (isLast) {
          clickHandler = this.previousCentury;
        } else if (isNext) {
          clickHandler = this.nextCentury;
        } else {
          content = dStartDecade + '-' + dEndDecade;
          clickHandler = chooseDecade.bind(this, dStartDecade);
        }
        return (<td
          key={dStartDecade}
          onClick={clickHandler}
          role="gridcell"
          className = {cx(classNameMap)}
        >
          <a
            className={`${prefixCls}-decade`}>
             {content}
          </a>
        </td>);
      });
      return (<tr key={decadeIndex} role="row">{tds}</tr>);
    });

    return (
      <div className={this.prefixCls}>
        <div className = {`${prefixCls}-header`}>
          <a className = {`${prefixCls}-prev-century-btn`}
            role="button"
            onClick={this.previousCentury}
            title={locale.previousCentury}>
            «
          </a>
          <div className = {`${prefixCls}-century`}>
                {startYear}-{endYear}
          </div>
          <a className = {`${prefixCls}-next-century-btn`}
            role="button"
            onClick={this.nextCentury}
            title={locale.nextCentury}>
            »
          </a>
        </div>
        <div className =  {`${prefixCls}-body`}>
          <table className = {`${prefixCls}-table`} cellSpacing="0" role="grid">
            <tbody className = {`${prefixCls}-tbody`}>
            {decadesEls}
            </tbody>
          </table>
        </div>
      </div>);
  }
}

DecadePanel.defaultProps = {
  onSelect() {
  }
};
