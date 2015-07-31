webpackJsonp([6],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(89);


/***/ },

/***/ 85:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },

/***/ 89:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	__webpack_require__(85);
	
	var _rcCalendar = __webpack_require__(27);
	
	var _rcCalendar2 = _interopRequireDefault(_rcCalendar);
	
	var _gregorianCalendarFormat = __webpack_require__(34);
	
	var _gregorianCalendarFormat2 = _interopRequireDefault(_gregorianCalendarFormat);
	
	var _react = __webpack_require__(26);
	
	var _react2 = _interopRequireDefault(_react);
	
	var formatter = new _gregorianCalendarFormat2['default']('yyyy-MM-dd HH:mm:ss');
	
	function onSelect(value) {
	  console.log('onSelect');
	  console.log(formatter.format(value));
	}
	
	_react2['default'].render(_react2['default'].createElement(
	  'div',
	  null,
	  _react2['default'].createElement(
	    'h2',
	    null,
	    'calendar (en-us, U.S.A.  California  San Francisco)'
	  ),
	  _react2['default'].createElement(_rcCalendar2['default'], { showWeekNumber: true,
	    showOk: 0,
	    showClear: 0,
	    onSelect: onSelect,
	    showTime: true })
	), document.getElementById('__react-content'));

/***/ }

});
//# sourceMappingURL=simple.js.map