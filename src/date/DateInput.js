import React, {PropTypes} from 'react';

const DateInput = React.createClass({
  propTypes: {
    formatter: PropTypes.object,
    locale: PropTypes.object,
    gregorianCalendarLocale: PropTypes.object,
    disabledDate: PropTypes.func,
    onChange: PropTypes.func,
    onClear: PropTypes.func,
    onSelect: PropTypes.func,
    value: PropTypes.object,
  },

  getInitialState() {
    const value = this.props.value;
    return {
      str: value && this.props.formatter.format(value) || '',
      invalid: false,
    };
  },

  componentWillReceiveProps(nextProps) {
    // when popup show, click body will call this, bug!
    const value = nextProps.value;
    this.setState({
      str: value && nextProps.formatter.format(value) || '',
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
        value = formatter.parse(str, gregorianCalendarLocale, {
          obeyCount: true,
        });
      } catch (ex) {
        this.setState({
          invalid: true,
        });
        return;
      }
      if (value && (!disabledDate || !disabledDate(value))) {
        const originalValue = this.props.value;
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
    this.setState({str: ''});
    this.props.onClear(null);
  },

  render() {
    const props = this.props;
    const {invalid, str} = this.state;
    const {locale, prefixCls} = props;
    const invalidClass = invalid ? `${prefixCls}-input-invalid` : '';
    return (<div className={`${prefixCls}-input-wrap`}>
      <input className={`${prefixCls}-input  ${invalidClass}`}
             value={str}
             onChange={this.onInputChange}/>
      {props.showClear ? <a className={`${prefixCls}-clear-btn`}
                            role="button"
                            title={locale.clear}
                            onMouseDown={this.onClear}/> : null}
    </div>);
  },
});

export default DateInput;
