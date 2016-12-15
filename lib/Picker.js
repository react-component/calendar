'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _createChainedFunction = require('rc-util/lib/createChainedFunction');

var _createChainedFunction2 = _interopRequireDefault(_createChainedFunction);

var _KeyCode = require('rc-util/lib/KeyCode');

var _KeyCode2 = _interopRequireDefault(_KeyCode);

var _placements = require('./picker/placements');

var _placements2 = _interopRequireDefault(_placements);

var _rcTrigger = require('rc-trigger');

var _rcTrigger2 = _interopRequireDefault(_rcTrigger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function noop() {}

function refFn(field, component) {
  this[field] = component;
}

var Picker = _react2.default.createClass({
  displayName: 'Picker',

  propTypes: {
    animation: _react.PropTypes.oneOfType([_react.PropTypes.func, _react.PropTypes.string]),
    disabled: _react.PropTypes.bool,
    transitionName: _react.PropTypes.string,
    onChange: _react.PropTypes.func,
    onOpenChange: _react.PropTypes.func,
    children: _react.PropTypes.func,
    getCalendarContainer: _react.PropTypes.func,
    calendar: _react.PropTypes.element,
    style: _react.PropTypes.object,
    open: _react.PropTypes.bool,
    defaultOpen: _react.PropTypes.bool,
    prefixCls: _react.PropTypes.string,
    placement: _react.PropTypes.any,
    value: _react.PropTypes.oneOfType([_react.PropTypes.object, _react.PropTypes.array]),
    defaultValue: _react.PropTypes.oneOfType([_react.PropTypes.object, _react.PropTypes.array]),
    align: _react.PropTypes.object
  },

  getDefaultProps: function getDefaultProps() {
    return {
      prefixCls: 'rc-calendar-picker',
      style: {},
      align: {},
      placement: 'bottomLeft',
      defaultOpen: false,
      onChange: noop,
      onOpenChange: noop
    };
  },
  getInitialState: function getInitialState() {
    var props = this.props;
    var open = void 0;
    if ('open' in props) {
      open = props.open;
    } else {
      open = props.defaultOpen;
    }
    var value = props.value || props.defaultValue;
    this.saveCalendarRef = refFn.bind(this, 'calendarInstance');
    return {
      open: open,
      value: value
    };
  },
  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    var value = nextProps.value,
        open = nextProps.open;

    if ('value' in nextProps) {
      this.setState({
        value: value
      });
    }
    if (open !== undefined) {
      this.setState({
        open: open
      });
    }
  },
  onCalendarKeyDown: function onCalendarKeyDown(event) {
    if (event.keyCode === _KeyCode2.default.ESC) {
      event.stopPropagation();
      this.close(this.focus);
    }
  },
  onCalendarSelect: function onCalendarSelect(value) {
    var cause = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    var props = this.props;
    if (!('value' in props)) {
      this.setState({
        value: value
      });
    }
    if (cause.source === 'keyboard' || !props.calendar.props.timePicker && cause.source !== 'dateInput' || cause.source === 'todayButton') {
      this.close(this.focus);
    }
    props.onChange(value);
  },
  onKeyDown: function onKeyDown(event) {
    if (event.keyCode === _KeyCode2.default.DOWN && !this.state.open) {
      this.open(this.focusCalendar);
      event.preventDefault();
    }
  },
  onCalendarOk: function onCalendarOk() {
    this.close(this.focus);
  },
  onCalendarClear: function onCalendarClear() {
    this.close(this.focus);
  },
  onVisibleChange: function onVisibleChange(open) {
    this.setOpen(open, this.focusCalendar);
  },
  getCalendarElement: function getCalendarElement() {
    var props = this.props;
    var state = this.state;
    var calendarProps = props.calendar.props;
    var value = state.value;

    var defaultValue = void 0;
    // RangeCalendar
    if (Array.isArray(value)) {
      defaultValue = value[0];
    } else {
      defaultValue = value;
    }
    var extraProps = {
      ref: this.saveCalendarRef,
      defaultValue: defaultValue || calendarProps.defaultValue,
      selectedValue: value,
      onKeyDown: this.onCalendarKeyDown,
      onOk: (0, _createChainedFunction2.default)(calendarProps.onOk, this.onCalendarOk),
      onSelect: (0, _createChainedFunction2.default)(calendarProps.onSelect, this.onCalendarSelect),
      onClear: (0, _createChainedFunction2.default)(calendarProps.onClear, this.onCalendarClear)
    };

    return _react2.default.cloneElement(props.calendar, extraProps);
  },
  setOpen: function setOpen(open, callback) {
    var onOpenChange = this.props.onOpenChange;

    if (this.state.open !== open) {
      if (!('open' in this.props)) {
        this.setState({
          open: open
        }, callback);
      }
      onOpenChange(open);
    }
  },
  open: function open(callback) {
    this.setOpen(true, callback);
  },
  close: function close(callback) {
    this.setOpen(false, callback);
  },
  focus: function focus() {
    if (!this.state.open) {
      _reactDom2.default.findDOMNode(this).focus();
    }
  },
  focusCalendar: function focusCalendar() {
    if (this.state.open && this.calendarInstance !== null) {
      this.calendarInstance.focus();
    }
  },
  render: function render() {
    var props = this.props;
    var prefixCls = props.prefixCls,
        placement = props.placement,
        style = props.style,
        getCalendarContainer = props.getCalendarContainer,
        align = props.align,
        animation = props.animation,
        disabled = props.disabled,
        transitionName = props.transitionName,
        children = props.children;

    var state = this.state;
    return _react2.default.createElement(
      _rcTrigger2.default,
      {
        popup: this.getCalendarElement(),
        popupAlign: align,
        builtinPlacements: _placements2.default,
        popupPlacement: placement,
        action: disabled && !state.open ? [] : ['click'],
        destroyPopupOnHide: true,
        getPopupContainer: getCalendarContainer,
        popupStyle: style,
        popupAnimation: animation,
        popupTransitionName: transitionName,
        popupVisible: state.open,
        onPopupVisibleChange: this.onVisibleChange,
        prefixCls: prefixCls
      },
      _react2.default.cloneElement(children(state, props), { onKeyDown: this.onKeyDown })
    );
  }
});

exports.default = Picker;