import React, { CSSProperties } from 'react';
import ReactDOM from 'react-dom';
import classnames from 'classnames';
import KeyCode from 'rc-util/lib/KeyCode';
import { polyfill } from 'react-lifecycles-compat';
import moment, { Moment } from 'moment';
import DateTable from './date/DateTable';
import CalendarHeader from './calendar/CalendarHeader';
import CalendarFooter from './calendar/CalendarFooter';
import { calendarMixinDefaultProps, getNowByCurrentStateValue } from './mixin/CalendarMixin';
import { defaultProp } from './mixin/CommonMixin';
import DateInput, { CalendarTypeMode, DateInputProps } from './date/DateInput';
import { getTimeConfig, getTodayTime, syncTime, isAllowedDate } from './util';
import { goStartMonth, goEndMonth, goTime } from './util/toTime';

function noop() {}

const getMomentObjectIfValid = date => {
  if (moment.isMoment(date) && date.isValid()) {
    return date;
  }
  return false;
};

export interface CalendarProps {
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
    cause: {
      source: string;
    },
  ) => void;
  visible?: boolean;
  onOk?: (value: Moment) => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLDivElement>) => void;
  timePicker?: JSX.Element;
  format?: string | string[];
  dateInputPlaceholder?: string;
  onClear?: () => void;
  onChange?: (value: Moment) => void;
  onPanelChange?: (value: Moment, mode: CalendarTypeMode) => void;
  disabledDate?: (value: Moment) => boolean;
  disabledTime?: () => boolean;
  dateRender?: () => boolean;
  renderFooter?: () => React.ReactNode;
  renderSidebar?: () => React.ReactNode;
  clearIcon?: React.ReactNode;
  focusablePanel?: boolean;
  inputMode?: DateInputProps['inputMode'];
  onBlur?: (e: React.MouseEvent<HTMLDivElement>) => void;
  monthCellRender?: () => React.ReactNode;
  monthCellContentRender?: () => React.ReactNode;
}

export interface CalendarState {
  value?: Moment;
  mode?: CalendarTypeMode;
  selectedValue?: Moment;
}

class Calendar extends React.Component<CalendarProps, CalendarState> {
  static defaultProps = {
    ...calendarMixinDefaultProps,
    ...defaultProp,
    showToday: true,
    showDateInput: true,
    timePicker: null,
    onOk: noop,
    onPanelChange: noop,
    focusablePanel: true,
  };

  focusElement: HTMLElement;

  // from mix
  // to remove it, refactor to hooks
  saveFocusElement = (focusElement: HTMLElement) => {
    this.focusElement = focusElement;
  };

  focus = () => {
    if (this.focusElement) {
      this.focusElement.focus();
    } else if (this.rootInstance) {
      this.rootInstance.focus();
    }
  };

  rootInstance: HTMLDivElement;

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

  onSelect = (value, cause?) => {
    if (value) {
      this.setValue(value);
    }
    this.setSelectedValue(value, cause);
  };

  setSelectedValue = (selectedValue, cause?) => {
    // if (this.isAllowedDate(selectedValue)) {
    if (!('selectedValue' in this.props)) {
      this.setState({
        selectedValue,
      });
    }
    if (this.props.onSelect) {
      this.props.onSelect(selectedValue, cause);
    }
    // }
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

  saveRoot = root => {
    this.rootInstance = root;
  };

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

  constructor(props) {
    super(props);
    this.state = {
      mode: this.props.mode || 'date',
      value:
        getMomentObjectIfValid(props.value) ||
        getMomentObjectIfValid(props.defaultValue) ||
        moment(),
      selectedValue: props.selectedValue || props.defaultSelectedValue,
    };
  }

  componentDidMount() {
    if (this.props.showDateInput) {
      this.saveFocusElement(DateInput.getInstance());
    }
  }

  onPanelChange = (value, mode) => {
    const { props, state } = this;
    if (!('mode' in props)) {
      this.setState({ mode });
    }
    props.onPanelChange(value || state.value, mode);
  };

  onKeyDown = event => {
    if (event.target.nodeName.toLowerCase() === 'input') {
      return undefined;
    }
    const { keyCode } = event;
    // mac
    const ctrlKey = event.ctrlKey || event.metaKey;
    const { disabledDate } = this.props;
    const { value } = this.state;
    switch (keyCode) {
      case KeyCode.DOWN:
        this.goTime(1, 'weeks');
        event.preventDefault();
        return 1;
      case KeyCode.UP:
        this.goTime(-1, 'weeks');
        event.preventDefault();
        return 1;
      case KeyCode.LEFT:
        if (ctrlKey) {
          this.goTime(-1, 'years');
        } else {
          this.goTime(-1, 'days');
        }
        event.preventDefault();
        return 1;
      case KeyCode.RIGHT:
        if (ctrlKey) {
          this.goTime(1, 'years');
        } else {
          this.goTime(1, 'days');
        }
        event.preventDefault();
        return 1;
      case KeyCode.HOME:
        this.setValue(goStartMonth(this.state.value));
        event.preventDefault();
        return 1;
      case KeyCode.END:
        this.setValue(goEndMonth(this.state.value));
        event.preventDefault();
        return 1;
      case KeyCode.PAGE_DOWN:
        this.goTime(1, 'month');
        event.preventDefault();
        return 1;
      case KeyCode.PAGE_UP:
        this.goTime(-1, 'month');
        event.preventDefault();
        return 1;
      case KeyCode.ENTER:
        if (!disabledDate || !disabledDate(value)) {
          this.onSelect(value, {
            source: 'keyboard',
          });
        }
        event.preventDefault();
        return 1;
      default:
        this.props.onKeyDown(event);
        return 1;
    }
  };

  onClear = () => {
    this.onSelect(null);
    this.props.onClear();
  };

  onOk = () => {
    const { selectedValue } = this.state;
    if (this.isAllowedDate(selectedValue)) {
      this.props.onOk(selectedValue);
    }
  };

  onDateInputChange = value => {
    this.onSelect(value, {
      source: 'dateInput',
    });
  };

  onDateInputSelect = value => {
    this.onSelect(value, {
      source: 'dateInputSelect',
    });
  };

  onDateTableSelect = value => {
    const { timePicker } = this.props;
    const { selectedValue } = this.state;
    if (!selectedValue && timePicker) {
      const timePickerDefaultValue = timePicker.props.defaultValue;
      if (timePickerDefaultValue) {
        syncTime(timePickerDefaultValue, value);
      }
    }
    this.onSelect(value);
  };

  onToday = () => {
    const { value } = this.state;
    const now = getTodayTime(value);
    this.onSelect(now, {
      source: 'todayButton',
    });
  };

  onBlur = event => {
    setTimeout(() => {
      const dateInput = DateInput.getInstance();
      const { rootInstance } = this;

      if (
        !rootInstance ||
        rootInstance.contains(document.activeElement) ||
        (dateInput && dateInput.contains(document.activeElement))
      ) {
        // focused element is still part of Calendar
        return;
      }

      if (this.props.onBlur) {
        this.props.onBlur(event);
      }
    }, 0);
  };

  static getDerivedStateFromProps(nextProps: CalendarProps, state: CalendarState) {
    const { value, selectedValue } = nextProps;
    let newState: CalendarState = {};

    if ('mode' in nextProps && state.mode !== nextProps.mode) {
      newState = { mode: nextProps.mode };
    }
    if ('value' in nextProps) {
      newState.value =
        getMomentObjectIfValid(value) ||
        getMomentObjectIfValid(nextProps.defaultValue) ||
        getNowByCurrentStateValue(state.value);
    }
    if ('selectedValue' in nextProps) {
      newState.selectedValue = selectedValue;
    }

    return newState;
  }

  // eslint-disable-next-line react/no-find-dom-node
  getRootDOMNode = () => ReactDOM.findDOMNode(this);

  openTimePicker = () => {
    this.onPanelChange(null, 'time');
  };

  closeTimePicker = () => {
    this.onPanelChange(null, 'date');
  };

  goTime = (direction, unit) => {
    this.setValue(goTime(this.state.value, direction, unit));
  };

  render() {
    const { props, state } = this;
    const {
      locale,
      prefixCls,
      disabledDate,
      dateInputPlaceholder,
      timePicker,
      disabledTime,
      showWeekNumber,
      clearIcon,
      renderFooter,
      inputMode,
      monthCellRender,
      monthCellContentRender,
    } = props;
    const { value, selectedValue, mode } = state;
    const showTimePicker = mode === 'time';
    const disabledTimeConfig =
      showTimePicker && disabledTime && timePicker
        ? getTimeConfig(selectedValue, disabledTime)
        : null;

    let timePickerEle = null;

    if (timePicker && showTimePicker) {
      const timePickerProps = {
        showHour: true,
        showSecond: true,
        showMinute: true,
        ...timePicker.props,
        ...disabledTimeConfig,
        onChange: this.onDateInputChange,
        value: selectedValue,
        disabledTime,
      };

      if (timePicker.props.defaultValue !== undefined) {
        timePickerProps.defaultOpenValue = timePicker.props.defaultValue;
      }

      timePickerEle = React.cloneElement(timePicker, timePickerProps);
    }

    const dateInputElement = props.showDateInput ? (
      <DateInput
        format={this.getFormat()}
        key="date-input"
        value={value}
        locale={locale}
        placeholder={dateInputPlaceholder}
        showClear
        disabledDate={disabledDate}
        onClear={this.onClear}
        prefixCls={prefixCls}
        selectedValue={selectedValue}
        onChange={this.onDateInputChange}
        onSelect={this.onDateInputSelect}
        clearIcon={clearIcon}
        inputMode={inputMode}
      />
    ) : null;

    const children = [];
    if (props.renderSidebar) {
      children.push(props.renderSidebar());
    }
    children.push(
      <div className={`${prefixCls}-panel`} key="panel">
        {dateInputElement}
        <div
          tabIndex={this.props.focusablePanel ? 0 : undefined}
          className={`${prefixCls}-date-panel`}
        >
          <CalendarHeader
            locale={locale}
            mode={mode}
            value={value}
            onValueChange={this.setValue}
            onPanelChange={this.onPanelChange}
            renderFooter={renderFooter}
            showTimePicker={showTimePicker}
            prefixCls={prefixCls}
            monthCellRender={monthCellRender}
            monthCellContentRender={monthCellContentRender}
          />
          {timePicker && showTimePicker ? (
            <div className={`${prefixCls}-time-picker`}>
              <div className={`${prefixCls}-time-picker-panel`}>{timePickerEle}</div>
            </div>
          ) : null}
          <div className={`${prefixCls}-body`}>
            <DateTable
              locale={locale}
              value={value}
              selectedValue={selectedValue}
              prefixCls={prefixCls}
              dateRender={props.dateRender}
              onSelect={this.onDateTableSelect}
              disabledDate={disabledDate}
              showWeekNumber={showWeekNumber}
            />
          </div>

          <CalendarFooter
            showOk={props.showOk}
            mode={mode}
            renderFooter={props.renderFooter}
            locale={locale}
            prefixCls={prefixCls}
            showToday={props.showToday}
            disabledTime={disabledTime}
            showTimePicker={showTimePicker}
            showDateInput={props.showDateInput}
            timePicker={timePicker}
            selectedValue={selectedValue}
            value={value}
            disabledDate={disabledDate}
            okDisabled={
              props.showOk !== false && (!selectedValue || !this.isAllowedDate(selectedValue))
            }
            onOk={this.onOk}
            onSelect={this.onSelect}
            onToday={this.onToday}
            onOpenTimePicker={this.openTimePicker}
            onCloseTimePicker={this.closeTimePicker}
          />
        </div>
      </div>,
    );
    return this.renderRoot({
      children,
      className: props.showWeekNumber ? `${prefixCls}-week-number` : '',
    });
  }
}

polyfill(Calendar);

export default Calendar;
