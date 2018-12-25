import React from 'react';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';
import KeyCode from 'rc-util/es/KeyCode';
import CalendarHeader from './calendar/CalendarHeader';
import CalendarFooter from './calendar/CalendarFooter';
import CalendarMixin from './mixin/CalendarMixin';
import CommonMixin from './mixin/CommonMixin';

var MonthCalendar = createReactClass({
  displayName: 'MonthCalendar',

  propTypes: {
    monthCellRender: PropTypes.func,
    dateCellRender: PropTypes.func
  },
  mixins: [CommonMixin, CalendarMixin],

  getInitialState: function getInitialState() {
    return { mode: 'month' };
  },
  onKeyDown: function onKeyDown(event) {
    var keyCode = event.keyCode;
    var ctrlKey = event.ctrlKey || event.metaKey;
    var stateValue = this.state.value;
    var disabledDate = this.props.disabledDate;

    var value = stateValue;
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
  handlePanelChange: function handlePanelChange(_, mode) {
    if (mode !== 'date') {
      this.setState({ mode: mode });
    }
  },
  render: function render() {
    var props = this.props,
        state = this.state;
    var mode = state.mode,
        value = state.value;

    var children = React.createElement(
      'div',
      { className: props.prefixCls + '-month-calendar-content' },
      React.createElement(
        'div',
        { className: props.prefixCls + '-month-header-wrap' },
        React.createElement(CalendarHeader, {
          prefixCls: props.prefixCls,
          mode: mode,
          value: value,
          locale: props.locale,
          disabledMonth: props.disabledDate,
          monthCellRender: props.monthCellRender,
          monthCellContentRender: props.monthCellContentRender,
          onMonthSelect: this.onSelect,
          onValueChange: this.setValue,
          onPanelChange: this.handlePanelChange
        })
      ),
      React.createElement(CalendarFooter, {
        prefixCls: props.prefixCls,
        renderFooter: props.renderFooter
      })
    );
    return this.renderRoot({
      className: props.prefixCls + '-month-calendar',
      children: children
    });
  }
});

export default MonthCalendar;