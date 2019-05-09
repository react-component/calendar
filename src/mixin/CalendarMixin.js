import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import moment from 'moment';
import { isAllowedDate, getTodayTime } from '../util/index';

function noop() {
}

export function getNowByCurrentStateValue(value) {
  let ret;
  if (value) {
    ret = getTodayTime(value);
  } else {
    ret = moment();
  }
  return ret;
}

export const calendarMixinPropTypes = {
  value: PropTypes.object,
  defaultValue: PropTypes.object,
  onKeyDown: PropTypes.func,
};

export const calendarMixinDefaultProps = {
  onKeyDown: noop,
};

export const calendarMixinWrapper = ComposeComponent => class extends ComposeComponent {
  static displayName = 'CalendarMixinWrapper';
  static defaultProps = ComposeComponent.defaultProps;

  static getDerivedStateFromProps(nextProps, prevState) {
    // Use origin function if provided
    if (ComposeComponent.getDerivedStateFromProps) {
      return ComposeComponent.getDerivedStateFromProps(nextProps, prevState);
    }

    const { value, selectedValue } = nextProps;
    const newState = {};

    if ('value' in nextProps) {
      newState.value =
        value || nextProps.defaultValue || getNowByCurrentStateValue(prevState.value);
    }
    if ('selectedValue' in nextProps) {
      newState.selectedValue = selectedValue;
    }

    return newState;
  }

  onSelect = (value, cause) => {
    if (value) {
      this.setValue(value);
    }
    this.setSelectedValue(value, cause);
  }

  renderRoot = (newProps) => {
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
        onBlur={this.onBlur}
      >
        {newProps.children}
      </div>
    );
  }

  setSelectedValue = (selectedValue, cause) => {
    // if (this.isAllowedDate(selectedValue)) {
    if (!('selectedValue' in this.props)) {
      this.setState({
        selectedValue,
      });
    }
    if (this.props.onSelect) {
      this.props.onSelect(selectedValue, cause);
    }
    // }
  }

  setValue = (value) => {
    const originalValue = this.state.value;
    if (!('value' in this.props)) {
      this.setState({
        value,
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

  isAllowedDate = (value) => {
    const disabledDate = this.props.disabledDate;
    const disabledTime = this.props.disabledTime;
    return isAllowedDate(value, disabledDate, disabledTime);
  }
};
