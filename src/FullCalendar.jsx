import React from 'react';
import PropTypes from 'prop-types';
import { polyfill } from 'react-lifecycles-compat';
import DateTable from './date/DateTable';
import MonthTable from './month/MonthTable';
import {
  calendarMixinWrapper,
  calendarMixinPropTypes,
  calendarMixinDefaultProps,
  getNowByCurrentStateValue,
} from './mixin/CalendarMixin';
import { commonMixinWrapper, propType, defaultProp } from './mixin/CommonMixin';
import CalendarHeader from './full-calendar/CalendarHeader';
import moment from 'moment';

class FullCalendar extends React.Component {
  static propTypes = {
    ...calendarMixinPropTypes,
    ...propType,
    defaultType: PropTypes.string,
    type: PropTypes.string,
    prefixCls: PropTypes.string,
    locale: PropTypes.object,
    onTypeChange: PropTypes.func,
    fullscreen: PropTypes.bool,
    monthCellRender: PropTypes.func,
    dateCellRender: PropTypes.func,
    showTypeSwitch: PropTypes.bool,
    Select: PropTypes.func.isRequired,
    headerComponents: PropTypes.array,
    headerComponent: PropTypes.object, // The whole header component
    headerRender: PropTypes.func,
    showHeader: PropTypes.bool,
    disabledDate: PropTypes.func,
    value: PropTypes.object,
    defaultValue: PropTypes.object,
    selectedValue: PropTypes.object,
    defaultSelectedValue: PropTypes.object,
  }

  static defaultProps = {
    ...calendarMixinDefaultProps,
    ...defaultProp,
    defaultType: 'date',
    fullscreen: false,
    showTypeSwitch: true,
    showHeader: true,
    onTypeChange() {
    },
  }

  constructor(props) {
    super(props);

    let type;
    if ('type' in props) {
      type = props.type;
    } else {
      type = props.defaultType;
    }

    this.state = {
      type,
      value: props.value || props.defaultValue || moment(),
      selectedValue: props.selectedValue || props.defaultSelectedValue,
    };
  }

  onMonthSelect = (value) => {
    this.onSelect(value, {
      target: 'month',
    });
  }

  static getDerivedStateFromProps(nextProps, state) {
    let newState = {};
    const { value, selectedValue } = nextProps;

    if ('type' in nextProps) {
      newState = {
        type: nextProps.type,
      };
    }
    if ('value' in nextProps) {
      newState.value = value || nextProps.defaultValue || getNowByCurrentStateValue(state.value);
    }
    if ('selectedValue' in nextProps) {
      newState.selectedValue = selectedValue;
    }

    return newState;
  }

  setType = (type) => {
    if (!('type' in this.props)) {
      this.setState({
        type,
      });
    }
    this.props.onTypeChange(type);
  }

  render() {
    const props = this.props;
    const {
      locale,
      prefixCls,
      fullscreen,
      showHeader,
      headerComponent,
      headerRender,
      disabledDate,
    } = props;
    const { value, type } = this.state;

    let header = null;
    if (showHeader) {
      if (headerRender) {
        header = headerRender(value, type, locale);
      } else {
        const TheHeader = headerComponent || CalendarHeader;
        header = (
          <TheHeader
            key="calendar-header"
            {...props}
            prefixCls={`${prefixCls}-full`}
            type={type}
            value={value}
            onTypeChange={this.setType}
            onValueChange={this.setValue}
          />
        );
      }
    }

    const table = type === 'date' ? (
      <DateTable
        dateRender={props.dateCellRender}
        contentRender={props.dateCellContentRender}
        locale={locale}
        prefixCls={prefixCls}
        onSelect={this.onSelect}
        value={value}
        disabledDate={disabledDate}
      />
    ) : (
      <MonthTable
        cellRender={props.monthCellRender}
        contentRender={props.monthCellContentRender}
        locale={locale}
        onSelect={this.onMonthSelect}
        prefixCls={`${prefixCls}-month-panel`}
        value={value}
        disabledDate={disabledDate}
      />
    );

    const children = [
      header,
      (<div key="calendar-body" className={`${prefixCls}-calendar-body`}>
        { table }
      </div>),
    ];


    const className = [`${prefixCls}-full`];

    if (fullscreen) {
      className.push(`${prefixCls}-fullscreen`);
    }

    return this.renderRoot({
      children,
      className: className.join(' '),
    });
  }
}

polyfill(FullCalendar);

export default calendarMixinWrapper(commonMixinWrapper(FullCalendar));
