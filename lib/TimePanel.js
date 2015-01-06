/** @jsx React.DOM */

var React = require('react');
var cx = require('./util').cx;
var util = require('./util');

var TimePanel = React.createClass({
  getInitialState: function () {
    return {
      value: this.props.value,
      prefixCls: this.props.rootPrefixCls + '-time-panel'
    };
  },

  prefixClsFn: util.prefixClsFn,

  getDefaultProps: function () {
    return {
      onSelect: function () {
      }
    };
  },

  choose: function (hour, e) {
    var next = this.state.value.clone();
    var method = this.props.setter;
    next[method](hour);
    this.props.onSelect(next);
    e.preventDefault();
  },

  render: function () {
    var value = this.state.value;
    var props = this.props;
    var locale = props.locale;
    var method = props.getter;
    var currentHour = value[method]();
    var data = [];
    var prefixClsFn = this.prefixClsFn;
    var ROW = props.rowCount;
    var COL = props.colCount;

    for (var i = 0; i < ROW; i++) {
      data[i] = [];
      for (var j = 0; j < COL; j++) {
        data[i][j] = i * COL + j;
      }
    }

    var self = this;
    var hoursEls = data.map(function (row, index) {
      var tds = row.map(function (d) {
        var classNameMap = {};
        classNameMap[prefixClsFn('cell')] = 1;
        classNameMap[prefixClsFn('selected-cell')] = d === currentHour;
        return (<td
          key={d}
          onClick={self.choose.bind(self, d)}
          role="gridcell"
          className = {cx(classNameMap)} >
          <a
            className={prefixClsFn('time')}>
          {d}
          </a>
        </td>);
      });
      return (<tr key={index} role="row">{tds}</tr>);
    });

    return (
      <div className={this.state.prefixCls}>
        <div className = {prefixClsFn('header')}>
          <div className = {prefixClsFn('title')}>
                {props.title}
          </div>
        </div>
        <div className =  {prefixClsFn('body')}>
          <table className = {prefixClsFn('table')} cellSpacing="0" role="grid">
            <tbody className = {prefixClsFn('tbody')}>
            {hoursEls}
            </tbody>
          </table>
        </div>
      </div>);
  }
});

module.exports = TimePanel;
