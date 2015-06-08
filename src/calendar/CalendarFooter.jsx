'use strict';

var React = require('react');
var Time = require('../time/Time');

class CalendarFooter extends React.Component {
  getTodayTime() {
    var value = this.props.value;
    var today = value.clone();
    today.setTime(Date.now());
    return this.props.dateFormatter.format(today);
  }

  render() {
    var props = this.props;
    var value = props.value;
    var locale = props.locale;
    var prefixClsFn = props.prefixClsFn;
    var footerEl;
    if (props.showToday || props.showTime) {
      var todayEl;
      if (props.showToday) {
        todayEl = (<a className = {prefixClsFn('today-btn')}
          role="button"
          onClick={props.chooseToday}
          title={this.getTodayTime()}>{locale.today}</a>);
      }
      var clearEl;
      if (props.showClear) {
        clearEl = (<a className = {prefixClsFn('clear-btn')}
          role="button"
          onClick={props.clear}>{locale.clear}</a>);
      }
      var footerBtn;
      if (todayEl || clearEl) {
        footerBtn = <div className={prefixClsFn('footer-btn')}>{todayEl} {clearEl}</div>;
      }
      var timeEl;
      if (props.showTime) {
        timeEl = (<Time value={value} prefixClsFn={prefixClsFn} locale={locale} onChange={props.handleSelect}/>);
      }
      footerEl = (
        <div className = {prefixClsFn('footer')}>
        {timeEl}
        {footerBtn}
        </div>);
    }

    return footerEl;
  }
}

module.exports = CalendarFooter;
