webpackJsonp([1],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(214);


/***/ },

/***/ 2:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },

/***/ 193:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
	
	var _react = __webpack_require__(3);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _rcUtil = __webpack_require__(166);
	
	var _gregorianCalendar = __webpack_require__(162);
	
	var _gregorianCalendar2 = _interopRequireDefault(_gregorianCalendar);
	
	function noop() {}
	
	function getNow() {
	  var value = new _gregorianCalendar2['default']();
	  value.setTime(Date.now());
	  return value;
	}
	
	function getNowByCurrentStateValue(value) {
	  var ret = undefined;
	  if (value) {
	    ret = value.clone();
	    ret.setTime(Date.now());
	  } else {
	    ret = getNow();
	  }
	  return ret;
	}
	
	var CalendarMixin = {
	  propTypes: {
	    value: _react.PropTypes.object,
	    defaultValue: _react.PropTypes.object,
	    onKeyDown: _react.PropTypes.func
	  },
	
	  getDefaultProps: function getDefaultProps() {
	    return {
	      onKeyDown: noop
	    };
	  },
	
	  getInitialState: function getInitialState() {
	    var props = this.props;
	    var value = props.value || props.defaultValue || getNow();
	    return { value: value };
	  },
	
	  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
	    var value = nextProps.value;
	    if (value !== undefined) {
	      value = value || nextProps.defaultValue || getNowByCurrentStateValue(this.state.value);
	      this.setState({
	        value: value
	      });
	    }
	  },
	
	  onSelect: function onSelect(value, keyDownEvent) {
	    this.setValue(value);
	    if (!keyDownEvent) {
	      if (this.isAllowedDate(value)) {
	        this.props.onSelect(value);
	      }
	    }
	  },
	
	  renderRoot: function renderRoot(newProps) {
	    var _className;
	
	    var props = this.props;
	    var state = this.state;
	    var prefixCls = props.prefixCls;
	
	    var className = (_className = {}, _defineProperty(_className, prefixCls, 1), _defineProperty(_className, prefixCls + '-hidden', !props.visible), _defineProperty(_className, props.className, !!props.className), _className);
	
	    var orient = state.orient;
	    if (orient) {
	      orient.forEach(function (o) {
	        className[prefixCls + '-orient-' + o] = 1;
	      });
	    }
	
	    return _react2['default'].createElement(
	      'div',
	      { className: (0, _rcUtil.classSet)(className) + ' ' + newProps.className, style: this.props.style,
	        tabIndex: '0', onFocus: this.onFocus,
	        onBlur: this.onBlur, onKeyDown: this.onKeyDown },
	      newProps.children
	    );
	  },
	
	  setValue: function setValue(value) {
	    if (!('value' in this.props)) {
	      this.setState({
	        value: value
	      });
	    }
	    this.props.onChange(value);
	  },
	
	  isAllowedDate: function isAllowedDate(value) {
	    var disabledDate = this.props.disabledDate;
	    return !disabledDate || !disabledDate(value);
	  }
	};
	
	exports['default'] = CalendarMixin;
	module.exports = exports['default'];

/***/ },

/***/ 214:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	__webpack_require__(2);
	
	var _react = __webpack_require__(3);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _rcCalendarSrcMonthCalendar = __webpack_require__(215);
	
	var _rcCalendarSrcMonthCalendar2 = _interopRequireDefault(_rcCalendarSrcMonthCalendar);
	
	var _rcCalendarSrcPicker = __webpack_require__(198);
	
	var _rcCalendarSrcPicker2 = _interopRequireDefault(_rcCalendarSrcPicker);
	
	var _gregorianCalendarLibLocaleZhCn = __webpack_require__(211);
	
	var _gregorianCalendarLibLocaleZhCn2 = _interopRequireDefault(_gregorianCalendarLibLocaleZhCn);
	
	// spm error
	
	var _gregorianCalendarFormat = __webpack_require__(187);
	
	var _gregorianCalendarFormat2 = _interopRequireDefault(_gregorianCalendarFormat);
	
	var _gregorianCalendar = __webpack_require__(162);
	
	var _gregorianCalendar2 = _interopRequireDefault(_gregorianCalendar);
	
	var _rcCalendarSrcLocaleZhCn = __webpack_require__(212);
	
	var _rcCalendarSrcLocaleZhCn2 = _interopRequireDefault(_rcCalendarSrcLocaleZhCn);
	
	var now = new _gregorianCalendar2['default'](_gregorianCalendarLibLocaleZhCn2['default']);
	now.setTime(Date.now());
	var formatter = new _gregorianCalendarFormat2['default']('yyyy-MM');
	
	var defaultCalendarValue = new _gregorianCalendar2['default'](_gregorianCalendarLibLocaleZhCn2['default']);
	defaultCalendarValue.setTime(Date.now());
	defaultCalendarValue.addMonth(-1);
	
	var Test = _react2['default'].createClass({
	  displayName: 'Test',
	
	  onChange: function onChange(value) {
	    console.log('DatePicker change: ' + (value && formatter.format(value)));
	    this.setState({
	      time: Date.now(),
	      value: value
	    });
	  },
	
	  getInitialState: function getInitialState() {
	    return {
	      time: Date.now(),
	      showTime: true,
	      disabled: false,
	      value: this.props.defaultValue
	    };
	  },
	
	  onShowTimeChange: function onShowTimeChange(e) {
	    this.setState({
	      showTime: e.target.checked
	    });
	  },
	
	  toggleDisabled: function toggleDisabled() {
	    this.setState({
	      disabled: !this.state.disabled
	    });
	  },
	
	  render: function render() {
	    var state = this.state;
	    var calendar = _react2['default'].createElement(_rcCalendarSrcMonthCalendar2['default'], { locale: _rcCalendarSrcLocaleZhCn2['default'],
	      style: { zIndex: 1000 },
	      orient: ['top', 'left'],
	      defaultValue: defaultCalendarValue });
	    return _react2['default'].createElement(
	      'div',
	      { style: { width: 240, margin: 20 }, 'data-time': this.state.time },
	      _react2['default'].createElement(
	        'div',
	        { style: { marginBottom: 10 } },
	        '    ',
	        _react2['default'].createElement(
	          'label',
	          null,
	          _react2['default'].createElement('input', { checked: state.disabled, onChange: this.toggleDisabled, type: 'checkbox' }),
	          ' disabled '
	        )
	      ),
	      _react2['default'].createElement(
	        'div',
	        { style: {
	            'boxSizing': 'border-box',
	            'position': 'relative',
	            'display': 'block',
	            'lineHeight': 1.5,
	            marginBottom: 22
	          } },
	        _react2['default'].createElement(
	          _rcCalendarSrcPicker2['default'],
	          {
	            adjustOrientOnCalendarOverflow: true,
	            animation: 'slide-up',
	            disabled: state.disabled,
	            calendar: calendar,
	            value: state.value, onChange: this.onChange },
	          function (_ref) {
	            var value = _ref.value;
	
	            return _react2['default'].createElement('input', { style: { width: 200 },
	              readOnly: true,
	              disabled: state.disabled,
	              value: value && formatter.format(value),
	              placeholder: '请选择日期' });
	          }
	        )
	      )
	    );
	  }
	});
	
	function onStandaloneSelect(value) {
	  console.log('month-calendar select', value && formatter.format(value));
	}
	
	function onStandaloneChange(value) {
	  console.log('month-calendar change', value && formatter.format(value));
	}
	
	function disabledDate(value) {
	  return value.getTime() > Date.now();
	}
	
	_react2['default'].render(_react2['default'].createElement(
	  'div',
	  { style: { zIndex: 1000, position: 'relative', width: 600, margin: '0 auto' } },
	  _react2['default'].createElement(
	    'h2',
	    null,
	    'zh-cn'
	  ),
	  _react2['default'].createElement(_rcCalendarSrcMonthCalendar2['default'], { locale: _rcCalendarSrcLocaleZhCn2['default'],
	    style: { zIndex: 1000 },
	    orient: ['top', 'left'],
	    disabledDate: disabledDate,
	    onSelect: onStandaloneSelect,
	    onChange: onStandaloneChange,
	    defaultValue: defaultCalendarValue }),
	  _react2['default'].createElement(
	    'div',
	    { style: { marginTop: 200 } },
	    _react2['default'].createElement(Test, { defaultValue: now })
	  )
	), document.getElementById('__react-content'));

/***/ },

/***/ 215:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _react = __webpack_require__(3);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _monthMonthPanel = __webpack_require__(184);
	
	var _monthMonthPanel2 = _interopRequireDefault(_monthMonthPanel);
	
	var _mixinCalendarMixin = __webpack_require__(193);
	
	var _mixinCalendarMixin2 = _interopRequireDefault(_mixinCalendarMixin);
	
	var _mixinCommonMixin = __webpack_require__(194);
	
	var _mixinCommonMixin2 = _interopRequireDefault(_mixinCommonMixin);
	
	var _rcUtil = __webpack_require__(166);
	
	var MonthCalendar = _react2['default'].createClass({
	  displayName: 'MonthCalendar',
	
	  mixins: [_mixinCommonMixin2['default'], _mixinCalendarMixin2['default']],
	
	  onKeyDown: function onKeyDown(e) {
	    var keyCode = e.keyCode;
	    var ctrlKey = e.ctrlKey || e.metaKey;
	    var stateValue = this.state.value;
	    var value = stateValue;
	    switch (keyCode) {
	      case _rcUtil.KeyCode.DOWN:
	        value = stateValue.clone();
	        value.addMonth(3);
	        break;
	      case _rcUtil.KeyCode.UP:
	        value = stateValue.clone();
	        value.addMonth(-3);
	        break;
	      case _rcUtil.KeyCode.LEFT:
	        value = stateValue.clone();
	        if (ctrlKey) {
	          value.addYear(-1);
	        } else {
	          value.addMonth(-1);
	        }
	        break;
	      case _rcUtil.KeyCode.RIGHT:
	        value = stateValue.clone();
	        if (ctrlKey) {
	          value.addYear(1);
	        } else {
	          value.addMonth(1);
	        }
	        break;
	      case _rcUtil.KeyCode.ENTER:
	        this.onSelect(stateValue);
	        e.preventDefault();
	        return 1;
	      default:
	        return undefined;
	    }
	    if (value !== stateValue) {
	      this.setValue(value);
	      e.preventDefault();
	      return 1;
	    }
	  },
	
	  render: function render() {
	    var props = this.props;
	    var children = _react2['default'].createElement(_monthMonthPanel2['default'], { locale: props.locale,
	      disabledDate: props.disabledDate,
	      style: { position: 'relative' },
	      value: this.state.value,
	      rootPrefixCls: props.prefixCls,
	      onChange: this.setValue,
	      onSelect: this.onSelect });
	    return this.renderRoot({
	      children: children
	    });
	  }
	});
	
	exports['default'] = MonthCalendar;
	module.exports = exports['default'];

/***/ }

});
//# sourceMappingURL=antd-month-calendar.js.map