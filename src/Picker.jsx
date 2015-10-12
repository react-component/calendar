import React, {PropTypes} from 'react';
import {createChainedFunction, KeyCode, classSet, Dom} from 'rc-util';
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
    calendar: PropTypes.element,
    style: PropTypes.object,
    open: PropTypes.bool,
    defaultOpen: PropTypes.bool,
    prefixCls: PropTypes.string,
    getCalendarContainer: PropTypes.func,
    adjustOrientOnCalendarOverflow: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  },

  getDefaultProps() {
    return {
      prefixCls: 'rc-calendar-picker',
      adjustOrientOnCalendarOverflow: true,
      style: {},
      getCalendarContainer() {
        return document.body;
      },
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

  componentDidUpdate(prevProps, prevState) {
    if (this.haveOpened) {
      React.render(this.getCalendarElement(), this.getCalendarContainer(), ()=> {
        if (!prevState.open && this.state.open) {
          React.findDOMNode(this.calendarInstance).focus();
        }
      });
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
      this.close(this.focus);
    }
  },

  onCalendarSelect(value) {
    this.setState({
      value: value,
    });
    if (!this.props.calendar.props.showTime) {
      this.close(this.focus);
    }
    this.props.onChange(value);
  },

  onCalendarBlur() {
    if (Dom.contains(this.getDOMNode(), document.activeElement)) {
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
    this.setState({
      value: null,
    });
    this.close(this.focus);
    if (this.state.value !== null) {
      this.props.onChange(null);
    }
  },

  onCalendarChange(value) {
    this.calendarInstance.setState({
      value,
    });
  },

  onAnimateLeave() {
    React.unmountComponentAtNode(this.getCalendarContainer());
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

  getAlign(orient) {
    let points = ['tl', 'tl'];
    const offset = [0, 0];
    const adjustOrientOnCalendarOverflow = this.props.adjustOrientOnCalendarOverflow;
    if (orient.indexOf('top') !== -1 && orient.indexOf('left') !== -1) {
      points = ['tl', 'tl'];
    } else if (orient.indexOf('top') !== -1 && orient.indexOf('right') !== -1) {
      points = ['tr', 'tr'];
    } else if (orient.indexOf('bottom') !== -1 && orient.indexOf('left') !== -1) {
      points = ['bl', 'bl'];
    } else if (orient.indexOf('bottom') !== -1 && orient.indexOf('right') !== -1) {
      points = ['br', 'br'];
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
      onLeave={this.onAnimateLeave}
      transitionAppear={true}
      showProp="calendarOpen"
      transitionName={this.getTransitionName()}>
      <Align target={this.getDOMNode}
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

  focus() {
    if (!this.state.open) {
      this.getDOMNode().focus();
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
