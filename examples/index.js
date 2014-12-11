/** @jsx React.DOM */


require(['../',
  './CalendarInput',
  '/node_modules/gregorian-calendar/index',
  '/node_modules/gregorian-calendar-format/index',
  '../lib/MonthPanel',
  '../lib/YearPanel',
  '../lib/DecadePanel',
  '/node_modules/react/react'
], function (Calendar,
             CalendarInput,
             GregorianCalendar,
             GregorianCalendarFormat,
             MonthPanel,
             YearPanel,
             DecadePanel,
             React) {
  var formatter = new GregorianCalendarFormat('yyyy-MM-dd');
  var value = new GregorianCalendar();
  value.setTime(Date.now());
  function onSelect(value){
    console.log('onSelect');
    console.log(formatter.format(value))
  }
  React.render(
    <div>
      <h1 style={{"textAlign": "center"}}>rc-calendar@1.0.0 demo</h1>
      <h2>calendar (en-us)</h2>
      <Calendar showWeekNumber="1" onSelect={onSelect}/>
      <h2>input (zh-cn)</h2>
      <CalendarInput />
    </div>, document.body);

});
