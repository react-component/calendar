import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import toFragment from 'rc-util/lib/Children/mapSelf';
import cx from 'classnames';
import TodayButton from '../calendar/TodayButton';
import OkButton from '../calendar/OkButton';
import TimePickerButton from '../calendar/TimePickerButton';

export default class CalendarFooter extends React.Component {
  static propTypes = {
    prefixCls: PropTypes.string,
    showDateInput: PropTypes.bool,
    disabledTime: PropTypes.any,
    timePicker: PropTypes.element,
    selectedValue: PropTypes.any,
    showOk: PropTypes.bool,
    onSelect: PropTypes.func,
    value: PropTypes.object,
    renderFooter: PropTypes.func,
    defaultValue: PropTypes.object,
    mode: PropTypes.string,
  }

  onSelect(value) {
    this.props.onSelect(value);
  }

  getRootDOMNode() {
    return ReactDOM.findDOMNode(this);
  }

  render() {
    const props = this.props;
    const { value, prefixCls, showOk, timePicker, renderFooter, mode } = props;
    let footerEl = null;
    const extraFooter = renderFooter && renderFooter(mode);
    if (props.showToday || timePicker || extraFooter) {
      let nowEl;
      if (props.showToday) {
        nowEl = <TodayButton {...props} value={value} />;
      }
      let okBtn;
      if (showOk === true || showOk !== false && !!props.timePicker) {
        okBtn = <OkButton {...props} />;
      }
      let timePickerBtn;
      if (!!props.timePicker) {
        timePickerBtn = <TimePickerButton {...props} />;
      }

      let footerBtn;
      if (nowEl || timePickerBtn || okBtn || extraFooter) {
        footerBtn = (
          <span className={`${prefixCls}-footer-btn`}>
            {extraFooter}
            {toFragment([nowEl, timePickerBtn, okBtn])}
          </span>
        );
      }
      const cls = cx(`${prefixCls}-footer`, {
        [`${prefixCls}-footer-show-ok`]: okBtn,
      });
      footerEl = (
        <div className={cls}>
          {footerBtn}
        </div>
      );
    }
    return footerEl;
  }
}
