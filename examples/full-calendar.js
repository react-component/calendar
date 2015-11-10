import 'rc-calendar/assets/index.less';
import React from 'react';
import ReactDOM from 'react-dom';
import CalendarLocale from 'rc-calendar/src/locale/zh_CN';
import FullCalendar from 'rc-calendar/src/FullCalendar';

ReactDOM.render(<div style={{zIndex:1000,position:'relative'}}>
  <FullCalendar
    fullscreen={false}
    locale={CalendarLocale}/>
</div>, document.getElementById('__react-content'));
