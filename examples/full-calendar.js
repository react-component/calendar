import 'rc-calendar/assets/index.less';
import React, {Component} from 'react';
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

ReactDOM.render(<div style={{zIndex:1000,position:'relative'}}>
  <FullCalendar
    style={{margin: 10}}
    Select={Select}
    fullscreen={false}
    locale={CalendarLocale}/>
  <FullCalendar
    style={{margin: 10}}
    Select={Select}
    fullscreen={true}
    defaultType="month"
    onSelect={onSelect}
    locale={CalendarLocale}/>
</div>, document.getElementById('__react-content'));
