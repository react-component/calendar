import React, { PropTypes } from 'react';
import CalendarHeader from '../calendar/CalendarHeader';
import DateTable from '../date/DateTable';
import DateInput from '../date/DateInput';
import { getTimeConfig } from '../util/index';

const CalendarPart = React.createClass({
  propTypes: {
    value: PropTypes.any,
    direction: PropTypes.any,
    prefixCls: PropTypes.any,
    locale: PropTypes.any,
    selectedValue: PropTypes.any,
    hoverValue: PropTypes.any,
    showTimePicker: PropTypes.bool,
    format: PropTypes.any,
    placeholder: PropTypes.any,
    disabledDate: PropTypes.any,
    timePicker: PropTypes.any,
    disabledTime: PropTypes.any,
    onInputSelect: PropTypes.func,
    timePickerDisabledTime: PropTypes.object,
    hideDisabledOptions: PropTypes.bool,
  },
  render() {
    const props = this.props;
    const {
      value, direction, prefixCls,
      locale, selectedValue, format, placeholder,
      disabledDate, timePicker, disabledTime,
      timePickerDisabledTime, showTimePicker,
      hoverValue, onInputSelect, hideDisabledOptions,
    } = props;
    const disabledTimeConfig = showTimePicker && disabledTime && timePicker ?
      getTimeConfig(selectedValue, disabledTime) : null;
    const rangeClassName = `${prefixCls}-range`;
    const newProps = {
      locale,
      value,
      prefixCls,
      showTimePicker,
    };
    const index = direction === 'left' ? 0 : 1;
    const timePickerEle = showTimePicker && timePicker &&
      React.cloneElement(timePicker, {
        showHour: true,
        showSecond: true,
        ...timePicker.props,
        ...disabledTimeConfig,
        ...timePickerDisabledTime,
        onChange: onInputSelect,
        defaultOpenValue: value,
        hideDisabledOptions,
        value: selectedValue[index],
      });
    return (
      <div className={`${rangeClassName}-part ${rangeClassName}-${direction}`}>
        <DateInput
          format={format}
          locale={locale}
          prefixCls={prefixCls}
          timePicker={timePicker}
          disabledDate={disabledDate}
          placeholder={placeholder}
          disabledTime={disabledTime}
          value={value}
          showClear={false}
          selectedValue={selectedValue[index]}
          onChange={onInputSelect}
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
              hoverValue={hoverValue}
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
