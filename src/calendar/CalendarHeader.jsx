import React from 'react';
import PropTypes from 'prop-types';
import toFragment from 'rc-util/lib/Children/mapSelf';
import MonthPanel from '../month/MonthPanel';
import YearPanel from '../year/YearPanel';
import DecadePanel from '../decade/DecadePanel';

function goMonth(direction) {
  const next = this.props.value.clone();
  next.add(direction, 'months');
  this.props.onValueChange(next);
}

function goYear(direction) {
  const next = this.props.value.clone();
  next.add(direction, 'years');
  this.props.onValueChange(next);
}

function showIf(condition, el) {
  return condition ? el : null;
}

export default class CalendarHeader extends React.Component {
  static propTypes = {
    prefixCls: PropTypes.string,
    value: PropTypes.object,
    onValueChange: PropTypes.func,
    showTimePicker: PropTypes.bool,
    onPanelChange: PropTypes.func,
    locale: PropTypes.object,
    enablePrev: PropTypes.any,
    enableNext: PropTypes.any,
    disabledMonth: PropTypes.func,
    renderFooter: PropTypes.func,
    onMonthSelect: PropTypes.func,
  }

  static defaultProps = {
    enableNext: 1,
    enablePrev: 1,
    onPanelChange() { },
    onValueChange() { },
  }

  constructor(props) {
    super(props);

    this.nextMonth = goMonth.bind(this, 1);
    this.previousMonth = goMonth.bind(this, -1);
    this.nextYear = goYear.bind(this, 1);
    this.previousYear = goYear.bind(this, -1);

    this.state = { yearPanelReferer: null };
  }

  onMonthSelect = (value) => {
    this.props.onPanelChange(value, 'date');
    if (this.props.onMonthSelect) {
      this.props.onMonthSelect(value);
    } else {
      this.props.onValueChange(value);
    }
  }

  onYearSelect = (value) => {
    const referer = this.state.yearPanelReferer;
    this.setState({ yearPanelReferer: null });
    this.props.onPanelChange(value, referer);
    this.props.onValueChange(value);
  }

  onDecadeSelect = (value) => {
    this.props.onPanelChange(value, 'year');
    this.props.onValueChange(value);
  }

  changeYear = (direction) => {
    if (direction > 0) {
      this.nextYear();
    } else {
      this.previousYear();
    }
  }

  monthYearElement = (showTimePicker) => {
    const props = this.props;
    const prefixCls = props.prefixCls;
    const locale = props.locale;
    const value = props.value;
    const localeData = value.localeData();
    const monthBeforeYear = locale.monthBeforeYear;
    const selectClassName = `${prefixCls}-${monthBeforeYear ? 'my-select' : 'ym-select'}`;
    const timeClassName = showTimePicker ? ` ${prefixCls}-time-status` : '';
    const year = (<a
      className={`${prefixCls}-year-select${timeClassName}`}
      role="button"
      onClick={showTimePicker ? null : () => this.showYearPanel('date')}
      title={showTimePicker ? null : locale.yearSelect}
    >
      {value.format(locale.yearFormat)}
    </a>);
    const month = (<a
      className={`${prefixCls}-month-select${timeClassName}`}
      role="button"
      onClick={showTimePicker ? null : this.showMonthPanel}
      title={showTimePicker ? null : locale.monthSelect}
    >
      {locale.monthFormat ? value.format(locale.monthFormat) : localeData.monthsShort(value)}
    </a>);
    let day;
    if (showTimePicker) {
      day = (<a
        className={`${prefixCls}-day-select${timeClassName}`}
        role="button"
      >
        {value.format(locale.dayFormat)}
      </a>);
    }
    let my = [];
    if (monthBeforeYear) {
      my = [month, day, year];
    } else {
      my = [year, month, day];
    }
    return (<span className={selectClassName}>
      {toFragment(my)}
    </span>);
  }

  showMonthPanel = () => {
    // null means that users' interaction doesn't change value
    this.props.onPanelChange(null, 'month');
  }

  showYearPanel = (referer) => {
    this.setState({ yearPanelReferer: referer });
    this.props.onPanelChange(null, 'year');
  }

  showDecadePanel = () => {
    this.props.onPanelChange(null, 'decade');
  }

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

    return (<div className={`${prefixCls}-header`}>
      <div style={{ position: 'relative' }}>
        {showIf(enablePrev && !showTimePicker,
          <a
            className={`${prefixCls}-prev-year-btn`}
            role="button"
            onClick={this.previousYear}
            title={locale.previousYear}
          />)}
        {showIf(enablePrev && !showTimePicker,
          <a
            className={`${prefixCls}-prev-month-btn`}
            role="button"
            onClick={this.previousMonth}
            title={locale.previousMonth}
          />)}
        {this.monthYearElement(showTimePicker)}
        {showIf(enableNext && !showTimePicker,
          <a
            className={`${prefixCls}-next-month-btn`}
            onClick={this.nextMonth}
            title={locale.nextMonth}
          />)}
        {showIf(enableNext && !showTimePicker,
          <a
            className={`${prefixCls}-next-year-btn`}
            onClick={this.nextYear}
            title={locale.nextYear}
          />)}
      </div>
      {panel}
    </div>);
  }
}
