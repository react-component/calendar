import React, { CSSProperties } from 'react';
import { Moment } from 'moment';

import CalendarHeader from '../calendar/CalendarHeader';
import DateTable from '../date/DateTable';
import DateInput, { CalendarTypeMode } from '../date/DateInput';
import { getTimeConfig } from '../util/index';

interface CalendarPartProps {
  mode?: CalendarTypeMode;
  selectedValue?: Moment | Moment[];
  type?: 'both' | 'start' | 'end';
  value?: Moment | Moment[];
  hoverValue?: Moment[];
  prefixCls?: string;
  seperator?: string;
  timePicker?: JSX.Element;
  showDateInput?: boolean;
  onChange?: (value: Moment[]) => void;
  onSelect?: (value: Moment[], cause?: any) => void;
  onKeyDown?: React.MouseEventHandler<HTMLDivElement>;
  disabledTime?: (
    value: Moment[],
    type?: string,
  ) => {
    disabledHours: () => any[];
    disabledMinutes: (hour?) => any[];
    disabledSeconds: (hour?, minute?) => any[];
  };
  disabledDate?: (value: Moment | Moment[], type?: string) => boolean;
  onPanelChange?: (value: Moment | Moment[], type?: string[] | string) => void;
  onValueChange?: (value: Moment | Moment[]) => void;
  onHoverChange?: (value: Moment | Moment[]) => void;
  onClear?: () => void;
  onOk?: (value: Moment | Moment[]) => void;
  clearIcon?: React.ReactNode;
  showOk?: boolean;
  locale: { [key: string]: any };
  showClear?: boolean;
  showToday?: boolean;
  showWeekNumber?: boolean;
  placeholder?: string;
  renderSidebar?: () => React.ReactNode;
  style?: CSSProperties;
  className?: string;
  visible?: boolean;
  renderFooter?: () => void;
  format?: string;
  direction?: 'left' | 'right';
  enableNext?: boolean;
  enablePrev?: boolean;
  inputMode?: 'none' | 'text' | 'tel' | 'url' | 'email' | 'numeric' | 'decimal' | 'search';
  onInputSelect?: (value: Moment) => void;
  onInputChange?: (value: Moment) => void;
  showTimePicker?: boolean;
  timePickerDisabledTime?: {
    disabledHours: () => any[];
    disabledMinutes: (hour?) => any[];
    disabledSeconds: (hour?, minute?) => any[];
  };
  disabledMonth?: (value: Moment) => boolean;
  onDayHover?: (current: Moment, value: Moment) => void;
  dateRender?: (current: Moment, value: Moment) => React.ReactNode;
}
const CalendarPart: React.FC<CalendarPartProps> = props => {
  const {
    prefixCls,
    value,
    hoverValue,
    selectedValue,
    mode,
    direction,
    locale,
    format,
    placeholder,
    disabledDate,
    timePicker,
    disabledTime,
    timePickerDisabledTime,
    showTimePicker,
    onInputChange,
    onInputSelect,
    enablePrev,
    enableNext,
    clearIcon,
    showClear,
    inputMode,
  } = props;
  const shouldShowTimePicker = showTimePicker && timePicker;
  const disabledTimeConfig =
    shouldShowTimePicker && disabledTime ? getTimeConfig(selectedValue, disabledTime) : null;
  const rangeClassName = `${prefixCls}-range`;
  const newProps = {
    locale,
    value,
    prefixCls,
    showTimePicker,
  };
  const index = direction === 'left' ? 0 : 1;
  const timePickerEle =
    shouldShowTimePicker &&
    React.cloneElement(timePicker, {
      showHour: true,
      showMinute: true,
      showSecond: true,
      ...timePicker.props,
      ...disabledTimeConfig,
      ...timePickerDisabledTime,
      onChange: onInputChange,
      defaultOpenValue: value,
      value: selectedValue[index],
    });

  const dateInputElement = props.showDateInput && (
    <DateInput
      format={format}
      locale={locale}
      prefixCls={prefixCls}
      disabledDate={disabledDate}
      placeholder={placeholder}
      value={value as Moment}
      showClear={showClear || false}
      selectedValue={selectedValue[index]}
      onChange={onInputChange}
      onSelect={onInputSelect}
      clearIcon={clearIcon}
      inputMode={inputMode}
    />
  );

  return (
    <div className={`${rangeClassName}-part ${rangeClassName}-${direction}`}>
      {dateInputElement}
      <div style={{ outline: 'none' }}>
        <CalendarHeader
          {...newProps}
          mode={mode}
          value={value as Moment}
          enableNext={enableNext}
          enablePrev={enablePrev}
          onValueChange={props.onValueChange}
          onPanelChange={props.onPanelChange}
          disabledMonth={props.disabledMonth}
        />
        {showTimePicker ? (
          <div className={`${prefixCls}-time-picker`}>
            <div className={`${prefixCls}-time-picker-panel`}>{timePickerEle}</div>
          </div>
        ) : null}
        <div className={`${prefixCls}-body`}>
          <DateTable
            {...newProps}
            value={value as Moment}
            hoverValue={hoverValue}
            selectedValue={selectedValue}
            dateRender={props.dateRender}
            onSelect={props.onSelect}
            onDayHover={props.onDayHover}
            disabledDate={disabledDate as any}
            showWeekNumber={props.showWeekNumber}
          />
        </div>
      </div>
    </div>
  );
};

export default CalendarPart;
