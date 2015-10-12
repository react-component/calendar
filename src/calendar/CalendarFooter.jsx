import React, {PropTypes} from 'react';
import Time from '../time/Time';
import rcUtil from 'rc-util';
const toFragment = rcUtil.Children.mapSelf;
import {getTodayElement, getOkElement} from '../util/';

const CalendarFooter = React.createClass({
  propTypes: {
    onSelect: PropTypes.func,
  },

  onSelect(value) {
    this.props.onSelect(value);
  },

  render() {
    const props = this.props;
    const {value, locale, prefixCls} = props;
    let footerEl = null;
    if (props.showToday || props.showTime) {
      let nowEl;
      if (props.showToday) {
        nowEl = getTodayElement(props);
      }
      let clearEl;
      if (props.showClear) {
        clearEl = (<a className={`${prefixCls}-clear-btn`}
                      role="button"
                      onClick={props.onClear}>{locale.clear}</a>);
      }
      let okBtn;
      if (props.showOk) {
        okBtn = getOkElement(props);
      }
      let footerBtn;
      if (nowEl || clearEl) {
        footerBtn = <span className={`${prefixCls}-footer-btn`}>{toFragment([nowEl, okBtn, clearEl])}</span>;
      }
      let timeEl;
      if (props.showTime) {
        timeEl = (<Time ref="time" value={value} prefixCls={prefixCls}
                        disabled={props.timeDisabled}
                        locale={locale} onChange={this.onSelect}/>);
      }
      footerEl = (
        <div className={`${prefixCls}-footer`}>
          {timeEl}
          {footerBtn}
        </div>);
    }

    return footerEl;
  },
});

export default CalendarFooter;
