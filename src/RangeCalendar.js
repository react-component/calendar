import React, { PropTypes } from 'react';
import moment from 'moment';
import classnames from 'classnames';
import CalendarPart from './range-calendar/CalendarPart';
import { syncTime, getTodayTime, isAllowedDate } from './util/';
import TodayButton from './calendar/TodayButton';
import OkButton from './calendar/OkButton';
import TimePickerButton from './calendar/TimePickerButton';
import CommonMixin from './mixin/CommonMixin';

function noop() {
}

function getNow() {
  return moment();
}

function onValueChange(direction, current) {
  let value;
  value = current;
  if (direction === 'right') {
    value.add(-1, 'months');
  }
  this.fireValueChange(value);
}

function normalizeAnchor(props, init) {
  const selectedValue = props.selectedValue || init && props.defaultSelectedValue || [];
  let value = props.value;
  if (Array.isArray(value)) {
    value = value[0];
  }
  let defaultValue = props.defaultValue;
  if (Array.isArray(defaultValue)) {
    defaultValue = defaultValue[0];
  }
  return value || init && defaultValue || selectedValue[0] || init && getNow();
}

function generateOptions(length) {
  const arr = [];
  for (let value = 0; value < length; value++) {
    arr.push(value);
  }
  return arr;
}

function onInputSelect(direction, value) {
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
  this.fireSelectValueChange(selectedValue);
}

const RangeCalendar = React.createClass({
  propTypes: {
    prefixCls: PropTypes.string,
    dateInputPlaceholder: PropTypes.any,
    defaultValue: PropTypes.any,
    timePicker: PropTypes.any,
    value: PropTypes.any,
    showOk: PropTypes.bool,
    showToday: PropTypes.bool,
    selectedValue: PropTypes.array,
    defaultSelectedValue: PropTypes.array,
    onOk: PropTypes.func,
    showClear: PropTypes.bool,
    locale: PropTypes.object,
    onChange: PropTypes.func,
    onSelect: PropTypes.func,
    onValueChange: PropTypes.func,
    disabledDate: PropTypes.func,
    format: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    onClear: PropTypes.func,
    type: PropTypes.any,
    disabledTime: PropTypes.func,
  },

  mixins: [CommonMixin],

  getDefaultProps() {
    return {
      type: 'both',
      defaultSelectedValue: [],
      onValueChange: noop,
      disabledTime: noop,
      showToday: true,
    };
  },

  getInitialState() {
    const props = this.props;
    const selectedValue = props.selectedValue || props.defaultSelectedValue;
    const value = normalizeAnchor(props, 1);
    return {
      selectedValue,
      hoverValue: [],
      value,
      showTimePicker: false,
    };
  },

  componentWillReceiveProps(nextProps) {
    const newState = {};
    if ('value' in nextProps) {
      if (nextProps.value) {
        newState.value = nextProps.value;
      } else {
        newState.value = normalizeAnchor(nextProps, 0);
      }
      this.setState(newState);
    }
    if ('selectedValue' in nextProps) {
      newState.selectedValue = nextProps.selectedValue;
      this.setState(newState);
    }
  },

  onDatePanelEnter() {
    if (this.hasSelectedValue()) {
      this.setState({
        hoverValue: this.state.selectedValue.concat(),
      });
    }
  },

  onDatePanelLeave() {
    if (this.hasSelectedValue()) {
      this.setState({
        hoverValue: [],
      });
    }
  },

  onSelect(value) {
    const { hoverValue, selectedValue } = this.state;
    let nextSelectedValue;
    const { type } = this.props;
    let changed = false;
    if (!hoverValue[0] && !hoverValue[1] && type === 'both') {
      nextSelectedValue = [value];
      changed = true;
    } else if (type === 'start') {
      const endValue = selectedValue[1];
      if (!endValue || this.compare(endValue, value) < 0) {
        nextSelectedValue = [value];
      } else {
        nextSelectedValue = [value, endValue];
      }
      changed = true;
    } else {
      let startValue;
      startValue = type === 'end' ? selectedValue[0] : hoverValue[0];
      if (startValue && this.compare(startValue, value) <= 0) {
        nextSelectedValue = [startValue, value];
        changed = true;
      } else {
        nextSelectedValue = [value];
        changed = true;
      }
    }

    if (changed) {
      this.fireSelectValueChange(nextSelectedValue);
    }
  },

  onDayHover(value) {
    let { hoverValue } = this.state;
    const { selectedValue } = this.state;
    const { type } = this.props;
    if (type === 'start' && selectedValue[1]) {
      if (this.compare(value, selectedValue[1]) < 0) {
        hoverValue = [value, selectedValue[1]];
      } else {
        hoverValue = [value];
      }
      this.setState({
        hoverValue,
      });
    } else if (type === 'end' && selectedValue[0]) {
      if (this.compare(value, selectedValue[0]) > 0) {
        hoverValue = [selectedValue[0], value];
      } else {
        hoverValue = [];
      }
      this.setState({
        hoverValue,
      });
    } else {
      if (!hoverValue[0] || this.compare(value, hoverValue[0]) < 0) {
        return;
      }
      hoverValue[1] = value;
      this.setState({
        hoverValue,
      });
    }
  },

  onToday() {
    this.setState({
      value: getTodayTime(this.state.value),
    });
  },

  onOpenTimePicker() {
    this.setState({
      showTimePicker: true,
    });
  },
  onCloseTimePicker() {
    this.setState({
      showTimePicker: false,
    });
  },

  onOk() {
    const { selectedValue } = this.state;
    if (this.isAllowedDateAndTime(selectedValue)) {
      this.props.onOk(this.state.selectedValue);
    }
  },

  onStartInputSelect(...oargs) {
    const args = ['left'].concat(oargs);
    return onInputSelect.apply(this, args);
  },

  onEndInputSelect(...oargs) {
    const args = ['right'].concat(oargs);
    return onInputSelect.apply(this, args);
  },

  onStartValueChange(...oargs) {
    const args = ['left'].concat(oargs);
    return onValueChange.apply(this, args);
  },

  onEndValueChange(...oargs) {
    const args = ['right'].concat(oargs);
    return onValueChange.apply(this, args);
  },

  getStartValue() {
    let value = this.state.value;
    const selectedValue = this.state.selectedValue;
    // keep selectedTime when select date
    if (selectedValue[0] && this.props.timePicker) {
      value = value.clone();
      syncTime(selectedValue[0], value);
    }
    return value;
  },

  getEndValue() {
    const endValue = this.state.value.clone();
    endValue.add(1, 'months');
    const selectedValue = this.state.selectedValue;
    // keep selectedTime when select date
    if (selectedValue[1] && this.props.timePicker) {
      syncTime(selectedValue[1], endValue);
    }
    if (this.state.showTimePicker) {
      return selectedValue[1] ? selectedValue[1] : this.getStartValue();
    }
    return endValue;
  },
  // get disabled hours for second picker
  getEndDisableTime() {
    const { selectedValue, value } = this.state;
    const startValue = selectedValue && selectedValue[0] || value.clone();
    // if startTime and endTime is same day..
    // the second time picker will not able to pick time before first time picker
    if (!selectedValue[1] || startValue.isSame(selectedValue[1], 'day')) {
      const hours = startValue.hour();
      const minutes = startValue.minute();
      const second = startValue.second();
      const disabledHours = generateOptions(hours);
      const disabledMinutes = generateOptions(minutes);
      const disabledSeconds = generateOptions(second);
      return {
        disabledHours() {
          return disabledHours;
        },
        disabledMinutes(hour) {
          if (hour === hours) {
            return disabledMinutes;
          }
          return [];
        },
        disabledSeconds(hour, minute) {
          if (hour === hours && minute === minutes) {
            return disabledSeconds;
          }
          return [];
        },
      };
    }
    return null;
  },

  isAllowedDateAndTime(selectedValue) {
    return isAllowedDate(selectedValue[0], this.props.disabledDate, this.disabledStartTime) &&
    isAllowedDate(selectedValue[1], this.props.disabledDate, this.disabledEndTime);
  },

  hasSelectedValue() {
    const { selectedValue } = this.state;
    return !!selectedValue[1] && !!selectedValue[0];
  },

  compare(v1, v2) {
    if (this.props.timePicker) {
      return v1.diff(v2);
    }
    return v1.diff(v2, 'days');
  },

  fireSelectValueChange(selectedValue, direct) {
    if (!('selectedValue' in this.props)) {
      this.setState({
        selectedValue,
      });
    }

    // 尚未选择过时间，直接输入的话
    if (!this.state.selectedValue[0] || !this.state.selectedValue[1]) {
      this.setState({
        selectedValue,
        value: selectedValue[0],
      });
    }

    if (selectedValue[0] && !selectedValue[1]) {
      this.setState({
        hoverValue: selectedValue.concat(),
      });
    }
    this.props.onChange(selectedValue);
    if (direct || selectedValue[0] && selectedValue[1]) {
      this.setState({
        hoverValue: [],
      });
      this.props.onSelect(selectedValue);
    }
  },

  fireValueChange(value) {
    const props = this.props;
    if (!('value' in props)) {
      this.setState({
        value,
      });
    }
    props.onValueChange(value);
  },

  clear() {
    this.fireSelectValueChange([], true);
    this.props.onClear();
  },

  disabledStartTime(time) {
    return this.props.disabledTime(time, 'start');
  },

  disabledEndTime(time) {
    return this.props.disabledTime(time, 'end');
  },

  render() {
    const props = this.props;
    const state = this.state;
    const { showTimePicker } = state;
    const {
      prefixCls, dateInputPlaceholder,
      timePicker, showOk, locale, showClear,
      showToday, type,
    } = props;
    const {
      hoverValue,
      selectedValue,
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
    const isThisYear = thisYear === startValue.year() || this.year === endValue.year();
    const isTodayInView = isThisYear && (thisMonth === startValue.month() ||
      thisMonth === endValue.month());

    return (
      <div
        ref="root"
        className={classes}
        style={props.style}
        tabIndex="0"
      >
        {props.renderSidebar()}
        <div className={`${prefixCls}-panel`}>
          {showClear ?
            <a
              className={`${prefixCls}-clear-btn`}
              role="button"
              title={locale.clear}
              onClick={this.clear}
            /> : null}
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
              format={this.getFormat()}
              value={startValue}
              placeholder={placeholder1}
              onInputSelect={this.onStartInputSelect}
              onValueChange={this.onStartValueChange}
              timePicker={timePicker}
              showTimePicker={showTimePicker}
            />
            <span className={`${prefixCls}-range-middle`}>~</span>
            <CalendarPart
              {...props}
              {...newProps}
              hoverValue={hoverValue}
              direction="right"
              format={this.getFormat()}
              timePickerDisabledTime={this.getEndDisableTime()}
              placeholder={placeholder2}
              value={endValue}
              onInputSelect={this.onEndInputSelect}
              onValueChange={this.onEndValueChange}
              timePicker={timePicker}
              showTimePicker={showTimePicker}
              disabledTime={this.disabledEndTime}
            />
          </div>
          <div className={cls}>
            {props.renderFooter()}
            {showToday || props.timePicker || showOkButton ? (
              <div className={`${prefixCls}-footer-btn`}>
                {showToday ? (
                  <TodayButton
                    {...props}
                    disabled={isTodayInView}
                    value={state.value}
                    onToday={this.onToday}
                    text={locale.backToToday}
                  />
                ) : null}
                {props.timePicker ?
                  <TimePickerButton
                    {...props}
                    showTimePicker={showTimePicker}
                    onOpenTimePicker={this.onOpenTimePicker}
                    onCloseTimePicker={this.onCloseTimePicker}
                    timePickerDisabled={!this.hasSelectedValue() || hoverValue.length}
                  /> : null}
                {showOkButton ?
                  <OkButton
                    {...props}
                    value={state.value}
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
  },
});

export default RangeCalendar;
