import React, {PropTypes} from 'react';
import ReactDOM from 'react-dom';
import {createChainedFunction, KeyCode, classSet, Dom} from 'rc-util';
import Align from 'rc-align';
import Animate from 'rc-animate';
import {getCalendarClassByPlacement, fromPointsToPlacement, fromPlacementStrToAlign} from './picker/placement';
import assign from 'object-assign';

function noop() {
}

function refFn(field, component) {
  this[field] = component;
}

/**
 * DatePicker = wrap input using Calendar
 */
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
    align: PropTypes.shape({
      offset: PropTypes.array,
      targetOffset: PropTypes.array,
    }),
  },

  getDefaultProps() {
    return {
      prefixCls: 'rc-calendar-picker',
      style: {},
      align: {},
      getCalendarContainer() {
        return document.body;
      },
      placement: 'topLeft',
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
    let value = nextProps.value;
    if (value !== undefined) {
      // null special meaning
      value = value || null;
      this.setState({ value });
    }
    if ('open' in nextProps) {
      this.setState({
        open: nextProps.open,
      });
    }
  },

  componentDidUpdate(prevProps, prevState) {
    if (this.haveOpened) {
      ReactDOM.render(this.getCalendarElement(), this.getCalendarContainer(), ()=> {
        if (!prevState.open && this.state.open) {
          ReactDOM.findDOMNode(this.calendarInstance).focus();
        }
      });
    }
  },

  componentWillUnmount() {
    if (this.calendarContainer) {
      ReactDOM.unmountComponentAtNode(this.calendarContainer);
      this.calendarContainer.parentNode.removeChild(this.calendarContainer);
      this.calendarContainer = null;
    }
  },

  onCalendarAlign(node, align) {
    const props = this.props;
    const placement = props.placement;
    const prefixCls = props.calendar.props.prefixCls;
    if (placement) {
      const originalClassName = getCalendarClassByPlacement(prefixCls, placement);
      let nextClassName;
      if (placement.points) {
        nextClassName = getCalendarClassByPlacement(prefixCls, align);
      } else if (typeof placement === 'string') {
        nextClassName = getCalendarClassByPlacement(prefixCls, fromPointsToPlacement(align));
      }
      if (nextClassName !== originalClassName) {
        node.className = node.className.replace(originalClassName, nextClassName);
      }
    }
  },

  onInputClick() {
    this.toggle();
  },

  onTriggerClick() {
    this.toggle();
  },

  onKeyDown(event) {
    // down
    if (event.keyCode === KeyCode.DOWN) {
      event.preventDefault();
      this.open();
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

  onCalendarBlur() {
    if (Dom.contains(this.getNativeDOMNode(), document.activeElement)) {
      return;
    }
    // if invisible, will not trigger blur
    // do not set if already false, avoid ruin animate
    this.close();
  },

  onCalendarOk() {
    this.close(this.focus);
  },

  onCalendarClear() {
    this.close(this.focus);
  },

  onAnimateLeave() {
    ReactDOM.unmountComponentAtNode(this.getCalendarContainer());
  },

  getNativeDOMNode() {
    return ReactDOM.findDOMNode(this);
  },

  getTransitionName() {
    const props = this.props;
    let transitionName = props.transitionName;
    if (!transitionName && props.animation) {
      transitionName = `${props.prefixCls}-${props.animation}`;
    }
    return transitionName;
  },

  getCalendarContainer() {
    if (!this.calendarContainer) {
      this.calendarContainer = document.createElement('div');
      this.calendarContainer.className = `${this.props.prefixCls}-container`;
      this.props.getCalendarContainer().appendChild(this.calendarContainer);
    }
    return this.calendarContainer;
  },

  getAlign() {
    let align;
    const props = this.props;
    const placement = props.placement;
    if (placement && placement.points) {
      align = placement;
    } else {
      align = fromPlacementStrToAlign(placement);
      const {offset, targetOffset} = align;
      let offsetProp = props.align.offset;
      let targetOffsetProp = props.align.targetOffset;
      if (offsetProp) {
        offsetProp = offsetProp.concat();
      }
      if (targetOffsetProp) {
        targetOffsetProp = targetOffsetProp.concat();
      }
      const updateAlign = {};
      for (let index = 0; index < 2; index++) {
        if (offsetProp) {
          if (offsetProp[index] === undefined) {
            offsetProp[index] = offset[index];
          }
          updateAlign.offset = offsetProp;
        }
        if (targetOffsetProp) {
          if (targetOffsetProp[index] === undefined) {
            targetOffsetProp[index] = targetOffset[index];
          }
          updateAlign.targetOffset = offsetProp;
        }
      }
      align = assign({}, align, updateAlign);
    }
    return align;
  },

  getCalendarElement() {
    const props = this.props;
    const state = this.state;
    const calendarProp = props.calendar;
    let className = calendarProp.props.className || '';
    if (className) {
      className += ' ';
    }

    if (state.open) {
      className += getCalendarClassByPlacement(calendarProp.props.prefixCls, props.placement);
    } else {
      const calendarDOMNode = ReactDOM.findDOMNode(this.calendarInstance);
      // fix auto adjust
      className = calendarDOMNode && calendarDOMNode.className || '';
    }

    const extraProps = {
      ref: createChainedFunction(calendarProp.ref, this.saveCalendarRef),
      className: className,
      defaultValue: calendarProp.props.defaultValue || state.value,
      defaultSelectedValue: state.value,
      visible: state.open,
      placement: props.placement,
      onBlur: this.onCalendarBlur,
      onKeyDown: this.onCalendarKeyDown,
      onOk: createChainedFunction(calendarProp.props.onOk, this.onCalendarOk),
      onSelect: createChainedFunction(calendarProp.props.onSelect, this.onCalendarSelect),
      onClear: createChainedFunction(calendarProp.props.onClear, this.onCalendarClear),
    };

    const calendarElement = React.cloneElement(calendarProp, extraProps);
    return (<Animate
      component=""
      exclusive
      onLeave={this.onAnimateLeave}
      transitionAppear
      showProp="calendarOpen"
      transitionName={this.getTransitionName()}>
      <Align target={this.getNativeDOMNode}
             key="calendar"
             onAlign={this.onCalendarAlign}
             calendarOpen={state.open}
             disabled={!state.open}
             align={this.getAlign()}>
        {calendarElement}
      </Align>
    </Animate>);
  },

  setOpen(open, callback) {
    if (this.state.open !== open) {
      this.setState({
        open: open,
      }, callback);
      const event = {
        open: open,
      };
      if (open) {
        this.props.onOpen(event);
      } else {
        this.props.onClose(event);
      }
    }
  },

  focus() {
    if (!this.state.open) {
      this.getNativeDOMNode().focus();
    }
  },

  toggle() {
    if (this.state.open) {
      this.close();
    } else {
      this.open();
    }
  },

  open(callback) {
    this.setOpen(true, callback);
  },

  close(callback) {
    this.setOpen(false, callback);
  },

  render() {
    const props = this.props;
    const disabled = props.disabled;
    const prefixCls = props.prefixCls;
    const state = this.state;
    this.haveOpened = this.haveOpened || state.open;
    const classes = {
      [prefixCls]: 1,
      [`${prefixCls}-open`]: state.open,
      [`${prefixCls}-disabled`]: disabled,
    };
    return (<span className={classSet(classes)} style={props.style} tabIndex="0"
                  onKeyDown={disabled ? noop : this.onKeyDown}
                  onClick={disabled ? noop : this.onInputClick}>
      {props.children(state, props)}
    </span>);
  },
});

export default Picker;
