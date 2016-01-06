import 'rc-calendar/assets/index.less';
import React from 'react';
import ReactDOM from 'react-dom';
import Calendar from 'rc-calendar';
import DatePicker from 'rc-calendar/src/Picker';
import DateTimeFormat from 'gregorian-calendar-format';
import Dialog from 'rc-dialog';
import 'rc-dialog/assets/index.css';

const dateFormatter = new DateTimeFormat('yyyy-MM-dd');

const Test = React.createClass({
  getCalendarContainer() {
    return this.refs.d || document.getElementById('d');
  },
  render() {
    const calendar = <Calendar />;
    return (<Dialog visible closable={false}>
      <div id="d" ref="d"/>
      <div>
        <DatePicker
          getCalendarContainer={this.getCalendarContainer}
          calendar={calendar}>
          {
            ({value})=> {
              return (
                <span>
                <input style={{width: 250}}
                       readOnly
                       value={value && dateFormatter.format(value)}/>
                </span>
              );
            }
          }
        </DatePicker>
      </div>
    </Dialog>);
  },
});

ReactDOM.render(<Test />, document.getElementById('__react-content'));
