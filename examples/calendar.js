import 'bootstrap/dist/css/bootstrap.css';
import 'rc-calendar/assets/bootstrap.less';
import React from 'react';
import Calendar from 'rc-calendar';
import DatePicker from 'rc-calendar/src/Picker';
import zhCn from 'gregorian-calendar/lib/locale/zh-cn'; // spm error
import DateTimeFormat from 'gregorian-calendar-format';
import GregorianCalendar from 'gregorian-calendar';
import CalendarLocale from 'rc-calendar/src/locale/zh-cn';
const formatter = new DateTimeFormat('yyyy-MM-dd HH:mm:ss');

var Test = React.createClass({
  onChange(value) {
    console.log('DatePicker change: ' + (value && formatter.format(value)));
  },

  onCalendarSelect(value) {
    console.log('calendar select: ' + (value && formatter.format(value)));
    // controlled value
    this.setState({
      time: Date.now(),
      open: this.state.showTime,
      value: value
    });
  },

  getInitialState() {
    var value = new GregorianCalendar(zhCn);
    value.setTime(Date.now());
    return {
      open: false,
      time: Date.now(),
      showTime: true,
      value: value
    };
  },

  onShowTimeChange(e) {
    this.setState({
      showTime: e.target.checked
    });
  },

  render() {
    var state = this.state;
    var calendar = <Calendar locale={CalendarLocale}
                             orient={['top', 'left']}
                             showTime={this.state.showTime} onSelect={this.onCalendarSelect}
                             onClear={this.onCalendarSelect.bind(this, null)} showClear={true}/>;
    return <div className="form-group" style={{width: 400, margin: 20}} data-time={this.state.time}>
      <div className="input-group">
        <span>
          <input type='checkbox' checked={this.state.showTime} onChange={this.onShowTimeChange}/>
          showTime</span>
      </div>
      <div className="input-group" style={{width:250}}>
        <DatePicker ref='picker'
                    style={{display:'inline'}}
                    calendar={calendar}
                    value={state.value}
                    onChange={this.onChange}>
          {
            ({value}) => {
              return <span>
                <input type="text"
                       className="form-control"
                       readOnly
                       value={formatter.format(value)}
                       style={{
                       background: "white",
                       borderTopRightRadius:4,
                       borderBottomRightRadius:4,
                       cursor: "pointer"
                       }}/>
                <span className="input-group-addon" style={{
                width:39,
                height:34,
                borderRight:0,
                borderLeft:'1px solid #ccc',
                position:'absolute',
                zIndex:99,
                right:1,top:0}}>
          <span className="glyphicon glyphicon-calendar"></span>
        </span>
                </span>;
            }
          }
        </DatePicker>
      </div>
    </div>;
  }
});


function onStandaloneSelect(value) {
  console.log('onCalendarSelect');
  console.log(formatter.format(value))
}

function onStandaloneChange(value) {
  console.log('onCalendarChange');
  console.log(formatter.format(value))
}

React.render(<div>
  <h2>zh-cn</h2>

  <div style={{margin:10}}>
    <Calendar showWeekNumber={true}
              showOk={0}
              showClear={0}
              onSelect={onStandaloneSelect}
              onChange={onStandaloneChange}
              showTime={true}/>
  </div>


  <Test />
</div>, document.getElementById('__react-content'));
