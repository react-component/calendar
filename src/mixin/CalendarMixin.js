import React, {PropTypes} from 'react';
import {classSet} from 'rc-util';
import GregorianCalendar from 'gregorian-calendar';

function noop() {
}

function getNow() {
  const value = new GregorianCalendar();
  value.setTime(Date.now());
  return value;
}

function getNowByCurrentStateValue(value) {
  let ret;
  if (value) {
    ret = value.clone();
    ret.setTime(Date.now());
  } else {
    ret = getNow();
  }
  return ret;
}

const CalendarMixin = {
  propTypes: {
    value: PropTypes.object,
    defaultValue: PropTypes.object,
    onKeyDown: PropTypes.func,
  },

  getDefaultProps() {
    return {
      onKeyDown: noop,
    };
  },

  getInitialState() {
    const props = this.props;
    const value = props.value || props.defaultValue || getNow();
    return {value};
  },

  componentWillReceiveProps(nextProps) {
    let value = nextProps.value;
    if (value !== undefined) {
      value = value || nextProps.defaultValue || getNowByCurrentStateValue(this.state.value);
      this.setState({
        value,
      });
    }
  },

  onSelect(value, keyDownEvent) {
    this.setValue(value);
    if (!keyDownEvent) {
      if (this.isAllowedDate(value)) {
        this.props.onSelect(value);
      }
    }
  },

  renderRoot(newProps) {
    const props = this.props;
    const state = this.state;
    const prefixCls = props.prefixCls;

    const className = {
      [prefixCls]: 1,
      [`${prefixCls}-hidden`]: !props.visible,
      [props.className]: !!props.className,
    };

    const orient = state.orient;
    if (orient) {
      orient.forEach(o => {
        className [`${prefixCls}-orient-${o}`] = 1;
      });
    }

    return (
      <div className={`${classSet(className)} ${newProps.className}`} style={this.props.style}
           tabIndex="0" onFocus={this.onFocus}
           onBlur={this.onBlur} onKeyDown={this.onKeyDown}>
        {newProps.children}
      </div>
    );
  },

  setValue(value) {
    if (!('value' in this.props)) {
      this.setState({
        value,
      });
    }
    this.props.onChange(value);
  },

  isAllowedDate(value) {
    const disabledDate = this.props.disabledDate;
    return !disabledDate || !disabledDate(value);
  },
};

export default CalendarMixin;
