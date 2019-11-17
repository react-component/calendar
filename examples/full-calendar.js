/* eslint react/no-multi-comp:0, no-console:0 */

import '../assets/index.less';
import React from 'react';
import Select from 'rc-select';
import moment from 'moment';

import FullCalendar from '../src/FullCalendar';

import 'rc-select/assets/index.less';

import zhCN from '../src/locale/zh_CN';
import enUS from '../src/locale/en_US';

import 'moment/locale/zh-cn';
import 'moment/locale/en-gb';

const format = 'YYYY-MM-DD';
const cn = window.location.search.indexOf('cn') !== -1;

const now = moment();
if (cn) {
  now.locale('zh-cn').utcOffset(8);
} else {
  now.locale('en-gb').utcOffset(0);
}

const defaultCalendarValue = now.clone();
defaultCalendarValue.add(-1, 'month');

function onSelect(value) {
  console.log('select', value.format(format));
}

class Demo extends React.Component {
  state = {
    type: 'month',
  };

  onTypeChange = type => {
    this.setState({
      type,
    });
  };

  render() {
    return (
      <div style={{ zIndex: 1000, position: 'relative' }}>
        <FullCalendar
          style={{ margin: 10 }}
          Select={Select}
          fullscreen={false}
          onSelect={onSelect}
          defaultValue={now}
          locale={cn ? zhCN : enUS}
        />
        <FullCalendar
          style={{ margin: 10 }}
          Select={Select}
          fullscreen
          defaultValue={now}
          onSelect={onSelect}
          type={this.state.type}
          onTypeChange={this.onTypeChange}
          locale={cn ? zhCN : enUS}
        />
      </div>
    );
  }
}

export default Demo;
