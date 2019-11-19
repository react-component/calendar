import React from 'react';
import { Moment } from 'moment';

import toFragment from 'rc-util/lib/Children/mapSelf';
import MonthPanel, { MonthPanelProps } from '../month/MonthPanel';
import YearPanel from '../year/YearPanel';
import DecadePanel from '../decade/DecadePanel';
import { CalendarTypeMode } from '../date/DateInput';

interface CalendarHeaderProps {
  prefixCls?: string;
  locale?: { [key: string]: any };
  showTimePicker?: boolean;
  timePickerDisabled?: boolean;
  value?: Moment;
  mode?: CalendarTypeMode;
  onValueChange?: (value: Moment) => void;
  onPanelChange?: (value: Moment, type: CalendarTypeMode) => void;
  onMonthSelect?: (value: Moment) => void;
  enableNext?: boolean;
  enablePrev?: boolean;
  disabledMonth?: (value: Moment) => boolean;
  monthCellRender?: MonthPanelProps['cellRender'];
  monthCellContentRender?: MonthPanelProps['contentRender'];
  renderFooter?: MonthPanelProps['renderFooter'];
}

export default class CalendarHeader extends React.Component<CalendarHeaderProps> {
  static defaultProps = {
    enableNext: 1,
    enablePrev: 1,
    onPanelChange() {},
    onValueChange() {},
  };

  goMonth = direction => {
    const next = this.props.value.clone();
    next.add(direction, 'months');
    this.props.onValueChange(next);
  };

  goYear = direction => {
    const next = this.props.value.clone();
    next.add(direction, 'years');
    this.props.onValueChange(next);
  };

  showIf = (condition, el) => (condition ? el : null);

  nextMonth = () => this.goMonth(1);

  previousMonth = () => this.goMonth(-1);

  nextYear = () => this.goYear(1);

  previousYear = () => this.goYear(-1);

  state = {
    yearPanelReferer: null,
  };

  onMonthSelect = value => {
    this.props.onPanelChange(value, 'date');
    if (this.props.onMonthSelect) {
      this.props.onMonthSelect(value);
    } else {
      this.props.onValueChange(value);
    }
  };

  onYearSelect = value => {
    const referer = this.state.yearPanelReferer;
    this.setState({ yearPanelReferer: null });
    this.props.onPanelChange(value, referer);
    this.props.onValueChange(value);
  };

  onDecadeSelect = value => {
    this.props.onPanelChange(value, 'year');
    this.props.onValueChange(value);
  };

  changeYear = direction => {
    if (direction > 0) {
      this.nextYear();
    } else {
      this.previousYear();
    }
  };

  monthYearElement = showTimePicker => {
    const { props } = this;
    const { prefixCls } = props;
    const { locale } = props;
    const { value } = props;
    const localeData = value.localeData();
    const { monthBeforeYear } = locale;
    const selectClassName = `${prefixCls}-${monthBeforeYear ? 'my-select' : 'ym-select'}`;
    const timeClassName = showTimePicker ? ` ${prefixCls}-time-status` : '';
    const year = (
      <a
        className={`${prefixCls}-year-select${timeClassName}`}
        role="button"
        onClick={showTimePicker ? null : () => this.showYearPanel('date')}
        title={showTimePicker ? null : locale.yearSelect}
      >
        {value.format(locale.yearFormat)}
      </a>
    );
    const month = (
      <a
        className={`${prefixCls}-month-select${timeClassName}`}
        role="button"
        onClick={showTimePicker ? null : this.showMonthPanel}
        title={showTimePicker ? null : locale.monthSelect}
      >
        {locale.monthFormat ? value.format(locale.monthFormat) : localeData.monthsShort(value)}
      </a>
    );
    let day;
    if (showTimePicker) {
      day = (
        <a className={`${prefixCls}-day-select${timeClassName}`} role="button">
          {value.format(locale.dayFormat)}
        </a>
      );
    }
    let my = [];
    if (monthBeforeYear) {
      my = [month, day, year];
    } else {
      my = [year, month, day];
    }
    return <span className={selectClassName}>{toFragment(my)}</span>;
  };

  showMonthPanel = () => {
    // null means that users' interaction doesn't change value
    this.props.onPanelChange(null, 'month');
  };

  showYearPanel = referer => {
    this.setState({ yearPanelReferer: referer });
    this.props.onPanelChange(null, 'year');
  };

  showDecadePanel = () => {
    this.props.onPanelChange(null, 'decade');
  };

  render() {
    const { props } = this;
    const {
      prefixCls,
      locale,
      mode,
      value,
      showTimePicker,
      enableNext,
      enablePrev,
      disabledMonth,
      renderFooter,
    } = props;

    let panel = null;
    if (mode === 'month') {
      panel = (
        <MonthPanel
          locale={locale}
          value={value}
          rootPrefixCls={prefixCls}
          onSelect={this.onMonthSelect}
          onYearPanelShow={() => this.showYearPanel('month')}
          disabledDate={disabledMonth}
          cellRender={props.monthCellRender}
          contentRender={props.monthCellContentRender}
          renderFooter={renderFooter}
          changeYear={this.changeYear}
        />
      );
    }
    if (mode === 'year') {
      panel = (
        <YearPanel
          locale={locale}
          defaultValue={value}
          rootPrefixCls={prefixCls}
          onSelect={this.onYearSelect}
          onDecadePanelShow={this.showDecadePanel}
          renderFooter={renderFooter}
        />
      );
    }
    if (mode === 'decade') {
      panel = (
        <DecadePanel
          locale={locale}
          defaultValue={value}
          rootPrefixCls={prefixCls}
          onSelect={this.onDecadeSelect}
          renderFooter={renderFooter}
        />
      );
    }

    return (
      <div className={`${prefixCls}-header`}>
        <div style={{ position: 'relative' }}>
          {this.showIf(
            enablePrev && !showTimePicker,
            <a
              className={`${prefixCls}-prev-year-btn`}
              role="button"
              onClick={this.previousYear}
              title={locale.previousYear}
            />,
          )}
          {this.showIf(
            enablePrev && !showTimePicker,
            <a
              className={`${prefixCls}-prev-month-btn`}
              role="button"
              onClick={this.previousMonth}
              title={locale.previousMonth}
            />,
          )}
          {this.monthYearElement(showTimePicker)}
          {this.showIf(
            enableNext && !showTimePicker,
            <a
              className={`${prefixCls}-next-month-btn`}
              onClick={this.nextMonth}
              title={locale.nextMonth}
            />,
          )}
          {this.showIf(
            enableNext && !showTimePicker,
            <a
              className={`${prefixCls}-next-year-btn`}
              onClick={this.nextYear}
              title={locale.nextYear}
            />,
          )}
        </div>
        {panel}
      </div>
    );
  }
}
