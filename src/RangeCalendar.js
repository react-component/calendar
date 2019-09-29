import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import classnames from 'classnames';
import { polyfill } from 'react-lifecycles-compat';
import KeyCode from 'rc-util/lib/KeyCode';
import CalendarPart from './range-calendar/CalendarPart';
import TodayButton from './calendar/TodayButton';
import OkButton from './calendar/OkButton';
import TimePickerButton from './calendar/TimePickerButton';
import { commonMixinWrapper, propType, defaultProp } from './mixin/CommonMixin';
import { syncTime, getTodayTime, isAllowedDate } from './util';
import { goTime, goStartMonth, goEndMonth, includesTime } from './util/toTime';

function noop() { }

function isEmptyArray(arr) {
  return Array.isArray(arr) && (arr.length === 0 || arr.every(i => !i));
}

function isArraysEqual(a, b) {
  if (a === b) return true;
  if (a === null || typeof a === 'undefined' || b === null || typeof b === 'undefined') {
    return false;
  }
  if (a.length !== b.length) return false;

  for (let i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}

function getValueFromSelectedValue(selectedValue) {
  let [start, end] = selectedValue;
  if (end && (start === undefined || start === null)) {
    start = end.clone().subtract(1, 'month');
  }

  if (start && (end === undefined || end === null)) {
    end = start.clone().add(1, 'month');
  }
  return [start, end];
}

function normalizeAnchor(props, init) {
  const selectedValue = props.selectedValue || init && props.defaultSelectedValue;
  const value = props.value || init && props.defaultValue;
  const normalizedValue = value ?
    getValueFromSelectedValue(value) :
    getValueFromSelectedValue(selectedValue);
  return !isEmptyArray(normalizedValue) ?
    normalizedValue : init && [moment(), moment().add(1, 'months')];
}

function generateOptions(length, extraOptionGen) {
  const arr = extraOptionGen ? extraOptionGen().concat() : [];
  for (let value = 0; value < length; value++) {
    if (arr.indexOf(value) === -1) {
      arr.push(value);
    }
  }
  return arr;
}

function onInputSelect(direction, value, cause) {
  if (!value) {
    return;
  }
  const originalValue = this.state.selectedValue;
  const selectedValue = originalValue.concat();
  const index = direction === 'left' ? 0 : 1;
  selectedValue[index] = value;
  if (selectedValue[0] && this.compare(selectedValue[0], selectedValue[1]) > 0) {
    selectedValue[1 - index] = this.state.showTimePicker ? selectedValue[index] : undefined;
  }
  this.props.onInputSelect(selectedValue);
  this.fireSelectValueChange(selectedValue, null, cause || { source: 'dateInput' });
}

class RangeCalendar extends React.Component {
  static propTypes = {
    ...propType,
    prefixCls: PropTypes.string,
    dateInputPlaceholder: PropTypes.any,
    seperator: PropTypes.string,
    defaultValue: PropTypes.any,
    value: PropTypes.any,
    hoverValue: PropTypes.any,
    mode: PropTypes.arrayOf(PropTypes.oneOf(['time', 'date', 'month', 'year', 'decade'])),
    showDateInput: PropTypes.bool,
    timePicker: PropTypes.any,
    showOk: PropTypes.bool,
    showToday: PropTypes.bool,
    defaultSelectedValue: PropTypes.array,
    selectedValue: PropTypes.array,
    onOk: PropTypes.func,
    showClear: PropTypes.bool,
    locale: PropTypes.object,
    onChange: PropTypes.func,
    onSelect: PropTypes.func,
    onValueChange: PropTypes.func,
    onHoverChange: PropTypes.func,
    onPanelChange: PropTypes.func,
    format: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
    onClear: PropTypes.func,
    type: PropTypes.any,
    disabledDate: PropTypes.func,
    disabledTime: PropTypes.func,
    clearIcon: PropTypes.node,
    onKeyDown: PropTypes.func,
  }

  static defaultProps = {
    ...defaultProp,
    type: 'both',
    seperator: '~',
    defaultSelectedValue: [],
    onValueChange: noop,
    onHoverChange: noop,
    onPanelChange: noop,
    disabledTime: noop,
    onInputSelect: noop,
    showToday: true,
    showDateInput: true,
  }

  constructor(props) {
    super(props);
    const selectedValue = props.selectedValue || props.defaultSelectedValue;
    const value = normalizeAnchor(props, 1);
    this.state = {
      selectedValue,
      prevSelectedValue: selectedValue,
      firstSelectedValue: null,
      hoverValue: props.hoverValue || [],
      value,
      showTimePicker: false,
      mode: props.mode || ['date', 'date'],
      panelTriggerSource: '', // Trigger by which picker panel: 'start' & 'end'
    };
  }

  onDatePanelEnter = () => {
    if (this.hasSelectedValue()) {
      this.fireHoverValueChange(this.state.selectedValue.concat());
    }
  }

  onDatePanelLeave = () => {
    if (this.hasSelectedValue()) {
      this.fireHoverValueChange([]);
    }
  }

  onSelect = (value) => {
    const { type } = this.props;
    const { selectedValue, prevSelectedValue, firstSelectedValue } = this.state;
    let nextSelectedValue;
    if (type === 'both') {
      if (!firstSelectedValue) {
        syncTime(prevSelectedValue[0], value);
        nextSelectedValue = [value];
      } else if (this.compare(firstSelectedValue, value) < 0) {
        syncTime(prevSelectedValue[1], value);
        nextSelectedValue = [firstSelectedValue, value];
      } else {
        syncTime(prevSelectedValue[0], value);
        syncTime(prevSelectedValue[1], firstSelectedValue);
        nextSelectedValue = [value, firstSelectedValue];
      }
    } else if (type === 'start') {
      syncTime(prevSelectedValue[0], value);
      const endValue = selectedValue[1];
      nextSelectedValue = endValue && this.compare(endValue, value) > 0 ?
        [value, endValue] : [value];
    } else { // type === 'end'
      const startValue = selectedValue[0];
      if (startValue && this.compare(startValue, value) <= 0) {
        syncTime(prevSelectedValue[1], value);
        nextSelectedValue = [startValue, value];
      } else {
        syncTime(prevSelectedValue[0], value);
        nextSelectedValue = [value];
      }
    }

    this.fireSelectValueChange(nextSelectedValue);
  }

  onKeyDown = (event) => {
    if (event.target.nodeName.toLowerCase() === 'input') {
      return;
    }

    const { keyCode } = event;
    const ctrlKey = event.ctrlKey || event.metaKey;

    const {
      selectedValue, hoverValue, firstSelectedValue,
      value, // Value is used for `CalendarPart` current page
    } = this.state;
    const { onKeyDown, disabledDate } = this.props;

    // Update last time of the picker
    const updateHoverPoint = (func) => {
      // Change hover to make focus in UI
      let currentHoverTime;
      let nextHoverTime;
      let nextHoverValue;

      if (!firstSelectedValue) {
        currentHoverTime = hoverValue[0] || selectedValue[0] || value[0] || moment();
        nextHoverTime = func(currentHoverTime);
        nextHoverValue = [nextHoverTime];
        this.fireHoverValueChange(nextHoverValue);
      } else {
        if (hoverValue.length === 1) {
          currentHoverTime = hoverValue[0].clone();
          nextHoverTime = func(currentHoverTime);
          nextHoverValue = this.onDayHover(nextHoverTime);
        } else {
          currentHoverTime = hoverValue[0].isSame(firstSelectedValue, 'day') ?
            hoverValue[1] : hoverValue[0];
          nextHoverTime = func(currentHoverTime);
          nextHoverValue = this.onDayHover(nextHoverTime);
        }
      }

      // Find origin hover time on value index
      if (nextHoverValue.length >= 2) {
        const miss = nextHoverValue.some(ht => !includesTime(value, ht, 'month'));
        if (miss) {
          const newValue = nextHoverValue.slice()
            .sort((t1, t2) => t1.valueOf() - t2.valueOf());
          if (newValue[0].isSame(newValue[1], 'month')) {
            newValue[1] = newValue[0].clone().add(1, 'month');
          }
          this.fireValueChange(newValue);
        }
      } else if (nextHoverValue.length === 1) {
        // If only one value, let's keep the origin panel
        let oriValueIndex = value.findIndex(time => time.isSame(currentHoverTime, 'month'));
        if (oriValueIndex === -1) oriValueIndex = 0;

        if (value.every(time => !time.isSame(nextHoverTime, 'month'))) {
          const newValue = value.slice();
          newValue[oriValueIndex] = nextHoverTime.clone();
          this.fireValueChange(newValue);
        }
      }

      event.preventDefault();

      return nextHoverTime;
    };

    switch (keyCode) {
      case KeyCode.DOWN:
        updateHoverPoint((time) => goTime(time, 1, 'weeks'));
        return;
      case KeyCode.UP:
        updateHoverPoint((time) => goTime(time, -1, 'weeks'));
        return;
      case KeyCode.LEFT:
        if (ctrlKey) {
          updateHoverPoint((time) => goTime(time, -1, 'years'));
        } else {
          updateHoverPoint((time) => goTime(time, -1, 'days'));
        }
        return;
      case KeyCode.RIGHT:
        if (ctrlKey) {
          updateHoverPoint((time) => goTime(time, 1, 'years'));
        } else {
          updateHoverPoint((time) => goTime(time, 1, 'days'));
        }
        return;
      case KeyCode.HOME:
        updateHoverPoint((time) => goStartMonth(time));
        return;
      case KeyCode.END:
        updateHoverPoint((time) => goEndMonth(time));
        return;
      case KeyCode.PAGE_DOWN:
        updateHoverPoint((time) => goTime(time, 1, 'month'));
        return;
      case KeyCode.PAGE_UP:
        updateHoverPoint((time) => goTime(time, -1, 'month'));
        return;
      case KeyCode.ENTER: {
        let lastValue;
        if (hoverValue.length === 0) {
          lastValue = updateHoverPoint(time => time);
        } else if (hoverValue.length === 1) {
          lastValue = hoverValue[0];
        } else {
          lastValue = hoverValue[0].isSame(firstSelectedValue, 'day') ?
            hoverValue[1] : hoverValue[0];
        }
        if (lastValue && (!disabledDate || !disabledDate(lastValue))) {
          this.onSelect(lastValue);
        }
        event.preventDefault();
        return;
      }
      default:
        if (onKeyDown) {
          onKeyDown(event);
        }
    }
  }

  onDayHover = (value) => {
    let hoverValue = [];
    const { selectedValue, firstSelectedValue } = this.state;

    const { type } = this.props;
    if (type === 'start' && selectedValue[1]) {
      hoverValue = this.compare(value, selectedValue[1]) < 0 ?
        [value, selectedValue[1]] : [value];
    } else if (type === 'end' && selectedValue[0]) {
      hoverValue = this.compare(value, selectedValue[0]) > 0 ?
        [selectedValue[0], value] : [];
    } else {
      if (!firstSelectedValue) {
        if (this.state.hoverValue.length) {
          this.setState({ hoverValue: [] });
        }
        return hoverValue;
      }
      hoverValue = this.compare(value, firstSelectedValue) < 0 ?
        [value, firstSelectedValue] : [firstSelectedValue, value];
    }
    this.fireHoverValueChange(hoverValue);

    return hoverValue;
  }

  onToday = () => {
    const startValue = getTodayTime(this.state.value[0]);
    const endValue = startValue.clone().add(1, 'months');
    this.setState({ value: [startValue, endValue] });
  }

  onOpenTimePicker = () => {
    this.setState({
      showTimePicker: true,
    });
  }

  onCloseTimePicker = () => {
    this.setState({
      showTimePicker: false,
    });
  }

  onOk = () => {
    const { selectedValue } = this.state;
    if (this.isAllowedDateAndTime(selectedValue)) {
      this.props.onOk(this.state.selectedValue);
    }
  }

  onStartInputChange = (...oargs) => {
    const args = ['left'].concat(oargs);
    return onInputSelect.apply(this, args);
  }

  onEndInputChange = (...oargs) => {
    const args = ['right'].concat(oargs);
    return onInputSelect.apply(this, args);
  }

  onStartInputSelect = (value) => {
    const args = ['left', value, { source: 'dateInputSelect' }];
    return onInputSelect.apply(this, args);
  }

  onEndInputSelect = (value) => {
    const args = ['right', value, { source: 'dateInputSelect' }];
    return onInputSelect.apply(this, args);
  }

  onStartValueChange = (leftValue) => {
    const value = [...this.state.value];
    value[0] = leftValue;
    return this.fireValueChange(value);
  }

  onEndValueChange = (rightValue) => {
    const value = [...this.state.value];
    value[1] = rightValue;
    return this.fireValueChange(value);
  }

  onStartPanelChange = (value, mode) => {
    const { props, state } = this;
    const newMode = [mode, state.mode[1]];
    const newState = {
      panelTriggerSource: 'start',
    };
    if (!('mode' in props)) {
      newState.mode = newMode;
    }
    this.setState(newState);
    const newValue = [value || state.value[0], state.value[1]];
    props.onPanelChange(newValue, newMode);
  }

  onEndPanelChange = (value, mode) => {
    const { props, state } = this;
    const newMode = [state.mode[0], mode];
    const newState = {
      panelTriggerSource: 'end',
    };
    if (!('mode' in props)) {
      newState.mode = newMode;
    }
    this.setState(newState);
    const newValue = [state.value[0], value || state.value[1]];
    props.onPanelChange(newValue, newMode);
  }

  static getDerivedStateFromProps(nextProps, state) {
    const newState = {};
    if ('value' in nextProps) {
      newState.value = normalizeAnchor(nextProps, 0);
    }
    if ('hoverValue' in nextProps && !isArraysEqual(state.hoverValue, nextProps.hoverValue)) {
      newState.hoverValue = nextProps.hoverValue;
    }
    if ('selectedValue' in nextProps) {
      newState.selectedValue = nextProps.selectedValue;
      newState.prevSelectedValue = nextProps.selectedValue;
    }
    if ('mode' in nextProps && !isArraysEqual(state.mode, nextProps.mode)) {
      newState.mode = nextProps.mode;
    }
    return newState;
  }

  getStartValue = () => {
    const { selectedValue, showTimePicker, value, mode, panelTriggerSource } = this.state;
    let startValue = value[0];
    // keep selectedTime when select date
    if (selectedValue[0] && this.props.timePicker) {
      startValue = startValue.clone();
      syncTime(selectedValue[0], startValue);
    }
    if (showTimePicker && selectedValue[0]) {
      startValue = selectedValue[0];
    }

    // Adjust month if date not align
    if (
      panelTriggerSource === 'end' &&
      mode[0] === 'date' &&
      mode[1] === 'date' &&
      startValue.isSame(value[1], 'month')
    ) {
      startValue = startValue.clone().subtract(1, 'month');
    }

    return startValue;
  }

  getEndValue = () => {
    const { value, selectedValue, showTimePicker, mode, panelTriggerSource } = this.state;
    let endValue = value[1] ? value[1].clone() : value[0].clone().add(1, 'month');
    // keep selectedTime when select date
    if (selectedValue[1] && this.props.timePicker) {
      syncTime(selectedValue[1], endValue);
    }
    if (showTimePicker) {
      endValue = selectedValue[1] ? selectedValue[1] : this.getStartValue();
    }

    // Adjust month if date not align
    if (
      !showTimePicker &&
      panelTriggerSource !== 'end' &&
      mode[0] === 'date' &&
      mode[1] === 'date' &&
      endValue.isSame(value[0], 'month')
    ) {
      endValue = endValue.clone().add(1, 'month');
    }

    return endValue;
  }

  // get disabled hours for second picker
  getEndDisableTime = () => {
    const { selectedValue, value } = this.state;
    const { disabledTime } = this.props;
    const userSettingDisabledTime = disabledTime(selectedValue, 'end') || {};
    const startValue = selectedValue && selectedValue[0] || value[0].clone();
    // if startTime and endTime is same day..
    // the second time picker will not able to pick time before first time picker
    if (!selectedValue[1] || startValue.isSame(selectedValue[1], 'day')) {
      const hours = startValue.hour();
      const minutes = startValue.minute();
      const second = startValue.second();
      let { disabledHours, disabledMinutes, disabledSeconds } = userSettingDisabledTime;
      const oldDisabledMinutes = disabledMinutes ? disabledMinutes() : [];
      const olddisabledSeconds = disabledSeconds ? disabledSeconds() : [];
      disabledHours = generateOptions(hours, disabledHours);
      disabledMinutes = generateOptions(minutes, disabledMinutes);
      disabledSeconds = generateOptions(second, disabledSeconds);
      return {
        disabledHours() {
          return disabledHours;
        },
        disabledMinutes(hour) {
          if (hour === hours) {
            return disabledMinutes;
          }
          return oldDisabledMinutes;
        },
        disabledSeconds(hour, minute) {
          if (hour === hours && minute === minutes) {
            return disabledSeconds;
          }
          return olddisabledSeconds;
        },
      };
    }
    return userSettingDisabledTime;
  }

  isAllowedDateAndTime = (selectedValue) => {
    return isAllowedDate(selectedValue[0], this.props.disabledDate, this.disabledStartTime) &&
      isAllowedDate(selectedValue[1], this.props.disabledDate, this.disabledEndTime);
  }

  isMonthYearPanelShow = (mode) => {
    return ['month', 'year', 'decade'].indexOf(mode) > -1;
  }

  hasSelectedValue = () => {
    const { selectedValue } = this.state;
    return !!selectedValue[1] && !!selectedValue[0];
  }

  compare = (v1, v2) => {
    if (this.props.timePicker) {
      return v1.diff(v2);
    }
    return v1.diff(v2, 'days');
  }

  fireSelectValueChange = (selectedValue, direct, cause) => {
    const { timePicker } = this.props;
    const { prevSelectedValue } = this.state;
    if (timePicker && timePicker.props.defaultValue) {
      const timePickerDefaultValue = timePicker.props.defaultValue;
      if (!prevSelectedValue[0] && selectedValue[0]) {
        syncTime(timePickerDefaultValue[0], selectedValue[0]);
      }
      if (!prevSelectedValue[1] && selectedValue[1]) {
        syncTime(timePickerDefaultValue[1], selectedValue[1]);
      }
    }

    if (!('selectedValue' in this.props)) {
      this.setState({
        selectedValue,
      });
    }

    // 尚未选择过时间，直接输入的话
    if (!this.state.selectedValue[0] || !this.state.selectedValue[1]) {
      const startValue = selectedValue[0] || moment();
      const endValue = selectedValue[1] || startValue.clone().add(1, 'months');
      this.setState({
        selectedValue,
        value: getValueFromSelectedValue([startValue, endValue]),
      });
    }

    if (selectedValue[0] && !selectedValue[1]) {
      this.setState({ firstSelectedValue: selectedValue[0] });
      this.fireHoverValueChange(selectedValue.concat());
    }
    this.props.onChange(selectedValue);
    if (direct || selectedValue[0] && selectedValue[1]) {
      this.setState({
        prevSelectedValue: selectedValue,
        firstSelectedValue: null,
      });
      this.fireHoverValueChange([]);
      this.props.onSelect(selectedValue, cause);
    }
  }

  fireValueChange = (value) => {
    const props = this.props;
    if (!('value' in props)) {
      this.setState({
        value,
      });
    }
    props.onValueChange(value);
  }

  fireHoverValueChange = (hoverValue) => {
    const props = this.props;
    if (!('hoverValue' in props)) {
      this.setState({ hoverValue });
    }
    props.onHoverChange(hoverValue);
  }

  clear = () => {
    this.fireSelectValueChange([], true);
    this.props.onClear();
  }

  disabledStartTime = (time) => {
    return this.props.disabledTime(time, 'start');
  }

  disabledEndTime = (time) => {
    return this.props.disabledTime(time, 'end');
  }

  disabledStartMonth = (month) => {
    const { value } = this.state;
    return month.isAfter(value[1], 'month');
  }

  disabledEndMonth = (month) => {
    const { value } = this.state;
    return month.isBefore(value[0], 'month');
  }

  render() {
    const { props, state } = this;
    const {
      prefixCls, dateInputPlaceholder, seperator,
      timePicker, showOk, locale, showClear,
      showToday, type, clearIcon,
    } = props;
    const {
      hoverValue,
      selectedValue,
      mode,
      showTimePicker,
    } = state;
    const className = {
      [props.className]: !!props.className,
      [prefixCls]: 1,
      [`${prefixCls}-hidden`]: !props.visible,
      [`${prefixCls}-range`]: 1,
      [`${prefixCls}-show-time-picker`]: showTimePicker,
      [`${prefixCls}-week-number`]: props.showWeekNumber,
    };
    const classes = classnames(className);
    const newProps = {
      selectedValue: state.selectedValue,
      onSelect: this.onSelect,
      onDayHover: type === 'start' && selectedValue[1] ||
        type === 'end' && selectedValue[0] || !!hoverValue.length ?
        this.onDayHover : undefined,
    };

    let placeholder1;
    let placeholder2;

    if (dateInputPlaceholder) {
      if (Array.isArray(dateInputPlaceholder)) {
        [placeholder1, placeholder2] = dateInputPlaceholder;
      } else {
        placeholder1 = placeholder2 = dateInputPlaceholder;
      }
    }
    const showOkButton = showOk === true || showOk !== false && !!timePicker;
    const cls = classnames({
      [`${prefixCls}-footer`]: true,
      [`${prefixCls}-range-bottom`]: true,
      [`${prefixCls}-footer-show-ok`]: showOkButton,
    });

    const startValue = this.getStartValue();
    const endValue = this.getEndValue();
    const todayTime = getTodayTime(startValue);
    const thisMonth = todayTime.month();
    const thisYear = todayTime.year();
    const isTodayInView =
      startValue.year() === thisYear && startValue.month() === thisMonth ||
      endValue.year() === thisYear && endValue.month() === thisMonth;
    const nextMonthOfStart = startValue.clone().add(1, 'months');
    const isClosestMonths = nextMonthOfStart.year() === endValue.year() &&
      nextMonthOfStart.month() === endValue.month();

    const extraFooter = props.renderFooter();

    return (
      <div
        ref={this.saveRoot}
        className={classes}
        style={props.style}
        tabIndex="0"
        onKeyDown={this.onKeyDown}
      >
        {props.renderSidebar()}
        <div className={`${prefixCls}-panel`}>
          {showClear && selectedValue[0] && selectedValue[1] ?
            <a
              role="button"
              title={locale.clear}
              onClick={this.clear}
            >
              {clearIcon || <span className={`${prefixCls}-clear-btn`} />}
            </a> : null}
          <div
            className={`${prefixCls}-date-panel`}
            onMouseLeave={type !== 'both' ? this.onDatePanelLeave : undefined}
            onMouseEnter={type !== 'both' ? this.onDatePanelEnter : undefined}
          >
            <CalendarPart
              {...props}
              {...newProps}
              hoverValue={hoverValue}
              direction="left"
              disabledTime={this.disabledStartTime}
              disabledMonth={this.disabledStartMonth}
              format={this.getFormat()}
              value={startValue}
              mode={mode[0]}
              placeholder={placeholder1}
              onInputChange={this.onStartInputChange}
              onInputSelect={this.onStartInputSelect}
              onValueChange={this.onStartValueChange}
              onPanelChange={this.onStartPanelChange}
              showDateInput={this.props.showDateInput}
              timePicker={timePicker}
              showTimePicker={showTimePicker || mode[0] === 'time'}
              enablePrev
              enableNext={!isClosestMonths || this.isMonthYearPanelShow(mode[1])}
              clearIcon={clearIcon}
            />
            <span className={`${prefixCls}-range-middle`}>{seperator}</span>
            <CalendarPart
              {...props}
              {...newProps}
              hoverValue={hoverValue}
              direction="right"
              format={this.getFormat()}
              timePickerDisabledTime={this.getEndDisableTime()}
              placeholder={placeholder2}
              value={endValue}
              mode={mode[1]}
              onInputChange={this.onEndInputChange}
              onInputSelect={this.onEndInputSelect}
              onValueChange={this.onEndValueChange}
              onPanelChange={this.onEndPanelChange}
              showDateInput={this.props.showDateInput}
              timePicker={timePicker}
              showTimePicker={showTimePicker || mode[1] === 'time'}
              disabledTime={this.disabledEndTime}
              disabledMonth={this.disabledEndMonth}
              enablePrev={!isClosestMonths || this.isMonthYearPanelShow(mode[0])}
              enableNext
              clearIcon={clearIcon}
            />
          </div>
          <div className={cls}>
            {(showToday || props.timePicker || showOkButton || extraFooter) ? (
              <div className={`${prefixCls}-footer-btn`}>
                {extraFooter}
                {showToday ? (
                  <TodayButton
                    {...props}
                    disabled={isTodayInView}
                    value={state.value[0]}
                    onToday={this.onToday}
                    text={locale.backToToday}
                  />
                ) : null}
                {props.timePicker ?
                  <TimePickerButton
                    {...props}
                    showTimePicker={showTimePicker || (mode[0] === 'time' && mode[1] === 'time')}
                    onOpenTimePicker={this.onOpenTimePicker}
                    onCloseTimePicker={this.onCloseTimePicker}
                    timePickerDisabled={!this.hasSelectedValue() || hoverValue.length}
                  /> : null}
                {showOkButton ?
                  <OkButton
                    {...props}
                    onOk={this.onOk}
                    okDisabled={!this.isAllowedDateAndTime(selectedValue) ||
                      !this.hasSelectedValue() || hoverValue.length
                    }
                  /> : null}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

polyfill(RangeCalendar);

export default commonMixinWrapper(RangeCalendar);
