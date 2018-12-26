'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _index = require('../util/index');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function noop() {}

function getNow() {
  return (0, _moment2['default'])();
}

function getNowByCurrentStateValue(value) {
  var ret = void 0;
  if (value) {
    ret = (0, _index.getTodayTime)(value);
  } else {
    ret = getNow();
  }
  return ret;
}

var CalendarMixin = {
  propTypes: {
    value: _propTypes2['default'].object,
    defaultValue: _propTypes2['default'].object,
    onKeyDown: _propTypes2['default'].func
  },

  getDefaultProps: function getDefaultProps() {
    return {
      onKeyDown: noop
    };
  },
  getInitialState: function getInitialState() {
    var props = this.props;
    var value = props.value || props.defaultValue || getNow();
    return {
      value: value,
      selectedValue: props.selectedValue || props.defaultSelectedValue
    };
  },
  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    var value = nextProps.value;
    var selectedValue = nextProps.selectedValue;

    if ('value' in nextProps) {
      value = value || nextProps.defaultValue || getNowByCurrentStateValue(this.state.value);
      this.setState({
        value: value
      });
    }
    if ('selectedValue' in nextProps) {
      this.setState({
        selectedValue: selectedValue
      });
    }
  },
  onSelect: function onSelect(value, cause) {
    if (value) {
      this.setValue(value);
    }
    this.setSelectedValue(value, cause);
  },
  renderRoot: function renderRoot(newProps) {
    var _className;

    var props = this.props;
    var prefixCls = props.prefixCls;

    var className = (_className = {}, _className[prefixCls] = 1, _className[prefixCls + '-hidden'] = !props.visible, _className[props.className] = !!props.className, _className[newProps.className] = !!newProps.className, _className);

    return _react2['default'].createElement(
      'div',
      {
        ref: this.saveRoot,
        className: '' + (0, _classnames2['default'])(className),
        style: this.props.style,
        tabIndex: '0',
        onKeyDown: this.onKeyDown
      },
      newProps.children
    );
  },
  setSelectedValue: function setSelectedValue(selectedValue, cause) {
    // if (this.isAllowedDate(selectedValue)) {
    if (!('selectedValue' in this.props)) {
      this.setState({
        selectedValue: selectedValue
      });
    }
    this.props.onSelect(selectedValue, cause);
    // }
  },
  setValue: function setValue(value) {
    var originalValue = this.state.value;
    if (!('value' in this.props)) {
      this.setState({
        value: value
      });
    }
    if (originalValue && value && !originalValue.isSame(value) || !originalValue && value || originalValue && !value) {
      this.props.onChange(value);
    }
  },
  isAllowedDate: function isAllowedDate(value) {
    var disabledDate = this.props.disabledDate;
    var disabledTime = this.props.disabledTime;
    return (0, _index.isAllowedDate)(value, disabledDate, disabledTime);
  }
};

exports['default'] = CalendarMixin;
module.exports = exports['default'];