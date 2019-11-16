import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import moment, { Moment } from 'moment';
import { isAllowedDate, getTodayTime } from '../util/index';
import { CalendarProps, CalendarState } from '../Calendar';

function noop() {}

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

export const calendarMixinWrapper = (
  ComposeComponent: React.ComponentClass<CalendarProps, CalendarState>,
) =>
  class extends ComposeComponent {
    static displayName = 'CalendarMixinWrapper';

    static defaultProps = ComposeComponent.defaultProps;

    static getDerivedStateFromProps(nextProps: CalendarProps, prevState: CalendarState) {
      // Use origin function if provided
      if (ComposeComponent.getDerivedStateFromProps) {
        return ComposeComponent.getDerivedStateFromProps(nextProps, prevState);
      }

      const { value, selectedValue } = nextProps;
      const newState: CalendarState = {};

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
    };

    onKeyDown: (event: React.KeyboardEvent<HTMLDivElement>) => void;

    onBlur: (event: React.FocusEvent<HTMLDivElement>) => void;

    saveRoot: (ref: HTMLDivElement) => void;

    renderRoot = newProps => {
      const { props } = this;
      const { prefixCls } = props;

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
          tabIndex={0}
          onKeyDown={this.onKeyDown}
          onBlur={this.onBlur}
        >
          {newProps.children}
        </div>
      );
    };

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
    };

    setValue = (value: Moment) => {
      const originalValue = this.state.value;
      if (!('value' in this.props)) {
        this.setState({
          value,
        });
      }
      if (
        (originalValue && value && !originalValue.isSame(value)) ||
        (!originalValue && value) ||
        (originalValue && !value)
      ) {
        this.props.onChange(value);
      }
    };

    isAllowedDate = value => {
      const { disabledDate } = this.props;
      const { disabledTime } = this.props;
      return isAllowedDate(value, disabledDate, disabledTime);
    };
  };
