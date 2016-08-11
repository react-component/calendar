import React, { PropTypes } from 'react';
import moment from 'moment';
import classnames from 'classnames';
import CalendarPart from './range-calendar/CalendarPart';
import { syncTime, getTodayTime } from './util/';
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
  if (selectedValue[0] && selectedValue[1]) {
    if (this.compare(selectedValue[0], selectedValue[1]) > 0) {
      selectedValue[1 - index] = this.state.showTimePicker ? selectedValue[index] : undefined;
    }
  }
  if (this.state.showTimePicker && selectedValue[0] && !selectedValue[1]) {
    selectedValue[1] = selectedValue[0];
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
    selectedValue: PropTypes.array,
    defaultSelectedValue: PropTypes.array,
    onOk: PropTypes.func,
    showClear: PropTypes.bool,
    locale: PropTypes.object,
    onChange: PropTypes.func,
    onSelect: PropTypes.func,
    onValueChange: PropTypes.func,
    format: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    onClear: PropTypes.func,
  },

  mixins: [CommonMixin],

  getDefaultProps() {
    return {
      defaultSelectedValue: [],
      onValueChange: noop,
    };
  },

  getInitialState() {
    const props = this.props;
    const selectedValue = props.selectedValue || props.defaultSelectedValue;
    const value = normalizeAnchor(props, 1);
    return {
      selectedValue,
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

  onSelect(value) {
    const originalValue = this.state.selectedValue;
    const selectedValue = originalValue.concat();
    let changed = false;
    if (!selectedValue.length || selectedValue.length === 2 && !originalValue.hovering) {
      selectedValue.length = 1;
      selectedValue[0] = value;
      changed = true;
    } else if (this.compare(selectedValue[0], value) <= 0) {
      selectedValue[1] = value;
      changed = true;
    } else if (this.compare(selectedValue[0], value) > 0) {
      selectedValue.length = 1;
      selectedValue[0] = value;
      changed = true;
    }
    if (changed) {
      this.fireSelectValueChange(selectedValue);
    }
  },

  onDayHover(hoverValue) {
    let selectedValue = this.state.selectedValue;
    if (!selectedValue.length || selectedValue.length === 2 && !selectedValue.hovering) {
      return;
    }
    if (this.compare(hoverValue, selectedValue[0]) < 0) {
      return;
    }
    selectedValue = selectedValue.concat();
    selectedValue[1] = hoverValue;
    selectedValue.hovering = 1;
    this.fireSelectValueChange(selectedValue);
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
    this.props.onOk(this.state.selectedValue);
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
    this.props.onChange(selectedValue);
    if (direct || selectedValue[0] && selectedValue[1] && !selectedValue.hovering) {
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

  render() {
    const props = this.props;
    const state = this.state;
    const { showTimePicker } = state;
    const { prefixCls, dateInputPlaceholder, timePicker, showOk, locale, showClear } = props;
    const className = {
      [props.className]: !!props.className,
      [prefixCls]: 1,
      [`${prefixCls}-hidden`]: !props.visible,
      [`${prefixCls}-range`]: 1,
      [`${prefixCls}-week-number`]: props.showWeekNumber,
    };
    const classes = classnames(className);
    const newProps = {
      selectedValue: state.selectedValue,
      onSelect: this.onSelect,
      onDayHover: this.onDayHover,
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
    const thisMonth = getTodayTime(startValue).month();
    const isTodayInView = thisMonth === startValue.month() ||
            thisMonth === endValue.month();

    return (<div
      ref="root"
      className={classes}
      style={props.style}
      tabIndex="0"
    >
      {showClear ?
        <a
          className={`${prefixCls}-clear-btn`}
          role="button"
          title={locale.clear}
          onClick={this.clear}
        /> : null}
      <div className={`${prefixCls}-date-panel`}>
        <CalendarPart
          {...props}
          {...newProps}
          direction="left"
          format={this.getFormat()}
          value={startValue}
          placeholder={placeholder1}
          onInputSelect={onInputSelect.bind(this, 'left')}
          onValueChange={onValueChange.bind(this, 'left')}
          timePicker={timePicker}
          showTimePicker={showTimePicker}
        />
        <span className={`${prefixCls}-range-middle`}>~</span>
        <CalendarPart
          {...props}
          {...newProps}
          direction="right"
          format={this.getFormat()}
          timePickerDisabledTime={this.getEndDisableTime()}
          placeholder={placeholder2}
          value={endValue}
          onInputSelect={onInputSelect.bind(this, 'right')}
          onValueChange={onValueChange.bind(this, 'right')}
          timePicker={timePicker}
          showTimePicker={showTimePicker}
        />
      </div>
      <div className={cls}>
        <div className={`${prefixCls}-footer-btn`}>
          <TodayButton
            {...props}
            disabled={isTodayInView}
            value={state.value}
            onToday={this.onToday}
            text={locale.backToToday}
          />
          {!!props.timePicker ?
            <TimePickerButton
              {...props}
              showTimePicker={showTimePicker}
              onOpenTimePicker={this.onOpenTimePicker}
              onCloseTimePicker={this.onCloseTimePicker}
              timePickerDisabled={state.selectedValue.length === 1 || state.selectedValue.hovering}
            /> : null}
          {showOkButton ?
            <OkButton
              {...props}
              value={state.value}
              onOk={this.onOk}
              okDisabled={state.selectedValue.length !== 2 || state.selectedValue.hovering}
            /> : null}
        </div>
      </div>
    </div>);
  },
});

export default RangeCalendar;
