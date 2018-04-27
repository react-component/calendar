/* eslint react/no-multi-comp:0, no-console:0 */

import 'rc-calendar/assets/index.less';
import React from 'react';
import ReactDOM from 'react-dom';
import Calendar from 'rc-calendar';
import enUS from 'rc-calendar/src/locale/en_US';

import moment from 'moment';
import 'moment/locale/en-gb';

const format = 'YYYY-MM-DD';

const now = moment();
now.locale('en-gb').utcOffset(0);

const defaultCalendarValue = now.clone();
defaultCalendarValue.add(-1, 'month');

function disabledDate(current) {
  if (!current) {
    // allow empty select
    return false;
  }
  const date = moment();
  date.hour(0);
  date.minute(0);
  date.second(0);
  return current.valueOf() < date.valueOf();  // can not select days before today
}

function formatStr(value, strFormat) {
  let str;

  str = value && value.length && value.map((singleValue) => {
    return singleValue.format(strFormat) || '';
  }).join(', ') || '';

  return str;
}

function onStandaloneSelect(value) {
  console.log('onStandaloneSelect', value);
  console.log(formatStr(value, format));
}

function onStandaloneChange(value) {
  console.log('onStandaloneChange', value);
  console.log(formatStr(value, format));
}


ReactDOM.render((<div
  style={{
    zIndex: 1000,
    position: 'relative',
    width: 900,
    margin: '20px auto',
  }}
>
  <div>
    <div style={{ margin: 10 }}>
      <Calendar
        showWeekNumber={false}
        locale={enUS}
        defaultValue={[now]}
        showToday
        formatter={format}
        showOk={false}
        onChange={onStandaloneChange}
        disabledDate={disabledDate}
        onSelect={onStandaloneSelect}
        multiple
        selectWeekDays
        selectMonths
      />
    </div>
    <div style={{ clear: 'both' }}></div>
  </div>
</div>), document.getElementById('__react-content'));
