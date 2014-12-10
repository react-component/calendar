/** @jsx React.DOM */

var React = require('react');
var DateTimeFormat = require('gregorian-calendar-format');
var ROW = 3;
var COL = 4;
var cx = require('./util').cx;
var YearPanel = require('./YearPanel');

function goYear(self, direction) {
  var next = self.state.value.clone();
  next.addYear(direction);
  self.setState({value: next});
}

var MonthPanel = React.createClass({
  getInitialState: function () {
    return {
      value: this.props.value
    };
  },

  getDefaultProps: function () {
    return {
      onSelect: function () {
      }
    };
  },

  nextYear: function (e) {
    e.preventDefault();
    goYear(this, 1);
  },

  previousYear: function (e) {
    e.preventDefault();
    goYear(this, -1);
  },

  chooseMonth: function (month, e) {
    var next = this.state.value.clone();
    next.setMonth(month);
    this.props.onSelect(next);
    e.preventDefault();
  },

  showYearPanel: function (e) {
    e.preventDefault();
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
    var monthsEls = months.map(function (month, index) {
      var tds = month.map(function (m) {
        return (
          <td role="gridcell"
            key={m.value}
            onClick={self.chooseMonth.bind(self, m.value)}
            title={m.title}
            className = {cx({
              "rc-calendar-month-panel-cell": 1,
              "rc-calendar-month-panel-selected-cell": m.value === currentMonth
            })}>
            <a hidefocus="on"
              href="#"
              unselectable="on"
              className = "rc-calendar-month-panel-month">
            {m.content}
            </a>
          </td>);
      });
      return (<tr key={index} role="row">{tds}</tr>);
    });

    var yearPanel;
    if (this.state.showYearPanel) {
      yearPanel = <YearPanel locale={locale} value={value} onSelect={this.onYearPanelSelect}/>;
    }

    return (
      <div className="rc-calendar-month-panel">
        <div>
          <div className = "rc-calendar-month-panel-header">
            <a className = "rc-calendar-month-panel-prev-year-btn"
              href="#"
              role="button"
              onClick={this.previousYear}
              title={locale.previousYear}
              hidefocus="on">
            </a>

            <a className = "rc-calendar-month-panel-year-select"
              role="button"
              href="#"
              hidefocus="on"
              onClick={this.showYearPanel}
              title={locale.yearSelect}>
              <span className = "rc-calendar-month-panel-year-select-content">{year}</span>
              <span className = "rc-calendar-month-panel-year-select-arrow">x</span>
            </a>

            <a className = "rc-calendar-month-panel-next-year-btn"
              href="#"
              role="button"
              onClick={this.nextYear}
              title={locale.nextYear}
              hidefocus="on">
            </a>
          </div>
          <div className = "rc-calendar-month-panel-body" >
            <table className = "rc-calendar-month-panel-table" cellSpacing="0" role="grid">
              <tbody className = "rc-calendar-month-panel-tbody">
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
