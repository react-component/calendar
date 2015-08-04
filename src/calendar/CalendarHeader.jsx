import React from 'react';
import MonthPanel from '../month/MonthPanel';
import DateTimeFormat from 'gregorian-calendar-format';
import YearPanel from '../year/YearPanel';
import rcUtil from 'rc-util';
const toFragment = rcUtil.Children.mapSelf;

export default
class CalendarHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.yearFormatter = new DateTimeFormat(props.locale.yearFormat);
    this.monthFormatter = new DateTimeFormat(props.locale.monthFormat);
    this.showMonthPanel = this.showMonthPanel.bind(this);
    this.showYearPanel = this.showYearPanel.bind(this);
    this.onSelect = this.onSelect.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const locale = this.props.locale;
    if (nextProps.locale !== locale) {
      this.yearFormatter = new DateTimeFormat(locale.yearFormat);
      this.monthFormatter = new DateTimeFormat(locale.monthFormat);
    }
  }

  onSelect(value) {
    this.setState({
      showMonthPanel: 0,
      showYearPanel: 0,
    });
    this.props.onValueChange(value);
  }

  getMonthYearElement() {
    const props = this.props;
    const prefixCls = props.prefixCls;
    const locale = props.locale;
    const value = this.props.value;
    const monthBeforeYear = locale.monthBeforeYear;
    const selectClassName = `${prefixCls}-${monthBeforeYear ? 'my-select' : 'ym-select'}`;
    const year = (<a className={`${prefixCls}-year-select`}
                     role="button"
                     onClick={this.showYearPanel}
                     title={locale.monthSelect}>{this.yearFormatter.format(value)}</a>);
    const month = (<a className={`${prefixCls}-month-select`}
                      role="button"
                      onClick={this.showMonthPanel}
                      title={locale.monthSelect}>{this.monthFormatter.format(value)}</a>);
    let my = [];
    if (monthBeforeYear) {
      my = [month, year];
    } else {
      my = [year, month];
    }
    return (<span className={selectClassName}>
    {toFragment(my)}
    </span>);
  }

  render() {
    const props = this.props;
    const state = this.state;
    const prefixCls = props.prefixCls;
    const locale = props.locale;
    const value = props.value;
    let PanelClass = null;
    if (state.showMonthPanel) {
      PanelClass = MonthPanel;
    } else if (state.showYearPanel) {
      PanelClass = YearPanel;
    }
    let panel;
    if (PanelClass) {
      panel = <PanelClass locale={locale} value={value} rootPrefixCls={prefixCls} onSelect={this.onSelect}/>;
    }
    return (<div className={`${prefixCls}-header`}>
      <a className={`${prefixCls}-prev-year-btn`}
         role="button"
         onClick={props.previousYear}
         title={locale.previousYear}>
        «
      </a>
      <a className={`${prefixCls}-prev-month-btn`}
         role="button"
         onClick={props.previousMonth}
         title={locale.previousMonth}>
        ‹
      </a>
      {this.getMonthYearElement()}
      <a className={`${prefixCls}-next-month-btn`}
         onClick={props.nextMonth}
         title={locale.nextMonth}>
        ›
      </a>
      <a className={`${prefixCls}-next-year-btn`}
         onClick={props.nextYear}
         title={locale.nextYear}>
        »
      </a>
      {panel}
    </div>);
  }

  showMonthPanel() {
    this.setState({
      showMonthPanel: 1,
      showYearPanel: 0,
    });
  }

  showYearPanel() {
    this.setState({
      showMonthPanel: 0,
      showYearPanel: 1,
    });
  }
}

CalendarHeader.propTypes = {
  locale: React.PropTypes.object,
  value: React.PropTypes.object,
  onValueChange: React.PropTypes.func,
};
