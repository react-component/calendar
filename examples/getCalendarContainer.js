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
            calendar={<Calendar />}
          >
            {
              ({ value }) => {
                return (
                  <span>
                <input
                  style={{ width: 250 }}
                  readOnly
                  value={value && dateFormatter.format(value)}
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
