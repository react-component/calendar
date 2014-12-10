/** @jsx React.DOM */

var React = require('react');
var ROW = 3;
var COL = 4;
var cx = require('./util').cx;

function goYear(self, direction) {
  var next = self.state.value.clone();
  next.addYear(direction);
  self.setState({value: next});
}

var DecadePanel = React.createClass({
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
    var decadesEls = decades.map(function (row,index) {
      var tds = row.map(function (d) {
        var startDecade = d.startDecade;
        var endDecade = d.endDecade;
        return (<td
          key={startDecade}
          onClick={self.chooseDecade.bind(self,startDecade)}
          role="gridcell"
          className = {cx({
            'rc-calendar-decade-panel-cell': 1,
            'rc-calendar-decade-panel-selected-cell': startDecade <= currentYear && currentYear <= endDecade,
            'rc-calendar-decade-panel-last-century-cell': startDecade < startYear,
            'rc-calendar-decade-panel-next-century-cell': endDecade > endYear
          })}
        >
          <a hidefocus="on"
            href="#"
            unselectable="on"
            className="rc-calendar-decade-panel-decade">
             {startDecade}-{endDecade}
          </a>
        </td>);
      });
      return (<tr key={index} role="row">{tds}</tr>);
    });

    return (
      <div className="rc-calendar-decade-panel">
        <div className = "rc-calendar-decade-panel-header">
          <a className = "rc-calendar-decade-panel-prev-century-btn"
            href="#"
            role="button"
            onClick={this.previousCentury}
            title={locale.previousCentury}
            hidefocus="on">
          </a>
          <div className = "rc-calendar-decade-panel-century">
                {startYear}-{endYear}
          </div>
          <a className = "rc-calendar-decade-panel-next-century-btn"
            href="#"
            role="button"
            onClick={this.nextCentury}
            title={locale.nextCentury}
            hidefocus="on">
          </a>
        </div>
        <div className = "rc-calendar-decade-panel-body">
          <table className = "rc-calendar-decade-panel-table" cellSpacing="0" role="grid">
            <tbody className = "rc-calendar-decade-panel-tbody">
            {decadesEls}
            </tbody>
          </table>
        </div>
      </div>);
  }
});

module.exports = DecadePanel;
