'use strict';

var React = require('react');
var DateTimeFormat = require('gregorian-calendar-format');
var rcUtil = require('rc-util');
var toFragment = rcUtil.Children.mapSelf;
var KeyCode = rcUtil.KeyCode;
var domAlign = require('dom-align');
var orientMap = {
  tl: ['top', 'left'],
  tr: ['top', 'right'],
  bl: ['bottom', 'left'],
  br: ['bottom', 'right']
};
var createChainedFunction = rcUtil.createChainedFunction;
var cssAnimate = require('css-animation');

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

function refFn(field, component) {
  this[field] = component;
}

function getContainerClassName(prefixCls, open) {
  var ret = [prefixCls + '-container'];
  if (open) {
    ret.push(prefixCls + '-container-open');
  }
  return ret.join(' ');
}
/**
 * DatePicker = wrap input using Calendar
 */
class Picker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: props.open,
      value: props.value || props.defaultValue
    };
    var events = [
      'handleInputClick', 'handleCalendarBlur', 'handleTriggerClick',
      'handleCalendarClear', 'handleCalendarKeyDown', 'handleCalendarOk',
      'handleKeyDown', 'handleCalendarSelect', 'focusInput'
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

  componentDidMount() {
    this.componentDidUpdate();
  }

  componentDidUpdate(prevProps, prevState) {
    prevState = prevState || {};
    var props = this.props;
    var state = this.state;
    var prefixCls = props.prefixCls;
    if (props.renderCalendarToBody && !state.open && prevState.open) {
      this.getCalendarContainer().className = getContainerClassName(prefixCls);
    }
    if (state.open && !prevState.open) {
      if (props.renderCalendarToBody) {
        this.getCalendarContainer().className = getContainerClassName(prefixCls, true);
        React.render(this.getCalendarElement(), this.getCalendarContainer(), ()=> {
          this.alignCalendar();
        });
      } else {
        this.alignCalendar();
      }
    }
    this.animate(prevState, state);
  }

  getTransitionName() {
    var props = this.props;
    var transitionName = props.transitionName;
    if (!transitionName && props.animation) {
      transitionName = `${props.prefixCls}-${props.animation}`;
    }
    return transitionName;
  }

  animate(prevState, state) {
    var transitionName = this.getTransitionName();
    if (transitionName) {
      var calendarDomNode = React.findDOMNode(this.calendarInstance);
      if (prevState.open && !state.open) {
        cssAnimate(calendarDomNode, `${transitionName}-leave`);
      } else if (state.open && !prevState.open) {
        cssAnimate(calendarDomNode, `${transitionName}-enter`);
      }
    }
  }

  getCalendarContainer() {
    if (!this.calendarContainer) {
      this.calendarContainer = document.createElement('div');
      document.body.appendChild(this.calendarContainer);
    }
    return this.calendarContainer;
  }

  alignCalendar() {
    var orient = this.calendarElement.props.orient;
    var points = ['tl', 'bl'];
    var offset = [0, 5];
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

    var align = domAlign(React.findDOMNode(this.calendarInstance), React.findDOMNode(this.inputInstance), {
      points: points,
      offset: offset,
      overflow: {
        adjustX: 1,
        adjustY: 1
      }
    });
    points = align.points;
    var newOrient = orientMap[points[0]];
    this.calendarInstance.setState({
      orient: newOrient
    });
    React.findDOMNode(this.calendarInstance).focus();
  }

  open(callback) {
    this.setState({
      open: true
    }, callback);
  }

  close(callback) {
    this.setState({
      open: false
    }, callback);
  }

  focusInput() {
    React.findDOMNode(this.inputInstance).focus();
  }

  handleInputClick() {
    this.toggle();
  }

  handleTriggerClick() {
    this.toggle();
  }

  toggle(callback) {
    this.setState({
      open: !this.state.open
    }, callback);
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
    if (this.props.calendar.props.showTime) {
      this.setState({
        value: value
      });
    } else {
      this.setState({
        value: value,
        open: false
      }, this.focusInput);
    }
    if (!currentValue || currentValue.getTime() !== value.getTime()) {
      this.props.onChange(value);
    }
  }

  handleCalendarBlur() {
    // if invisible, will not trigger blur
    this.setState({
      open: false
    });
  }

  handleCalendarOk() {
    this.setState({
      open: false
    }, this.focusInput);
  }

  handleCalendarClear() {
    this.setState({
      open: false,
      value: null
    }, this.focusInput);
    if (this.state.value !== null) {
      this.props.onChange(null);
    }
  }

  getCalendarElement() {
    var props = this.props;
    var calendarInstance = this.calendarInstance;
    var calendarProp = props.calendar;
    this.calendarElement = React.cloneElement(calendarProp, {
      ref: rcUtil.createChainedFunction(calendarProp.props.ref, this.saveCalendarRef),
      value: this.state.value,
      // focused: true,
      orient: calendarInstance && calendarInstance.state.orient || getImmutableOrient(calendarProp.props.orient) || orientMap.tl,
      onBlur: this.handleCalendarBlur,
      onKeyDown: this.handleCalendarKeyDown,
      onOk: createChainedFunction(calendarProp.props.onOk, this.handleCalendarOk),
      onSelect: createChainedFunction(calendarProp.props.onSelect, this.handleCalendarSelect),
      onClear: createChainedFunction(calendarProp.props.onClear, this.handleCalendarClear)
    });
    return this.calendarElement;
  }

  render() {
    var props = this.props;
    var renderCalendarToBody = props.renderCalendarToBody;
    // var input = React.Children.only(props.children); bug 0.13.0
    /*
     children: Object
     .0: (...)
     get .0: function () {
     set .0: function (value) {
     _reactDidWarn: false
     _reactFragment: Object
     __proto__: Object
     */
    var input = props.children;
    if (!React.isValidElement(input)) {
      var children = input;
      React.Children.forEach(children, m => {
        input = m;
      });
    }
    var state = this.state;
    var value = state.value;
    var calendar;
    if (!renderCalendarToBody) {
      calendar = state.open ? this.getCalendarElement() : this.calendarElement;
    }
    var inputValue = '';
    if (value) {
      inputValue = props.formatter.format(value);
    }
    input = React.cloneElement(input, {
      ref: rcUtil.createChainedFunction(input.props.ref, this.saveInputRef),
      readOnly: true,
      onClick: this.handleInputClick,
      value: inputValue,
      onKeyDown: this.handleKeyDown
    });
    var classes = [props.prefixCls];
    if (state.open) {
      classes.push(props.prefixCls + '-open');
    }
    var trigger = props.trigger;
    if (trigger) {
      trigger = React.cloneElement(trigger, {
        onClick: this.handleTriggerClick,
        unselectable: true,
        onMouseDown: prevent
      });
    }
    return <span className={classes.join(' ')}>{toFragment([input, calendar, trigger])}</span>;
  }
}

function prevent(e) {
  e.preventDefault();
}

Picker.propTypes = {
  onChange: React.PropTypes.func,
  renderCalendarToBody: React.PropTypes.bool
};

Picker.defaultProps = {
  prefixCls: 'rc-calendar-picker',
  renderCalendarToBody: false,
  onChange() {
  },
  formatter: new DateTimeFormat('yyyy-MM-dd')
};

module.exports = Picker;
