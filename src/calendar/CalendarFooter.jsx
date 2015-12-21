import React, {PropTypes} from 'react';
import ReactDOM from 'react-dom';
import rcUtil from 'rc-util';
const toFragment = rcUtil.Children.mapSelf;
import TodayButton from '../calendar/TodayButton';
import OkButton from '../calendar/OkButton';
import {getTimeConfig} from '../util/index';

const CalendarFooter = React.createClass({
  propTypes: {
    onSelect: PropTypes.func,
    value: PropTypes.object,
    defaultValue: PropTypes.object,
  },

  onSelect(value) {
    this.props.onSelect(value);
  },

  getRootDOMNode() {
    return ReactDOM.findDOMNode(this);
  },

  render() {
    const props = this.props;
    const {value, prefixCls, showDateInput, disabledTime, gregorianCalendarLocale, selectedValue} = props;
    let timePicker = !showDateInput && props.timePicker || null;
    const disabledTimeConfig = disabledTime && timePicker ? getTimeConfig(selectedValue, disabledTime) : null;
    let footerEl = null;
    if (props.showToday || timePicker) {
      let nowEl;
      if (props.showToday) {
        nowEl = <TodayButton {...props} value={value}/>;
      }
      let okBtn;
      if (props.showOk) {
        okBtn = <OkButton {...props}/>;
      }
      let footerBtn;
      if (nowEl || okBtn) {
        footerBtn = <span className={`${prefixCls}-footer-btn`}>{toFragment([nowEl, okBtn])}</span>;
      }
      if (timePicker) {
        timePicker = React.cloneElement(timePicker, {
          onChange: this.onSelect,
          allowEmpty: false,
          gregorianCalendarLocale,
          ...disabledTimeConfig,
          getPopupContainer: this.getRootDOMNode,
          value: selectedValue,
        });
      }
      footerEl = (
        <div className={`${prefixCls}-footer`}>
          {timePicker}
          {footerBtn}
        </div>);
    }

    return footerEl;
  },
});

export default CalendarFooter;
