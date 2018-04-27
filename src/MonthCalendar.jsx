import React from 'react';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';
import KeyCode from 'rc-util/lib/KeyCode';
import CalendarHeader from './calendar/CalendarHeader';
import CalendarFooter from './calendar/CalendarFooter';
import CalendarMixin from './mixin/CalendarMixin';
import CommonMixin from './mixin/CommonMixin';

const MonthCalendar = createReactClass({
  propTypes: {
    monthCellRender: PropTypes.func,
    dateCellRender: PropTypes.func,
  },
  mixins: [CommonMixin, CalendarMixin],

  getInitialState() {
    return { mode: 'month' };
  },

  onKeyDown(event) {
    const keyCode = event.keyCode;
    const ctrlKey = event.ctrlKey || event.metaKey;
    const { disabledDate } = this.props;
    const { displayedValue } = this.state;
    let value = displayedValue;
    switch (keyCode) {
      case KeyCode.DOWN:
        value = displayedValue.clone();
        value.add(3, 'months');
        break;
      case KeyCode.UP:
        value = displayedValue.clone();
        value.add(-3, 'months');
        break;
      case KeyCode.LEFT:
        value = displayedValue.clone();
        if (ctrlKey) {
          value.add(-1, 'years');
        } else {
          value.add(-1, 'months');
        }
        break;
      case KeyCode.RIGHT:
        value = displayedValue.clone();
        if (ctrlKey) {
          value.add(1, 'years');
        } else {
          value.add(1, 'months');
        }
        break;
      case KeyCode.ENTER:
        if (!disabledDate || !disabledDate(displayedValue)) {
          this.onSelect(displayedValue);
        }
        event.preventDefault();
        return 1;
      default:
        return undefined;
    }
    if (value !== displayedValue) {
      this.setDisplayedValue(value);
      event.preventDefault();
      return 1;
    }
  },

  handlePanelChange(_, mode) {
    if (mode !== 'date') {
      this.setState({ mode });
    }
  },

  render() {
    const { props, state } = this;
    const { mode, value, displayedValue } = state;
    const children = (
      <div className={`${props.prefixCls}-month-calendar-content`}>
        <div className={`${props.prefixCls}-month-header-wrap`}>
          <CalendarHeader
            prefixCls={props.prefixCls}
            mode={mode}
            value={value}
            displayedValue={displayedValue}
            locale={props.locale}
            disabledMonth={props.disabledDate}
            monthCellRender={props.monthCellRender}
            monthCellContentRender={props.monthCellContentRender}
            onMonthSelect={this.onSelect}
            onValueChange={this.setValue}
            onPanelChange={this.handlePanelChange}
            setDisplayedValue={this.setDisplayedValue}
          />
        </div>
        <CalendarFooter
          prefixCls={props.prefixCls}
          renderFooter={props.renderFooter}
        />
      </div>
    );
    return this.renderRoot({
      className: `${props.prefixCls}-month-calendar`,
      children,
    });
  },
});

export default MonthCalendar;
