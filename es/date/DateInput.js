import React from 'react';
import ReactDOM from 'react-dom';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';
import moment from 'moment';
import { formatDate } from '../util';

var DateInput = createReactClass({
  displayName: 'DateInput',

  propTypes: {
    prefixCls: PropTypes.string,
    timePicker: PropTypes.object,
    value: PropTypes.object,
    disabledTime: PropTypes.any,
    format: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
    locale: PropTypes.object,
    disabledDate: PropTypes.func,
    onChange: PropTypes.func,
    onClear: PropTypes.func,
    placeholder: PropTypes.string,
    onSelect: PropTypes.func,
    selectedValue: PropTypes.object,
    clearIcon: PropTypes.node
  },

  getInitialState: function getInitialState() {
    var selectedValue = this.props.selectedValue;
    return {
      str: formatDate(selectedValue, this.props.format),
      invalid: false,
      hasFocus: false
    };
  },
  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    this.cachedSelectionStart = this.dateInputInstance.selectionStart;
    this.cachedSelectionEnd = this.dateInputInstance.selectionEnd;
    // when popup show, click body will call this, bug!
    var selectedValue = nextProps.selectedValue;
    if (!this.state.hasFocus) {
      this.setState({
        str: formatDate(selectedValue, nextProps.format),
        invalid: false
      });
    }
  },
  componentDidUpdate: function componentDidUpdate() {
    if (this.state.hasFocus && !this.state.invalid && !(this.cachedSelectionStart === 0 && this.cachedSelectionEnd === 0)) {
      this.dateInputInstance.setSelectionRange(this.cachedSelectionStart, this.cachedSelectionEnd);
    }
  },
  onInputChange: function onInputChange(event) {
    var str = event.target.value;
    var _props = this.props,
        disabledDate = _props.disabledDate,
        format = _props.format,
        onChange = _props.onChange,
        selectedValue = _props.selectedValue;

    // 没有内容，合法并直接退出

    if (!str) {
      onChange(null);
      this.setState({
        invalid: false,
        str: str
      });
      return;
    }

    // 不合法直接退出
    var parsed = moment(str, format, true);
    if (!parsed.isValid()) {
      this.setState({
        invalid: true,
        str: str
      });
      return;
    }

    var value = this.props.value.clone();
    value.year(parsed.year()).month(parsed.month()).date(parsed.date()).hour(parsed.hour()).minute(parsed.minute()).second(parsed.second());

    if (!value || disabledDate && disabledDate(value)) {
      this.setState({
        invalid: true,
        str: str
      });
      return;
    }

    if (selectedValue !== value || selectedValue && value && !selectedValue.isSame(value)) {
      this.setState({
        str: str
      });
      onChange(value);
    }
  },
  onClear: function onClear() {
    this.setState({
      str: ''
    });
    this.props.onClear(null);
  },
  getRootDOMNode: function getRootDOMNode() {
    return ReactDOM.findDOMNode(this);
  },
  focus: function focus() {
    if (this.dateInputInstance) {
      this.dateInputInstance.focus();
    }
  },
  saveDateInput: function saveDateInput(dateInput) {
    this.dateInputInstance = dateInput;
  },
  onFocus: function onFocus() {
    this.setState({ hasFocus: true });
  },
  onBlur: function onBlur() {
    this.setState(function (prevState, prevProps) {
      return {
        hasFocus: false,
        str: formatDate(prevProps.value, prevProps.format)
      };
    });
  },
  render: function render() {
    var props = this.props;
    var _state = this.state,
        invalid = _state.invalid,
        str = _state.str;
    var locale = props.locale,
        prefixCls = props.prefixCls,
        placeholder = props.placeholder,
        clearIcon = props.clearIcon;

    var invalidClass = invalid ? prefixCls + '-input-invalid' : '';
    return React.createElement(
      'div',
      { className: prefixCls + '-input-wrap' },
      React.createElement(
        'div',
        { className: prefixCls + '-date-input-wrap' },
        React.createElement('input', {
          ref: this.saveDateInput,
          className: prefixCls + '-input ' + invalidClass,
          value: str,
          disabled: props.disabled,
          placeholder: placeholder,
          onChange: this.onInputChange,
          onFocus: this.onFocus,
          onBlur: this.onBlur
        })
      ),
      props.showClear ? React.createElement(
        'a',
        {
          role: 'button',
          title: locale.clear,
          onClick: this.onClear
        },
        clearIcon || React.createElement('span', { className: prefixCls + '-clear-btn' })
      ) : null
    );
  }
});

export default DateInput;