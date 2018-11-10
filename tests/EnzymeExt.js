import { ReactWrapper } from 'enzyme';

Object.assign(ReactWrapper.prototype, {
  selectDate(date, index) {
    let calendar = this;
    if (index) {
      calendar = this.find('.rc-calendar-range-part')[index];
    }
    calendar.find({ title: date.format('LL') }).simulate('click');
  },

  selectMonth(month) {
    this.find('.rc-calendar-month-panel-cell').at(month).simulate('click');
  },
});
