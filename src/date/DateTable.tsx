import React from 'react';
import DateTHead from './DateTHead';
import DateTBody from './DateTBody';

const DateTable: React.FC<{}> = props => {
  const { prefixCls } = props;
  return (
    <table className={`${prefixCls}-table`} cellSpacing="0" role="grid">
      <DateTHead {...props} />
      <DateTBody {...props} />
    </table>
  );
};

export default DateTable;
