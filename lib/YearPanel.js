/** @jsx React.DOM */

var React = require('react');
var DateTimeFormat = require('gregorian-calendar-format');
var ROW = 3;
var COL = 4;
var cx = require('./util').cx;
var DecadePanel = require('./DecadePanel');
var util = require('./util');

function goYear(self, direction) {
  var next = self.state.value.clone();
  next.addYear(direction);
  self.setState({value: next});
}

var YearPanel = React.createClass({
  prefixClsFn: util.prefixClsFn,

  getInitialState: function () {
    return {
      value: this.props.value,
      prefixCls: this.props.rootPrefixCls + '-year-panel'
    };
  },

  getDefaultProps: function () {
    return {
      onSelect: function () {
      }
    };
  },

  nextDecade: function () {
    goYear(this, 10);
  },

  previousDecade: function () {
    goYear(this, -10);
  },

  chooseYear: function (year) {
    var next = this.state.value.clone();
    next.setYear(year);
    this.props.onSelect(next);
  },

  showDecadePanel: function () {
    this.setState({
      showDecadePanel: 1
    });
  },

  onDecadePanelSelect: function (current) {
    this.setState({
      value: current,
      showDecadePanel: 0
    });
  },

  getYears: function () {
    var value = this.state.value;
    var currentYear = value.getYear();
    var startYear = parseInt(currentYear / 10, 10) * 10;
    var preYear = startYear - 1;
    var current = value.clone();
    var locale = this.props.locale;
    var yearFormat = locale.yearFormat;
    var dateLocale = value.getLocale();
    var dateFormatter = new DateTimeFormat(yearFormat, dateLocale);
    var years = [];
    var index = 0;
    for (var i = 0; i < ROW; i++) {
      years[i] = [];
      for (var j = 0; j < COL; j++) {
        current.setYear(preYear + index);
        years[i][j] = {
          content: preYear + index,
          title: dateFormatter.format(current)
        };
        index++;
      }
    }
    return years;
  },

  render: function () {
    var self = this;
    var props = this.props;
    var value = this.state.value;
    var locale = props.locale;
    var years = this.getYears();
    var currentYear = value.getYear();
    var startYear = parseInt(currentYear / 10, 10) * 10;
    var endYear = startYear + 9;
    var prefixClsFn = this.prefixClsFn;

    var yeasEls = years.map(function (row, index) {
      var tds = row.map(function (y) {
        var classNameMap = {};
        classNameMap[prefixClsFn('cell')] = 1;
        classNameMap[prefixClsFn('selected-cell')] = y.content === currentYear;
        classNameMap[prefixClsFn('last-decade-cell')] = y.content < startYear;
        classNameMap[prefixClsFn('next-decade-cell')] = y.content > endYear;
        return (
          <td role="gridcell"
            title={y.title}
            key={y.content}
            onClick={self.chooseYear.bind(self, y.content)}
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
});

module.exports = YearPanel;
