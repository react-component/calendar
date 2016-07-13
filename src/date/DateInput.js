import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';

const DateInput = React.createClass({
  propTypes: {
    prefixCls: PropTypes.string,
    timePicker: PropTypes.object,
    disabledTime: PropTypes.any,
    formatter: PropTypes.object,
    locale: PropTypes.object,
    gregorianCalendarLocale: PropTypes.object,
    disabledDate: PropTypes.func,
    onChange: PropTypes.func,
    onClear: PropTypes.func,
    placeholder: PropTypes.string,
    onSelect: PropTypes.func,
    selectedValue: PropTypes.object,
  },

  getInitialState() {
    const selectedValue = this.props.selectedValue;
    return {
      str: selectedValue && this.props.formatter.format(selectedValue) || '',
      invalid: false,
    };
  },

  componentWillReceiveProps(nextProps) {
    // when popup show, click body will call this, bug!
    const selectedValue = nextProps.selectedValue;
    this.setState({
      str: selectedValue && nextProps.formatter.format(selectedValue) || '',
      invalid: false,
    });
  },

  onInputChange(event) {
    const str = event.target.value;
    this.setState({
      str,
    });
    let value;
    const { disabledDate, formatter, gregorianCalendarLocale, onChange } = this.props;
    if (str) {
      try {
        // remove `copyTime`, to enable input time
        value = formatter.parse(str, {
          locale: gregorianCalendarLocale,
          obeyCount: true,
        });
      } catch (ex) {
        this.setState({
          invalid: true,
        });
        return;
      }
      if (value && (!disabledDate || !disabledDate(value))) {
        const originalValue = this.props.selectedValue;
        if (originalValue && value) {
          if (originalValue.getTime() !== value.getTime()) {
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
    this.refs.dateInput.focus();
  },

  render() {
    const props = this.props;
    const { invalid, str } = this.state;
    const { locale, prefixCls, placeholder } = props;
    const invalidClass = invalid ? `${prefixCls}-input-invalid` : '';
    return (<div className={`${prefixCls}-input-wrap`}>
      <div className={`${prefixCls}-date-input-wrap`}>
        <input
          ref="dateInput"
          className={`${prefixCls}-input  ${invalidClass}`}
          value={str}
          placeholder={placeholder}
          onChange={this.onInputChange}
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
