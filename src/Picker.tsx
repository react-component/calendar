import React, { CSSProperties } from 'react';
import ReactDOM from 'react-dom';
import { Moment } from 'moment';

import { polyfill } from 'react-lifecycles-compat';
import createChainedFunction from 'rc-util/lib/createChainedFunction';
import KeyCode from 'rc-util/lib/KeyCode';
import Trigger from 'rc-trigger';
import placements from './picker/placements';

function noop() {}

function refFn(field, component) {
  this[field] = component;
}

export interface PickerProps {
  animation?: string;
  disabled?: boolean;
  transitionName?: string;
  onChange?: (value: Moment) => void;
  onOpenChange?: (open: boolean) => void;
  getCalendarContainer?: (ref: HTMLElement) => HTMLElement;
  calendar?: JSX.Element;
  style?: CSSProperties;
  open?: boolean;
  defaultOpen?: boolean;
  prefixCls?: string;
  placement?: string;
  value?: Moment | Moment[];
  defaultValue?: Moment | Moment[];
  align?: any;
  dateRender?: (value: Moment) => React.ReactNode;
  onBlur?: () => void;
  dropdownClassName?: string;
  children?: any;
}

export interface PickerState {
  open?: boolean;
  value?: Moment | Moment[];
}

class Picker extends React.Component<PickerProps, PickerState> {
  static defaultProps = {
    prefixCls: 'rc-calendar-picker',
    style: {},
    align: {},
    placement: 'bottomLeft',
    defaultOpen: false,
    onChange: noop,
    onOpenChange: noop,
    onBlur: noop,
  };

  saveCalendarRef = refFn.bind(this, 'calendarInstance');

  constructor(props) {
    super(props);

    let open;
    if ('open' in props) {
      // eslint-disable-next-line prefer-destructuring
      open = props.open;
    } else {
      open = props.defaultOpen;
    }
    const value = props.value || props.defaultValue;

    this.state = {
      open,
      value,
    };
  }

  focusTimeout: number | any;

  componentDidUpdate(_, prevState) {
    if (!prevState.open && this.state.open) {
      // setTimeout is for making sure saveCalendarRef happen before focusCalendar
      this.focusTimeout = setTimeout(this.focusCalendar, 0, this);
    }
  }

  componentWillUnmount() {
    clearTimeout(this.focusTimeout);
  }

  onCalendarKeyDown = event => {
    if (event.keyCode === KeyCode.ESC) {
      event.stopPropagation();
      this.close(this.focus);
    }
  };

  onCalendarSelect = (
    value,
    cause = {
      source: '',
    },
  ) => {
    const { props } = this;
    if (!('value' in props)) {
      this.setState({
        value,
      });
    }
    if (
      cause.source === 'keyboard' ||
      cause.source === 'dateInputSelect' ||
      (!props.calendar.props.timePicker && cause.source !== 'dateInput') ||
      cause.source === 'todayButton'
    ) {
      this.close(this.focus);
    }
    props.onChange(value);
  };

  onKeyDown = event => {
    if (!this.state.open && (event.keyCode === KeyCode.DOWN || event.keyCode === KeyCode.ENTER)) {
      this.open();
      event.preventDefault();
    }
  };

  onCalendarOk = () => {
    this.close(this.focus);
  };

  onCalendarClear = () => {
    this.close(this.focus);
  };

  onCalendarBlur = () => {
    this.setOpen(false);
  };

  onVisibleChange = open => {
    this.setOpen(open);
  };

  static getDerivedStateFromProps(nextProps) {
    const newState: PickerState = {};
    const { value, open } = nextProps;
    if ('value' in nextProps) {
      newState.value = value;
    }
    if (open !== undefined) {
      newState.open = open;
    }
    return newState;
  }

  getCalendarElement = () => {
    const { props } = this;
    const { state } = this;
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
      onBlur: createChainedFunction(calendarProps.onBlur, this.onCalendarBlur),
    };

    return React.cloneElement(props.calendar, extraProps);
  };

  setOpen = (open: boolean, callback?: () => void) => {
    const { onOpenChange } = this.props;
    if (this.state.open !== open) {
      if (!('open' in this.props)) {
        this.setState(
          {
            open,
          },
          callback,
        );
      }
      onOpenChange(open);
    }
  };

  open = (callback?: () => void) => {
    this.setOpen(true, callback);
  };

  close = callback => {
    this.setOpen(false, callback);
  };

  focus = () => {
    if (!this.state.open) {
      // eslint-disable-next-line react/no-find-dom-node
      ReactDOM.findDOMNode(this).focus();
    }
  };

  calendarInstance?: HTMLElement;

  focusCalendar = () => {
    if (this.state.open && !!this.calendarInstance) {
      this.calendarInstance.focus();
    }
  };

  render() {
    const {
      prefixCls,
      placement,
      style,
      getCalendarContainer,
      align,
      animation,
      disabled,
      dropdownClassName,
      transitionName,
      children,
    } = this.props;
    const { state } = this;
    return (
      <Trigger
        popup={this.getCalendarElement()}
        popupAlign={align}
        builtinPlacements={placements}
        popupPlacement={placement as string}
        action={disabled && !state.open ? [] : ['click']}
        destroyPopupOnHide
        getPopupContainer={getCalendarContainer}
        popupStyle={style}
        popupAnimation={animation}
        popupTransitionName={transitionName}
        popupVisible={state.open}
        onPopupVisibleChange={this.onVisibleChange}
        prefixCls={prefixCls}
        popupClassName={dropdownClassName}
      >
        {React.cloneElement(children(state, this.props), { onKeyDown: this.onKeyDown })}
      </Trigger>
    );
  }
}

polyfill(Picker);

export default Picker;
