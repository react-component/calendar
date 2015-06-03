'use strict';

var React = require('react');
var DateTHead = require('./DateTHead');
var DateTBody = require('./DateTBody');

class DateTable extends React.Component {
  render() {
    var props = this.props;
    var prefixClsFn = props.prefixClsFn;
    return (<table className = {prefixClsFn('table')} cellSpacing="0" role="grid">
      <DateTHead {...props}/>
      <DateTBody {...props}/>
    </table>);
  }
}

module.exports = DateTable;
