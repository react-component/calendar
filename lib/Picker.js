/** @jsx React.DOM */

var React = require('react');
var DateTimeFormat = require('gregorian-calendar-format');
var cloneWithProps = require('./utils/cloneWithProps');
var createChainedFunction = require('./util').createChainedFunction;
var KeyCode = require('./util').KeyCode;
var domAlign = require('dom-align');
var orientMap = {
  tl: ['top', 'left'],
  tr: ['top', 'right'],
  bl: ['bottom', 'left'],
  br: ['bottom', 'right']
};

/**
 * DatePicker = wrap input using Calendar
 */
var Picker = React.createClass({
  propTypes: {
    onChange: React.PropTypes.func
  },

  getDefaultProps: function () {
    return {
      prefixCls: 'rc-calendar-picker',
      onChange: function () {
      },
      formatter: new DateTimeFormat('yyyy-MM-dd', require('gregorian-calendar/lib/locale/en-us'))
    };
  },

  getInitialState: function () {
    return {
      open: this.props.open,
      value: this.props.value,
      orient: this.props.calendar.props.orient || ['top', 'left']
    };
  },

  componentWillReceiveProps: function (nextProps) {
    this.setState({
      value: nextProps.value
    });
  },

  handleInputClick: function () {
    this.setState({
      open: true
    });
  },

  handleKeyDown: function (e) {
    // down
    if (e.keyCode === KeyCode.DOWN) {
      e.preventDefault();
      this.handleInputClick();
    }
  },

  handleCalendarSelect: function (value) {
    var self = this;
    var currentValue = this.state.value;
    if (this.props.calendar.props.showTime) {
      this.setState({
        value: value
      });
    } else {
      // avoid weird click fired on input
      setTimeout(function () {
        self.setState({
          value: value,
          open: false
        }, function () {
          self.refs.input.getDOMNode().focus();
        });
      }, 0);
    }
    if (!currentValue || currentValue.getTime() !== value.getTime()) {
      self.props.onChange(value);
    }
  },

  handleCalendarBlur: function () {
    // if invisible, will not trigger blur
    this.setState({
      open: false
    });
  },

  componentDidMount: function () {
    this.componentDidUpdate();
  },

  componentDidUpdate: function () {
    var refs = this.refs;
    if (this.state.open && !this._lastOpen) {
      var orient = this.state.orient;
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

      var align = domAlign(refs.calendar.getDOMNode(), refs.input.getDOMNode(), {
        points: points,
        offset: offset,
        overflow: {
          adjustX: 1,
          adjustY: 1
        }
      });
      points = align.points;
      var newOrient = orientMap[points[0]];
      this.refs.calendar.setState({
        orient: newOrient
      });
      this.refs.calendar.getDOMNode().focus();
    }
    this._lastOpen = this.state.open;
  },

  render: function () {
    var props = this.props;
    var input = props.children;
    var state = this.state;
    var value = state.value;
    var calendar = this._cacheCalendar;
    if (state.open) {
      this._cacheCalendar = calendar = cloneWithProps(props.calendar, {
        ref: 'calendar',
        value: value,
        // focused: true,
        orient: state.orient,
        onBlur: this.handleCalendarBlur,
        onSelect: createChainedFunction(this.handleCalendarSelect, props.calendar.props.onSelect)
      });
    }
    var inputValue = '';
    if (value) {
      inputValue = props.formatter.format(value);
    }
    input = cloneWithProps(input, {
      ref: 'input',
      readOnly: true,
      onClick: this.handleInputClick,
      value: inputValue,
      onKeyDown: this.handleKeyDown
    });
    var classes = [props.prefixCls];
    if (state.open) {
      classes.push(props.prefixCls + '-open');
    }
    return <span className={classes.join(' ')}>{[input, calendar]}</span>;
  }
});

module.exports = Picker;
