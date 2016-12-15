'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _CalendarHeader = require('../calendar/CalendarHeader');

var _CalendarHeader2 = _interopRequireDefault(_CalendarHeader);

var _DateTable = require('../date/DateTable');

var _DateTable2 = _interopRequireDefault(_DateTable);

var _DateInput = require('../date/DateInput');

var _DateInput2 = _interopRequireDefault(_DateInput);

var _index = require('../util/index');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CalendarPart = _react2.default.createClass({
  displayName: 'CalendarPart',

  propTypes: {
    value: _react.PropTypes.any,
    direction: _react.PropTypes.any,
    prefixCls: _react.PropTypes.any,
    locale: _react.PropTypes.any,
    selectedValue: _react.PropTypes.any,
    hoverValue: _react.PropTypes.any,
    showTimePicker: _react.PropTypes.bool,
    format: _react.PropTypes.any,
    placeholder: _react.PropTypes.any,
    disabledDate: _react.PropTypes.any,
    timePicker: _react.PropTypes.any,
    disabledTime: _react.PropTypes.any,
    onInputSelect: _react.PropTypes.func,
    timePickerDisabledTime: _react.PropTypes.object
  },
  render: function render() {
    var props = this.props;
    var value = props.value,
        direction = props.direction,
        prefixCls = props.prefixCls,
        locale = props.locale,
        selectedValue = props.selectedValue,
        format = props.format,
        placeholder = props.placeholder,
        disabledDate = props.disabledDate,
        timePicker = props.timePicker,
        disabledTime = props.disabledTime,
        timePickerDisabledTime = props.timePickerDisabledTime,
        showTimePicker = props.showTimePicker,
        hoverValue = props.hoverValue,
        onInputSelect = props.onInputSelect;

    var disabledTimeConfig = showTimePicker && disabledTime && timePicker ? (0, _index.getTimeConfig)(selectedValue, disabledTime) : null;
    var rangeClassName = prefixCls + '-range';
    var newProps = {
      locale: locale,
      value: value,
      prefixCls: prefixCls,
      showTimePicker: showTimePicker
    };
    var index = direction === 'left' ? 0 : 1;
    var timePickerEle = showTimePicker && timePicker && _react2.default.cloneElement(timePicker, _extends({
      showHour: true,
      showMinute: true,
      showSecond: true
    }, timePicker.props, disabledTimeConfig, timePickerDisabledTime, {
      onChange: onInputSelect,
      defaultOpenValue: value,
      value: selectedValue[index]
    }));
    return _react2.default.createElement(
      'div',
      { className: rangeClassName + '-part ' + rangeClassName + '-' + direction },
      _react2.default.createElement(_DateInput2.default, {
        format: format,
        locale: locale,
        prefixCls: prefixCls,
        timePicker: timePicker,
        disabledDate: disabledDate,
        placeholder: placeholder,
        disabledTime: disabledTime,
        value: value,
        showClear: false,
        selectedValue: selectedValue[index],
        onChange: onInputSelect
      }),
      _react2.default.createElement(
        'div',
        { style: { outline: 'none' } },
        _react2.default.createElement(_CalendarHeader2.default, _extends({}, newProps, {
          enableNext: direction === 'right',
          enablePrev: direction === 'left',
          onValueChange: props.onValueChange
        })),
        showTimePicker ? _react2.default.createElement(
          'div',
          { className: prefixCls + '-time-picker' },
          _react2.default.createElement(
            'div',
            { className: prefixCls + '-time-picker-panel' },
            timePickerEle
          )
        ) : null,
        _react2.default.createElement(
          'div',
          { className: prefixCls + '-body' },
          _react2.default.createElement(_DateTable2.default, _extends({}, newProps, {
            hoverValue: hoverValue,
            selectedValue: selectedValue,
            dateRender: props.dateRender,
            onSelect: props.onSelect,
            onDayHover: props.onDayHover,
            disabledDate: disabledDate,
            showWeekNumber: props.showWeekNumber
          }))
        )
      )
    );
  }
});

exports.default = CalendarPart;