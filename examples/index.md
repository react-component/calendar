# rc-calendar@1.x demo
---

````js
if(window.seajs){
    window.require = seajs.use;
}
````

<script>
require('./skin');
</script>

<div id='skin'></div>

## 单独渲染

````html
<div id='react-content-standalone'></div>
````

````js
/** @jsx React.DOM */
require(['../','./CalendarInput','gregorian-calendar','gregorian-calendar-format','react'],
function(Calendar,CalendarInput,GregorianCalendar,GregorianCalendarFormat,React){
    var formatter = new GregorianCalendarFormat('yyyy-MM-dd');
    var value = new GregorianCalendar();
    value.setTime(Date.now());

    function onSelect(value) {
      console.log('onSelect');
      console.log(formatter.format(value))
    }

    React.render(
      <div>
        <h2>calendar (en-us)</h2>
        <Calendar showWeekNumber="1" onSelect={onSelect}/>
      </div>, document.getElementById('react-content-standalone'));
});
````

## 和 input 结合

请参考 demo 并自行封装 CalendarInput

````html
<div id='react-content-input'></div>
````

````js
/** @jsx React.DOM */
require(['./CalendarInput','react'],
function(CalendarInput, React){
    React.render(
      <div>
        <h2>input (zh-cn)</h2>
        <CalendarInput />
      </div>, document.getElementById('react-content-input'));
});
````