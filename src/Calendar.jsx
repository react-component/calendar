import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import KeyCode from 'rc-util/lib/KeyCode';
import { polyfill } from 'react-lifecycles-compat';
import DateTable from './date/DateTable';
import CalendarHeader from './calendar/CalendarHeader';
import CalendarFooter from './calendar/CalendarFooter';
import {
  calendarMixinWrapper,
  calendarMixinPropTypes,
  calendarMixinDefaultProps,
  getNowByCurrentStateValue,
} from './mixin/CalendarMixin';
import { commonMixinWrapper, propType, defaultProp } from './mixin/CommonMixin';
import DateInput from './date/DateInput';
import { getTimeConfig, getTodayTime, syncTime } from './util';
import { goStartMonth, goEndMonth, goTime } from './util/toTime';
import moment from 'moment';

function noop() {
}

const getMomentObjectIfValid = date => {
  if (moment.isMoment(date) && date.isValid()) {
    return date;
  }
  return false;
};

class Calendar extends React.Component {
  static propTypes = {
    ...calendarMixinPropTypes,
    ...propType,
    prefixCls: PropTypes.string,
    className: PropTypes.string,
    style: PropTypes.object,
    defaultValue: PropTypes.object,
    value: PropTypes.object,
    selectedValue: PropTypes.object,
    defaultSelectedValue: PropTypes.object,
    mode: PropTypes.oneOf(['time', 'date', 'month', 'year', 'decade']),
    locale: PropTypes.object,
    showDateInput: PropTypes.bool,
    showWeekNumber: PropTypes.bool,
    showToday: PropTypes.bool,
    showOk: PropTypes.bool,
    onSelect: PropTypes.func,
    onOk: PropTypes.func,
    onKeyDown: PropTypes.func,
    timePicker: PropTypes.element,
    dateInputPlaceholder: PropTypes.any,
    onClear: PropTypes.func,
    onChange: PropTypes.func,
    onPanelChange: PropTypes.func,
    disabledDate: PropTypes.func,
    disabledTime: PropTypes.any,
    dateRender: PropTypes.func,
    renderFooter: PropTypes.func,
    renderSidebar: PropTypes.func,
    clearIcon: PropTypes.node,
    focusablePanel: PropTypes.bool,
    inputMode: PropTypes.string,
    onBlur: PropTypes.func,
  }

  static defaultProps = {
    ...calendarMixinDefaultProps,
    ...defaultProp,
    showToday: true,
    showDateInput: true,
    timePicker: null,
    onOk: noop,
    onPanelChange: noop,
    focusablePanel: true,
  }

  constructor(props) {
    super(props);
    this.state = {
      mode: this.props.mode || 'date',
      value:
          getMomentObjectIfValid(props.value) ||
          getMomentObjectIfValid(props.defaultValue) ||
          moment(),
      selectedValue: props.selectedValue || props.defaultSelectedValue,
    };
  }

  componentDidMount() {
    if (this.props.showDateInput) {
      this.saveFocusElement(DateInput.getInstance());
    }
  }

  onPanelChange = (value, mode) => {
    const { props, state } = this;
    if (!('mode' in props)) {
      this.setState({ mode });
    }
    props.onPanelChange(value || state.value, mode);
  }

  onKeyDown = (event) => {
    if (event.target.nodeName.toLowerCase() === 'input') {
      return undefined;
    }
    const keyCode = event.keyCode;
    // mac
    const ctrlKey = event.ctrlKey || event.metaKey;
    const { disabledDate } = this.props;
    const { value } = this.state;
    switch (keyCode) {
      case KeyCode.DOWN:
        this.goTime(1, 'weeks');
        event.preventDefault();
        return 1;
      case KeyCode.UP:
        this.goTime(-1, 'weeks');
        event.preventDefault();
        return 1;
      case KeyCode.LEFT:
        if (ctrlKey) {
          this.goTime(-1, 'years');
        } else {
          this.goTime(-1, 'days');
        }
        event.preventDefault();
        return 1;
      case KeyCode.RIGHT:
        if (ctrlKey) {
          this.goTime(1, 'years');
        } else {
          this.goTime(1, 'days');
        }
        event.preventDefault();
        return 1;
      case KeyCode.HOME:
        this.setValue(
          goStartMonth(this.state.value),
        );
        event.preventDefault();
        return 1;
      case KeyCode.END:
        this.setValue(
          goEndMonth(this.state.value),
        );
        event.preventDefault();
        return 1;
      case KeyCode.PAGE_DOWN:
        this.goTime(1, 'month');
        event.preventDefault();
        return 1;
      case KeyCode.PAGE_UP:
        this.goTime(-1, 'month');
        event.preventDefault();
        return 1;
      case KeyCode.ENTER:
        if (!disabledDate || !disabledDate(value)) {
          this.onSelect(value, {
            source: 'keyboard',
          });
        }
        event.preventDefault();
        return 1;
      default:
        this.props.onKeyDown(event);
        return 1;
    }
  }

  onClear = () => {
    this.onSelect(null);
    this.props.onClear();
  }

  onOk = () => {
    const { selectedValue } = this.state;
    if (this.isAllowedDate(selectedValue)) {
      this.props.onOk(selectedValue);
    }
  }

  onDateInputChange = (value) => {
    this.onSelect(value, {
      source: 'dateInput',
    });
  }

  onDateInputSelect = (value) => {
    this.onSelect(value, {
      source: 'dateInputSelect',
    });
  }

  onDateTableSelect = (value) => {
    const { timePicker } = this.props;
    const { selectedValue } = this.state;
    if (!selectedValue && timePicker) {
      const timePickerDefaultValue = timePicker.props.defaultValue;
      if (timePickerDefaultValue) {
        syncTime(timePickerDefaultValue, value);
      }
    }
    this.onSelect(value);
  }

  onToday = () => {
    const { value } = this.state;
    const now = getTodayTime(value);
    this.onSelect(now, {
      source: 'todayButton',
    });
  }

  onBlur = (event) => {
    setTimeout(() => {
      const dateInput = DateInput.getInstance();
      const rootInstance = this.rootInstance;

      if (!rootInstance || rootInstance.contains(document.activeElement) ||
      (dateInput && dateInput.contains(document.activeElement))) {
        // focused element is still part of Calendar
        return;
      }

      if (this.props.onBlur) {
        this.props.onBlur(event);
      }
    }, 0);
  }

  static getDerivedStateFromProps(nextProps, state) {
    const { value, selectedValue } = nextProps;
    let newState = {};

    if ('mode' in nextProps && state.mode !== nextProps.mode) {
      newState = { mode: nextProps.mode };
    }
    if ('value' in nextProps) {
      newState.value =
          getMomentObjectIfValid(value) ||
          getMomentObjectIfValid(nextProps.defaultValue) ||
          getNowByCurrentStateValue(state.value);
    }
    if ('selectedValue' in nextProps) {
      newState.selectedValue = selectedValue;
    }

    return newState;
  }

  getRootDOMNode = () => {
    return ReactDOM.findDOMNode(this);
  }

  openTimePicker = () => {
    this.onPanelChange(null, 'time');
  }

  closeTimePicker = () => {
    this.onPanelChange(null, 'date');
  }


  goTime = (direction, unit) => {
    this.setValue(
      goTime(this.state.value, direction, unit),
    );
  }

  render() {
    const { props, state } = this;
    const {
      locale, prefixCls, disabledDate,
      dateInputPlaceholder, timePicker,
      disabledTime, clearIcon, renderFooter, inputMode,
      monthCellRender, monthCellContentRender,
    } = props;
    const { value, selectedValue, mode } = state;
    const showTimePicker = mode === 'time';
    const disabledTimeConfig = showTimePicker && disabledTime && timePicker ?
      getTimeConfig(selectedValue, disabledTime) : null;

    let timePickerEle = null;

    if (timePicker && showTimePicker) {
      const timePickerProps = {
        showHour: true,
        showSecond: true,
        showMinute: true,
        ...timePicker.props,
        ...disabledTimeConfig,
        onChange: this.onDateInputChange,
        value: selectedValue,
        disabledTime,
      };

      if (timePicker.props.defaultValue !== undefined) {
        timePickerProps.defaultOpenValue = timePicker.props.defaultValue;
      }

      timePickerEle = React.cloneElement(timePicker, timePickerProps);
    }

    const dateInputElement = props.showDateInput ? (
      <DateInput
        format={this.getFormat()}
        key="date-input"
        value={value}
        locale={locale}
        placeholder={dateInputPlaceholder}
        showClear
        disabledTime={disabledTime}
        disabledDate={disabledDate}
        onClear={this.onClear}
        prefixCls={prefixCls}
        selectedValue={selectedValue}
        onChange={this.onDateInputChange}
        onSelect={this.onDateInputSelect}
        clearIcon={clearIcon}
        inputMode={inputMode}
      />
    ) : null;

    const children = [];
    if (props.renderSidebar) {
      children.push(props.renderSidebar());
    }
    children.push(<div className={`${prefixCls}-panel`} key="panel">
      {dateInputElement}
      <div
        tabIndex={this.props.focusablePanel ? 0 : undefined}
        className={`${prefixCls}-date-panel`}
      >
        <CalendarHeader
          locale={locale}
          mode={mode}
          value={value}
          onValueChange={this.setValue}
          onPanelChange={this.onPanelChange}
          renderFooter={renderFooter}
          showTimePicker={showTimePicker}
          prefixCls={prefixCls}
          monthCellRender={monthCellRender}
          monthCellContentRender={monthCellContentRender}
        />
        {timePicker && showTimePicker ?
          (<div className={`${prefixCls}-time-picker`}>
            <div className={`${prefixCls}-time-picker-panel`}>
              {timePickerEle}
            </div>
          </div>)
          : null}
        <div className={`${prefixCls}-body`}>
          <DateTable
            locale={locale}
            value={value}
            selectedValue={selectedValue}
            prefixCls={prefixCls}
            dateRender={props.dateRender}
            onSelect={this.onDateTableSelect}
            disabledDate={disabledDate}
            showWeekNumber={props.showWeekNumber}
          />
        </div>

        <CalendarFooter
          showOk={props.showOk}
          mode={mode}
          renderFooter={props.renderFooter}
          locale={locale}
          prefixCls={prefixCls}
          showToday={props.showToday}
          disabledTime={disabledTime}
          showTimePicker={showTimePicker}
          showDateInput={props.showDateInput}
          timePicker={timePicker}
          selectedValue={selectedValue}
          timePickerDisabled={!selectedValue}
          value={value}
          disabledDate={disabledDate}
          okDisabled={
            props.showOk !== false && (!selectedValue || !this.isAllowedDate(selectedValue))
          }
          onOk={this.onOk}
          onSelect={this.onSelect}
          onToday={this.onToday}
          onOpenTimePicker={this.openTimePicker}
          onCloseTimePicker={this.closeTimePicker}
        />
      </div>
    </div>);

    return this.renderRoot({
      children,
      className: props.showWeekNumber ? `${prefixCls}-week-number` : '',
    });
  }
}

polyfill(Calendar);

export default calendarMixinWrapper(commonMixinWrapper(Calendar));
