import React from 'react';
import ReactDOM from 'react-dom';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';
import moment from 'moment';
import KeyCode from 'rc-util/lib/KeyCode';

const DateInput = createReactClass({
  propTypes: {
    prefixCls: PropTypes.string,
    timePicker: PropTypes.object,
    value: PropTypes.object,
    disabledTime: PropTypes.any,
    format: PropTypes.string,
    locale: PropTypes.object,
    disabledDate: PropTypes.func,
    onChange: PropTypes.func,
    onClear: PropTypes.func,
    placeholder: PropTypes.string,
    onSelect: PropTypes.func,
    selectedValue: PropTypes.object,
  },

  getDefaultProps() {
    return {
      onSelect() {},
    };
  },

  getInitialState() {
    const selectedValue = this.props.selectedValue;
    return {
      str: selectedValue && selectedValue.format(this.props.format) || '',
      invalid: false,
    };
  },

  componentWillReceiveProps(nextProps) {
    this.cachedSelectionStart = this.dateInputInstance.selectionStart;
    this.cachedSelectionEnd = this.dateInputInstance.selectionEnd;
    // when popup show, click body will call this, bug!
    const selectedValue = nextProps.selectedValue;
    this.setState({
      str: selectedValue && selectedValue.format(nextProps.format) || '',
      invalid: false,
    });
  },

  componentDidUpdate() {
    if (!this.state.invalid) {
      this.dateInputInstance.setSelectionRange(this.cachedSelectionStart, this.cachedSelectionEnd);
    }
  },

  onInputChange(event) {
    const { onChange, disabledDate } = this.props;
    const str = event.target.value;
    const value = this.getInputValue(str);
    let invalid = false;

    if (!str) {
      onChange(null);
    } else if (value && (!disabledDate || !disabledDate(value))) {
      const originalValue = this.props.selectedValue;
      if (originalValue && value) {
        if (!originalValue.isSame(value)) {
          onChange(value);
        }
      } else if (originalValue !== value) {
        onChange(value);
      }
    } else {
      invalid = true;
    }

    this.setState({ str, invalid });
  },

  onInputKeyDown(e) {
    const { onSelect, disabledDate } = this.props;
    const { str } = this.state;
    if (e.keyCode === KeyCode.ENTER) {
      const value = this.getInputValue(str);
      if (value && (!disabledDate || !disabledDate(value))) {
        onSelect(value, {
          source: 'keyboard',
        });
      }
    }
  },

  getInputValue(str) {
    const { format } = this.props;
    const parsed = moment(str, format, true);
    if (!parsed.isValid()) {
      return null;
    }

    const value = this.props.value.clone();
    value
      .year(parsed.year())
      .month(parsed.month())
      .date(parsed.date())
      .hour(parsed.hour())
      .minute(parsed.minute())
      .second(parsed.second());

    return value;
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

  render() {
    const props = this.props;
    const { invalid, str } = this.state;
    const { locale, prefixCls, placeholder } = props;
    const invalidClass = invalid ? `${prefixCls}-input-invalid` : '';
    return (<div className={`${prefixCls}-input-wrap`}>
      <div className={`${prefixCls}-date-input-wrap`}>
        <input
          ref={this.saveDateInput}
          className={`${prefixCls}-input ${invalidClass}`}
          value={str}
          disabled={props.disabled}
          placeholder={placeholder}
          onChange={this.onInputChange}
          onKeyDown={this.onInputKeyDown}
        />
      </div>
      {props.showClear ? <a
        className={`${prefixCls}-clear-btn`}
        role="button"
        title={locale.clear}
        onClick={this.onClear}
      /> : null}
    </div>);
  },
});

export default DateInput;
