/* eslint react/no-multi-comp:0, no-console:0, no-unused-vars:0 */
import 'rc-calendar/assets/index.less';
import React from 'react';
import ReactDOM from 'react-dom';
import Calendar from 'rc-calendar/src';
import RangeCalendar from 'rc-calendar/src/RangeCalendar';

import Select, { Option } from 'rc-select';
import 'rc-select/assets/index.css';

class Demo extends React.Component {
  state = {
    mode: 'month',
    rangeStartMode: 'date',
    rangeEndMode: 'date',
  };

  onModeChange = (key) => {
    return function _handleChange(e) {
      let mode;
      if (e && e.target) {
        mode = e.target.value;
      } else {
        mode = e;
      }
      console.log('change to: ', mode);
      this.setState({
        [key]: mode,
      });
    }.bind(this);
  }

  handlePanelChange = (...args) => {
    console.log('on panel change', ...args);
  }

  handleRangePanelChange = (...args) => {
    console.log('on range panel change', ...args);
  }

  render() {
    return (
      <div style={{ zIndex: 1000, position: 'relative' }}>
        <h2>controle Calendar panel</h2>
        <select
          value={this.state.mode}
          style={{ width: 500 }}
          onChange={this.onModeChange('mode')}
        >
          {['time', 'date', 'month', 'year', 'decade'].map(item => (
            <option value={item} key={item}>{item}</option>
          ))}
        </select>
        <Calendar
          mode={this.state.mode}
          onPanelChange={this.handlePanelChange}
        />
        <h2>controle RangeCalendar panel</h2>
        <select
          value={this.state.rangeStartMode}
          style={{ width: 500 }}
          onChange={this.onModeChange('rangeStartMode')}
        >
          {['date', 'month', 'year', 'decade'].map(item => (
            <option value={item} key={item}>{item}</option>
          ))}
        </select>
        <select
          value={this.state.rangeEndMode}
          style={{ width: 500 }}
          onChange={this.onModeChange('rangeEndMode')}
        >
          {['date', 'month', 'year', 'decade'].map(item => (
            <option value={item} key={item}>{item}</option>
          ))}
        </select>
        <RangeCalendar
          mode={[this.state.rangeStartMode, this.state.rangeEndMode]}
          onPanelChange={this.handleRangePanelChange}
        />
      </div>
    );
  }
}

ReactDOM.render(<Demo />, document.getElementById('__react-content'));
