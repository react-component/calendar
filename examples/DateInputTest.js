/* eslint react/no-multi-comp:0, no-console:0, react/prop-types:0 */

import 'rc-calendar/assets/index.less';
import React from 'react';
import ReactDOM from 'react-dom';
import DateInput from 'rc-calendar/src/date/DateInput';

import moment from 'moment';
import 'moment/locale/zh-cn';
import 'moment/locale/en-gb';

const cn = location.search.indexOf('cn') !== -1;

const now = moment();
if (cn) {
  now.locale('zh-cn').utcOffset(8);
} else {
  now.locale('en-gb').utcOffset(0);
}

class Demo extends React.Component {
  state = {
    startValue: null,
    endValue: null,
    startOpen: false,
    endOpen: false,
  };

  onStartOpenChange = (startOpen) => {
    this.setState({
      startOpen,
    });
  }

  onEndOpenChange = (endOpen) => {
    this.setState({
      endOpen,
    });
  }

  onStartChange = (value) => {
    this.setState({
      startValue: value[0],
      startOpen: false,
      endOpen: true,
    });
  }

  onEndChange = (value) => {
    this.setState({
      endValue: value[1],
    });
  }

  disabledStartDate = (endValue) => {
    if (!endValue) {
      return false;
    }
    const startValue = this.state.startValue;
    if (!startValue) {
      return false;
    }
    return endValue.diff(startValue, 'days') < 0;
  }

  render() {
    const testValue = moment();
    return (
      <div style={{ width: 240, margin: 20 }}>
        <DateInput value={testValue} onChange={(value) => console.log(value)} showClear={false}
          placeholder="test" selectedValue={testValue}
        />
      </div>);
  }
}


ReactDOM.render(<Demo />, document.getElementById('__react-content'));
