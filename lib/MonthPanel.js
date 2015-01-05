/** @jsx React.DOM */

var React = require('react');
var DateTimeFormat = require('gregorian-calendar-format');
var ROW = 3;
var COL = 4;
var cx = require('./util').cx;
var YearPanel = require('./YearPanel');
var util = require('./util');

function goYear(self, direction) {
  var next = self.state.value.clone();
  next.addYear(direction);
  self.setState({value: next});
}

var MonthPanel = React.createClass({
  prefixClsFn: util.prefixClsFn,

  getInitialState: function () {
    return {
      value: this.props.value,
      prefixCls: this.props.rootPrefixCls + '-month-panel'

    };
  },

  getDefaultProps: function () {
    return {
      onSelect: function () {
      }
    };
  },

  nextYear: function () {
    goYear(this, 1);
  },

  previousYear: function () {
    goYear(this, -1);
  },

  chooseMonth: function (month) {
    var next = this.state.value.clone();
    next.setMonth(month);
    this.props.onSelect(next);
  },

  showYearPanel: function () {
    this.setState({
      showYearPanel: 1
    });
  },

  onYearPanelSelect: function (current) {
    this.setState({
      value: current,
      showYearPanel: 0
    });
  },

  getMonths: function () {
    var props = this.props;
    var value = this.state.value;
    var current = value.clone();
    var locale = props.locale;
    var monthYearFormat = locale.monthYearFormat;
    var dateLocale = value.getLocale();
    var dateFormatter = new DateTimeFormat(monthYearFormat, dateLocale);
    var months = [];
    var shortMonths = dateLocale.shortMonths;
    var index = 0;
    for (var i = 0; i < ROW; i++) {
      months[i] = [];
      for (var j = 0; j < COL; j++) {
        current.setMonth(index);
        months[i][j] = {
          value: index,
          content: shortMonths[index],
          title: dateFormatter.format(current)
        };
        index++;
      }
    }

    return months;
  },

  render: function () {
    var self = this;
    var props = this.props;
    var value = this.state.value;
    var locale = props.locale;
    var months = this.getMonths();
    var year = value.getYear();
    var currentMonth = value.getMonth();
    var prefixClsFn = this.prefixClsFn;
    var monthsEls = months.map(function (month, index) {
      var tds = month.map(function (m) {
        var classNameMap = {};
        classNameMap[prefixClsFn('cell')] = 1;
        classNameMap[prefixClsFn('selected-cell')] = m.value === currentMonth;
        return (
          <td role="gridcell"
            key={m.value}
            onClick={self.chooseMonth.bind(self, m.value)}
            title={m.title}
            className = {cx(classNameMap)}>
            <a
              className = {prefixClsFn('month')}>
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
      <div className= {this.state.prefixCls}>
        <div>
          <div className = {prefixClsFn('header')}>
            <a className = {prefixClsFn('prev-year-btn')}
              role="button"
              onClick={this.previousYear}
              title={locale.previousYear}>
              «
            </a>

            <a className = {prefixClsFn('year-select')}
              role="button"
              onClick={this.showYearPanel}
              title={locale.yearSelect}>
              <span className = {prefixClsFn('year-select-content')}>{year}</span>
              <span className = {prefixClsFn('year-select-arrow')}>x</span>
            </a>

            <a className = {prefixClsFn('next-year-btn')}
              role="button"
              onClick={this.nextYear}
              title={locale.nextYear}>
              »
            </a>
          </div>
          <div className = {prefixClsFn('body')}>
            <table className = {prefixClsFn('table')} cellSpacing="0" role="grid">
              <tbody className = {prefixClsFn('tbody')}>
              {monthsEls}
              </tbody>
            </table>
          </div>
        </div>
      {yearPanel}
      </div>);
  }
});

module.exports = MonthPanel;
