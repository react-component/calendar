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
class Picker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      value: props.value || props.defaultValue,
    };
    const events = [
      'onCalendarAlign',
      'onInputClick', 'onCalendarBlur', 'onTriggerClick',
      'onCalendarClear', 'onCalendarKeyDown', 'onCalendarOk',
      'onKeyDown', 'onCalendarSelect', 'focusInput', 'getInputDOMNode',
    ];
    // bind methods
    events.forEach(m => {
      this[m] = this[m].bind(this);
    });
    this.saveCalendarRef = refFn.bind(this, 'calendarInstance');
    this.saveInputRef = refFn.bind(this, 'inputInstance');
  }

  componentWillReceiveProps(nextProps) {
    let value = nextProps.value;
    if (value !== undefined) {
      // null special meaning
      value = value || nextProps.defaultValue || null;
      this.setState({
        value: value,
      });
    }
  }

  componentDidUpdate(prevProps, prevState = {}) {
    const props = this.props;
    if (this.haveOpened && props.renderCalendarToBody) {
      React.render(this.getCalendarElement(), this.getCalendarContainer(), () => {
        this.focusCalendarOnOpen(prevState);
      });
    } else {
      this.focusCalendarOnOpen(prevState);
    }
  }

  componentWillUnmount() {
    if (this.calendarContainer) {
      React.unmountComponentAtNode(this.calendarContainer);
      this.calendarContainer.parentNode.removeChild(this.calendarContainer);
      this.calendarContainer = null;
    }
  }

  onCalendarAlign(node, align) {
    const points = align.points;
    const newOrient = orientMap[points[0]];
    this.calendarInstance.setOrient(newOrient);
  }

  onInputClick() {
    this.toggle();
  }

  onTriggerClick() {
    this.toggle();
  }

  onKeyDown(e) {
    // down
    if (e.keyCode === KeyCode.DOWN) {
      e.preventDefault();
      this.open();
    }
  }

  onCalendarKeyDown(e) {
    if (e.keyCode === KeyCode.ESC) {
      e.stopPropagation();
      this.close(this.focusInput);
    }
  }

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
  }

  onCalendarBlur() {
    if (document.activeElement === this.getInputDOMNode()) {
      return;
    }
    // if invisible, will not trigger blur
    // do not set if already false, avoid ruin animate
    this.close();
  }

  onCalendarOk() {
    this.close(this.focusInput);
  }

  onCalendarClear() {
    this.setState({
      value: null,
    });
    this.close(this.focusInput);
    if (this.state.value !== null) {
      this.props.onChange(null);
    }
  }

  getInputDOMNode() {
    return React.findDOMNode(this.inputInstance);
  }

  getTransitionName() {
    const props = this.props;
    let transitionName = props.transitionName;
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
  }

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
      ref: createChainedFunction(calendarProp.props.ref, this.saveCalendarRef),
      value: state.value,
      visible: state.open,
      orient: orient,
      onBlur: this.onCalendarBlur,
      onKeyDown: this.onCalendarKeyDown,
      onOk: createChainedFunction(calendarProp.props.onOk, this.onCalendarOk),
      onSelect: createChainedFunction(calendarProp.props.onSelect, this.onCalendarSelect),
      onClear: createChainedFunction(calendarProp.props.onClear, this.onCalendarClear),
    });
    return (<Animate
      component=""
      exclusive={true}
      animateMount={true}
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
  }

  render() {
    const props = this.props;
    const disabled = props.disabled;
    const prefixCls = props.prefixCls;
    const renderCalendarToBody = props.renderCalendarToBody;
    let input = props.children;
    const state = this.state;
    const value = state.value;
    let calendar;
    this.haveOpened = this.haveOpened || state.open;
    if (!renderCalendarToBody && this.haveOpened) {
      calendar = this.getCalendarElement();
    }
    let inputValue = '';
    if (value) {
      inputValue = props.formatter.format(value);
    }
    input = React.cloneElement(input, {
      ref: createChainedFunction(input.props.ref, this.saveInputRef),
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
    return <span className={classSet(classes)}>{toFragment([input, calendar, trigger])}</span>;
  }

  focusInput() {
    this.getInputDOMNode().focus();
  }

  focusCalendarOnOpen(prevState) {
    if (!prevState.open && this.state.open) {
      React.findDOMNode(this.calendarInstance).focus();
    }
  }

  setOpen(open, callback) {
    if (this.state.open !== open) {
      this.setState({
        open: open,
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
}

Picker.propTypes = {
  onChange: React.PropTypes.func,
  calendar: React.PropTypes.element,
  prefixCls: React.PropTypes.string,
  renderCalendarToBody: React.PropTypes.bool,
  adjustOrientOnCalendarOverflow: React.PropTypes.oneOfType([React.PropTypes.bool, React.PropTypes.object]),
};

Picker.defaultProps = {
  prefixCls: 'rc-calendar-picker',
  adjustOrientOnCalendarOverflow: true,
  renderCalendarToBody: false,
  onChange: noop,
  formatter: new DateTimeFormat('yyyy-MM-dd'),
};

export default Picker;
