import React from 'react';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';
import CalendarHeader from '../calendar/CalendarHeader';
import DateTable from '../date/DateTable';
import DateInput from '../date/DateInput';
import { getTimeConfig } from '../util/index';

const CalendarPart = createReactClass({
  propTypes: {
    prefixCls: PropTypes.string,
    value: PropTypes.any,
    hoverValue: PropTypes.any,
    selectedValue: PropTypes.any,
    direction: PropTypes.any,
    locale: PropTypes.any,
    showTimePicker: PropTypes.bool,
    format: PropTypes.any,
    placeholder: PropTypes.any,
    disabledDate: PropTypes.any,
    timePicker: PropTypes.any,
    disabledTime: PropTypes.any,
    onInputSelect: PropTypes.func,
    timePickerDisabledTime: PropTypes.object,
    enableNext: PropTypes.any,
    enablePrev: PropTypes.any,
  },
  render() {
    const props = this.props;
    const {
      prefixCls,
      value,
      hoverValue,
      selectedValue,
      direction,
      locale, format, placeholder,
      disabledDate, timePicker, disabledTime,
      timePickerDisabledTime, showTimePicker,
      onInputSelect, enablePrev, enableNext,
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
        showMinute: true,
        showSecond: true,
        ...timePicker.props,
        ...disabledTimeConfig,
        ...timePickerDisabledTime,
        onChange: onInputSelect,
        defaultOpenValue: value,
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
            enableNext={enableNext}
            enablePrev={enablePrev}
            onValueChange={props.onValueChange}
            onPanelChange={props.onPanelChange}
            disabledMonth={props.disabledMonth}
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
