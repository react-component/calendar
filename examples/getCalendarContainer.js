import 'rc-calendar/assets/index.less';
import React from 'react';
import ReactDOM from 'react-dom';
import Calendar from 'rc-calendar';
import DatePicker from 'rc-calendar/src/Picker';
import Dialog from 'rc-dialog';
import 'rc-dialog/assets/index.css';

import zhCN from 'rc-calendar/src/locale/zh_CN';
import enUS from 'rc-calendar/src/locale/en_US';

import moment from 'moment';
import 'moment/locale/zh-cn';
import 'moment/locale/en-gb';

const format = 'YYYY-MM-DD';
const cn = location.search.indexOf('cn') !== -1;

const now = moment();
if (cn) {
  now.locale('zh-cn').utcOffset(8);
} else {
  now.locale('en-gb').utcOffset(0);
}

const defaultCalendarValue = now.clone();
defaultCalendarValue.add(-1, 'month');

const Test = React.createClass({
  getInitialState() {
    return {
      open: false,
      destroy: false,
    };
  },
  getCalendarContainer() {
    return this.refs.d || document.getElementById('d');
  },
  setVisible(open) {
    this.setState({
      open,
    });
  },
  open() {
    this.setVisible(true);
  },
  close() {
    this.setVisible(false);
  },
  destroy() {
    this.setState({
      destroy: true,
    });
  },
  render() {
    if (this.state.destroy) {
      return null;
    }
    return (<div>
      <button onClick={this.open}>open</button>
      &nbsp;
      <button onClick={this.destroy}>destroy</button>
      <Dialog visible={this.state.open} onClose={this.close}>
        <div id="d" ref="d"/>
        <div style={{ marginTop: 20 }}>
          <DatePicker
            getCalendarContainer={this.getCalendarContainer}
            calendar={<Calendar locale={cn ? zhCN : enUS}/>}
          >
            {
              ({ value }) => {
                return (
                  <span>
                <input
                  style={{ width: 250 }}
                  readOnly
                  value={value && value.format(format) || ''}
                />
                </span>
                );
              }
            }
          </DatePicker>
        </div>
      </Dialog>
    </div>);
  },
});

ReactDOM.render(<Test />, document.getElementById('__react-content'));
