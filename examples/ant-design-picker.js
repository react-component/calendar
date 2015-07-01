require('rc-calendar/assets/index.css');
var React = require('react');
var Calendar = require('rc-calendar');
var DatePicker = Calendar.Picker;
var zhCn = require('gregorian-calendar/lib/locale/zh-cn'); // spm error
var DateTimeFormat = require('gregorian-calendar-format');
var GregorianCalendar = require('gregorian-calendar');
var CalendarLocale = require('rc-calendar/src/locale/zh-cn');
var now = new GregorianCalendar(zhCn);
now.setTime(Date.now());

var defaultCalendarValue = new GregorianCalendar(zhCn);
defaultCalendarValue.setTime(Date.now());
defaultCalendarValue.addMonth(-1);

var Test = React.createClass({
  handleChange: function (value) {
    console.log('DatePicker change: ' + (value && this.props.formatter.format(value)));
  },

  handleCalendarSelect: function (value) {
    console.log('calendar select: ' + (value && this.props.formatter.format(value)));
    // controlled value
    this.setState({
      time: Date.now(),
      value: value
    });
  },

  handleCalendarOk: function (value) {
    console.log('calendar ok: ' + (value && this.props.formatter.format(value)));
    // controlled value
    this.setState({
      time: Date.now(),
      value: value
    });
  },

  getDefaultProps: function () {
    return {
      formatter: new DateTimeFormat('yyyy-MM-dd HH:mm:ss')
    }
  },

  getInitialState: function () {
    return {
      time: Date.now(),
      showTime: true,
      value: this.props.defaultValue
    };
  },

  handleShowTimeChange: function (e) {
    this.setState({
      showTime: e.target.checked
    });
  },

  render: function () {
    var state = this.state;
    var calendar = <Calendar locale={CalendarLocale}
      orient={['top', 'left']}
      defaultValue={defaultCalendarValue}
      showTime={this.state.showTime}
      showOk={true}
      onOk={this.handleCalendarOk}
      onSelect={this.handleCalendarSelect}
      onClear={this.handleCalendarSelect.bind(this, null)} showClear={true}/>;
    return <div style={{width: 236, margin: 20}} data-time={this.state.time}>
      <div>
        <span>
          <input type='checkbox' checked={this.state.showTime} onChange={this.handleShowTimeChange} />
          showTime</span>
      </div>
      <div style={{
        'boxSizing': 'border-box',
        'position': 'relative',
        'display': 'block',
        'lineHeight': 1.5,
        marginBottom: 22
      }}>
        <DatePicker
          animation="slide-up"
          trigger={<span className="rc-calendar-picker-icon" />}
          formatter={this.props.formatter} calendar={calendar}
          value={state.value} onChange={this.handleChange}>
          <input className="rc-calendar-picker-input" placeholder="请选择日期"/>
        </DatePicker>
      </div>
    </div>;
  }
});

React.render(<div>
  <h2>zh-cn</h2>
  <Test defaultValue={now}/>
  <Test/>
</div>, document.getElementById('__react-content'));
