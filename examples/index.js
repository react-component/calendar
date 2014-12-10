/** @jsx React.DOM */


require(['../',
  '../lib/locale/en-us',
  '/node_modules/gregorian-calendar/index',
  '/node_modules/gregorian-calendar-format/index',
  '../lib/MonthPanel',
  '../lib/YearPanel',
  '../lib/DecadePanel',
  '/node_modules/react/react'
], function (Calendar,
             Locale,
             GregorianCalendar,
             GregorianCalendarFormat,
             MonthPanel,
             YearPanel,
             DecadePanel,
             React) {
  var formatter = new GregorianCalendarFormat('yyyy-mm-dd');
  var value = new GregorianCalendar();
  value.setTime(Date.now());
  function onSelect(value){
    console.log('onSelect');
    console.log(formatter.format(value))
  }
  React.render(
    <div>
      <h1 style={{"textAlign": "center"}}>rc-calendar@1.0.0 demo</h1>
      <a href="#">link</a>
      <Calendar showToday={1} onSelect={onSelect}/>
    </div>, document.body);

});
