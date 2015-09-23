import React from 'react';
import DateTable from './date/DateTable';
import DateTimeFormat from 'gregorian-calendar-format';
import GregorianCalendar from 'gregorian-calendar';
import enUs from './locale/en-us';

function noop() {
}

function getNow() {
  const value = new GregorianCalendar();
  value.setTime(Date.now());
  return value;
}

const RangeCalendar = React.createClass({
  getInitialState() {
    const props = this.props;
    this.dateFormatter = new DateTimeFormat(props.locale.dateFormat);
    const value = props.value || props.defaultValue || getNow();
    return {value};
  },

  getDefaultProps() {
    return {
      locale: enUs,
      style: {},
      visible: true,
      prefixCls: 'rc-calendar',
      className: '',
      onKeyDown: noop,
      onSelect: noop,
      onChange: noop,
      onFocus: noop,
      onBlur: noop,
    };
  },

  render() {
    const props = this.props;
    const state = this.state;
    return (<div style={{overflow: 'hidden', width: 550}}>
      <div style={{float: 'left'}}>
        <DateTable {...props} dateFormatter={this.dateFormatter} value={state.value}/>
      </div>
      <div style={{float: 'right'}}>
        <DateTable {...props} dateFormatter={this.dateFormatter} value={state.value}/>
      </div>
    </div>);
  },
});

export default RangeCalendar;
