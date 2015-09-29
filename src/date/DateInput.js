import React, {PropTypes} from 'react';
import warning from 'warning';

const DateInput = React.createClass({
  propTypes: {
    formatter: PropTypes.object,
    disabledDate: PropTypes.func,
    className: PropTypes.string,
    onChange: PropTypes.func,
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
    const value = nextProps.value;
    this.setState({
      str: value && nextProps.formatter.format(value) || '',
    });
  },

  onInputChange(e) {
    const str = e.target.value;
    this.setState({
      str,
    });
  },

  onBlur() {
    const {str} = this.state;
    const {disabledDate, formatter} = this.props;
    let value;
    try {
      value = formatter.parse(str, this.props.value.locale);
    } catch (e) {
      warning(false, `invalid date input: ${str}`);
      this.setState(this.getInitialState());
      return;
    }
    if (value && (!disabledDate || !disabledDate(value))) {
      this.props.onChange(value);
    } else {
      this.setState(this.getInitialState());
    }
  },

  render() {
    const props = this.props;
    return (<input className={props.className} value={this.state.str} onChange={this.onInputChange}
                   onBlur={this.onBlur}/>);
  },
});

export default DateInput;
