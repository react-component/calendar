/** @jsx React.DOM */

var React = require('react');
var ROW = 3;
var COL = 4;
var cx = require('./util').cx;
var util = require('./util');

function goYear(self, direction) {
  var next = self.state.value.clone();
  next.addYear(direction);
  self.setState({value: next});
}

var DecadePanel = React.createClass({
  getInitialState: function () {
    return {
      value: this.props.value,
      prefixCls: this.props.rootPrefixCls + '-decade-panel'
    };
  },

  prefixClsFn: util.prefixClsFn,

  getDefaultProps: function () {
    return {
      onSelect: function () {
      }
    };
  },

  nextCentury: function (e) {
    goYear(this, 100);
    e.preventDefault();
  },

  previousCentury: function (e) {
    goYear(this, -100);
    e.preventDefault();
  },

  chooseDecade: function (year, e) {
    var next = this.state.value.clone();
    next.setYear(year);
    this.props.onSelect(next);
    e.preventDefault();
  },

  render: function () {
    var value = this.state.value;
    var locale = this.props.locale;
    var currentYear = value.getYear();
    var startYear = parseInt(currentYear / 100, 10) * 100;
    var preYear = startYear - 10;
    var endYear = startYear + 99;
    var decades = [];
    var index = 0;
    var prefixClsFn = this.prefixClsFn;

    for (var i = 0; i < ROW; i++) {
      decades[i] = [];
      for (var j = 0; j < COL; j++) {
        decades[i][j] = {
          startDecade: preYear + index * 10,
          endDecade: preYear + index * 10 + 9
        };
        index++;
      }
    }

    var self = this;
    var decadesEls = decades.map(function (row, index) {
      var tds = row.map(function (d) {
        var startDecade = d.startDecade;
        var endDecade = d.endDecade;
        var classNameMap = {};
        classNameMap[prefixClsFn('cell')] = 1;
        classNameMap[prefixClsFn('selected-cell')] = startDecade <= currentYear && currentYear <= endDecade;
        classNameMap[prefixClsFn('last-century-cell')] = startDecade < startYear;
        classNameMap[prefixClsFn('next-century-cell')] = endDecade > endYear;
        return (<td
          key={startDecade}
          onClick={self.chooseDecade.bind(self, startDecade)}
          role="gridcell"
          className = {cx(classNameMap)}
        >
          <a
            className={prefixClsFn('decade')}>
             {startDecade}
            <br/>
            -
            <br/>{endDecade}
          </a>
        </td>);
      });
      return (<tr key={index} role="row">{tds}</tr>);
    });

    return (
      <div className={this.state.prefixCls}>
        <div className = {prefixClsFn('header')}>
          <a className = {prefixClsFn('prev-century-btn')}
            role="button"
            onClick={this.previousCentury}
            title={locale.previousCentury}>
            «
          </a>
          <div className = {prefixClsFn('century')}>
                {startYear}-{endYear}
          </div>
          <a className = {prefixClsFn('next-century-btn')}
            role="button"
            onClick={this.nextCentury}
            title={locale.nextCentury}>
            »
          </a>
        </div>
        <div className =  {prefixClsFn('body')}>
          <table className = {prefixClsFn('table')} cellSpacing="0" role="grid">
            <tbody className = {prefixClsFn('tbody')}>
            {decadesEls}
            </tbody>
          </table>
        </div>
      </div>);
  }
});

module.exports = DecadePanel;
