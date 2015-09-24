import React, {PropTypes} from 'react';
import warning from 'warning';

const DateInput = React.createClass({
  propTypes: {
    formatter: PropTypes.object,
    className: PropTypes.string,
    onChange: PropTypes.func,
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
    this.setState({
      str: e.target.value,
    });
  },

  onBlur() {
    try {
      const value = this.props.formatter.parse(this.state.str, this.props.value.locale);
      if (value.getTime() !== this.props.value.getTime()) {
        this.props.onChange(value);
      }
    } catch (e) {
      warning(false, `invalid date input: ${this.state.str}`);
    }
  },

  render() {
    const props = this.props;
    return (<input className={props.className} value={this.state.str} onChange={this.onInputChange}
                  onBlur={this.onBlur}/>);
  },
});

export default DateInput;
