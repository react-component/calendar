import React, {PropTypes} from 'react';
import ReactDOM from 'react-dom';
import {createChainedFunction, KeyCode} from 'rc-util';
import {getPlacementFromAlign, getAlignFromPlacement} from './picker/placement';
import assign from 'object-assign';
import Trigger from 'rc-trigger';

function noop() {
}

function refFn(field, component) {
  this[field] = component;
}

const Picker = React.createClass({
  propTypes: {
    onChange: PropTypes.func,
    onOpen: PropTypes.func,
    onClose: PropTypes.func,
    children: PropTypes.func,
    getCalendarContainer: PropTypes.func,
    calendar: PropTypes.element,
    style: PropTypes.object,
    open: PropTypes.bool,
    defaultOpen: PropTypes.bool,
    prefixCls: PropTypes.string,
    placement: PropTypes.any,
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
      onOpen: noop,
      onClose: noop,
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
    return {open, value};
  },

  componentWillReceiveProps(nextProps) {
    const {value, open} = nextProps;
    if (value !== undefined) {
      this.setState({value});
    }
    if (open !== undefined) {
      this.setState({open});
    }
  },

  onCalendarKeyDown(event) {
    if (event.keyCode === KeyCode.ESC) {
      event.stopPropagation();
      this.close(this.focus);
    }
  },

  onCalendarSelect(value) {
    const props = this.props;
    if (!('value' in props)) {
      this.setState({
        value: value,
      });
    }
    if (!props.calendar.props.showTime) {
      this.close(this.focus);
    }
    props.onChange(value);
  },

  onCalendarOk() {
    this.close(this.focus);
  },

  onCalendarClear() {
    this.close(this.focus);
  },

  onVisibleChange(open) {
    this.setOpen(open, () => {
      if (open) {
        ReactDOM.findDOMNode(this.calendarInstance).focus();
      }
    });
  },

  getCalendarElement() {
    const props = this.props;
    const state = this.state;
    const calendarProp = props.calendar;
    const extraProps = {
      ref: this.saveCalendarRef,
      defaultValue: state.value || calendarProp.props.defaultValue,
      defaultSelectedValue: state.value,
      onKeyDown: this.onCalendarKeyDown,
      onOk: createChainedFunction(calendarProp.props.onOk, this.onCalendarOk),
      onSelect: createChainedFunction(calendarProp.props.onSelect, this.onCalendarSelect),
      onClear: createChainedFunction(calendarProp.props.onClear, this.onCalendarClear),
    };

    return React.cloneElement(calendarProp, extraProps);
  },

  getPickerClassNameFromAlign(align) {
    const placement = getPlacementFromAlign(align);
    return `${this.props.prefixCls}-placement-${placement}`;
  },

  setOpen(open, callback) {
    const {onOpen, onClose} = this.props;
    if (this.state.open !== open) {
      this.setState({
        open: open,
      }, callback);
      const event = {
        open: open,
      };
      if (open) {
        onOpen(event);
      } else {
        onClose(event);
      }
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

  render() {
    const props = this.props;
    const { prefixCls, placement,
      style, getCalendarContainer,
      align, animation,
      transitionName, children } = props;
    const state = this.state;
    let newAlign = getAlignFromPlacement(placement);
    if (align) {
      newAlign = assign({}, newAlign, align);
    }
    return (<Trigger popup={this.getCalendarElement()}
                     popupAlign={newAlign}
                     getPopupClassNameFromAlign={this.getPickerClassNameFromAlign}
                     action="click"
                     destroyPopupOnHide
                     getPopupContainer={getCalendarContainer}
                     popupStyle={style}
                     popupAnimation={animation}
                     popupTransitionName={transitionName}
                     popupVisible={state.open}
                     onPopupVisibleChange={this.onVisibleChange}
                     prefixCls={prefixCls}>
      {children(state, props)}
    </Trigger>);
  },
});

export default Picker;
