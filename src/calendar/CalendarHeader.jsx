import React from 'react';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';
import MonthPanel from '../month/MonthPanel';
import YearPanel from '../year/YearPanel';
import toFragment from 'rc-util/lib/Children/mapSelf';

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

const CalendarHeader = createReactClass({
  propTypes: {
    prefixCls: PropTypes.string,
    value: PropTypes.object,
    onValueChange: PropTypes.func,
    showTimePicker: PropTypes.bool,
    showMonthPanel: PropTypes.bool,
    showYearPanel: PropTypes.bool,
    onPanelChange: PropTypes.func,
    locale: PropTypes.object,
    enablePrev: PropTypes.any,
    enableNext: PropTypes.any,
    disabledMonth: PropTypes.func,
  },

  getDefaultProps() {
    return {
      enableNext: 1,
      enablePrev: 1,
      onPanelChange() {},
      onValueChange() {},
    };
  },

  getInitialState() {
    this.nextMonth = goMonth.bind(this, 1);
    this.previousMonth = goMonth.bind(this, -1);
    this.nextYear = goYear.bind(this, 1);
    this.previousYear = goYear.bind(this, -1);
    const { showMonthPanel, showYearPanel } = this.props;
    return { showMonthPanel, showYearPanel };
  },

  componentWillReceiveProps() {
    const props = this.props;
    if ('showMonthpanel' in props) {
      this.setState({ showMonthPanel: props.showMonthPanel });
    }
    if ('showYearpanel' in props) {
      this.setState({ showYearPanel: props.showYearPanel });
    }
  },

  onSelect(value) {
    this.triggerPanelChange({
      showMonthPanel: 0,
      showYearPanel: 0,
    });
    this.props.onValueChange(value);
  },

  triggerPanelChange(panelStatus) {
    if (!('showMonthPanel' in this.props)) {
      this.setState({ showMonthPanel: panelStatus.showMonthPanel });
    }
    if (!('showYearPanel' in this.props)) {
      this.setState({ showYearPanel: panelStatus.showYearPanel });
    }
    this.props.onPanelChange(panelStatus);
  },

  monthYearElement(showTimePicker) {
    const props = this.props;
    const prefixCls = props.prefixCls;
    const locale = props.locale;
    const value = props.value;
    const localeData = value.localeData();
    const monthBeforeYear = locale.monthBeforeYear;
    const selectClassName = `${prefixCls}-${monthBeforeYear ? 'my-select' : 'ym-select'}`;
    const year = (<a
      className={`${prefixCls}-year-select`}
      role="button"
      onClick={showTimePicker ? null : this.showYearPanel}
      title={locale.yearSelect}
    >
      {value.format(locale.yearFormat)}
    </a>);
    const month = (<a
      className={`${prefixCls}-month-select`}
      role="button"
      onClick={showTimePicker ? null : this.showMonthPanel}
      title={locale.monthSelect}
    >
      {localeData.months(value)}
    </a>);
    let day;
    if (showTimePicker) {
      day = (<a
        className={`${prefixCls}-day-select`}
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
  },

  showMonthPanel() {
    this.triggerPanelChange({
      showMonthPanel: 1,
      showYearPanel: 0,
    });
  },

  showYearPanel() {
    this.triggerPanelChange({
      showMonthPanel: 0,
      showYearPanel: 1,
    });
  },

  render() {
    const { props, state } = this;
    const {
      prefixCls,
      locale,
      value,
      showTimePicker,
      enableNext,
      enablePrev,
      disabledMonth,
    } = props;

    let panel = null;
    if (state.showMonthPanel) {
      panel = (
        <MonthPanel
          locale={locale}
          defaultValue={value}
          rootPrefixCls={prefixCls}
          onSelect={this.onSelect}
          disabledDate={disabledMonth}
        />
      );
    } else if (state.showYearPanel) {
      panel = (
        <YearPanel
          locale={locale}
          defaultValue={value}
          rootPrefixCls={prefixCls}
          onSelect={this.onSelect}
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
  },
});

export default CalendarHeader;
