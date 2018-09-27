import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import moment from 'moment';
import { isAllowedDate, getTodayTime } from '../util/index';

function noop() {
}

function getNow() {
  return moment();
}

function getNowByCurrentStateValue(value) {
  let ret;
  if (value) {
    ret = getTodayTime(value);
  } else {
    ret = getNow();
  }
  return ret;
}

function toggleTimes(items = [], newItem) {
  items = [...items];
  let isSame = false;
  let index = -1;
  for (let i = 0; i < items.length; i++) {
    if (items[i].isSame(newItem, 'day')) {
      isSame = true;
      index = i;
      break;
    }
  }
  if (isSame) {
    items.splice(index, 1);
  } else {
    items.push(newItem);
  }
  return items;
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
    const value = props.value || props.defaultValue || (props.multiple ? [] : getNow());
    let currentShowTime = value;
    if (props.multiple) {
      if (value.length > 0) {
        currentShowTime = value[value.length - 1];
      } else {
        currentShowTime = getNow();
      }
    }
    return {
      value,
      currentShowTime,
      selectedValue: props.selectedValue || props.defaultSelectedValue,
    };
  },

  componentWillReceiveProps(nextProps) {
    let { value } = nextProps;
    const { selectedValue } = nextProps;
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
      [newProps.className]: !!newProps.className,
    };

    return (
      <div
        ref={this.saveRoot}
        className={`${classnames(className)}`}
        style={this.props.style}
        tabIndex="0"
        onKeyDown={this.onKeyDown}
      >
        {newProps.children}
      </div>
    );
  },

  setSelectedValue(selectedValue, cause) {
    const { multiple } = this.props;
    if (multiple) {
      const values = toggleTimes(this.state.selectedValue, selectedValue);
      this.setState({ selectedValue: values });
      this.props.onSelect(values, cause);
    } else {
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
    const { multiple } = this.props;
    if (multiple) {
      const values = toggleTimes(this.state.value, value);
      this.setState({ value: values });
      this.props.onChange(values);
    } else {
      if (!('value' in this.props)) {
        this.setState({
          value,
          currentShowTime: value,
        });
      }
      if (
        originalValue && value && !originalValue.isSame(value) ||
        (!originalValue && value) ||
        (originalValue && !value)
      ) {
        this.props.onChange(value);
      }
    }
  },
  isAllowedDate(value) {
    const disabledDate = this.props.disabledDate;
    const disabledTime = this.props.disabledTime;
    if (this.props.multiple && value) {
      for (let i = 0; i < value.length; i++) {
        if (!isAllowedDate(value[i], disabledDate, disabledTime)) {
          return false;
        }
      }
      return true;
    }
    return isAllowedDate(value, disabledDate, disabledTime);
  },

};

export default CalendarMixin;
