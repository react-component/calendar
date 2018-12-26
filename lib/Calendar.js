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

var _KeyCode = require('rc-util/lib/KeyCode');

var _KeyCode2 = _interopRequireDefault(_KeyCode);

var _DateTable = require('./date/DateTable');

var _DateTable2 = _interopRequireDefault(_DateTable);

var _CalendarHeader = require('./calendar/CalendarHeader');

var _CalendarHeader2 = _interopRequireDefault(_CalendarHeader);

var _CalendarFooter = require('./calendar/CalendarFooter');

var _CalendarFooter2 = _interopRequireDefault(_CalendarFooter);

var _CalendarMixin = require('./mixin/CalendarMixin');

var _CalendarMixin2 = _interopRequireDefault(_CalendarMixin);

var _CommonMixin = require('./mixin/CommonMixin');

var _CommonMixin2 = _interopRequireDefault(_CommonMixin);

var _DateInput = require('./date/DateInput');

var _DateInput2 = _interopRequireDefault(_DateInput);

var _util = require('./util');

var _toTime = require('./util/toTime');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function noop() {}

var Calendar = (0, _createReactClass2['default'])({
  displayName: 'Calendar',

  propTypes: {
    prefixCls: _propTypes2['default'].string,
    className: _propTypes2['default'].string,
    style: _propTypes2['default'].object,
    defaultValue: _propTypes2['default'].object,
    value: _propTypes2['default'].object,
    selectedValue: _propTypes2['default'].object,
    mode: _propTypes2['default'].oneOf(['time', 'date', 'month', 'year', 'decade']),
    locale: _propTypes2['default'].object,
    showDateInput: _propTypes2['default'].bool,
    showWeekNumber: _propTypes2['default'].bool,
    showToday: _propTypes2['default'].bool,
    showOk: _propTypes2['default'].bool,
    onSelect: _propTypes2['default'].func,
    onOk: _propTypes2['default'].func,
    onKeyDown: _propTypes2['default'].func,
    timePicker: _propTypes2['default'].element,
    dateInputPlaceholder: _propTypes2['default'].any,
    onClear: _propTypes2['default'].func,
    onChange: _propTypes2['default'].func,
    onPanelChange: _propTypes2['default'].func,
    disabledDate: _propTypes2['default'].func,
    disabledTime: _propTypes2['default'].any,
    dateRender: _propTypes2['default'].func,
    renderFooter: _propTypes2['default'].func,
    renderSidebar: _propTypes2['default'].func,
    clearIcon: _propTypes2['default'].node
  },

  mixins: [_CommonMixin2['default'], _CalendarMixin2['default']],

  getDefaultProps: function getDefaultProps() {
    return {
      showToday: true,
      showDateInput: true,
      timePicker: null,
      onOk: noop,
      onPanelChange: noop
    };
  },
  getInitialState: function getInitialState() {
    return {
      mode: this.props.mode || 'date'
    };
  },
  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    if ('mode' in nextProps && this.state.mode !== nextProps.mode) {
      this.setState({ mode: nextProps.mode });
    }
  },
  onKeyDown: function onKeyDown(event) {
    if (event.target.nodeName.toLowerCase() === 'input') {
      return undefined;
    }
    var keyCode = event.keyCode;
    // mac
    var ctrlKey = event.ctrlKey || event.metaKey;
    var disabledDate = this.props.disabledDate;
    var value = this.state.value;

    switch (keyCode) {
      case _KeyCode2['default'].DOWN:
        this.goTime(1, 'weeks');
        event.preventDefault();
        return 1;
      case _KeyCode2['default'].UP:
        this.goTime(-1, 'weeks');
        event.preventDefault();
        return 1;
      case _KeyCode2['default'].LEFT:
        if (ctrlKey) {
          this.goTime(-1, 'years');
        } else {
          this.goTime(-1, 'days');
        }
        event.preventDefault();
        return 1;
      case _KeyCode2['default'].RIGHT:
        if (ctrlKey) {
          this.goTime(1, 'years');
        } else {
          this.goTime(1, 'days');
        }
        event.preventDefault();
        return 1;
      case _KeyCode2['default'].HOME:
        this.setValue((0, _toTime.goStartMonth)(this.state.value));
        event.preventDefault();
        return 1;
      case _KeyCode2['default'].END:
        this.setValue((0, _toTime.goEndMonth)(this.state.value));
        event.preventDefault();
        return 1;
      case _KeyCode2['default'].PAGE_DOWN:
        this.goTime(1, 'month');
        event.preventDefault();
        return 1;
      case _KeyCode2['default'].PAGE_UP:
        this.goTime(-1, 'month');
        event.preventDefault();
        return 1;
      case _KeyCode2['default'].ENTER:
        if (!disabledDate || !disabledDate(value)) {
          this.onSelect(value, {
            source: 'keyboard'
          });
        }
        event.preventDefault();
        return 1;
      default:
        this.props.onKeyDown(event);
        return 1;
    }
  },
  onClear: function onClear() {
    this.onSelect(null);
    this.props.onClear();
  },
  onOk: function onOk() {
    var selectedValue = this.state.selectedValue;

    if (this.isAllowedDate(selectedValue)) {
      this.props.onOk(selectedValue);
    }
  },
  onDateInputChange: function onDateInputChange(value) {
    this.onSelect(value, {
      source: 'dateInput'
    });
  },
  onDateTableSelect: function onDateTableSelect(value) {
    var timePicker = this.props.timePicker;
    var selectedValue = this.state.selectedValue;

    if (!selectedValue && timePicker) {
      var timePickerDefaultValue = timePicker.props.defaultValue;
      if (timePickerDefaultValue) {
        (0, _util.syncTime)(timePickerDefaultValue, value);
      }
    }
    this.onSelect(value);
  },
  onToday: function onToday() {
    var value = this.state.value;

    var now = (0, _util.getTodayTime)(value);
    this.onSelect(now, {
      source: 'todayButton'
    });
  },
  onPanelChange: function onPanelChange(value, mode) {
    var props = this.props,
        state = this.state;

    if (!('mode' in props)) {
      this.setState({ mode: mode });
    }
    props.onPanelChange(value || state.value, mode);
  },
  getRootDOMNode: function getRootDOMNode() {
    return _reactDom2['default'].findDOMNode(this);
  },
  openTimePicker: function openTimePicker() {
    this.onPanelChange(null, 'time');
  },
  closeTimePicker: function closeTimePicker() {
    this.onPanelChange(null, 'date');
  },
  goTime: function goTime(direction, unit) {
    this.setValue((0, _toTime.goTime)(this.state.value, direction, unit));
  },
  render: function render() {
    var props = this.props,
        state = this.state;
    var locale = props.locale,
        prefixCls = props.prefixCls,
        disabledDate = props.disabledDate,
        dateInputPlaceholder = props.dateInputPlaceholder,
        timePicker = props.timePicker,
        disabledTime = props.disabledTime,
        clearIcon = props.clearIcon;
    var value = state.value,
        selectedValue = state.selectedValue,
        mode = state.mode;

    var showTimePicker = mode === 'time';
    var disabledTimeConfig = showTimePicker && disabledTime && timePicker ? (0, _util.getTimeConfig)(selectedValue, disabledTime) : null;

    var timePickerEle = null;

    if (timePicker && showTimePicker) {
      var timePickerProps = (0, _extends3['default'])({
        showHour: true,
        showSecond: true,
        showMinute: true
      }, timePicker.props, disabledTimeConfig, {
        onChange: this.onDateInputChange,
        value: selectedValue,
        disabledTime: disabledTime
      });

      if (timePicker.props.defaultValue !== undefined) {
        timePickerProps.defaultOpenValue = timePicker.props.defaultValue;
      }

      timePickerEle = _react2['default'].cloneElement(timePicker, timePickerProps);
    }

    var dateInputElement = props.showDateInput ? _react2['default'].createElement(_DateInput2['default'], {
      format: this.getFormat(),
      key: 'date-input',
      value: value,
      locale: locale,
      placeholder: dateInputPlaceholder,
      showClear: true,
      disabledTime: disabledTime,
      disabledDate: disabledDate,
      onClear: this.onClear,
      prefixCls: prefixCls,
      selectedValue: selectedValue,
      onChange: this.onDateInputChange,
      clearIcon: clearIcon
    }) : null;
    var children = [props.renderSidebar(), _react2['default'].createElement(
      'div',
      { className: prefixCls + '-panel', key: 'panel' },
      dateInputElement,
      _react2['default'].createElement(
        'div',
        { className: prefixCls + '-date-panel' },
        _react2['default'].createElement(_CalendarHeader2['default'], {
          locale: locale,
          mode: mode,
          value: value,
          onValueChange: this.setValue,
          onPanelChange: this.onPanelChange,
          showTimePicker: showTimePicker,
          prefixCls: prefixCls
        }),
        timePicker && showTimePicker ? _react2['default'].createElement(
          'div',
          { className: prefixCls + '-time-picker' },
          _react2['default'].createElement(
            'div',
            { className: prefixCls + '-time-picker-panel' },
            timePickerEle
          )
        ) : null,
        _react2['default'].createElement(
          'div',
          { className: prefixCls + '-body' },
          _react2['default'].createElement(_DateTable2['default'], {
            locale: locale,
            value: value,
            selectedValue: selectedValue,
            prefixCls: prefixCls,
            dateRender: props.dateRender,
            onSelect: this.onDateTableSelect,
            disabledDate: disabledDate,
            showWeekNumber: props.showWeekNumber
          })
        ),
        _react2['default'].createElement(_CalendarFooter2['default'], {
          showOk: props.showOk,
          renderFooter: props.renderFooter,
          locale: locale,
          prefixCls: prefixCls,
          showToday: props.showToday,
          disabledTime: disabledTime,
          showTimePicker: showTimePicker,
          showDateInput: props.showDateInput,
          timePicker: timePicker,
          selectedValue: selectedValue,
          value: value,
          disabledDate: disabledDate,
          okDisabled: props.showOk && !this.isAllowedDate(selectedValue),
          onOk: this.onOk,
          onSelect: this.onSelect,
          onToday: this.onToday,
          onOpenTimePicker: this.openTimePicker,
          onCloseTimePicker: this.closeTimePicker
        })
      )
    )];

    return this.renderRoot({
      children: children,
      className: props.showWeekNumber ? prefixCls + '-week-number' : ''
    });
  }
});

exports['default'] = Calendar;
module.exports = exports['default'];