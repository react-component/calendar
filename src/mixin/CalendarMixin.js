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
    return {
      value,
      selectedValue: props.selectedValue || props.defaultSelectedValue,
    };
  },

  componentWillReceiveProps(nextProps) {
    let {value} = nextProps;
    const {selectedValue} = nextProps;
    if (value !== undefined) {
      value = value || nextProps.defaultValue || getNowByCurrentStateValue(this.state.value);
      this.setState({
        value,
      });
    }
    if (selectedValue !== undefined) {
      this.setState({
        selectedValue,
      });
    }
  },

  onSelect(value, cause) {
    if (this._blurPending) {
      clearTimeout(this._blurPending);
      this._blurPending = null;
    }
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
      <div className={`${classSet(className)} ${newProps.className}`}
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
      this.props.onSelect(selectedValue, cause || {});
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
    return !disabledDate || !disabledDate(value);
  },
};

export default CalendarMixin;
