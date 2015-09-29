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
    console.log('DatePicker change: ' + (this.props.formatter.format(value)));
  },

  handleCalendarSelect(value) {
    console.log('calendar select: ' + (this.props.formatter.format(value)));
    // uncontrolled value
    this.setState({
      time: Date.now()
    });
  },

  getDefaultProps() {
    return {
      formatter: new DateTimeFormat('yyyy-MM-dd HH:mm:ss'),
    };
  },

  getInitialState() {
    var value = new GregorianCalendar(zhCn);
    value.setTime(Date.now());
    return {
      time: Date.now(),
      showTime: true,
      open: false,
      value: value
    };
  },

  handleShowTimeChange(e) {
    this.setState({
      showTime: e.target.checked
    });
  },

  render() {
    var state = this.state;
    var calendar = <Calendar locale={CalendarLocale}
                             formatter={this.props.formatter}
                             orient={['bottom', 'left']}
                             showTime={this.state.showTime} onSelect={this.handleCalendarSelect}/>;
    return <div className="form-group" style={{width: 400, margin: 20}} data-time={state.time}>
      <div className="input-group">
        <span>
          <input type="checkbox" checked={this.state.showTime} onChange={this.handleShowTimeChange}/>
          showTime</span>
      </div>
      <div className="input-group" style={{width:250}}>
        <DatePicker calendar={calendar}
                    style={{display:'inline'}}
                    defaultValue={state.value}
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

React.render((<div>
  <h2>zh-cn</h2>
  <Test />
</div>), document.getElementById('__react-content'));
