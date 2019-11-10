import React, { CSSProperties } from 'react';
import ReactDOM from 'react-dom';
import { Moment } from 'moment';
import toFragment from 'rc-util/lib/Children/mapSelf';
import cx from 'classnames';
import TodayButton, { TodayButtonProps } from './TodayButton';
import OkButton, { OkButtonProps } from './OkButton';
import TimePickerButton, { TimePickerButtonProps } from './TimePickerButton';
import { CalendarTypeMode } from '../date/DateInput';

export interface CalendarProps extends OkButtonProps, TimePickerButtonProps, TodayButtonProps {
  prefixCls?: string;
  className?: string;
  style?: CSSProperties;
  defaultValue?: Moment;
  value?: Moment;
  selectedValue?: Moment;
  defaultSelectedValue?: Moment;
  mode?: CalendarTypeMode;
  locale?: {
    [key: string]: any;
  };
  showDateInput?: boolean;
  showWeekNumber?: boolean;
  showToday?: boolean;
  showOk?: boolean;
  onSelect?: (
    value: Moment,
    cause?: {
      source: string;
    },
  ) => void;
  timePicker?: JSX.Element;
  disabledTime?: (value: Moment) => boolean;
  renderFooter?: (mode: CalendarProps['mode']) => void;
}

export default class CalendarFooter extends React.Component<CalendarProps> {
  onSelect(value) {
    this.props.onSelect(value);
  }

  // eslint-disable-next-line react/no-find-dom-node
  getRootDOMNode = () => ReactDOM.findDOMNode(this);

  render() {
    const { props } = this;
    const { value, prefixCls, showOk, timePicker, renderFooter, mode } = props;
    let footerEl = null;
    const extraFooter = renderFooter && renderFooter(mode);
    if (props.showToday || timePicker || extraFooter) {
      let nowEl;
      if (props.showToday) {
        nowEl = <TodayButton {...props} value={value} />;
      }
      let okBtn;
      if (showOk === true || (showOk !== false && !!props.timePicker)) {
        okBtn = <OkButton {...props} />;
      }
      let timePickerBtn;
      if (props.timePicker) {
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
      footerEl = <div className={cls}>{footerBtn}</div>;
    }
    return footerEl;
  }
}
