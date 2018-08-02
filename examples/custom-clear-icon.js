/* eslint react/no-multi-comp:0, no-console:0 */

import 'rc-calendar/assets/index.less';
import React from 'react';
import ReactDOM from 'react-dom';
import Calendar from 'rc-calendar';
import RangeCalendar from 'rc-calendar/src/RangeCalendar';
import 'rc-time-picker/assets/index.css';

import 'moment/locale/zh-cn';
import 'moment/locale/en-gb';

const arrowPath = 'M869 487.8L491.2 159.9c-2.9-2.5-6.6-3.9-10.5-3.9h' +
  '-88.5c-7.4 0-10.8 9.2-5.2 14l350.2 304H152c-4.4 0-8 3.6-8 8v' +
  '60c0 4.4 3.6 8 8 8h585.1L386.9 854c-5.6 4.9-2.2 14 5.2 14h91' +
  '.5c1.9 0 3.8-0.7 5.2-2L869 536.2c14.7-12.8 14.7-35.6 0-48.4z';

const doublePath = [
  'M533.2 492.3L277.9 166.1c-3-3.9-7.7-6.1-12.6-6.1H188c-6' +
  '.7 0-10.4 7.7-6.3 12.9L447.1 512 181.7 851.1c-4.1 5.2-0' +
  '.4 12.9 6.3 12.9h77.3c4.9 0 9.6-2.3 12.6-6.1l255.3-326.' +
  '1c9.1-11.7 9.1-27.9 0-39.5z',
  'M837.2 492.3L581.9 166.1c-3-3.9-7.7-6.1-12.6-6.1H492c-6' +
  '.7 0-10.4 7.7-6.3 12.9L751.1 512 485.7 851.1c-4.1 5.2-0' +
  '.4 12.9 6.3 12.9h77.3c4.9 0 9.6-2.3 12.6-6.1l255.3-326.' +
  '1c9.1-11.7 9.1-27.9 0-39.5z',
];

const clearPath = 'M909.1 209.3l-56.4 44.1C775.8 155.1 656.2 92 521.9 92 ' +
  '290 92 102.3 279.5 102 511.5 101.7 743.7 289.8 932 521.9 932c181.3 0' +
  ' 335.8-115 394.6-276.1 1.5-4.2-0.7-8.9-4.9-10.3l-56.7-19.5c-4.1-1.4-8.6' +
  ' 0.7-10.1 4.8-1.8 5-3.8 10-5.9 14.9-17.3 41-42.1 77.8-73.7 109.4-31.6' +
  ' 31.6-68.4 56.4-109.3 73.8-42.3 17.9-87.4 27-133.8 27-46.5 0-91.5-9.1-133' +
  '.8-27-40.9-17.3-77.7-42.1-109.3-73.8-31.6-31.6-56.4-68.4-73.7-109.4-17.9-42' +
  '.4-27-87.4-27-133.9s9.1-91.5 27-133.9c17.3-41 42.1-77.8 73.7-109.4 31.6-31.6' +
  ' 68.4-56.4 109.3-73.8 42.3-17.9 87.4-27 133.8-27 46.5 0 91.5' +
  ' 9.1 133.8 27 40.9 17.3 77.7 42.1 109.3 73.8 9.9 9.9 19.2 20.4 27.8' +
  ' 31.4l-60.2 47c-5.3 4.1-3.5 12.5 3 14.1l175.6 43c5 1.2 9.9-2.6 9.9' +
  '-7.7l0.8-180.9c-0.1-6.6-7.8-10.3-13-6.2z';

const getSvgIcon = (path, reverse, type) => {
  const paths = Array.isArray(path) ? path : [path];
  const renderPaths = paths.map((p, i) => {
    return (
      <path key={i} d={p} />
    );
  });
  return (
    <i className={`custom-icon-${type}`} style={{
      fontSize: '14px',
      color: '#666',
    }}
    >
      <svg
        viewBox="0 0 1024 1024"
        width="1em"
        height="1em"
        fill="currentColor"
        style={{
          verticalAlign: '-.125em',
          transform: `rotate(${reverse && 180 || 0}deg)`,
        }}
      >
        {renderPaths}
      </svg>
    </i>
  );
};

const prevYearIcon = getSvgIcon(doublePath, true, 'prev-year');
const prevMonthIcon = getSvgIcon(arrowPath, true, 'prev-month');
const nextYearIcon = getSvgIcon(doublePath, false, 'next-year');
const nextMonthIcon = getSvgIcon(arrowPath, false, 'next-month');
const customIconFn = ({ type }) => {
  switch (type) {
    case 'prev-year':
    case 'prev-jump':
      return prevYearIcon;
    case 'prev-month':
      return prevMonthIcon;
    case 'next-year':
    case 'next-jump':
      return nextYearIcon;
    case 'next-month':
      return nextMonthIcon;
    default:
      return null;
  }
};

const svg = (
  <i style={{
    fontStyle: 'normal',
    zIndex: '9999',
    position: 'absolute',
    right: '6px',
    cursor: 'pointer',
    overflow: 'hidden',
    width: '20px',
    height: '20px',
    textAlign: 'center',
    lineHeight: '1',
    top: '10px',
    margin: '0',
    fontSize: '12px',
    color: '#aaa',
    display: 'inline-block',
  }}
  >
    <svg
      viewBox="0 0 1024 1024"
      width="1em"
      height="1em"
      fill="currentColor"
      style={{ verticalAlign: '-.125em' }}
    >
      <path d={clearPath} p-id="5827"></path>
    </svg>
  </i>
);

const calendars = ['time', 'date', 'month', 'year', 'decade'].map((mode) => {
  return (
    <div key={mode} style={{ marginBottom: '1rem' }}>
      <div>{mode}</div>
      <Calendar
        mode={mode}
        clearIcon={svg}
        customIcon={customIconFn}
      />
    </div>
  );
});

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
        clearIcon={svg}
        customIcon={customIconFn}
      />
    </div>
    {calendars}
    <div style={{ clear: 'both' }}></div>
    <RangeCalendar
      showClear
      clearIcon={svg}
      customIcon={customIconFn}
    />
  </div>
</div>), document.getElementById('__react-content'));
