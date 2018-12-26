'use strict';

exports.__esModule = true;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _createReactClass = require('create-react-class');

var _createReactClass2 = _interopRequireDefault(_createReactClass);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _mapSelf = require('rc-util/lib/Children/mapSelf');

var _mapSelf2 = _interopRequireDefault(_mapSelf);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _TodayButton = require('../calendar/TodayButton');

var _TodayButton2 = _interopRequireDefault(_TodayButton);

var _OkButton = require('../calendar/OkButton');

var _OkButton2 = _interopRequireDefault(_OkButton);

var _TimePickerButton = require('../calendar/TimePickerButton');

var _TimePickerButton2 = _interopRequireDefault(_TimePickerButton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var CalendarFooter = (0, _createReactClass2['default'])({
  displayName: 'CalendarFooter',

  propTypes: {
    prefixCls: _propTypes2['default'].string,
    showDateInput: _propTypes2['default'].bool,
    disabledTime: _propTypes2['default'].any,
    timePicker: _propTypes2['default'].element,
    selectedValue: _propTypes2['default'].any,
    showOk: _propTypes2['default'].bool,
    onSelect: _propTypes2['default'].func,
    value: _propTypes2['default'].object,
    renderFooter: _propTypes2['default'].func,
    defaultValue: _propTypes2['default'].object
  },

  onSelect: function onSelect(value) {
    this.props.onSelect(value);
  },
  getRootDOMNode: function getRootDOMNode() {
    return _reactDom2['default'].findDOMNode(this);
  },
  render: function render() {
    var props = this.props;
    var value = props.value,
        prefixCls = props.prefixCls,
        showOk = props.showOk,
        timePicker = props.timePicker,
        renderFooter = props.renderFooter;

    var footerEl = null;
    var extraFooter = renderFooter();
    if (props.showToday || timePicker || extraFooter) {
      var _cx;

      var nowEl = void 0;
      if (props.showToday) {
        nowEl = _react2['default'].createElement(_TodayButton2['default'], (0, _extends3['default'])({}, props, { value: value }));
      }
      var okBtn = void 0;
      if (showOk === true || showOk !== false && !!props.timePicker) {
        okBtn = _react2['default'].createElement(_OkButton2['default'], props);
      }
      var timePickerBtn = void 0;
      if (!!props.timePicker) {
        timePickerBtn = _react2['default'].createElement(_TimePickerButton2['default'], props);
      }

      var footerBtn = void 0;
      if (nowEl || timePickerBtn || okBtn || extraFooter) {
        footerBtn = _react2['default'].createElement(
          'span',
          { className: prefixCls + '-footer-btn' },
          extraFooter,
          (0, _mapSelf2['default'])([nowEl, timePickerBtn, okBtn])
        );
      }
      var cls = (0, _classnames2['default'])(prefixCls + '-footer', (_cx = {}, _cx[prefixCls + '-footer-show-ok'] = okBtn, _cx));
      footerEl = _react2['default'].createElement(
        'div',
        { className: cls },
        footerBtn
      );
    }
    return footerEl;
  }
});

exports['default'] = CalendarFooter;
module.exports = exports['default'];