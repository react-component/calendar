# rc-calendar@1.x demo Calendar.Picker
---

<link rel="stylesheet" href="../assets/bootstrap.css">
<link rel="stylesheet" href="https://a.alipayobjects.com/bootstrap/3.3.1/css/bootstrap.css">


<div style='height:200px' style='margin:10px'>
<p>keyboard: tab into input,press down</p>
</div>

````html
<div id='react-content-input' style='margin:10px;width:250px'></div>
````

````js
/** @jsx React.DOM */
var React = require('react');
var Calendar = require('../');
var DatePicker = Calendar.Picker;
var zhCn; // = require('gregorian-calendar/lib/locale/zh-cn'); // spm error
var DateTimeFormat = require('gregorian-calendar-format');
var GregorianCalendar = require('gregorian-calendar');
var CalendarLocale; // = require('../lib/locale/zh-cn');

var Test = React.createClass({
  open: function () {
    this.refs.picker.setState({
      open: true
    });
  },

  handleChange:function(value){
    console.log('DatePicker change: '+(this.props.formatter.format(value)));
  },

  handleCalendarSelect: function (v) {
    //console.log('outer knows: ' + this.props.formatter.format(v));
    // sync status
    this.setState({
      value: v
    });
  },

  getDefaultProps: function () {
    return {
      formatter: new DateTimeFormat('yyyy-MM-dd HH:mm:ss', zhCn)
    }
  },

  getInitialState: function () {
    var value = new GregorianCalendar(zhCn);
    value.setTime(Date.now());
    return {
      showTime:true,
      value: value
    };
  },

  handleShowTimeChange:function(e){
    this.setState({
      showTime:e.target.checked
    });
  },

  render: function () {
    var state = this.state;
    var calendar = <Calendar locale={CalendarLocale}
    orient={['bottom','left']}
    showTime={this.state.showTime} onSelect={this.handleCalendarSelect}/>;
    return  <div className="form-group">
        <div className="input-group">
         <span><input type='checkbox' checked={this.state.showTime} onChange={this.handleShowTimeChange} /> showTime</span>
         </div>
        <div className="input-group">
          <DatePicker ref='picker' formatter={this.props.formatter} calendar={calendar}
          value={state.value} onChange={this.handleChange}>
            <input type="text" className="form-control" style={{background:'white',cursor:'pointer'}}/>
          </DatePicker>
          <span className="input-group-addon" onClick={this.open}>
            <span className="glyphicon glyphicon-calendar"></span>
          </span>
        </div>
      </div>;
  }
});

React.render(<Test />, document.getElementById('react-content-input'));

````
