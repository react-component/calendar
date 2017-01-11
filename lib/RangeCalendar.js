'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _classnames2 = require('classnames');

var _classnames3 = _interopRequireDefault(_classnames2);

var _CalendarPart = require('./range-calendar/CalendarPart');

var _CalendarPart2 = _interopRequireDefault(_CalendarPart);

var _util = require('./util/');

var _TodayButton = require('./calendar/TodayButton');

var _TodayButton2 = _interopRequireDefault(_TodayButton);

var _OkButton = require('./calendar/OkButton');

var _OkButton2 = _interopRequireDefault(_OkButton);

var _TimePickerButton = require('./calendar/TimePickerButton');

var _TimePickerButton2 = _interopRequireDefault(_TimePickerButton);

var _CommonMixin = require('./mixin/CommonMixin');

var _CommonMixin2 = _interopRequireDefault(_CommonMixin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function noop() {}

function getNow() {
  return (0, _moment2.default)();
}

function onValueChange(direction, current) {
  var value = void 0;
  value = current;
  if (direction === 'right') {
    value.add(-1, 'months');
  }
  this.fireValueChange(value);
}

function normalizeAnchor(props, init) {
  var selectedValue = props.selectedValue || init && props.defaultSelectedValue || [];
  var value = props.value;
  if (Array.isArray(value)) {
    value = value[0];
  }
  var defaultValue = props.defaultValue;
  if (Array.isArray(defaultValue)) {
    defaultValue = defaultValue[0];
  }
  return value || init && defaultValue || selectedValue[0] || init && getNow();
}

function generateOptions(length) {
  var arr = [];
  for (var value = 0; value < length; value++) {
    arr.push(value);
  }
  return arr;
}

function onInputSelect(direction, value) {
  if (!value) {
    return;
  }
  var originalValue = this.state.selectedValue;
  var selectedValue = originalValue.concat();
  var index = direction === 'left' ? 0 : 1;
  selectedValue[index] = value;
  if (selectedValue[0] && this.compare(selectedValue[0], selectedValue[1]) > 0) {
    selectedValue[1 - index] = this.state.showTimePicker ? selectedValue[index] : undefined;
  }
  this.fireSelectValueChange(selectedValue);
}

var RangeCalendar = _react2.default.createClass({
  displayName: 'RangeCalendar',

  propTypes: {
    prefixCls: _react.PropTypes.string,
    dateInputPlaceholder: _react.PropTypes.any,
    defaultValue: _react.PropTypes.any,
    timePicker: _react.PropTypes.any,
    value: _react.PropTypes.any,
    showOk: _react.PropTypes.bool,
    showToday: _react.PropTypes.bool,
    selectedValue: _react.PropTypes.array,
    defaultSelectedValue: _react.PropTypes.array,
    onOk: _react.PropTypes.func,
    showClear: _react.PropTypes.bool,
    locale: _react.PropTypes.object,
    onChange: _react.PropTypes.func,
    onSelect: _react.PropTypes.func,
    onValueChange: _react.PropTypes.func,
    disabledDate: _react.PropTypes.func,
    format: _react.PropTypes.oneOfType([_react.PropTypes.object, _react.PropTypes.string]),
    onClear: _react.PropTypes.func,
    type: _react.PropTypes.any,
    disabledTime: _react.PropTypes.func
  },

  mixins: [_CommonMixin2.default],

  getDefaultProps: function getDefaultProps() {
    return {
      type: 'both',
      defaultSelectedValue: [],
      onValueChange: noop,
      disabledTime: noop,
      showToday: true
    };
  },
  getInitialState: function getInitialState() {
    var props = this.props;
    var selectedValue = props.selectedValue || props.defaultSelectedValue;
    var value = normalizeAnchor(props, 1);
    return {
      selectedValue: selectedValue,
      hoverValue: [],
      value: value,
      showTimePicker: false
    };
  },
  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    var newState = {};
    if ('value' in nextProps) {
      if (nextProps.value) {
        newState.value = nextProps.value;
      } else {
        newState.value = normalizeAnchor(nextProps, 0);
      }
      this.setState(newState);
    }
    if ('selectedValue' in nextProps) {
      newState.selectedValue = nextProps.selectedValue;
      this.setState(newState);
    }
  },
  onDatePanelEnter: function onDatePanelEnter() {
    if (this.hasSelectedValue()) {
      this.setState({
        hoverValue: this.state.selectedValue.concat()
      });
    }
  },
  onDatePanelLeave: function onDatePanelLeave() {
    if (this.hasSelectedValue()) {
      this.setState({
        hoverValue: []
      });
    }
  },
  onSelect: function onSelect(value) {
    var _state = this.state,
        hoverValue = _state.hoverValue,
        selectedValue = _state.selectedValue;

    var nextSelectedValue = void 0;
    var type = this.props.type;

    var changed = false;
    if (!hoverValue[0] && !hoverValue[1] && type === 'both') {
      nextSelectedValue = [value];
      changed = true;
    } else if (type === 'start') {
      var endValue = selectedValue[1];
      if (!endValue || this.compare(endValue, value) < 0) {
        nextSelectedValue = [value];
      } else {
        nextSelectedValue = [value, endValue];
      }
      changed = true;
    } else {
      var startValue = void 0;
      startValue = type === 'end' ? selectedValue[0] : hoverValue[0];
      if (startValue && this.compare(startValue, value) <= 0) {
        nextSelectedValue = [startValue, value];
        changed = true;
      } else {
        nextSelectedValue = [value];
        changed = true;
      }
    }

    if (changed) {
      this.fireSelectValueChange(nextSelectedValue);
    }
  },
  onDayHover: function onDayHover(value) {
    var hoverValue = this.state.hoverValue;
    var selectedValue = this.state.selectedValue;
    var type = this.props.type;

    if (type === 'start' && selectedValue[1]) {
      if (this.compare(value, selectedValue[1]) < 0) {
        hoverValue = [value, selectedValue[1]];
      } else {
        hoverValue = [value];
      }
      this.setState({
        hoverValue: hoverValue
      });
    } else if (type === 'end' && selectedValue[0]) {
      if (this.compare(value, selectedValue[0]) > 0) {
        hoverValue = [selectedValue[0], value];
      } else {
        hoverValue = [];
      }
      this.setState({
        hoverValue: hoverValue
      });
    } else {
      if (!hoverValue[0] || this.compare(value, hoverValue[0]) < 0) {
        return;
      }
      hoverValue[1] = value;
      this.setState({
        hoverValue: hoverValue
      });
    }
  },
  onToday: function onToday() {
    this.setState({
      value: (0, _util.getTodayTime)(this.state.value)
    });
  },
  onOpenTimePicker: function onOpenTimePicker() {
    this.setState({
      showTimePicker: true
    });
  },
  onCloseTimePicker: function onCloseTimePicker() {
    this.setState({
      showTimePicker: false
    });
  },
  onOk: function onOk() {
    var selectedValue = this.state.selectedValue;

    if (this.isAllowedDateAndTime(selectedValue)) {
      this.props.onOk(this.state.selectedValue);
    }
  },
  onStartInputSelect: function onStartInputSelect() {
    for (var _len = arguments.length, oargs = Array(_len), _key = 0; _key < _len; _key++) {
      oargs[_key] = arguments[_key];
    }

    var args = ['left'].concat(oargs);
    return onInputSelect.apply(this, args);
  },
  onEndInputSelect: function onEndInputSelect() {
    for (var _len2 = arguments.length, oargs = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      oargs[_key2] = arguments[_key2];
    }

    var args = ['right'].concat(oargs);
    return onInputSelect.apply(this, args);
  },
  onStartValueChange: function onStartValueChange() {
    for (var _len3 = arguments.length, oargs = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      oargs[_key3] = arguments[_key3];
    }

    var args = ['left'].concat(oargs);
    return onValueChange.apply(this, args);
  },
  onEndValueChange: function onEndValueChange() {
    for (var _len4 = arguments.length, oargs = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
      oargs[_key4] = arguments[_key4];
    }

    var args = ['right'].concat(oargs);
    return onValueChange.apply(this, args);
  },
  getStartValue: function getStartValue() {
    var value = this.state.value;
    var selectedValue = this.state.selectedValue;
    // keep selectedTime when select date
    if (selectedValue[0] && this.props.timePicker) {
      value = value.clone();
      (0, _util.syncTime)(selectedValue[0], value);
    }
    return value;
  },
  getEndValue: function getEndValue() {
    var endValue = this.state.value.clone();
    endValue.add(1, 'months');
    var selectedValue = this.state.selectedValue;
    // keep selectedTime when select date
    if (selectedValue[1] && this.props.timePicker) {
      (0, _util.syncTime)(selectedValue[1], endValue);
    }
    if (this.state.showTimePicker) {
      return selectedValue[1] ? selectedValue[1] : this.getStartValue();
    }
    return endValue;
  },

  // get disabled hours for second picker
  getEndDisableTime: function getEndDisableTime() {
    var _state2 = this.state,
        selectedValue = _state2.selectedValue,
        value = _state2.value;

    var startValue = selectedValue && selectedValue[0] || value.clone();
    // if startTime and endTime is same day..
    // the second time picker will not able to pick time before first time picker
    if (!selectedValue[1] || startValue.isSame(selectedValue[1], 'day')) {
      var _ret = function () {
        var hours = startValue.hour();
        var minutes = startValue.minute();
        var second = startValue.second();
        var _disabledHours = generateOptions(hours);
        var _disabledMinutes = generateOptions(minutes);
        var _disabledSeconds = generateOptions(second);
        return {
          v: {
            disabledHours: function disabledHours() {
              return _disabledHours;
            },
            disabledMinutes: function disabledMinutes(hour) {
              if (hour === hours) {
                return _disabledMinutes;
              }
              return [];
            },
            disabledSeconds: function disabledSeconds(hour, minute) {
              if (hour === hours && minute === minutes) {
                return _disabledSeconds;
              }
              return [];
            }
          }
        };
      }();

      if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
    }
    return null;
  },
  isAllowedDateAndTime: function isAllowedDateAndTime(selectedValue) {
    return (0, _util.isAllowedDate)(selectedValue[0], this.props.disabledDate, this.disabledStartTime) && (0, _util.isAllowedDate)(selectedValue[1], this.props.disabledDate, this.disabledEndTime);
  },
  hasSelectedValue: function hasSelectedValue() {
    var selectedValue = this.state.selectedValue;

    return !!selectedValue[1] && !!selectedValue[0];
  },
  compare: function compare(v1, v2) {
    if (this.props.timePicker) {
      return v1.diff(v2);
    }
    return v1.diff(v2, 'days');
  },
  fireSelectValueChange: function fireSelectValueChange(selectedValue, direct) {
    if (!('selectedValue' in this.props)) {
      this.setState({
        selectedValue: selectedValue
      });
    }

    // 尚未选择过时间，直接输入的话
    if (!this.state.selectedValue[0] || !this.state.selectedValue[1]) {
      this.setState({
        selectedValue: selectedValue,
        value: selectedValue[0]
      });
    }

    if (selectedValue[0] && !selectedValue[1]) {
      this.setState({
        hoverValue: selectedValue.concat()
      });
    }
    this.props.onChange(selectedValue);
    if (direct || selectedValue[0] && selectedValue[1]) {
      this.setState({
        hoverValue: []
      });
      this.props.onSelect(selectedValue);
    }
  },
  fireValueChange: function fireValueChange(value) {
    var props = this.props;
    if (!('value' in props)) {
      this.setState({
        value: value
      });
    }
    props.onValueChange(value);
  },
  clear: function clear() {
    this.fireSelectValueChange([], true);
    this.props.onClear();
  },
  disabledStartTime: function disabledStartTime(time) {
    return this.props.disabledTime(time, 'start');
  },
  disabledEndTime: function disabledEndTime(time) {
    return this.props.disabledTime(time, 'end');
  },
  render: function render() {
    var _className, _classnames;

    var props = this.props;
    var state = this.state;
    var showTimePicker = state.showTimePicker;
    var prefixCls = props.prefixCls,
        dateInputPlaceholder = props.dateInputPlaceholder,
        timePicker = props.timePicker,
        showOk = props.showOk,
        locale = props.locale,
        showClear = props.showClear,
        showToday = props.showToday,
        type = props.type;
    var hoverValue = state.hoverValue,
        selectedValue = state.selectedValue;

    var className = (_className = {}, _defineProperty(_className, props.className, !!props.className), _defineProperty(_className, prefixCls, 1), _defineProperty(_className, prefixCls + '-hidden', !props.visible), _defineProperty(_className, prefixCls + '-range', 1), _defineProperty(_className, prefixCls + '-show-time-picker', showTimePicker), _defineProperty(_className, prefixCls + '-week-number', props.showWeekNumber), _className);
    var classes = (0, _classnames3.default)(className);
    var newProps = {
      selectedValue: state.selectedValue,
      onSelect: this.onSelect,
      onDayHover: type === 'start' && selectedValue[1] || type === 'end' && selectedValue[0] || !!hoverValue.length ? this.onDayHover : undefined
    };

    var placeholder1 = void 0;
    var placeholder2 = void 0;

    if (dateInputPlaceholder) {
      if (Array.isArray(dateInputPlaceholder)) {
        var _dateInputPlaceholder = _slicedToArray(dateInputPlaceholder, 2);

        placeholder1 = _dateInputPlaceholder[0];
        placeholder2 = _dateInputPlaceholder[1];
      } else {
        placeholder1 = placeholder2 = dateInputPlaceholder;
      }
    }
    var showOkButton = showOk === true || showOk !== false && !!timePicker;
    var cls = (0, _classnames3.default)((_classnames = {}, _defineProperty(_classnames, prefixCls + '-footer', true), _defineProperty(_classnames, prefixCls + '-range-bottom', true), _defineProperty(_classnames, prefixCls + '-footer-show-ok', showOkButton), _classnames));

    var startValue = this.getStartValue();
    var endValue = this.getEndValue();
    var todayTime = (0, _util.getTodayTime)(startValue);
    var thisMonth = todayTime.month();
    var thisYear = todayTime.year();
    var isThisYear = thisYear === startValue.year() || this.year === endValue.year();
    var isTodayInView = isThisYear && (thisMonth === startValue.month() || thisMonth === endValue.month());

    return _react2.default.createElement(
      'div',
      {
        ref: 'root',
        className: classes,
        style: props.style,
        tabIndex: '0'
      },
      props.renderSidebar(),
      _react2.default.createElement(
        'div',
        { className: prefixCls + '-panel' },
        showClear ? _react2.default.createElement('a', {
          className: prefixCls + '-clear-btn',
          role: 'button',
          title: locale.clear,
          onClick: this.clear
        }) : null,
        _react2.default.createElement(
          'div',
          {
            className: prefixCls + '-date-panel',
            onMouseLeave: type !== 'both' ? this.onDatePanelLeave : undefined,
            onMouseEnter: type !== 'both' ? this.onDatePanelEnter : undefined
          },
          _react2.default.createElement(_CalendarPart2.default, _extends({}, props, newProps, {
            hoverValue: hoverValue,
            direction: 'left',
            disabledTime: this.disabledStartTime,
            format: this.getFormat(),
            value: startValue,
            placeholder: placeholder1,
            onInputSelect: this.onStartInputSelect,
            onValueChange: this.onStartValueChange,
            timePicker: timePicker,
            showTimePicker: showTimePicker
          })),
          _react2.default.createElement(
            'span',
            { className: prefixCls + '-range-middle' },
            '~'
          ),
          _react2.default.createElement(_CalendarPart2.default, _extends({}, props, newProps, {
            hoverValue: hoverValue,
            direction: 'right',
            format: this.getFormat(),
            timePickerDisabledTime: this.getEndDisableTime(),
            placeholder: placeholder2,
            value: endValue,
            onInputSelect: this.onEndInputSelect,
            onValueChange: this.onEndValueChange,
            timePicker: timePicker,
            showTimePicker: showTimePicker,
            disabledTime: this.disabledEndTime
          }))
        ),
        _react2.default.createElement(
          'div',
          { className: cls },
          props.renderFooter(),
          showToday || props.timePicker || showOkButton ? _react2.default.createElement(
            'div',
            { className: prefixCls + '-footer-btn' },
            showToday ? _react2.default.createElement(_TodayButton2.default, _extends({}, props, {
              disabled: isTodayInView,
              value: state.value,
              onToday: this.onToday,
              text: locale.backToToday
            })) : null,
            props.timePicker ? _react2.default.createElement(_TimePickerButton2.default, _extends({}, props, {
              showTimePicker: showTimePicker,
              onOpenTimePicker: this.onOpenTimePicker,
              onCloseTimePicker: this.onCloseTimePicker,
              timePickerDisabled: !this.hasSelectedValue() || hoverValue.length
            })) : null,
            showOkButton ? _react2.default.createElement(_OkButton2.default, _extends({}, props, {
              value: state.value,
              onOk: this.onOk,
              okDisabled: !this.isAllowedDateAndTime(selectedValue) || !this.hasSelectedValue() || hoverValue.length
            })) : null
          ) : null
        )
      )
    );
  }
});

exports.default = RangeCalendar;