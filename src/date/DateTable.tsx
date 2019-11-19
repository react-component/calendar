import React from 'react';
import DateTHead, { DateTHeadProps } from './DateTHead';
import DateTBody, { DateTBodyProps } from './DateTBody';

interface DateTableProps extends DateTHeadProps, DateTBodyProps {
  prefixCls?: string;
  locale?: { [key: string]: any };
}

const DateTable: React.FC<DateTableProps> = props => {
  const { prefixCls } = props;
  return (
    <table className={`${prefixCls}-table`} cellSpacing="0" role="grid">
      <DateTHead {...props} />
      <DateTBody {...props} />
    </table>
  );
};

export default DateTable;
