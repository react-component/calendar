import React from 'react';
import ReactDOM from 'react-dom';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';
import moment from 'moment';

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
    clearIcon: PropTypes.node,
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
    if (!this.state.invalid &&
        !(this.cachedSelectionStart === 0 && this.cachedSelectionEnd === 0)) {
      this.dateInputInstance.setSelectionRange(this.cachedSelectionStart, this.cachedSelectionEnd);
    }
  },

  onInputChange(event) {
    const str = event.target.value;
    this.setState({
      str,
    });
    let value;
    const { disabledDate, format, onChange } = this.props;
    if (str) {
      const parsed = moment(str, format, true);
      if (!parsed.isValid()) {
        this.setState({
          invalid: true,
        });
        return;
      }
      value = this.props.value.clone();
      value
        .year(parsed.year())
        .month(parsed.month())
        .date(parsed.date())
        .hour(parsed.hour())
        .minute(parsed.minute())
        .second(parsed.second());

      if (value && (!disabledDate || !disabledDate(value))) {
        const originalValue = this.props.selectedValue;
        if (originalValue && value) {
          if (!originalValue.isSame(value)) {
            onChange(value);
          }
        } else if (originalValue !== value) {
          onChange(value);
        }
      } else {
        this.setState({
          invalid: true,
        });
        return;
      }
    } else {
      onChange(null);
    }
    this.setState({
      invalid: false,
    });
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
