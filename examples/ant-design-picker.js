/** @jsx React.DOM */
require('rc-calendar/assets/index.css');
var React = require('react');
var Calendar = require('rc-calendar');
var DatePicker = Calendar.Picker;
var zhCn = require('gregorian-calendar/lib/locale/zh-cn'); // spm error
var DateTimeFormat = require('gregorian-calendar-format');
var GregorianCalendar = require('gregorian-calendar');
var CalendarLocale = require('../lib/locale/zh-cn');

var style = `
@font-face {
  font-family: 'iconfont';
  src: url('//at.alicdn.com/t/font_1429685559_5814753.eot');
  /* IE9*/
  src: url('//at.alicdn.com/t/font_1429685559_5814753.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */ url('//at.alicdn.com/t/font_1429685559_5814753.woff') format('woff'), /* chrome、firefox */ url('//at.alicdn.com/t/font_1429685559_5814753.ttf') format('truetype'), /* chrome、firefox、opera、Safari, Android, iOS 4.2+*/ url('//at.alicdn.com/t/font_1429685559_5814753.svg#iconfont') format('svg');
  /* iOS 4.1- */
}

.datepicker-input {
  box-sizing: border-box;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  height: 32px;
  width: 100%;
  position: relative;
  display: inline-block;
  width: 100%;
  margin: 0 0;
  padding: 7px 10px;
  border-radius: 6px 6px;
  border: 1px solid #d9d9d9;
  background-color: #ffffff;
  color: #666;
  line-height: 1.5;
  -webkit-transform: border 0.3s cubic-bezier(0.35, 0, 0.25, 1), background 0.3s cubic-bezier(0.35, 0, 0.25, 1), box-shadow 0.3s cubic-bezier(0.35, 0, 0.25, 1);
  transform: border 0.3s cubic-bezier(0.35, 0, 0.25, 1), background 0.3s cubic-bezier(0.35, 0, 0.25, 1), box-shadow 0.3s cubic-bezier(0.35, 0, 0.25, 1);
  font-family: inherit;
  vertical-align: baseline;
}

.datepicker-input:focus {
  border-color: #23c0fa;
  box-shadow: 0 0 3px #23c0fa;
}

.datepicker-input:hover {
  border-color: #23c0fa;
}

.date-picker-wrap {
  box-sizing: border-box;
  position: relative;
  display: block;
  line-height: 1.5;
  margin-bottom: 22px;
}

.datepicker-icon {
  position: absolute;
  -webkit-user-select:none;
}

.datepicker-icon:after {
  position: relative;
  left: -22px;
  font-family: "iconfont";
  content: "";
  font-size: 12px;
  color: #999;
  top: 3px;
  margin-right: -22px;
}
`;

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

  getDefaultProps: function () {
    return {
      formatter: new DateTimeFormat('yyyy-MM-dd HH:mm:ss')
    }
  },

  getInitialState: function () {
    var value = new GregorianCalendar(zhCn);
    value.setTime(Date.now());
    return {
      time: Date.now(),
      showTime: true,
      value: value
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
      showTime={this.state.showTime} onSelect={this.handleCalendarSelect} onClear={this.handleCalendarSelect.bind(this, null)} showClear={true}/>;
    return <div style={{width: 236, margin: 20}} data-time={this.state.time}>
      <style dangerouslySetInnerHTML={{__html: style}}>
      </style>
      <div>
        <span>
          <input type='checkbox' checked={this.state.showTime} onChange={this.handleShowTimeChange} />
          showTime</span>
      </div>
      <div className="date-picker-wrap">
        <DatePicker
          trigger={<span className="datepicker-icon" />}
          formatter={this.props.formatter} calendar={calendar}
          value={state.value} onChange={this.handleChange}>
          <input type="text" className="datepicker-input" style={{background: 'white', cursor: 'pointer'}}/>
        </DatePicker>
      </div>
    </div>;
  }
});

React.render(<div>
  <h1>zh-cn</h1>
  <Test />
</div>, document.getElementById('__react-content'));
