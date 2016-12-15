'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function noop() {}

var CalendarHeader = function (_Component) {
  _inherits(CalendarHeader, _Component);

  function CalendarHeader() {
    _classCallCheck(this, CalendarHeader);

    return _possibleConstructorReturn(this, (CalendarHeader.__proto__ || Object.getPrototypeOf(CalendarHeader)).apply(this, arguments));
  }

  _createClass(CalendarHeader, [{
    key: 'onYearChange',
    value: function onYearChange(year) {
      var newValue = this.props.value.clone();
      newValue.year(parseInt(year, 10));
      this.props.onValueChange(newValue);
    }
  }, {
    key: 'onMonthChange',
    value: function onMonthChange(month) {
      var newValue = this.props.value.clone();
      newValue.month(parseInt(month, 10));
      this.props.onValueChange(newValue);
    }
  }, {
    key: 'yearSelectElement',
    value: function yearSelectElement(year) {
      var _props = this.props,
          yearSelectOffset = _props.yearSelectOffset,
          yearSelectTotal = _props.yearSelectTotal,
          prefixCls = _props.prefixCls,
          Select = _props.Select;

      var start = year - yearSelectOffset;
      var end = start + yearSelectTotal;

      var options = [];
      for (var index = start; index < end; index++) {
        options.push(_react2.default.createElement(
          Select.Option,
          { key: '' + index },
          index
        ));
      }
      return _react2.default.createElement(
        Select,
        {
          className: prefixCls + '-header-year-select',
          onChange: this.onYearChange.bind(this),
          dropdownStyle: { zIndex: 2000 },
          dropdownMenuStyle: { maxHeight: 250, overflow: 'auto', fontSize: 12 },
          optionLabelProp: 'children',
          value: String(year),
          showSearch: false
        },
        options
      );
    }
  }, {
    key: 'monthSelectElement',
    value: function monthSelectElement(month) {
      var props = this.props;
      var localeData = props.value.localeData();
      var t = props.value.clone();
      var prefixCls = props.prefixCls;

      var options = [];
      var Select = props.Select;

      for (var index = 0; index < 12; index++) {
        t.month(index);
        options.push(_react2.default.createElement(
          Select.Option,
          { key: '' + index },
          localeData.monthsShort(t)
        ));
      }

      return _react2.default.createElement(
        Select,
        {
          className: prefixCls + '-header-month-select',
          dropdownStyle: { zIndex: 2000 },
          dropdownMenuStyle: { maxHeight: 250, overflow: 'auto', overflowX: 'hidden', fontSize: 12 },
          optionLabelProp: 'children',
          value: String(month),
          showSearch: false,
          onChange: this.onMonthChange.bind(this)
        },
        options
      );
    }
  }, {
    key: 'changeTypeToDate',
    value: function changeTypeToDate() {
      this.props.onTypeChange('date');
    }
  }, {
    key: 'changeTypeToMonth',
    value: function changeTypeToMonth() {
      this.props.onTypeChange('month');
    }
  }, {
    key: 'render',
    value: function render() {
      var _props2 = this.props,
          value = _props2.value,
          locale = _props2.locale,
          prefixCls = _props2.prefixCls,
          type = _props2.type,
          showTypeSwitch = _props2.showTypeSwitch,
          headerComponents = _props2.headerComponents;

      var year = value.year();
      var month = value.month();
      var yearSelect = this.yearSelectElement(year);
      var monthSelect = type === 'month' ? null : this.monthSelectElement(month);
      var switchCls = prefixCls + '-header-switcher';
      var typeSwitcher = showTypeSwitch ? _react2.default.createElement(
        'span',
        { className: switchCls },
        type === 'date' ? _react2.default.createElement(
          'span',
          { className: switchCls + '-focus' },
          locale.month
        ) : _react2.default.createElement(
          'span',
          {
            onClick: this.changeTypeToDate.bind(this),
            className: switchCls + '-normal'
          },
          locale.month
        ),
        type === 'month' ? _react2.default.createElement(
          'span',
          { className: switchCls + '-focus' },
          locale.year
        ) : _react2.default.createElement(
          'span',
          {
            onClick: this.changeTypeToMonth.bind(this),
            className: switchCls + '-normal'
          },
          locale.year
        )
      ) : null;

      return _react2.default.createElement(
        'div',
        { className: prefixCls + '-header' },
        typeSwitcher,
        monthSelect,
        yearSelect,
        headerComponents
      );
    }
  }]);

  return CalendarHeader;
}(_react.Component);

CalendarHeader.propTypes = {
  value: _react.PropTypes.object,
  locale: _react.PropTypes.object,
  yearSelectOffset: _react.PropTypes.number,
  yearSelectTotal: _react.PropTypes.number,
  onValueChange: _react.PropTypes.func,
  onTypeChange: _react.PropTypes.func,
  Select: _react.PropTypes.func,
  prefixCls: _react.PropTypes.string,
  type: _react.PropTypes.string,
  showTypeSwitch: _react.PropTypes.bool,
  headerComponents: _react.PropTypes.array
};
CalendarHeader.defaultProps = {
  yearSelectOffset: 10,
  yearSelectTotal: 20,
  onValueChange: noop,
  onTypeChange: noop
};

exports.default = CalendarHeader;