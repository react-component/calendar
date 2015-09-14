import React from 'react';
import Time from '../time/Time';
import rcUtil from 'rc-util';
const toFragment = rcUtil.Children.mapSelf;

export default
class CalendarFooter extends React.Component {
  getTodayTimeStr() {
    const today = this.getTodayTime();
    return this.props.dateFormatter.format(today);
  }

  getTodayTime() {
    const value = this.props.value;
    const today = value.clone();
    today.setTime(Date.now());
    return today;
  }

  render() {
    const props = this.props;
    const value = props.value;
    const locale = props.locale;
    const prefixCls = props.prefixCls;
    let footerEl = null;
    if (props.showToday || props.showTime) {
      let nowEl;
      let localeNow = locale.today;
      if (props.showTime) {
        localeNow = locale.now || locale.today;
      }
      if (props.showToday) {
        let disabledToday = false;
        let disabledTodayClass = '';
        if (props.disabledDate) {
          disabledToday = props.disabledDate(this.getTodayTime(), value);
          if (disabledToday) {
            disabledTodayClass = `${prefixCls}-today-btn-disabled`;
          }
        }
        nowEl = (<a className={`${prefixCls}-today-btn ${disabledTodayClass}`}
                    role="button"
                    onClick={disabledToday ? null : props.onToday}
                    title={this.getTodayTimeStr()}>{localeNow}</a>);
      }
      let clearEl;
      if (props.showClear) {
        clearEl = (<a className={`${prefixCls}-clear-btn`}
                      role="button"
                      onClick={props.onClear}>{locale.clear}</a>);
      }
      let okBtn;
      if (props.showOk) {
        okBtn = (<a className={`${prefixCls}-ok-btn`}
                    role="button"
                    onClick={props.onOk}>{locale.ok}</a>);
      }
      let footerBtn;
      if (nowEl || clearEl) {
        footerBtn = <span className={`${prefixCls}-footer-btn`}>{toFragment([nowEl, okBtn, clearEl])}</span>;
      }
      let timeEl;
      if (props.showTime) {
        timeEl = (<Time value={value} prefixCls={prefixCls} locale={locale} onChange={props.onSelect}/>);
      }
      footerEl = (
        <div className={`${prefixCls}-footer`}>
          {timeEl}
          {footerBtn}
        </div>);
    }

    return footerEl;
  }
}
