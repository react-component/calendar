import React from 'react';
import ReactDOM from 'react-dom';
import KeyCode from 'rc-util/lib/KeyCode';
import { polyfill } from 'react-lifecycles-compat';
import moment, { Moment } from 'moment';
import { formatDate } from '../util';

let cachedSelectionStart;
let cachedSelectionEnd;
let dateInputInstance;

export type CalendarTypeMode = 'time' | 'date' | 'month' | 'year' | 'decade';

export interface DateInputProps {
  prefixCls?: string;
  value?: Moment;
  format?: string | string[];
  onClear?: (value) => void;
  disabledDate?: (value: Moment) => boolean;
  onChange?: (value: Moment) => void;
  selectedValue?: Moment;
  onSelect?: (value: Moment) => void;
  mode?: CalendarTypeMode;
  locale?: {
    [key: string]: any;
  };
  placeholder?: string;
  disabled?: boolean;
  showClear?: boolean;
  clearIcon?: React.ReactNode;

  inputMode?: 'none' | 'text' | 'tel' | 'url' | 'email' | 'numeric' | 'decimal' | 'search';
}

class DateInput extends React.Component<
  DateInputProps,
  {
    hasFocus: boolean;
    invalid: boolean;
    str: string;
  }
> {
  constructor(props) {
    super(props);
    const { selectedValue } = props;

    this.state = {
      str: formatDate(selectedValue, this.props.format),
      invalid: false,
      hasFocus: false,
    };
  }

  componentDidUpdate() {
    if (
      dateInputInstance &&
      this.state.hasFocus &&
      !this.state.invalid &&
      !(cachedSelectionStart === 0 && cachedSelectionEnd === 0)
    ) {
      dateInputInstance.setSelectionRange(cachedSelectionStart, cachedSelectionEnd);
    }
  }

  onClear = () => {
    this.setState({
      str: '',
    });
    this.props.onClear(null);
  };

  onInputChange = event => {
    let str = event.target.value;
    const { disabledDate, format, onChange, selectedValue } = this.props;

    // eslint-disable-next-line
    if (isNaN(str)) {
      str = str.replace(/[^0-9]+/g, '');
    }

    if (str.length >= 3) {
      str = `${str.substr(0, 2)}/${str.substr(2)}`;
    }

    if (str.length >= 6) {
      str = `${str.substr(0, 5)}/${str.substr(5)}`;
    }

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

    if (selectedValue !== value || (selectedValue && value && !selectedValue.isSame(value))) {
      this.setState({
        invalid: false,
        str,
      });
      onChange(value);
    }
  };

  onFocus = () => {
    this.setState({ hasFocus: true });
  };

  onBlur = () => {
    this.setState((prevState, prevProps) => ({
      hasFocus: false,
      str: formatDate(prevProps.value, prevProps.format),
    }));
  };

  onKeyDown = event => {
    const { keyCode } = event;
    const { onSelect, value, disabledDate } = this.props;
    if (keyCode === KeyCode.ENTER && onSelect) {
      const validateDate = !disabledDate || !disabledDate(value);
      if (validateDate) {
        onSelect(value.clone());
      }
      event.preventDefault();
    }
  };

  static getDerivedStateFromProps(nextProps, state) {
    let newState = {};

    if (dateInputInstance) {
      cachedSelectionStart = dateInputInstance.selectionStart;
      cachedSelectionEnd = dateInputInstance.selectionEnd;
    }
    // when popup show, click body will call this, bug!
    const { selectedValue } = nextProps;
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

  // eslint-disable-next-line react/no-find-dom-node
  getRootDOMNode = () => ReactDOM.findDOMNode(this);

  focus = () => {
    if (dateInputInstance) {
      dateInputInstance.focus();
    }
  };

  saveDateInput = dateInput => {
    dateInputInstance = dateInput;
  };

  render() {
    const { props } = this;
    const { invalid, str } = this.state;
    const { locale, prefixCls, placeholder, clearIcon, inputMode } = props;
    const invalidClass = invalid && str.length === 10 ? `${prefixCls}-input-invalid` : '';
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
          <a role="button" title={locale.clear} onClick={this.onClear}>
            {clearIcon || <span className={`${prefixCls}-clear-btn`} />}
          </a>
        ) : null}
      </div>
    );
  }
}

polyfill(DateInput);

export default DateInput;
