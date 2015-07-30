'use strict';

import React from 'react';
import DateTimeFormat from 'gregorian-calendar-format';
import rcUtil, {createChainedFunction, KeyCode, classSet} from 'rc-util';
var toFragment = rcUtil.Children.mapSelf;
import Align from 'rc-align';
var orientMap = {
  tl: ['top', 'left'],
  tr: ['top', 'right'],
  bl: ['bottom', 'left'],
  br: ['bottom', 'right']
};
import Animate from 'rc-animate';

function getImmutableOrient(orient) {
  if (orient) {
    for (var i in orientMap) {
      var original = orientMap[i];
      if (original[0] === orient[0] && original[1] === orient[1]) {
        return original;
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
class Picker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      value: props.value || props.defaultValue
    };
    var events = [
      'handleCalendarAlign',
      'handleInputClick', 'handleCalendarBlur', 'handleTriggerClick',
      'handleCalendarClear', 'handleCalendarKeyDown', 'handleCalendarOk',
      'handleKeyDown', 'handleCalendarSelect', 'focusInput', 'getInputDOMNode'
    ];
    // bind methods
    events.forEach(m => {
      this[m] = this[m].bind(this);
    });
    this.saveCalendarRef = refFn.bind(this, 'calendarInstance');
    this.saveInputRef = refFn.bind(this, 'inputInstance');
  }

  componentWillReceiveProps(nextProps) {
    var value = nextProps.value;
    if (value !== undefined) {
      // null special meaning
      value = value || nextProps.defaultValue || null;
      this.setState({
        value: value
      });
    }
  }

  componentWillUnmount() {
    if (this.calendarContainer) {
      React.unmountComponentAtNode(this.calendarContainer);
      this.calendarContainer.parentNode.removeChild(this.calendarContainer);
      this.calendarContainer = null;
    }
  }

  componentDidUpdate(prevProps, prevState) {
    prevState = prevState || {};
    var props = this.props;
    if (this.haveOpened && props.renderCalendarToBody) {
      React.render(this.getCalendarElement(), this.getCalendarContainer(), () => {
        this.focusCalendarOnOpen(prevState);
      });
    } else {
      this.focusCalendarOnOpen(prevState);
    }
  }

  focusCalendarOnOpen(prevState) {
    if (!prevState.open && this.state.open) {
      React.findDOMNode(this.calendarInstance).focus();
    }
  }

  getTransitionName() {
    var props = this.props;
    var transitionName = props.transitionName;
    if (!transitionName && props.animation) {
      transitionName = `${props.prefixCls}-${props.animation}`;
    }
    return transitionName;
  }

  getCalendarContainer() {
    if (!this.calendarContainer) {
      this.calendarContainer = document.createElement('div');
      this.calendarContainer.className = `${this.props.prefixCls}-container`;
      document.body.appendChild(this.calendarContainer);
    }
    return this.calendarContainer;
  }

  getAlign(orient) {
    var points = ['tl', 'bl'];
    var offset = [0, 5];
    var adjustOrientOnCalendarOverflow = this.props.adjustOrientOnCalendarOverflow;
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
    return {
      points: points,
      offset: offset,
      overflow: {
        adjustX: adjustOrientOnCalendarOverflow,
        adjustY: adjustOrientOnCalendarOverflow
      }
    };
  }

  handleCalendarAlign(node, align) {
    var points = align.points;
    var newOrient = orientMap[points[0]];
    this.calendarInstance.setState({
      orient: newOrient
    });
  }

  setOpen(open, callback) {
    if (this.state.open !== open) {
      this.setState({
        open: open
      }, callback);
    }
  }

  toggle() {
    if (this.state.open) {
      this.close();
    } else {
      this.open();
    }
  }

  open(callback) {
    this.setOpen(true, callback);
  }

  close(callback) {
    this.setOpen(false, callback);
  }

  getInputDOMNode() {
    return React.findDOMNode(this.inputInstance);
  }

  focusInput() {
    this.getInputDOMNode().focus();
  }

  handleInputClick() {
    this.open();
  }

  handleTriggerClick() {
    this.toggle();
  }

  handleKeyDown(e) {
    // down
    if (e.keyCode === KeyCode.DOWN) {
      e.preventDefault();
      this.open();
    }
  }

  handleCalendarKeyDown(e) {
    if (e.keyCode === KeyCode.ESC) {
      e.stopPropagation();
      this.close(this.focusInput);
    }
  }

  handleCalendarSelect(value) {
    var currentValue = this.state.value;
    this.setState({
      value: value
    });
    if (!this.props.calendar.props.showTime) {
      this.close(this.focusInput);
    }
    if (!currentValue || currentValue.getTime() !== value.getTime()) {
      this.props.onChange(value);
    }
  }

  handleCalendarBlur() {
    // if invisible, will not trigger blur
    // do not set if already false, avoid ruin animate
    this.close();
  }

  handleCalendarOk() {
    this.close(this.focusInput);
  }

  handleCalendarClear() {
    this.setState({
      value: null
    });
    this.close(this.focusInput);
    if (this.state.value !== null) {
      this.props.onChange(null);
    }
  }

  getCalendarElement() {
    var props = this.props;
    var state = this.state;
    var calendarInstance = this.calendarInstance;
    var calendarProp = props.calendar;
    var orient = calendarInstance && calendarInstance.state.orient || getImmutableOrient(calendarProp.props.orient) || orientMap.tl;
    var calendarElement = React.cloneElement(calendarProp, {
      ref: createChainedFunction(calendarProp.props.ref, this.saveCalendarRef),
      value: state.value,
      visible: state.open,
      orient: orient,
      onBlur: this.handleCalendarBlur,
      onKeyDown: this.handleCalendarKeyDown,
      onOk: createChainedFunction(calendarProp.props.onOk, this.handleCalendarOk),
      onSelect: createChainedFunction(calendarProp.props.onSelect, this.handleCalendarSelect),
      onClear: createChainedFunction(calendarProp.props.onClear, this.handleCalendarClear)
    });
    return <Animate
      component=""
      exclusive={true}
      animateMount={true}
      showProp="calendarOpen"
      transitionName={this.getTransitionName()}>
      <Align target={this.getInputDOMNode}
             key="calendar"
             onAlign={this.handleCalendarAlign}
             calendarOpen={state.open}
             disabled={!state.open}
             align={this.getAlign(orient)}>
        {calendarElement}
      </Align>
    </Animate>;
  }

  render() {
    var props = this.props;
    var disabled = props.disabled;
    var prefixCls = props.prefixCls;
    var renderCalendarToBody = props.renderCalendarToBody;
    var input = props.children;
    var state = this.state;
    var value = state.value;
    var calendar;
    this.haveOpened = this.haveOpened || state.open;
    if (!renderCalendarToBody && this.haveOpened) {
      calendar = this.getCalendarElement();
    }
    var inputValue = '';
    if (value) {
      inputValue = props.formatter.format(value);
    }
    input = React.cloneElement(input, {
      ref: createChainedFunction(input.props.ref, this.saveInputRef),
      readOnly: true,
      disabled: disabled,
      onClick: disabled ? noop : this.handleInputClick,
      value: inputValue,
      onKeyDown: disabled ? noop : this.handleKeyDown
    });
    var classes = {
      [prefixCls]: 1,
      [`${prefixCls}-open`]: state.open,
      [`${prefixCls}-disabled`]: disabled
    };
    var trigger = props.trigger;
    if (trigger) {
      trigger = React.cloneElement(trigger, {
        unselectable: true,
        onMouseDown: prevent,
        onClick: disabled ? noop : this.handleTriggerClick
      });
    }
    return <span className={classSet(classes)}>{toFragment([input, calendar, trigger])}</span>;
  }
}

Picker.propTypes = {
  onChange: React.PropTypes.func,
  renderCalendarToBody: React.PropTypes.bool,
  adjustOrientOnCalendarOverflow: React.PropTypes.bool
};

Picker.defaultProps = {
  prefixCls: 'rc-calendar-picker',
  adjustOrientOnCalendarOverflow: true,
  renderCalendarToBody: false,
  onChange: noop,
  formatter: new DateTimeFormat('yyyy-MM-dd')
};

export default Picker;
