import React, {PropTypes, Component} from 'react';
import Select, {Option} from 'rc-select';

function noop() {
}

class CalendarHeader extends Component {
  onYearChange(year) {
    const newValue = this.props.value.clone();
    newValue.setYear(parseInt(year, 10));
    this.props.onValueChange(newValue);
  }

  onMonthChange(month) {
    const newValue = this.props.value.clone();
    newValue.setMonth(parseInt(month, 10));
    this.props.onValueChange(newValue);
  }

  getYearSelectElement(year) {
    const {yearSelectOffset, yearSelectTotal, locale, prefixCls, selectPrefixCls} = this.props;
    const start = year - yearSelectOffset;
    const end = start + yearSelectTotal;
    const suffix = locale.year === '年' ? '年' : '';

    const options = [];
    for (let index = start; index < end; index++) {
      options.push(<Option key={`${index}`}>{index + suffix}</Option>);
    }
    return (
      <Select
        prefixCls={selectPrefixCls}
        className={`${prefixCls}-header-year-select`}
        onChange={this.onYearChange.bind(this)}
        dropdownStyle={{ zIndex: 2000 }}
        dropdownMenuStyle={{maxHeight: 250, overflow: 'auto', fontSize: 12}}
        optionLabelProp="children"
        value={String(year)}
        showSearch={false}>
        { options }
      </Select>
    );
  }

  getMonthSelectElement(month) {
    const props = this.props;
    const months = props.locale.format.months;
    const {prefixCls, selectPrefixCls} = props;
    const options = [];

    for (let index = 0; index < 12; index++) {
      options.push(<Option key={`${index}`}>{months[index]}</Option>);
    }

    return (
      <Select
        prefixCls={selectPrefixCls}
        className={`${prefixCls}-header-month-select`}
        dropdownStyle={{ zIndex: 2000 }}
        dropdownMenuStyle={{maxHeight: 250, overflow: 'auto', overflowX: 'hidden', fontSize: 12}}
        optionLabelProp="children"
        value={String(month)}
        showSearch={false}
        onChange={this.onMonthChange.bind(this)}>
        { options }
      </Select>
    );
  }

  changeTypeToDate() {
    this.props.onTypeChange('date');
  }

  changeTypeToMonth() {
    this.props.onTypeChange('month');
  }

  render() {
    const {value, locale, prefixCls, type, showTypeSwitch, headerComponents} = this.props;
    const year = value.getYear();
    const month = value.getMonth();
    const yearSelect = this.getYearSelectElement(year);
    const monthSelect = type === 'month' ? null : this.getMonthSelectElement(month);
    const switchCls = `${prefixCls}-header-switcher`;
    const typeSwitcher = showTypeSwitch ? (
      <span className={switchCls}>
        { type === 'date' ?
        <span className={`${switchCls}-focus`}>{locale.month}</span> :
        <span onClick={this.changeTypeToDate.bind(this)} className={`${switchCls}-normal`}>{locale.month}</span>
          }
        { type === 'month' ?
        <span className={`${switchCls}-focus`}>{locale.year}</span> :
        <span onClick={this.changeTypeToMonth.bind(this)} className={`${switchCls}-normal`}>{locale.year}</span>
          }
      </span>
    ) : null;

    return (
      <div className={`${prefixCls}-header`}>
        { typeSwitcher }
        { monthSelect }
        { yearSelect }
        { headerComponents }
      </div>
    );
  }
}
CalendarHeader.propTypes = {
  value: PropTypes.object,
  locale: PropTypes.object,
  yearSelectOffset: PropTypes.number,
  yearSelectTotal: PropTypes.number,
  onValueChange: PropTypes.func,
  onTypeChange: PropTypes.func,
  prefixCls: PropTypes.string,
  selectPrefixCls: PropTypes.string,
  type: PropTypes.string,
  showTypeSwitch: PropTypes.bool,
  headerComponents: PropTypes.array,
};
CalendarHeader.defaultProps = {
  yearSelectOffset: 10,
  yearSelectTotal: 20,
  onValueChange: noop,
  onTypeChange: noop,
};

export default CalendarHeader;
