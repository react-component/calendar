import React from 'react';
import DateTimeFormat from 'gregorian-calendar-format';
import rcUtil, {createChainedFunction, KeyCode, classSet} from 'rc-util';
const toFragment = rcUtil.Children.mapSelf;
import Align from 'rc-align';
const orientMap = {
  tl: ['top', 'left'],
  tr: ['top', 'right'],
  bl: ['bottom', 'left'],
  br: ['bottom', 'right'],
};
import Animate from 'rc-animate';

function getImmutableOrient(orient) {
  if (orient) {
    for (const i in orientMap) {
      if (orientMap.hasOwnProperty(i)) {
        const original = orientMap[i];
        if (original[0] === orient[0] && original[1] === orient[1]) {
          return original;
        }
      }
    }
  }
}

function prevent(e) {
  e.preventDefault();
}

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
    onChange: React.PropTypes.func,
    onOpen: React.PropTypes.func,
    onClose: React.PropTypes.func,
    calendar: React.PropTypes.element,
    style: React.PropTypes.object,
    open: React.PropTypes.bool,
    defaultOpen: React.PropTypes.bool,
    prefixCls: React.PropTypes.string,
    adjustOrientOnCalendarOverflow: React.PropTypes.oneOfType([React.PropTypes.bool, React.PropTypes.object]),
  },

  getDefaultProps() {
    return {
      rootNode: document.body,
      prefixCls: 'rc-calendar-picker',
      adjustOrientOnCalendarOverflow: true,
      style: {},
      defaultOpen: false,
      onChange: noop,
      onOpen: noop,
      onClose: noop,
      formatter: new DateTimeFormat('yyyy-MM-dd'),
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
    this.saveInputRef = refFn.bind(this, 'inputInstance');
    return {open, value};
  },

  componentWillReceiveProps(nextProps) {
    let value = nextProps.value;
    if (value !== undefined) {
      // null special meaning
      value = value || nextProps.defaultValue || null;
      this.setState({
        value,
      });
    }
    if ('open' in nextProps) {
      this.setState({
        open: nextProps.open,
      });
    }
  },

  componentDidUpdate() {
    if (this.haveOpened) {
      React.render(this.getCalendarElement(), this.getCalendarContainer());
    }
  },

  componentWillUnmount() {
    if (this.calendarContainer) {
      React.unmountComponentAtNode(this.calendarContainer);
      this.calendarContainer.parentNode.removeChild(this.calendarContainer);
      this.calendarContainer = null;
    }
  },

  onCalendarAlign(node, align) {
    const points = align.points;
    const newOrient = orientMap[points[0]];
    this.calendarInstance.setOrient(newOrient);
    // focus after align
    React.findDOMNode(this.calendarInstance).focus();
  },

  onInputClick() {
    this.toggle();
  },

  onTriggerClick() {
    this.toggle();
  },

  onKeyDown(e) {
    // down
    if (e.keyCode === KeyCode.DOWN) {
      e.preventDefault();
      this.open();
    }
  },

  onCalendarKeyDown(e) {
    if (e.keyCode === KeyCode.ESC) {
      e.stopPropagation();
      this.close(this.focusInput);
    }
  },

  onCalendarSelect(value) {
    const currentValue = this.state.value;
    this.setState({
      value: value,
    });
    if (!this.props.calendar.props.showTime) {
      this.close(this.focusInput);
    }
    if (!currentValue || currentValue.getTime() !== value.getTime()) {
      this.props.onChange(value);
    }
  },

  onCalendarBlur() {
    if (document.activeElement === this.getInputDOMNode()) {
      return;
    }
    // if invisible, will not trigger blur
    // do not set if already false, avoid ruin animate
    this.close();
  },

  onCalendarOk() {
    this.close(this.focusInput);
  },

  onCalendarClear() {
    this.setState({
      value: null,
    });
    this.close(this.focusInput);
    if (this.state.value !== null) {
      this.props.onChange(null);
    }
  },

  onCalendarChange(value) {
    this.calendarInstance.setState({
      value,
    });
  },

  getInputDOMNode() {
    return React.findDOMNode(this.inputInstance);
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
      this.props.rootNode.appendChild(this.calendarContainer);
    }
    return this.calendarContainer;
  },

  getAlign(orient) {
    let points = ['tl', 'bl'];
    let offset = [0, 5];
    const adjustOrientOnCalendarOverflow = this.props.adjustOrientOnCalendarOverflow;
    if (orient.indexOf('top') !== -1 && orient.indexOf('left') !== -1) {
      points = ['tl', 'bl'];
    } else if (orient.indexOf('top') !== -1 && orient.indexOf('right') !== -1) {
      points = ['tr', 'br'];
    } else if (orient.indexOf('bottom') !== -1 && orient.indexOf('left') !== -1) {
      points = ['bl', 'tl'];
      offset = [0, -5];
    } else if (orient.indexOf('bottom') !== -1 && orient.indexOf('right') !== -1) {
      points = ['br', 'tr'];
      offset = [0, -5];
    }
    let adjustX;
    let adjustY;
    if (adjustOrientOnCalendarOverflow === true) {
      adjustX = adjustY = true;
    } else if (!adjustOrientOnCalendarOverflow) {
      adjustX = adjustY = false;
    } else {
      adjustX = adjustOrientOnCalendarOverflow.x;
      adjustY = adjustOrientOnCalendarOverflow.y;
    }
    return {
      points: points,
      offset: offset,
      overflow: {
        adjustX: adjustX,
        adjustY: adjustY,
      },
    };
  },

  getCalendarElement() {
    const props = this.props;
    const state = this.state;
    const calendarProp = props.calendar;
    let orient;
    // re align when open
    if (state.open) {
      orient = getImmutableOrient(calendarProp.props.orient) || orientMap.tl;
    }
    const calendarElement = React.cloneElement(calendarProp, {
      ref: createChainedFunction(calendarProp.ref, this.saveCalendarRef),
      value: state.value,
      visible: state.open,
      orient: orient,
      onBlur: this.onCalendarBlur,
      onKeyDown: this.onCalendarKeyDown,
      onChange: createChainedFunction(calendarProp.props.onChange, this.onCalendarChange),
      onOk: createChainedFunction(calendarProp.props.onOk, this.onCalendarOk),
      onSelect: createChainedFunction(calendarProp.props.onSelect, this.onCalendarSelect),
      onClear: createChainedFunction(calendarProp.props.onClear, this.onCalendarClear),
    });
    return (<Animate
      component=""
      exclusive={true}
      transitionAppear={true}
      showProp="calendarOpen"
      transitionName={this.getTransitionName()}>
      <Align target={this.getInputDOMNode}
             key="calendar"
             onAlign={this.onCalendarAlign}
             calendarOpen={state.open}
             disabled={!state.open}
             align={orient && this.getAlign(orient)}>
        {calendarElement}
      </Align>
    </Animate>);
  },

  render() {
    const props = this.props;
    const disabled = props.disabled;
    const prefixCls = props.prefixCls;
    let input = props.children;
    const state = this.state;
    const value = state.value;
    this.haveOpened = this.haveOpened || state.open;
    let inputValue = '';
    if (value) {
      inputValue = props.formatter.format(value);
    }
    input = React.cloneElement(input, {
      ref: createChainedFunction(input.ref, this.saveInputRef),
      disabled: disabled,
      onChange: noop,
      onClick: disabled ? noop : this.onInputClick,
      value: inputValue,
      onKeyDown: disabled ? noop : this.onKeyDown,
    });
    const classes = {
      [prefixCls]: 1,
      [`${prefixCls}-open`]: state.open,
      [`${prefixCls}-disabled`]: disabled,
    };
    let trigger = props.trigger;
    if (trigger) {
      trigger = React.cloneElement(trigger, {
        unselectable: true,
        onMouseDown: prevent,
        onClick: disabled ? noop : this.onTriggerClick,
      });
    }
    return (<span className={classSet(classes)} style={props.style}>
      {toFragment([input, trigger])}
    </span>);
  },

  focusInput() {
    if (!this.state.open) {
      this.getInputDOMNode().focus();
    }
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
});

export default Picker;
