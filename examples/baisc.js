import React from 'react';
import Calendar from '../src';
import MonthCalendar from '../src/MonthCalendar';

export default () => (
  <>
    <MonthCalendar
      onSelect={value => {
        console.log(value);
      }}
    />
    <Calendar onSelect={(rest, ca) => console.log(rest, ca)} />
  </>
);
