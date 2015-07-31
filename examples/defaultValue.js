import 'bootstrap/dist/css/bootstrap.css';
import 'rc-calendar/assets/bootstrap.less';
import React from 'react';
import Calendar,{Picker as DatePicker} from 'rc-calendar';
import zhCn from 'gregorian-calendar/lib/locale/zh-cn'; // spm error
import DateTimeFormat from 'gregorian-calendar-format';
import GregorianCalendar from 'gregorian-calendar';
import CalendarLocale from 'rc-calendar/src/locale/zh-cn';

var Test = React.createClass({
  open() {
    this.refs.picker.setState({
      open: true
    });
  },

  handleChange(value) {
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
      formatter: new DateTimeFormat('yyyy-MM-dd HH:mm:ss')
    }
  },

  getInitialState() {
    var value = new GregorianCalendar(zhCn);
    value.setTime(Date.now());
    return {
      time: Date.now(),
      showTime: true,
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
      orient={['bottom', 'left']}
      showTime={this.state.showTime} onSelect={this.handleCalendarSelect}/>;
    return <div className="form-group" style={{width: 400, margin: 20}} data-time={state.time}>
      <div className="input-group">
        <span>
          <input type='checkbox' checked={this.state.showTime} onChange={this.handleShowTimeChange} />
          showTime</span>
      </div>
      <div className="input-group">
        <DatePicker ref='picker' formatter={this.props.formatter} calendar={calendar}
          defaultValue={state.value} onChange={this.handleChange}>
          <input type="text" className="form-control" style={{background: 'white', cursor: 'pointer'}}/>
        </DatePicker>
        <span className="input-group-addon" onClick={this.open}>
          <span className="glyphicon glyphicon-calendar"></span>
        </span>
      </div>
    </div>;
  }
});

React.render(<div>
  <h2>zh-cn</h2>
  <Test />
</div>, document.getElementById('__react-content'));
