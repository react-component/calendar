import React, {PropTypes} from 'react';
import warning from 'warning';

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
    };
  },

  componentWillReceiveProps(nextProps) {
    // when popup show, click body will call this, bug!
    const value = nextProps.value;
    this.setState({
      str: value && nextProps.formatter.format(value) || '',
    });
  },

  onInputChange(event) {
    const str = event.target.value;
    this.setState({
      str,
    });
  },

  onBlur() {
    const {str} = this.state;
    const {disabledDate, formatter, gregorianCalendarLocale, onChange} = this.props;
    let value;
    if (str) {
      try {
        value = formatter.parse(str, gregorianCalendarLocale);
      } catch (ex) {
        warning(false, `invalid date input: ${str}`);
        this.setState(this.getInitialState());
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
        this.setState(this.getInitialState());
      }
    } else {
      onChange(null);
    }
  },

  onClear() {
    this.setState({str: ''});
    this.props.onClear(null);
  },

  render() {
    const props = this.props;
    const {locale, prefixCls} = props;
    return (<div className={`${prefixCls}-input-wrap`}>
      <input className={`${prefixCls}-input`}
             value={this.state.str}
             onChange={this.onInputChange}
             onBlur={this.onBlur}/>
      {props.showClear ? <a className={`${prefixCls}-clear-btn`}
                            role="button"
                            title={locale.clear}
                            onMouseDown={this.onClear}/> : null}
    </div>);
  },
});

export default DateInput;
