'use strict';

import React from 'react';
import Time from '../time/Time';
import rcUtil from 'rc-util';
var toFragment = rcUtil.Children.mapSelf;

export default
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
    var footerEl = null;
    if (props.showToday || props.showTime) {
      var nowEl;
      var localeNow = locale.today;
      if (props.showTime) {
        localeNow = locale.now || locale.today;
      }
      if (props.showToday) {
        nowEl = (<a className={prefixClsFn('today-btn')}
          role="button"
          onClick={props.onToday}
          title={this.getTodayTime()}>{localeNow}</a>);
      }
      var clearEl;
      if (props.showClear) {
        clearEl = (<a className={prefixClsFn('clear-btn')}
          role="button"
          onClick={props.onClear}>{locale.clear}</a>);
      }
      var okBtn;
      if (props.showOk) {
        okBtn = (<a className = {prefixClsFn('ok-btn')}
          role="button"
          onClick={props.onOk}>{locale.ok}</a>);
      }
      var footerBtn;
      if (nowEl || clearEl) {
        footerBtn = <span className={prefixClsFn('footer-btn')}>{toFragment([nowEl, okBtn, clearEl])}</span>;
      }
      var timeEl;
      if (props.showTime) {
        timeEl = (<Time value={value} prefixClsFn={prefixClsFn} locale={locale} onChange={props.onSelect}/>);
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
