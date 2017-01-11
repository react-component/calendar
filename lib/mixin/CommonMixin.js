'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _en_US = require('../locale/en_US');

var _en_US2 = _interopRequireDefault(_en_US);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function noop() {}

exports.default = {
  propTypes: {
    className: _react.PropTypes.string,
    locale: _react.PropTypes.object,
    style: _react.PropTypes.object,
    visible: _react.PropTypes.bool,
    onSelect: _react.PropTypes.func,
    prefixCls: _react.PropTypes.string,
    onChange: _react.PropTypes.func,
    onOk: _react.PropTypes.func
  },

  getDefaultProps: function getDefaultProps() {
    return {
      locale: _en_US2.default,
      style: {},
      visible: true,
      prefixCls: 'rc-calendar',
      className: '',
      onSelect: noop,
      onChange: noop,
      onClear: noop,
      renderFooter: function renderFooter() {
        return null;
      },
      renderSidebar: function renderSidebar() {
        return null;
      }
    };
  },
  shouldComponentUpdate: function shouldComponentUpdate(nextProps) {
    return this.props.visible || nextProps.visible;
  },
  getFormat: function getFormat() {
    var format = this.props.format;
    var _props = this.props,
        locale = _props.locale,
        timePicker = _props.timePicker;

    if (!format) {
      if (timePicker) {
        format = locale.dateTimeFormat;
      } else {
        format = locale.dateFormat;
      }
    }
    return format;
  },
  focus: function focus() {
    if (this.refs.root) {
      this.refs.root.focus();
    }
  }
};