/** @jsx React.DOM */

var React = require('react');
var DateTimeFormat = require('gregorian-calendar-format');
var ROW = 3;
var COL = 4;
var cx = require('./util').cx;
var DecadePanel = require('./DecadePanel');

function goYear(self, direction) {
  var next = self.state.value.clone();
  next.addYear(direction);
  self.setState({value: next});
}

var YearPanel = React.createClass({
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

  nextDecade: function (e) {
    e.preventDefault();
    goYear(this, 10);
  },

  previousDecade: function (e) {
    goYear(this, -10);
  e.preventDefault();
  },

  chooseYear: function (year, e) {
    var next = this.state.value.clone();
    next.setYear(year);
    this.props.onSelect(next);
    e.preventDefault();
  },

  showDecadePanel: function (e) {
    e.preventDefault();
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

    var yeasEls = years.map(function (row, index) {
      var tds = row.map(function (y) {
        return (
          <td role="gridcell"
            title={y.title}
            key={y.content}
            onClick={self.chooseYear.bind(self, y.content)}
            className = {cx({
              'rc-calendar-year-panel-cell': 1,
              'rc-calendar-year-panel-selected-cell': y.content === currentYear,
              'rc-calendar-year-panel-last-decade-cell': y.content < startYear,
              'rc-calendar-year-panel-next-decade-cell': y.content > endYear
            })}
          >
            <a hidefocus="on"
              href="#"
              tabIndex="-1"
              unselectable="on"
              className="rc-calendar-year-panel-year">
            {y.content}
            </a>
          </td>);
      });
      return (<tr key={index} role="row">{tds}</tr>);
    });

    var decadePanel;
    if (this.state.showDecadePanel) {
      decadePanel = <DecadePanel locale={locale} value={value} onSelect={this.onDecadePanelSelect}/>;
    }

    return (
      <div className="rc-calendar-year-panel" tabIndex="-1">
        <div>
          <div className = "rc-calendar-year-panel-header">
            <a className = "rc-calendar-year-panel-prev-decade-btn"
              href="#"
              role="button"
              tabIndex="-1"
              onClick={this.previousDecade}
              title={locale.previousDecade}
              hidefocus="on">
            </a>

            <a className = "rc-calendar-year-panel-decade-select"
              role="button"
              href="#"
              hidefocus="on"
              tabIndex="-1"
              onClick={this.showDecadePanel}
              title={locale.decadeSelect}>
              <span className = "rc-calendar-year-panel-decade-select-content">
                {startYear}-{endYear}
              </span>
              <span className = "rc-calendar-year-panel-decade-select-arrow">x</span>
            </a>

            <a className = "rc-calendar-year-panel-next-decade-btn"
              href="#"
              role="button"
              tabIndex="-1"
              onClick={this.nextDecade}
              title={locale.nextDecade}
              hidefocus="on">
            </a>
          </div>
          <div className = "rc-calendar-year-panel-body">
            <table className = "rc-calendar-year-panel-table" cellSpacing="0" role="grid">
              <tbody className = "rc-calendar-year-panel-tbody">
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
