/** @jsx React.DOM */

var React = require('react');
var Calendar = require('../');
var zhCn = require('gregorian-calendar/lib/locale/zh-cn');
var DateTimeFormat = require('gregorian-calendar-format');
var GregorianCalendar = require('gregorian-calendar');
var formatter = new DateTimeFormat('yyyy-MM-dd', zhCn);
var CalendarLocale = require('../lib/locale/zh-cn');

var CalendarInput = React.createClass({
  getInitialState: function () {
    return {
      showCalendar: 0
    };
  },

  onKeyDown: function (e) {
    // down
    if (e.keyCode === 40) {
      e.preventDefault();
      this.onFocus();
    }
  },

  onFocus: function () {
    var inputValue = this.state.value;
    var calendarValue;
    if (inputValue) {
      calendarValue = formatter.parse(inputValue);
    } else {
      calendarValue = new GregorianCalendar(zhCn);
      calendarValue.setTime(Date.now());
    }
    this.setState({
      showCalendar: 1,
      calendarValue: calendarValue
    });
  },

  onCalendarBlur: function () {
    this.setState({
      showCalendar: 0
    });
  },

  onChange: function () {
  },

  onCalendarSelect: function (d) {
    this.refs.input.getDOMNode().focus();
    this.setState({
      value: formatter.format(d),
      showCalendar: 0
    });
  },

  render: function () {
    var state = this.state;
    var calendar;
    if (state.showCalendar) {
      calendar = (<div style={{position: "absolute", left: 0, top: 24, zIndex: 99}}>
        <Calendar locale={CalendarLocale} value={state.calendarValue} focused="1" onBlur={this.onCalendarBlur} onSelect={this.onCalendarSelect}/>
      </div>);
    }
    return (
      <span style={{display: "inline-block", position: "relative"}}>
        <input value={state.value} style={{height: 21}} onFocus={this.onFocus} onChange={this.onChange} ref='input' onKeyDown={this.onKeyDown}/>
      {calendar}
      </span>)
  }
});

module.exports = CalendarInput;
