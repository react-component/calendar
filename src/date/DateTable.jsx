
import React from 'react';
import DateTHead from './DateTHead';
import DateTBody from './DateTBody';

export default
class DateTable extends React.Component {
  render() {
    const props = this.props;
    const prefixCls = props.prefixCls;
    let directionCls = '';
    if (props.calendarType === 'jalali') {
      directionCls = `${prefixCls}-table__rtl`;
    }
    return (
      <table
        className={`${prefixCls}-table ${directionCls}`}
        cellSpacing="0"
        role="grid"
      >
        <DateTHead {...props}/>
        <DateTBody {...props}/>
      </table>
    );
  }
}
