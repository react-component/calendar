import React from 'react';
import classnames from 'classnames';
import KeyCode from 'rc-util/lib/KeyCode';
import { polyfill } from 'react-lifecycles-compat';
import moment, { Moment } from 'moment';
import CalendarHeader from './calendar/CalendarHeader';
import CalendarFooter from './calendar/CalendarFooter';
import { calendarMixinDefaultProps, getNowByCurrentStateValue } from './mixin/CalendarMixin';
import { defaultProp } from './mixin/CommonMixin';
import { CalendarTypeMode } from './date/DateInput';

interface MonthCalendarProps {
  monthCellRender?: () => React.ReactNode;
  value?: Moment;
  defaultValue?: Moment;
  selectedValue?: Moment;
  defaultSelectedValue?: Moment;
  disabledDate?: (value: Moment) => boolean;
  prefixCls?: string;
  renderFooter?: (mode: CalendarTypeMode) => void;
  monthCellContentRender?: () => React.ReactNode;
  locale: { [key: string]: any };
  onChange?: (value: Moment) => void;
  className?: string;
  style?: React.CSSProperties;
  onSelect?: (value: Moment, cause?) => void;
}

interface MonthCalendarState {
  mode?: CalendarTypeMode;
  value?: Moment;
  selectedValue?: Moment;
}

class MonthCalendar extends React.Component<MonthCalendarProps, MonthCalendarState> {
  static defaultProps = Object.assign({}, defaultProp, calendarMixinDefaultProps);

  constructor(props) {
    super(props);

    this.state = {
      mode: 'month',
      value: props.value || props.defaultValue || moment(),
      selectedValue: props.value || props.defaultValue || moment(),
    };
  }

  static getDerivedStateFromProps(nextProps: MonthCalendarProps, prevState: MonthCalendarState) {
    const { value, selectedValue } = nextProps;
    const newState: MonthCalendarState = {};

    if ('value' in nextProps) {
      newState.value =
        value || nextProps.defaultValue || getNowByCurrentStateValue(prevState.value);
    }
    if ('selectedValue' in nextProps) {
      newState.selectedValue = selectedValue;
    }

    return newState;
  }

  onSelect = (value, cause?) => {
    if (value) {
      this.setValue(value);
    }
    this.setSelectedValue(value, cause);
  };

  setSelectedValue = (selectedValue, cause) => {
    // 一个重来没用过得值，但是有个测试覆盖到了它
    // 这里强行用了一下
    const { selectedValue: stateValue } = this.state;
    if (!('selectedValue' in this.props) && stateValue) {
      this.setState({
        selectedValue,
      });
    }
    if (this.props.onSelect) {
      this.props.onSelect(selectedValue, cause);
    }
  };

  onKeyDown = event => {
    const { keyCode } = event;
    const ctrlKey = event.ctrlKey || event.metaKey;
    const stateValue = this.state.value;
    const { disabledDate } = this.props;
    let value = stateValue;
    switch (keyCode) {
      case KeyCode.DOWN:
        value = stateValue.clone();
        value.add(3, 'months');
        break;
      case KeyCode.UP:
        value = stateValue.clone();
        value.add(-3, 'months');
        break;
      case KeyCode.LEFT:
        value = stateValue.clone();
        if (ctrlKey) {
          value.add(-1, 'years');
        } else {
          value.add(-1, 'months');
        }
        break;
      case KeyCode.RIGHT:
        value = stateValue.clone();
        if (ctrlKey) {
          value.add(1, 'years');
        } else {
          value.add(1, 'months');
        }
        break;
      case KeyCode.ENTER:
        if (!disabledDate || !disabledDate(stateValue)) {
          this.onSelect(stateValue);
        }
        event.preventDefault();
        return 1;
      default:
        return undefined;
    }
    if (value !== stateValue) {
      this.setValue(value);
      event.preventDefault();
      return 1;
    }
    return undefined;
  };

  handlePanelChange = (_, mode) => {
    if (mode !== 'date') {
      this.setState({ mode });
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

  rootInstance: HTMLElement;

  saveRoot = root => {
    this.rootInstance = root;
  };

  onBlur: (event: React.FocusEvent<HTMLDivElement>) => void;

  renderRoot = newProps => {
    const { props } = this;
    const { prefixCls } = props;

    const className = {
      [prefixCls]: 1,
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

  render() {
    const { props, state } = this;
    const { mode, value } = state;
    const children = (
      <div className={`${props.prefixCls}-month-calendar-content`}>
        <div className={`${props.prefixCls}-month-header-wrap`}>
          <CalendarHeader
            prefixCls={props.prefixCls}
            mode={mode}
            value={value}
            locale={props.locale}
            disabledMonth={props.disabledDate}
            monthCellRender={props.monthCellRender}
            monthCellContentRender={props.monthCellContentRender}
            onMonthSelect={this.onSelect}
            onValueChange={this.setValue}
            onPanelChange={this.handlePanelChange}
          />
        </div>
        <CalendarFooter prefixCls={props.prefixCls} renderFooter={props.renderFooter} />
      </div>
    );
    return this.renderRoot({
      className: `${props.prefixCls}-month-calendar`,
      children,
    });
  }
}

export default polyfill(MonthCalendar);
