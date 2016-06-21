import React, { PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import GregorianCalendar from 'gregorian-calendar';
import classnames from 'classnames';
import CalendarPart from './range-calendar/CalendarPart';
import { syncTime, getTodayTime } from './util/';
import TodayButton from './calendar/TodayButton';
import OkButton from './calendar/OkButton';
import CommonMixin from './mixin/CommonMixin';

function noop() {
}

function getNow() {
  const selectedValue = new GregorianCalendar();
  selectedValue.setTime(Date.now());
  return selectedValue;
}

function onValueChange(direction, current) {
  let value;
  value = current;
  if (direction === 'right') {
    value.addMonth(-1);
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
      selectedValue[1 - index] = undefined;
    }
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
    locale: PropTypes.object,
    onChange: PropTypes.func,
    onSelect: PropTypes.func,
    onValueChange: PropTypes.func,
    formatter: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
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
    endValue.addMonth(1);
    const selectedValue = this.state.selectedValue;
    // keep selectedTime when select date
    if (selectedValue[1] && this.props.timePicker) {
      syncTime(selectedValue[1], endValue);
    }
    return endValue;
  },

  compare(v1, v2) {
    if (this.props.timePicker) {
      return v1.getTime() - v2.getTime();
    }
    return v1.compareToDay(v2);
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

  focus() {
    findDOMNode(this).focus();
  },

  clear() {
    this.fireSelectValueChange([], true);
    this.props.onClear();
  },

  render() {
    const props = this.props;
    const state = this.state;
    const { prefixCls, dateInputPlaceholder, timePicker, showOk, locale } = props;
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
    return (<div
      className={classes}
      style={props.style}
      tabIndex="0"
    >
      <a
        className={`${prefixCls}-clear-btn`}
        role="button"
        title={locale.clear}
        onClick={this.clear}
      />
      <CalendarPart
        {...props}
        {...newProps}
        direction="left"
        formatter={this.getFormatter()}
        value={this.getStartValue()}
        placeholder={placeholder1}
        onInputSelect={onInputSelect.bind(this, 'left')}
        onValueChange={onValueChange.bind(this, 'left')}
      />
      <span className={`${prefixCls}-range-middle`}>~</span>
      <CalendarPart
        {...props}
        {...newProps}
        direction="right"
        formatter={this.getFormatter()}
        placeholder={placeholder2}
        value={this.getEndValue()}
        onInputSelect={onInputSelect.bind(this, 'right')}
        onValueChange={onValueChange.bind(this, 'right')}
      />
      <div className={`${prefixCls}-range-bottom`}>
        <TodayButton
          {...props}
          value={state.value}
          onToday={this.onToday}
          text={locale.backToToday}
        />
        {showOk === true || showOk !== false && !!timePicker ?
          <OkButton
            {...props}
            value={state.value}
            onOk={this.onOk}
            okDisabled={state.selectedValue.length !== 2 || state.selectedValue.hovering}
          /> : null}
      </div>
    </div>);
  },
});

export default RangeCalendar;
