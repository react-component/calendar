/* eslint react/no-multi-comp:0, no-console:0, react/prop-types:0 */

import '../assets/index.less';
import React from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';
import RangeCalendar from '../src/RangeCalendar';
import DatePicker from '../src/Picker';

import zhCN from '../src/locale/zh_CN';
import enUS from '../src/locale/en_US';

import 'moment/locale/zh-cn';
import 'moment/locale/en-gb';

const format = 'YYYY-MM-DD';

const fullFormat = 'YYYY-MM-DD dddd';
const cn = location.search.indexOf('cn') !== -1;

const now = moment();
if (cn) {
  now.locale('zh-cn').utcOffset(8);
} else {
  now.locale('en-gb').utcOffset(0);
}

class Picker extends React.Component {
  state = {
    hoverValue: [],
  };

  onHoverChange = hoverValue => {
    console.log(hoverValue);
    this.setState({ hoverValue });
  };

  render() {
    const { props } = this;
    const { showValue } = props;
    const calendar = (
      <RangeCalendar
        hoverValue={this.state.hoverValue}
        onHoverChange={this.onHoverChange}
        type={this.props.type}
        locale={cn ? zhCN : enUS}
        defaultValue={now}
        format={format}
        onChange={props.onChange}
        disabledDate={props.disabledDate}
      />
    );
    return (
      <DatePicker
        open={this.props.open}
        onOpenChange={this.props.onOpenChange}
        calendar={calendar}
        value={props.value}
      >
        {() => (
            <span>
              <input
                placeholder="请选择日期"
                style={{ width: 250 }}
                readOnly
                value={(showValue && showValue.format(fullFormat)) || ''}
              />
            </span>
          )}
      </DatePicker>
    );
  }
}

class Demo extends React.Component {
  state = {
    startValue: null,
    endValue: null,
    startOpen: false,
    endOpen: false,
  };

  onStartOpenChange = startOpen => {
    this.setState({
      startOpen,
    });
  };

  onEndOpenChange = endOpen => {
    this.setState({
      endOpen,
    });
  };

  onStartChange = value => {
    this.setState({
      startValue: value[0],
      startOpen: false,
      endOpen: true,
    });
  };

  onEndChange = value => {
    this.setState({
      endValue: value[1],
    });
  };

  disabledStartDate = endValue => {
    if (!endValue) {
      return false;
    }
    const { startValue } = this.state;
    if (!startValue) {
      return false;
    }
    return endValue.diff(startValue, 'days') < 0;
  };

  render() {
    const { state } = this;
    return (
      <div style={{ width: 240, margin: 20 }}>
        <p>
          开始时间：
          <Picker
            onOpenChange={this.onStartOpenChange}
            type="start"
            showValue={state.startValue}
            open={this.state.startOpen}
            value={[state.startValue, state.endValue]}
            onChange={this.onStartChange}
          />
        </p>

        <p>
          结束时间：
          <Picker
            onOpenChange={this.onEndOpenChange}
            open={this.state.endOpen}
            type="end"
            showValue={state.endValue}
            disabledDate={this.disabledStartDate}
            value={[state.startValue, state.endValue]}
            onChange={this.onEndChange}
          />
        </p>
      </div>
    );
  }
}

export default Demo;
