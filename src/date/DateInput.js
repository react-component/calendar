import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import KeyCode from 'rc-util/lib/KeyCode';
import { polyfill } from 'react-lifecycles-compat';
import moment from 'moment';
import { formatDate } from '../util';

let cachedSelectionStart;
let cachedSelectionEnd;
let dateInputInstance;

class DateInput extends React.Component {
  static propTypes = {
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
    inputMode: PropTypes.string,
  }

  constructor(props) {
    super(props);
    const selectedValue = props.selectedValue;

    this.state = {
      str: formatDate(selectedValue, this.props.format),
      invalid: false,
      hasFocus: false,
    };
  }

  componentDidUpdate() {
    if (dateInputInstance && this.state.hasFocus && !this.state.invalid &&
      !(cachedSelectionStart === 0 && cachedSelectionEnd === 0)) {
      dateInputInstance.setSelectionRange(cachedSelectionStart, cachedSelectionEnd);
    }
  }

  onClear = () => {
    this.setState({
      str: '',
    });
    this.props.onClear(null);
  }

  onInputChange = (event) => {
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
        invalid: false,
        str,
      });
      onChange(value);
    }
  }

  onFocus = () => {
    this.setState({ hasFocus: true });
  }

  onBlur = () => {
    this.setState((prevState, prevProps) => ({
      hasFocus: false,
      str: formatDate(prevProps.value, prevProps.format),
    }));
  }

  onKeyDown = ({ keyCode }) => {
    const { onSelect, value, disabledDate } = this.props;
    if (keyCode === KeyCode.ENTER && onSelect) {
      const validateDate = !disabledDate || !disabledDate(value);
      if (validateDate) {
        onSelect(value.clone());
      }
    }
  };

  static getDerivedStateFromProps(nextProps, state) {
    let newState = {};

    if (dateInputInstance) {
      cachedSelectionStart = dateInputInstance.selectionStart;
      cachedSelectionEnd = dateInputInstance.selectionEnd;
    }
    // when popup show, click body will call this, bug!
    const selectedValue = nextProps.selectedValue;
    if (!state.hasFocus) {
      newState = {
        str: formatDate(selectedValue, nextProps.format),
        invalid: false,
      };
    }

    return newState;
  }

  static getInstance() {
    return dateInputInstance;
  }

  getRootDOMNode = () => {
    return ReactDOM.findDOMNode(this);
  }

  focus = () => {
    if (dateInputInstance) {
      dateInputInstance.focus();
    }
  }

  saveDateInput = (dateInput) => {
    dateInputInstance = dateInput;
  }

  render() {
    const props = this.props;
    const { invalid, str } = this.state;
    const { locale, prefixCls, placeholder, clearIcon, inputMode } = props;
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
            onKeyDown={this.onKeyDown}
            onFocus={this.onFocus}
            onBlur={this.onBlur}
            inputMode={inputMode}
          />
        </div>
        {props.showClear ? (
          <a
            role="button"
            title={locale.clear}
            onClick={this.onClear}
          >
            {clearIcon || <span className={`${prefixCls}-clear-btn`} />}
          </a>
        ) : null}
      </div>
    );
  }
}

polyfill(DateInput);

export default DateInput;
