import React from 'react';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';
import KeyCode from 'rc-util/lib/KeyCode';
import MonthPanel from './month/MonthPanel';
import YearPanel from './year/YearPanel';
import DecadePanel from './decade/DecadePanel';
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

  handleYearPanelShow() {
    this.setState({ mode: 'year' });
  },

  handleYearSelect(...args) {
    this.setState({ mode: 'month' });
    this.onSelect(...args);
  },

  handleDecadePanelShow() {
    this.setState({ mode: 'decade' });
  },

  handleDecadeSelect(...args) {
    this.setState({ mode: 'year' });
    this.onSelect(...args);
  },

  render() {
    const { props, state } = this;
    const { mode, value } = state;
    const children = [
      <MonthPanel
        key="month"
        locale={props.locale}
        disabledDate={props.disabledDate}
        style={{ position: 'relative' }}
        value={value}
        cellRender={props.monthCellRender}
        contentRender={props.monthCellContentRender}
        rootPrefixCls={props.prefixCls}
        onChange={this.setValue}
        onSelect={this.onSelect}
        onYearPanelShow={this.handleYearPanelShow}
      />,
    ];
    if (mode === 'year') {
      children.push(
        <YearPanel
          key="year"
          locale={props.locale}
          defaultValue={value}
          rootPrefixCls={props.prefixCls}
          onSelect={this.handleYearSelect}
          onDecadePanelShow={this.handleDecadePanelShow}
        />
      );
    }
    if (mode === 'decade') {
      children.push(
        <DecadePanel
          key="decade"
          locale={props.locale}
          defaultValue={value}
          rootPrefixCls={props.prefixCls}
          onSelect={this.handleDecadeSelect}
        />
      );
    }
    return this.renderRoot({
      children,
    });
  },
});

export default MonthCalendar;
