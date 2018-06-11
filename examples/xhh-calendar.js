/* eslint react/no-multi-comp:0, no-console:0 */

import 'rc-calendar/assets/index.less';
import RcCalendar from 'rc-calendar';
import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import zhCN from 'rc-calendar/lib/locale/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';

const format = 'YYYY-MM-DD';
const now = moment();
now.locale('zh-cn').utcOffset(8);

const defaultProps = {
  format,
  transitionName: 'slide-up',
  popupStyle: {},
  onChange: function onChange() {},
  onOk: function onOk() {},
  onOpenChange: function onOpenChange() {},
  locale: {},
  prefixCls: 'ant-calendar',
  inputPrefixCls: 'ant-input',
};
class Demo extends React.Component {
  static propTypes = {
    backedList: PropTypes.array,
  }
  constructor(props) {
    super(props);
    this.contentRender = this.contentRender.bind(this);
  }
  contentRender(current) {
    const nowDay = moment().format(defaultProps.format);
    const currentDay = current.format(defaultProps.format);
    if (current.format(defaultProps.format) === nowDay) return '今';
    if (this.props.backedList) {
      const exists = this.props.backedList.find(item => item === currentDay);
      if (exists) return <span className="backed">{current.date()}</span>;
    }
    return current.date();
  }
  render() {
    return (
      <RcCalendar
        ref={(node) => { this.node = node; }}
        {...defaultProps}
        {...this.props}
        showWeekNumber={false}
        locale={zhCN}
        defaultValue={now}
        showToday
        formatter={format}
        showOk={false}
        contentRender={this.contentRender}
        showFooter={false}
        showDateInput={false}
      />
    );
  }
}
ReactDOM.render(<Demo />, document.getElementById('__react-content'));
