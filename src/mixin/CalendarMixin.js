import React, {PropTypes} from 'react';
import classnames from 'classnames';
import GregorianCalendar from 'gregorian-calendar';
import {isAllowedDate} from '../util/index';

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
    return {
      value,
      selectedValue: props.selectedValue || props.defaultSelectedValue,
    };
  },

  componentWillReceiveProps(nextProps) {
    let {value} = nextProps;
    const {selectedValue} = nextProps;
    if ('value' in nextProps) {
      value = value || nextProps.defaultValue || getNowByCurrentStateValue(this.state.value);
      this.setState({
        value,
      });
    }
    if ('selectedValue' in nextProps) {
      this.setState({
        selectedValue,
      });
    }
  },

  onSelect(value, cause) {
    if (value) {
      this.setValue(value);
    }
    this.setSelectedValue(value, cause);
  },

  renderRoot(newProps) {
    const props = this.props;
    const prefixCls = props.prefixCls;

    const className = {
      [prefixCls]: 1,
      [`${prefixCls}-hidden`]: !props.visible,
      [props.className]: !!props.className,
    };

    return (
      <div className={`${classnames(className)} ${newProps.className}`}
           style={this.props.style}
           tabIndex="0" onKeyDown={this.onKeyDown}>
        {newProps.children}
      </div>
    );
  },

  setSelectedValue(selectedValue, cause) {
    if (this.isAllowedDate(selectedValue)) {
      if (!('selectedValue' in this.props)) {
        this.setState({
          selectedValue,
        });
      }
      this.props.onSelect(selectedValue, cause);
    }
  },

  setValue(value) {
    const originalValue = this.state.value;
    if (!('value' in this.props)) {
      this.setState({
        value,
      });
    }
    if (originalValue && value && originalValue.getTime() !== value.getTime() ||
      (!originalValue && value) ||
      (originalValue && !value)) {
      this.props.onChange(value);
    }
  },

  isAllowedDate(value) {
    const disabledDate = this.props.disabledDate;
    const disabledTime = this.props.disabledTime;
    return isAllowedDate(value, disabledDate, disabledTime);
  },
};

export default CalendarMixin;
