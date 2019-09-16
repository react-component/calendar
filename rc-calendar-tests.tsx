import * as React from 'react';
import * as moment from 'moment';
import Calendar from './';

const action = (date: moment.Moment) => {
  date.subtract(1);
};

export default () => (
  <Calendar
    showWeekNumber={false}
    locale={{}}
    defaultValue={moment()}
    showToday
    showOk={false}
    onChange={action}
    disabledDate={(now: moment.Moment) => false}
    onSelect={action}
    inputMode="numeric"
  />
);
