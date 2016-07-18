import React, { PropTypes } from 'react';
import CalendarHeader from '../calendar/CalendarHeader';
import DateTable from '../date/DateTable';
import DateInput from '../date/DateInput';
import { getTimeConfig } from '../util/index';

function noop() {
}

const CalendarPart = React.createClass({
  propTypes: {
    value: PropTypes.any,
    direction: PropTypes.any,
    prefixCls: PropTypes.any,
    locale: PropTypes.any,
    selectedValue: PropTypes.any,
    showTimePicker: PropTypes.bool,
    formatter: PropTypes.any,
    placeholder: PropTypes.any,
    disabledDate: PropTypes.any,
    timePicker: PropTypes.any,
    disabledTime: PropTypes.any,
    timePickerDisabledTime: PropTypes.object,
  },
  render() {
    const props = this.props;
    const { value, direction, prefixCls,
      locale, selectedValue, formatter, placeholder,
      disabledDate, timePicker, disabledTime, timePickerDisabledTime, showTimePicker } = props;
    const disabledTimeConfig = disabledTime && timePicker ?
      getTimeConfig(selectedValue, disabledTime) : null;
    const rangeClassName = `${prefixCls}-range`;
    const newProps = {
      locale,
      value,
      prefixCls,
      showTimePicker,
    };
    const index = direction === 'left' ? 0 : 1;

    const timePickerEle = timePicker && React.cloneElement(timePicker, {
      formatter,
      showHour: true,
      showSecond: true,
      onChange: props.onInputSelect,
      gregorianCalendarLocale: value.locale,
      value: selectedValue[index],
      disabledHours: noop,
      disabledMinutes: noop,
      disabledSeconds: noop,
      ...disabledTimeConfig,
      ...timePickerDisabledTime,
    });

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
        {showTimePicker ? <div className={`${prefixCls}-time-picker`}>
          <div className={`${prefixCls}-time-picker-panel`}>
            {timePickerEle}
          </div>
        </div> : null}
        <div className={`${prefixCls}-body`}>
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
