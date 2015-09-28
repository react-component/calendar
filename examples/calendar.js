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
  toggle() {
    console.log('toggle', this.state.open);
    this.setState({
      open: !this.state.open
    }, () => {
      if (!this.state.open) {
        this.inputNode.focus();
      }
    });
  },

  saveInputRef(input) {
    this.inputNode = React.findDOMNode(input);
  },

  onChange(value) {
    console.log('DatePicker change: ' + (value && formatter.format(value)));
  },

  handleCalendarSelect(value) {
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

  handleShowTimeChange(e) {
    this.setState({
      showTime: e.target.checked
    });
  },

  onOpenChange(e){
    console.log('onOpenChange', e.open);
    this.setState({
      open: e.open
    });
  },

  render() {
    var state = this.state;
    var calendar = <Calendar locale={CalendarLocale}
                             orient={['top', 'left']}
                             formatter={formatter}
                             showTime={this.state.showTime} onSelect={this.handleCalendarSelect}
                             onClear={this.handleCalendarSelect.bind(this, null)} showClear={true}/>;
    return <div className="form-group" style={{width: 400, margin: 20}} data-time={this.state.time}>
      <div className="input-group">
        <span>
          <input type='checkbox' checked={this.state.showTime} onChange={this.handleShowTimeChange}/>
          showTime</span>
      </div>
      <div className="input-group" style={{width:250}}>
        <DatePicker ref='picker'
                    style={{display:'inline'}}
                    open={this.state.open}
                    calendar={calendar}
                    onOpen={this.onOpenChange}
                    onClose={this.onOpenChange}
                    value={state.value}
                    onChange={this.onChange}>
          {
            ({value})=> {
              return <input
                ref={this.saveInputRef}
                readOnly
                value={formatter.format(value)}
                placeholder="please select date"
                className="form-control rc-calendar-picker-input"/>;
            }
          }
        </DatePicker>
        <span className="input-group-addon"
              style={{'WebkitUserSelect': 'none'}}
              onMouseDown={prevent}
              unselectable="unselectable"
              onClick={this.toggle}>
          <span className="glyphicon glyphicon-calendar"></span>
        </span>
      </div>
    </div>;
  }
});

function prevent(e) {
  e.preventDefault();
}


function onCalendarSelect(value) {
  console.log('onCalendarSelect');
  console.log(formatter.format(value))
}

function onCalendarChange(value) {
  console.log('onCalendarChange');
  console.log(formatter.format(value))
}

React.render(<div>
  <h2>zh-cn</h2>

  <div style={{margin:10}}>
    <Calendar showWeekNumber={true}
              showOk={0}
              showClear={0}
              formatter={formatter}
              onSelect={onCalendarSelect}
              onChange={onCalendarChange}
              showTime={true}/>
  </div>


  <Test />
</div>, document.getElementById('__react-content'));
