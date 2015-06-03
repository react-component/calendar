'use strict';

var React = require('react');
var cx = require('rc-util').classSet;
var staticPrefixClsFn = require('../util/prefixClsFn');

function choose(hour, e) {
  var next = this.state.value.clone();
  var method = this.props.setter;
  next[method](hour);
  this.props.onSelect(next, method);
  e.preventDefault();
}

class TimePanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value,
      prefixCls: props.rootPrefixCls + '-time-panel'
    };
    this.prefixClsFn = staticPrefixClsFn.bind(this);
  }

  render() {
    var value = this.state.value;
    var props = this.props;
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

    var hoursEls = data.map((row, index)=> {
      var tds = row.map(d => {
        var classNameMap = {};
        classNameMap[prefixClsFn('cell')] = 1;
        classNameMap[prefixClsFn('selected-cell')] = d === currentHour;
        return (<td
          key={d}
          onClick={choose.bind(this, d)}
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
}

TimePanel.defaultProps = {
  onSelect() {
  }
};

module.exports = TimePanel;
