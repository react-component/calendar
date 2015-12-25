import React, {PropTypes} from 'react';
import GregorianCalendar from 'gregorian-calendar';
import classnames from 'classnames';
import CalendarPart from './range-calendar/CalendarPart';
import {syncTime, getTodayTime} from './util/';
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

function onTimeSelect(direction, value) {
  const index = direction === 'left' ? 0 : 1;
  let selectedValue = this.state.selectedValue;
  if (selectedValue[index]) {
    selectedValue = selectedValue.concat();
    selectedValue[index] = selectedValue[index].clone();
    syncTime(value, selectedValue[index]);
    this.fireSelectValueChange(selectedValue);
  }
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
    if (selectedValue[0].getTime() > selectedValue[1].getTime()) {
      selectedValue.length = 1;
    }
  }
  this.fireSelectValueChange(selectedValue);
}

const RangeCalendar = React.createClass({
  propTypes: {
    defaultValue: PropTypes.any,
    value: PropTypes.any,
    selectedValue: PropTypes.array,
    defaultSelectedValue: PropTypes.array,
    onOk: PropTypes.func,
    onChange: PropTypes.func,
    onSelect: PropTypes.func,
    onValueChange: PropTypes.func,
    formatter: PropTypes.object,
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
    return {selectedValue, value};
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
    } else if (selectedValue[0].getTime() < value.getTime()) {
      selectedValue[1] = value;
      changed = true;
    } else if (selectedValue[0].getTime() > value.getTime()) {
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
    if (hoverValue.getTime() < selectedValue[0].getTime()) {
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
    if (selectedValue[0]) {
      value = value.clone();
      syncTime(selectedValue[0], value);
    }
    return value;
  },

  getEndValue() {
    const endValue = this.state.value.clone();
    endValue.addMonth(1);
    const selectedValue = this.state.selectedValue;
    if (selectedValue[1]) {
      syncTime(selectedValue[1], endValue);
    }
    return endValue;
  },

  fireSelectValueChange(selectedValue) {
    if (!('selectedValue' in this.props)) {
      this.setState({selectedValue});
    }
    this.props.onChange(selectedValue);
    if (selectedValue.length === 2 && !selectedValue.hovering) {
      this.props.onSelect(selectedValue);
    }
  },

  fireValueChange(value) {
    const props = this.props;
    if (!('value' in props)) {
      this.setState({value});
    }
    props.onValueChange(value);
  },

  render() {
    const props = this.props;
    const state = this.state;
    const {prefixCls, dateInputPlaceholder} = props;
    const className = {
      [props.className]: !!props.className,
      [prefixCls]: 1,
      [`${prefixCls}-hidden`]: !props.visible,
      [prefixCls + '-range']: 1,
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
    return (<div className={classes} style={props.style}
                 tabIndex="0">
      <CalendarPart {...props} {...newProps} direction="left"
                                             formatter={this.getFormatter()}
                                             value={this.getStartValue()}
                                             placeholder={placeholder1}
                                             onInputSelect={onInputSelect.bind(this, 'left')}
                                             onTimeSelect={onTimeSelect.bind(this, 'left')}
                                             onValueChange={onValueChange.bind(this, 'left')}/>
      <span className={`${prefixCls}-range-middle`}>~</span>
      <CalendarPart {...props} {...newProps} direction="right"
                                             formatter={this.getFormatter()}
                                             placeholder={placeholder2}
                                             value={this.getEndValue()}
                                             onInputSelect={onInputSelect.bind(this, 'right')}
                                             onTimeSelect={onTimeSelect.bind(this, 'right')}
                                             onValueChange={onValueChange.bind(this, 'right')}/>

      <div className={`${prefixCls}-range-bottom`}>
        <TodayButton {...props} value={state.value}
                                onToday={this.onToday}/>
        <OkButton {...props} value={state.value}
                             onOk={this.onOk}
                             okDisabled={state.selectedValue.length !== 2 || state.selectedValue.hovering}
        />
      </div>
    </div>);
  },
});

export default RangeCalendar;
