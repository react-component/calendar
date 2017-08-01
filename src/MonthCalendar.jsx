import React from 'react';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';
import KeyCode from 'rc-util/lib/KeyCode';
import CalendarHeader from './calendar/CalendarHeader';
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
  },

  handlePanelChange(_, mode) {
    if (mode !== 'date') {
      this.setState({ mode });
    }
  },

  render() {
    const { props, state } = this;
    const { mode, value } = state;
    const children = (
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
    );
    return this.renderRoot({
      className: `${props.prefixCls}-month-calendar`,
      children,
    });
  },
});

export default MonthCalendar;
