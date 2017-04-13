import React from 'react';
import ReactDOM from 'react-dom';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';
import createChainedFunction from 'rc-util/lib/createChainedFunction';
import KeyCode from 'rc-util/lib/KeyCode';
import placements from './picker/placements';
import Trigger from 'rc-trigger';

function noop() {
}

function refFn(field, component) {
  this[field] = component;
}

const Picker = createReactClass({
  propTypes: {
    animation: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
    disabled: PropTypes.bool,
    transitionName: PropTypes.string,
    onChange: PropTypes.func,
    onOpenChange: PropTypes.func,
    children: PropTypes.func,
    getCalendarContainer: PropTypes.func,
    calendar: PropTypes.element,
    style: PropTypes.object,
    open: PropTypes.bool,
    defaultOpen: PropTypes.bool,
    prefixCls: PropTypes.string,
    placement: PropTypes.any,
    value: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.array,
    ]),
    defaultValue: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.array,
    ]),
    align: PropTypes.object,
  },

  getDefaultProps() {
    return {
      prefixCls: 'rc-calendar-picker',
      style: {},
      align: {},
      placement: 'bottomLeft',
      defaultOpen: false,
      onChange: noop,
      onOpenChange: noop,
    };
  },

  getInitialState() {
    const props = this.props;
    let open;
    if ('open' in props) {
      open = props.open;
    } else {
      open = props.defaultOpen;
    }
    const value = props.value || props.defaultValue;
    this.saveCalendarRef = refFn.bind(this, 'calendarInstance');
    return {
      open,
      value,
    };
  },

  componentWillReceiveProps(nextProps) {
    const { value, open } = nextProps;
    if ('value' in nextProps) {
      this.setState({
        value,
      });
    }
    if (open !== undefined) {
      this.setState({
        open,
      });
    }
  },

  componentDidUpdate(_, prevState) {
    if (!prevState.open && this.state.open) {
      this.focusCalendar();
    }
  },

  onCalendarKeyDown(event) {
    if (event.keyCode === KeyCode.ESC) {
      event.stopPropagation();
      this.close(this.focus);
    }
  },

  onCalendarSelect(value, cause = {}) {
    const props = this.props;
    if (!('value' in props)) {
      this.setState({
        value,
      });
    }
    if (
      cause.source === 'keyboard' ||
      (!props.calendar.props.timePicker && cause.source !== 'dateInput') ||
      cause.source === 'todayButton') {
      this.close(this.focus);
    }
    props.onChange(value);
  },

  onKeyDown(event) {
    if (event.keyCode === KeyCode.DOWN && !this.state.open) {
      this.open();
      event.preventDefault();
    }
  },

  onCalendarOk() {
    this.close(this.focus);
  },

  onCalendarClear() {
    this.close(this.focus);
  },

  onVisibleChange(open) {
    this.setOpen(open);
  },

  getCalendarElement() {
    const props = this.props;
    const state = this.state;
    const calendarProps = props.calendar.props;
    const { value } = state;
    const defaultValue = value;
    const extraProps = {
      ref: this.saveCalendarRef,
      defaultValue: defaultValue || calendarProps.defaultValue,
      selectedValue: value,
      onKeyDown: this.onCalendarKeyDown,
      onOk: createChainedFunction(calendarProps.onOk, this.onCalendarOk),
      onSelect: createChainedFunction(calendarProps.onSelect, this.onCalendarSelect),
      onClear: createChainedFunction(calendarProps.onClear, this.onCalendarClear),
    };

    return React.cloneElement(props.calendar, extraProps);
  },

  setOpen(open, callback) {
    const { onOpenChange } = this.props;
    if (this.state.open !== open) {
      if (!('open' in this.props)) {
        this.setState({
          open,
        }, callback);
      }
      onOpenChange(open);
    }
  },

  open(callback) {
    this.setOpen(true, callback);
  },

  close(callback) {
    this.setOpen(false, callback);
  },

  focus() {
    if (!this.state.open) {
      ReactDOM.findDOMNode(this).focus();
    }
  },

  focusCalendar() {
    if (this.state.open && this.calendarInstance !== null) {
      this.calendarInstance.focus();
    }
  },

  render() {
    const props = this.props;
    const {
      prefixCls, placement,
      style, getCalendarContainer,
      align, animation,
      disabled,
      transitionName, children,
    } = props;
    const state = this.state;
    return (<Trigger
      popup={this.getCalendarElement()}
      popupAlign={align}
      builtinPlacements={placements}
      popupPlacement={placement}
      action={(disabled && !state.open) ? [] : ['click']}
      destroyPopupOnHide
      getPopupContainer={getCalendarContainer}
      popupStyle={style}
      popupAnimation={animation}
      popupTransitionName={transitionName}
      popupVisible={state.open}
      onPopupVisibleChange={this.onVisibleChange}
      prefixCls={prefixCls}
    >
      {React.cloneElement(children(state, props), { onKeyDown: this.onKeyDown })}
    </Trigger>);
  },
});

export default Picker;
