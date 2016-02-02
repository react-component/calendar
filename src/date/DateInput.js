import React, {PropTypes} from 'react';
import ReactDOM from 'react-dom';
import {getTimeConfig} from '../util/index';

function copyTime(target, source) {
  if (source) {
    target.setHourOfDay(source.getHourOfDay());
    target.setMinutes(source.getMinutes());
    target.setSeconds(source.getSeconds());
  }
  return target;
}

const DateInput = React.createClass({
  propTypes: {
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
    const {disabledDate, formatter, gregorianCalendarLocale, onChange} = this.props;
    if (str) {
      try {
        value = copyTime(formatter.parse(str, {
          locale: gregorianCalendarLocale,
          obeyCount: true,
        }), this.props.selectedValue);
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

  onTimePickerChange(value) {
    const { selectedValue, onChange } = this.props;
    if (!selectedValue) {
      // Default date is today.
      const today = new Date();
      value.setYear(today.getFullYear());
      value.setMonth(today.getMonth());
      value.setDayOfMonth(today.getDate());
    } else {
      value.setYear(selectedValue.getYear());
      value.setMonth(selectedValue.getMonth());
      value.setDayOfMonth(selectedValue.getDayOfMonth());
    }
    onChange(value);
  },

  onClear() {
    this.setState({str: ''});
    this.props.onClear(null);
  },

  getRootDOMNode() {
    return ReactDOM.findDOMNode(this);
  },

  render() {
    const props = this.props;
    const {invalid, str} = this.state;
    const {selectedValue, locale, prefixCls, placeholder, timePicker, disabledTime, gregorianCalendarLocale} = props;
    const invalidClass = invalid ? `${prefixCls}-input-invalid` : '';
    const disabledTimeConfig = disabledTime && timePicker ? getTimeConfig(selectedValue, disabledTime) : null;
    return (<div className={`${prefixCls}-input-wrap`}>
      <div className={`${prefixCls}-time-picker-wrap`}>
        {timePicker ? React.cloneElement(timePicker, {
          showClear: false,
          allowEmpty: false,
          getPopupContainer: this.getRootDOMNode,
          gregorianCalendarLocale,
          value: selectedValue,
          onChange: this.onTimePickerChange,
          ...disabledTimeConfig,
        }) : null}
      </div>
      <div className={`${prefixCls}-date-input-wrap`}>
        <input className={`${prefixCls}-input  ${invalidClass}`}
               value={str}
               placeholder={placeholder}
               onChange={this.onInputChange}/>
      </div>
      {props.showClear ? <a className={`${prefixCls}-clear-btn`}
                            role="button"
                            title={locale.clear}
                            onClick={this.onClear}/> : null}
    </div>);
  },
});

export default DateInput;
