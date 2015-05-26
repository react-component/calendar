'use strict';

var React = require('react');
var DateTimeFormat = require('gregorian-calendar-format');
var rcUtil = require('rc-util');
var KeyCode = require('rc-util').KeyCode;
var domAlign = require('dom-align');
var orientMap = {
  tl: ['top', 'left'],
  tr: ['top', 'right'],
  bl: ['bottom', 'left'],
  br: ['bottom', 'right']
};

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
      'handleCalendarClear', 'handleCalendarKeyDown',
      'handleKeyDown', 'handleCalendarSelect'
    ];
    // bind methods
    events.forEach(m => {
      this[m] = this[m].bind(this);
    });
    this.saveCalendarRef = refFn.bind(this, 'calendarInstance');
    this.saveInputRef = refFn.bind(this, 'inputInstance');
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value) {
      this.setState({
        value: nextProps.value
      });
    }
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
      this.close(() => {
        React.findDOMNode(this.inputInstance).focus();
      });
    }
  }

  handleCalendarSelect(value) {
    this.props.calendar.props.onSelect(value);
    var currentValue = this.state.value;
    if (this.props.calendar.props.showTime) {
      this.setState({
        value: value
      });
    } else {
      this.setState({
        value: value,
        open: false
      }, () => {
        React.findDOMNode(this.inputInstance).focus();
      });
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

  handleCalendarClear() {
    this.props.calendar.props.onClear();
    this.setState({
      open: false,
      value: null
    }, ()=> {
      React.findDOMNode(this.inputInstance).focus();
    });
    if (this.state.value !== null) {
      this.props.onChange(null);
    }
  }

  componentDidMount() {
    this.componentDidUpdate();
  }

  componentDidUpdate() {
    if (this.state.open && !this._lastOpen) {
      var orient = this._cacheCalendar.props.orient;
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
    this._lastOpen = this.state.open;
  }

  render() {
    var props = this.props;
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
    var calendar = this._cacheCalendar;
    if (state.open) {
      var calendarInstance = this.calendarInstance;
      var calendarProp = props.calendar;
      this._cacheCalendar = calendar = React.cloneElement(calendarProp, {
        ref: rcUtil.createChainedFunction(calendarProp.props.ref, this.saveCalendarRef),
        value: value,
        // focused: true,
        orient: calendarInstance && calendarInstance.state.orient || getImmutableOrient(calendarProp.props.orient) || orientMap.tl,
        onBlur: this.handleCalendarBlur,
        onKeyDown: this.handleCalendarKeyDown,
        onSelect: this.handleCalendarSelect,
        onClear: this.handleCalendarClear
      });
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
    return <span className={classes.join(' ')}>{[input, calendar, trigger]}</span>;
  }
}

function prevent(e) {
  e.preventDefault();
}

Picker.propTypes = {
  onChange: React.PropTypes.func
};

Picker.defaultProps = {
  prefixCls: 'rc-calendar-picker',
  onChange() {
  },
  formatter: new DateTimeFormat('yyyy-MM-dd')
};

module.exports = Picker;
