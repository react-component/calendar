import 'rc-calendar/assets/bootstrap.less';
import 'bootstrap/dist/css/bootstrap.css';
import RangeCalendar from 'rc-calendar/src/RangeCalendar';
import GregorianCalendarFormat from 'gregorian-calendar-format';
import React from 'react';
import ReactDOM from 'react-dom';
var formatter = new GregorianCalendarFormat('yyyy-MM-dd HH:mm:ss');
import GregorianCalendar from 'gregorian-calendar';
import zhCn from 'gregorian-calendar/lib/locale/zh-cn';
import CalendarLocale from 'rc-calendar/src/locale/zh-cn';
import Picker from 'rc-calendar/src/Picker';

var value = new GregorianCalendar(zhCn);
value.setTime(Date.now());

function disabledDate(current) {
  var date = new Date();
  date.setHours(0);
  date.setMinutes(0);
  date.setSeconds(0);
  return current.getTime() < date.getTime();  //can not select days before today
}

function onStandaloneChange(value) {
  console.log('onChange');
  console.log(value[0] && formatter.format(value[0]), value[1] && formatter.format(value[1]))
}

function onStandaloneSelect(value) {
  console.log('onSelect');
  console.log(formatter.format(value[0]), formatter.format(value[1]))
}

function onStandaloneOk(value) {
  console.log('onOk');
  console.log(formatter.format(value[0]), formatter.format(value[1]))
}

const Test = React.createClass({
  getInitialState(){
    const end = value.clone();
    end.addDayOfMonth(5);
    return {
      value: [value, end]
    };
  },

  onChange(value){
    if ((value[1].getTime() - value[0].getTime()) > 60 * 24 * 60 * 1000 * 10) {
      console.log('only last no more than 10 days');
      value[1] = value[0].clone();
      value[1].addDayOfMonth(10);
    }
    this.setState({value});
    console.log(value);
  },

  render(){
    const state = this.state;
    const calendar = <RangeCalendar showWeekNumber={false}
                                    locale={CalendarLocale}
                                    disabledDate={disabledDate}
                                    showTime/>;
    return <div className="form-group" style={{width: 400, margin: 20}} >
      <div className="input-group" style={{width:350}}>
        <Picker value={state.value} onChange={this.onChange} calendar={calendar}>
          {
            ({value}) => {
              return <span>
                <input type="text"
                       className="form-control"
                       readOnly
                       value={formatter.format(value[0]) +' - '+formatter.format(value[1])}
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
        </Picker>
      </div>
    </div>;
  }
});

ReactDOM.render(
  <div>
    <h2>calendar (zh-cn)</h2>

    <div style={{margin:10}}>
      <RangeCalendar showWeekNumber
                     locale={CalendarLocale}
                     onChange={onStandaloneChange}
                     onSelect={onStandaloneSelect}
                     onOk={onStandaloneOk}
                     disabledDate={disabledDate}
                     showTime/>
    </div>
    <br/>

    <div style={{margin:20}}>
      <Test />
    </div>
  </div>, document.getElementById('__react-content'));

