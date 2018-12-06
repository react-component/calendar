import React from 'react';
import ReactDOM from 'react-dom';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';
import moment from 'moment';
import { formatDate } from '../util';

const DateInput = createReactClass({
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
    clearIcon: PropTypes.node,
  },

  getInitialState() {
    const selectedValue = this.props.selectedValue;
    return {
      str: formatDate(selectedValue, this.props.format),
      invalid: false,
      hasFocus: false,
    };
  },

  componentWillReceiveProps(nextProps) {
    this.cachedSelectionStart = this.dateInputInstance.selectionStart;
    this.cachedSelectionEnd = this.dateInputInstance.selectionEnd;
    // when popup show, click body will call this, bug!
    const selectedValue = nextProps.selectedValue;
    if (!this.state.hasFocus) {
      this.setState({
        str: formatDate(selectedValue, nextProps.format),
        invalid: false,
      });
    }
  },

  componentDidUpdate() {
    if (this.state.hasFocus && !this.state.invalid &&
        !(this.cachedSelectionStart === 0 && this.cachedSelectionEnd === 0)) {
      this.dateInputInstance.setSelectionRange(this.cachedSelectionStart, this.cachedSelectionEnd);
    }
  },

  onInputChange(event) {
    const str = event.target.value;
    const { disabledDate, format, onChange, selectedValue } = this.props;

    // 没有内容，合法并直接退出
    if (!str) {
      onChange(null);
      this.setState({
        invalid: false,
        str,
      });
      return;
    }

    // 不合法直接退出
    const parsed = moment(str, format, true);
    if (!parsed.isValid()) {
      this.setState({
        invalid: true,
        str,
      });
      return;
    }

    const value = this.props.value.clone();
    value
      .year(parsed.year())
      .month(parsed.month())
      .date(parsed.date())
      .hour(parsed.hour())
      .minute(parsed.minute())
      .second(parsed.second());

    if (!value || (disabledDate && disabledDate(value))) {
      this.setState({
        invalid: true,
        str,
      });
      return;
    }

    if (selectedValue !== value || (
      selectedValue && value && !selectedValue.isSame(value)
    )) {
      this.setState({
        str,
      });
      onChange(value);
    }
  },

  onClear() {
    this.setState({
      str: '',
    });
    this.props.onClear(null);
  },

  getRootDOMNode() {
    return ReactDOM.findDOMNode(this);
  },

  focus() {
    if (this.dateInputInstance) {
      this.dateInputInstance.focus();
    }
  },

  saveDateInput(dateInput) {
    this.dateInputInstance = dateInput;
  },

  onFocus() {
    this.setState({ hasFocus: true });
  },

  onBlur() {
    this.setState((prevState, prevProps) => ({
      hasFocus: false,
      str: formatDate(prevProps.value, prevProps.format),
    }));
  },

  render() {
    const props = this.props;
    const { invalid, str } = this.state;
    const { locale, prefixCls, placeholder, clearIcon } = props;
    const invalidClass = invalid ? `${prefixCls}-input-invalid` : '';
    return (
      <div className={`${prefixCls}-input-wrap`}>
        <div className={`${prefixCls}-date-input-wrap`}>
          <input
            ref={this.saveDateInput}
            className={`${prefixCls}-input ${invalidClass}`}
            value={str}
            disabled={props.disabled}
            placeholder={placeholder}
            onChange={this.onInputChange}
            onFocus={this.onFocus}
            onBlur={this.onBlur}
          />
        </div>
        {props.showClear ? (
          <a
            role="button"
            title={locale.clear}
            onClick={this.onClear}
          >
            {clearIcon || <span className={`${prefixCls}-clear-btn`}/>}
          </a>
        ) : null}
      </div>
    );
  },
});

export default DateInput;
