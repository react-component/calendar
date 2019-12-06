import React, { ReactNode } from 'react';
import classnames from 'classnames';
import { polyfill } from 'react-lifecycles-compat';
import moment, { Moment } from 'moment';
import DateTable from './date/DateTable';
import MonthTable from './month/MonthTable';
import { calendarMixinDefaultProps, getNowByCurrentStateValue } from './mixin/CalendarMixin';
import { defaultProp } from './mixin/CommonMixin';
import CalendarHeader from './full-calendar/CalendarHeader';
import { CalendarProps, CalendarState } from './Calendar';
import { CalendarTypeMode } from './date/DateInput';
import { isAllowedDate } from './util/index';

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

  // from mix
  // to remove it, refactor to hooks
  shouldComponentUpdate(nextProps) {
    return this.props.visible || nextProps.visible;
  }

  onSelect = (value, cause) => {
    if (value) {
      this.setValue(value);
    }
    this.setSelectedValue(value, cause);
  };

  onKeyDown: (event: React.KeyboardEvent<HTMLDivElement>) => void;

  onBlur: (event: React.FocusEvent<HTMLDivElement>) => void;

  renderRoot = newProps => {
    const { props } = this;
    const { prefixCls } = props;

    const className = {
      [prefixCls]: 1,
      [`${prefixCls}-hidden`]: !props.visible,
      [props.className]: !!props.className,
      [newProps.className]: !!newProps.className,
    };
    return (
      <div
        ref={this.saveRoot}
        className={`${classnames(className)}`}
        style={this.props.style}
        tabIndex={0}
        onKeyDown={this.onKeyDown}
        onBlur={this.onBlur}
      >
        {newProps.children}
      </div>
    );
  };

  setSelectedValue = (selectedValue, cause?) => {
    if (!('selectedValue' in this.props)) {
      this.setState({
        // 这个值没有什么用，但是有个测试测试了
        // 强行增加了一下
        // eslint-disable-next-line react/no-unused-state
        selectedValue,
      });
    }
    if (this.props.onSelect) {
      this.props.onSelect(selectedValue, cause);
    }
  };

  setValue = (value: Moment) => {
    const originalValue = this.state.value;
    if (!('value' in this.props)) {
      this.setState({
        value,
      });
    }
    if (
      (originalValue && value && !originalValue.isSame(value)) ||
      (!originalValue && value) ||
      (originalValue && !value)
    ) {
      this.props.onChange(value);
    }
  };

  isAllowedDate = value => {
    const { disabledDate } = this.props;
    const { disabledTime } = this.props;
    return isAllowedDate(value, disabledDate, disabledTime);
  };

  getFormat = () => {
    let { format } = this.props;
    const { locale, timePicker } = this.props;
    if (!format) {
      if (timePicker) {
        format = locale.dateTimeFormat;
      } else {
        format = locale.dateFormat;
      }
    }
    return format;
  };

  focusElement: HTMLElement;

  rootInstance: HTMLElement;

  focus = () => {
    if (this.focusElement) {
      this.focusElement.focus();
    } else if (this.rootInstance) {
      this.rootInstance.focus();
    }
  };

  saveFocusElement = (focusElement: HTMLElement) => {
    this.focusElement = focusElement;
  };

  saveRoot = root => {
    this.rootInstance = root;
  };

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
      type === 'date' || type === 'week' ? (
        <DateTable
          dateRender={props.dateCellRender}
          contentRender={props.dateCellContentRender}
          locale={locale}
          prefixCls={prefixCls}
          onSelect={this.onSelect}
          value={value}
          disabledDate={disabledDate}
          weekOnly={type === 'week'}
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

export default FullCalendar;
