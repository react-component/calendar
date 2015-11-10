import React, {PropTypes} from 'react';
import DateTable from './date/DateTable';
import MonthTable from './month/MonthTable';
import CalendarMixin from './mixin/CalendarMixin';
import CommonMixin from './mixin/CommonMixin';
import CalendarHeader from './notice-calendar/CalendarHeader';

const NoticeCalendar = React.createClass({
  propTypes: {
    type: PropTypes.string,
    fullscreen: PropTypes.bool,
    monthCellRender: PropTypes.func,
    dateCellRender: PropTypes.func,
    showTypeSwitch: PropTypes.bool,
  },
  mixins: [CommonMixin, CalendarMixin],
  getDefaultProps() {
    return {
      type: 'date',
      fullscreen: false,
      showTypeSwitch: true,
    };
  },
  getInitialState() {
    return {
      type: this.props.type,
    };
  },
  onMonthSelect(value) {
    this.setType('date');
    this.onSelect(value);
  },
  setType(type) {
    this.setState({ type });
  },
  render() {
    const props = this.props;
    const {locale, prefixCls, fullscreen} = props;
    const {value, type} = this.state;

    const header = (
      <CalendarHeader key="calendar-header"
        {...props}
        type={type}
        value={value}
        onTypeChange={this.setType}
        onValueChange={this.setValue}/>
    );

    const table = type === 'date' ? (
      <DateTable
        dateRender={props.dateCellRender}
        locale={locale}
        prefixCls={prefixCls}
        onSelect={this.onSelect}
        value={value} />
    ) : (
      <MonthTable
        cellRender={props.monthCellRender}
        locale={locale}
        onSelect={this.onMonthSelect}
        prefixCls={`${prefixCls}-month-panel`}
        value={value} />
    );

    const children = [
      header,
      (<div key="calendar-body" className={`${prefixCls}-calendar-body`}>
        { table }
      </div>),
    ];


    const className = [`${prefixCls}-notice`];

    if (fullscreen) {
      className.push(`${prefixCls}-fullscreen`);
    }

    return this.renderRoot({ children, className: className.join(' ') });
  },
});

export default NoticeCalendar;
