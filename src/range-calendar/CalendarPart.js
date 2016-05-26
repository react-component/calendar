import React, { PropTypes } from 'react';
import CalendarHeader from '../calendar/CalendarHeader';
import DateTable from '../date/DateTable';
import DateInput from '../date/DateInput';

const CalendarPart = React.createClass({
  propTypes: {
    value: PropTypes.any,
    direction: PropTypes.any,
    prefixCls: PropTypes.any,
    locale: PropTypes.any,
    selectedValue: PropTypes.any,
    formatter: PropTypes.any,
    placeholder: PropTypes.any,
    disabledDate: PropTypes.any,
    timePicker: PropTypes.any,
    disabledTime: PropTypes.any,
  },
  render() {
    const props = this.props;
    const { value, direction, prefixCls,
      locale, selectedValue, formatter, placeholder,
      disabledDate, timePicker, disabledTime } = props;
    const rangeClassName = `${prefixCls}-range`;
    const newProps = {
      locale,
      value,
      prefixCls,
    };
    const index = direction === 'left' ? 0 : 1;
    return (<div className={`${rangeClassName}-part ${rangeClassName}-${direction}`}>
      <DateInput
        formatter={formatter}
        locale={locale}
        prefixCls={prefixCls}
        timePicker={timePicker}
        disabledDate={disabledDate}
        placeholder={placeholder}
        disabledTime={disabledTime}
        gregorianCalendarLocale={value.locale}
        showClear={false}
        selectedValue={selectedValue[index]}
        onChange={props.onInputSelect}
      />
      <div style={{ outline: 'none' }}>
        <CalendarHeader
          {...newProps}
          enableNext={direction === 'right'}
          enablePrev={direction === 'left'}
          onValueChange={props.onValueChange}
        />
        <div className={`${prefixCls}-calendar-body`}>
          <DateTable
            {...newProps}
            selectedValue={selectedValue}
            dateRender={props.dateRender}
            onSelect={props.onSelect}
            onDayHover={props.onDayHover}
            disabledDate={disabledDate}
            showWeekNumber={props.showWeekNumber}
          />
        </div>
      </div>
    </div>);
  },
});

export default CalendarPart;
