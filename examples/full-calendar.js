/* eslint react/no-multi-comp:0, no-console:0 */

import 'rc-calendar/assets/index.less';
import React from 'react';
import ReactDOM from 'react-dom';
import CalendarLocale from 'rc-calendar/src/locale/zh_CN';
import FullCalendar from 'rc-calendar/src/FullCalendar';
import DateTimeFormat from 'gregorian-calendar-format';
const dateFormatter = new DateTimeFormat('yyyy-MM-dd');

import 'rc-select/assets/index.css';
import Select from 'rc-select';

function onSelect(value) {
  console.log('select', dateFormatter.format(value));
}

const App = React.createClass({
  getInitialState() {
    return {
      type: 'month',
    };
  },
  onTypeChange(type) {
    this.setState({ type });
  },
  render() {
    return (
      <div style={{zIndex: 1000, position: 'relative'}}>
        <FullCalendar
          style={{margin: 10}}
          Select={Select}
          fullscreen={false}
          onSelect={onSelect}
          locale={CalendarLocale}/>
        <FullCalendar
          style={{margin: 10}}
          Select={Select}
          fullscreen
          onSelect={onSelect}
          type={this.state.type}
          onTypeChange={this.onTypeChange}
          locale={CalendarLocale}/>
      </div>
    );
  },
});

ReactDOM.render(<App />, document.getElementById('__react-content'));
