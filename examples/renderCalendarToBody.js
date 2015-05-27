require('rc-calendar/assets/index.css');
var React = require('react');
var Calendar = require('rc-calendar');
var DatePicker = Calendar.Picker;
var zhCn = require('gregorian-calendar/lib/locale/zh-cn');
var DateTimeFormat = require('gregorian-calendar-format');
var GregorianCalendar = require('gregorian-calendar');
var CalendarLocale = require('rc-calendar/src/locale/zh-cn');
var value = new GregorianCalendar(zhCn);
value.setTime(Date.now());

var Test = React.createClass({
  getDefaultProps() {
    return {
      formatter: new DateTimeFormat('yyyy-MM-dd HH:mm:ss')
    }
  },

  getInitialState() {
    return {};
  },

  destroy() {
    this.setState({
      destroyed: 1
    });
  },

  render() {
    if (this.state.destroyed) {
      return null;
    }
    return <div style={{width: 236, margin: 20}}>
      <div style={{
        'position': 'relative',
        zIndex: 10,
        marginBottom: 22
      }}>
        <DatePicker
          renderCalendarToBody={true}
          trigger={<span className="rc-calendar-picker-icon" />}
          formatter={this.props.formatter} calendar={<Calendar
          style={{zIndex: 1000}}
          locale={CalendarLocale}/>}
          defaultValue={value}>
          <input className="rc-calendar-picker-input"/>
        </DatePicker>
      </div>
      <div style={{
        'position': 'relative',
        zIndex: 100,
        marginBottom: 22
      }}>
        <DatePicker
          renderCalendarToBody={true}
          trigger={<span className="rc-calendar-picker-icon" />}
          formatter={this.props.formatter} calendar={<Calendar
          style={{zIndex: 1000}}
          locale={CalendarLocale}/>}
          defaultValue={value}>
          <input className="rc-calendar-picker-input"/>
        </DatePicker>
      </div>

      <div>
        <button onClick={this.destroy}>destroy</button>
      </div>
    </div>;
  }
});

React.render(<div>
  <h1>zh-cn</h1>
  <Test />
</div>, document.getElementById('__react-content'));


