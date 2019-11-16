import React, { ReactNode } from 'react';
import { polyfill } from 'react-lifecycles-compat';
import moment, { Moment } from 'moment';
import DateTable from './date/DateTable';
import MonthTable from './month/MonthTable';
import {
  calendarMixinWrapper,
  calendarMixinDefaultProps,
  getNowByCurrentStateValue,
} from './mixin/CalendarMixin';
import { commonMixinWrapper, defaultProp } from './mixin/CommonMixin';
import CalendarHeader from './full-calendar/CalendarHeader';
import { CalendarProps, CalendarState } from './Calendar';
import { CalendarTypeMode } from './date/DateInput';

export interface FullCalendarProps extends CalendarProps {
  fullscreen?: boolean;
  showHeader?: boolean;
  /**
   * 这个做成了组件有点奇怪，应该用 render 的
   */
  headerComponent?: React.ComponentClass<any, any>;
  type?: CalendarTypeMode;
  defaultType?: FullCalendarProps['type'];
  headerRender?: (
    value: Moment,
    type: FullCalendarProps['type'],
    locale: CalendarProps['locale'],
  ) => void;
  onTypeChange?: (type: FullCalendarProps['type']) => void;
  dateCellRender?: (value: Moment) => ReactNode;
  dateCellContentRender?: (value: Moment) => ReactNode;
}

export interface FullCalendarState extends CalendarState {
  type?: FullCalendarProps['type'];
  selectedValue?: Moment;
}

class FullCalendar extends React.Component<FullCalendarProps, FullCalendarState> {
  // from mix
  // to remove it, refactor to hooks
  saveFocusElement;

  rootInstance: HTMLDivElement;

  setValue: (value: Moment) => void;

  onSelect: (
    value: Moment | null,
    cause?: {
      target?: string;
      source?: string;
    },
  ) => void;

  isAllowedDate: (value: Moment) => boolean;

  getFormat: () => string[] | string;

  renderRoot: (option: { children: React.ReactNode; className: string }) => React.ReactNode;

  static defaultProps = {
    ...calendarMixinDefaultProps,
    ...defaultProp,
    defaultType: 'date',
    fullscreen: false,
    showTypeSwitch: true,
    showHeader: true,
    onTypeChange() {},
  };

  constructor(props: FullCalendarProps) {
    super(props);

    let stateType;
    if ('type' in props) {
      stateType = props.type;
    } else {
      stateType = props.defaultType;
    }

    this.state = {
      type: stateType,
      value: props.value || props.defaultValue || moment(),
    };
  }

  onMonthSelect = value => {
    this.onSelect(value, {
      target: 'month',
    });
  };

  static getDerivedStateFromProps(nextProps: FullCalendarProps, state: FullCalendarState) {
    let newState: FullCalendarState = {};
    const { value } = nextProps;

    if ('type' in nextProps) {
      newState = {
        type: nextProps.type,
      };
    }
    if ('value' in nextProps) {
      newState.value = value || nextProps.defaultValue || getNowByCurrentStateValue(state.value);
    }

    return newState;
  }

  setType = type => {
    if (!('type' in this.props)) {
      this.setState({
        type,
      });
    }
    this.props.onTypeChange(type);
  };

  render() {
    const { props } = this;
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

    let header;
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

    const table =
      type === 'date' ? (
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
      <div key="calendar-body" className={`${prefixCls}-calendar-body`}>
        {table}
      </div>,
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
