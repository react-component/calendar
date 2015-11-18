import 'rc-calendar/src/assets/full-calendar';
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import CalendarLocale from 'rc-calendar/src/locale/zh_CN';
import FullCalendar from 'rc-calendar/src/FullCalendar';

ReactDOM.render(<div style={{zIndex:1000,position:'relative'}}>
  <FullCalendar
    style={{margin: 10}}
    fullscreen={false}
    showTypeSwitch={true}
    locale={CalendarLocale}/>
  <FullCalendar
    style={{margin: 10}}
    fullscreen={true}
    showTypeSwitch={true}
    locale={CalendarLocale}/>
</div>, document.getElementById('__react-content'));
