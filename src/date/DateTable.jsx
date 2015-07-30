'use strict';

import React from 'react';
import DateTHead from './DateTHead';
import DateTBody from './DateTBody';

export default
class DateTable extends React.Component {
  render() {
    var props = this.props;
    var prefixCls = props.prefixCls;
    return (<table className = {`${prefixCls}-table`} cellSpacing="0" role="grid">
      <DateTHead {...props}/>
      <DateTBody {...props}/>
    </table>);
  }
}
