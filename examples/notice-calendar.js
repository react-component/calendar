import 'rc-calendar/assets/index.less';
import React from 'react';
import ReactDOM from 'react-dom';
import CalendarLocale from 'rc-calendar/src/locale/zh_CN';
import NoticeCalendar from 'rc-calendar/src/NoticeCalendar';

ReactDOM.render(<div style={{zIndex:1000,position:'relative'}}>
  <NoticeCalendar
    fullscreen={true}
    locale={CalendarLocale}/>
</div>, document.getElementById('__react-content'));
