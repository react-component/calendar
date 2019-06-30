/* eslint react/no-multi-comp:0, no-console:0 */

import 'rc-calendar/assets/index.less';
import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import Calendar from 'rc-calendar';
import DatePicker from 'rc-calendar/src/Picker';
import zhCN from 'rc-calendar/src/locale/zh_CN';
import enUS from 'rc-calendar/src/locale/en_US';
import 'rc-time-picker/assets/index.css';
import TimePickerPanel from 'rc-time-picker/lib/Panel';

import moment from 'moment';
import 'moment/locale/zh-cn';
import 'moment/locale/en-gb';

const format = 'YYYY-MM-DD HH:mm:ss';
const cn = location.search.indexOf('cn') !== -1;

const now = moment();
if (cn) {
  now.locale('zh-cn').utcOffset(8);
} else {
  now.locale('en-gb').utcOffset(0);
}

function getFormat(time) {
  return time ? format : 'YYYY-MM-DD';
}


const defaultCalendarValue = now.clone();
defaultCalendarValue.add(-1, 'month');

const timePickerElement = <TimePickerPanel defaultValue={moment('00:00:00', 'HH:mm:ss')} />;

function disabledTime(date) {
  console.log('disabledTime', date);
  if (date && (date.date() === 15)) {
    return {
      disabledHours() {
        return [3, 4];
      },
    };
  }
  return {
    disabledHours() {
      return [1, 2];
    },
  };
}


function disabledDate(current) {
  if (!current) {
    // allow empty select
    return false;
  }
  const date = moment();
  date.hour(0);
  date.minute(0);
  date.second(0);
  return current.valueOf() < date.valueOf();  // can not select days before today
}

class Demo extends React.Component {
  static propTypes = {
    defaultValue: PropTypes.object,
    defaultCalendarValue: PropTypes.object,
  }

  constructor(props) {
    super(props);

    this.calendarContainerRef = React.createRef();

    this.state = {
      showTime: true,
      showDateInput: true,
      disabled: false,
      open: false,
      value: props.defaultValue,
    };
  }

  onChange = (value) => {
    console.log('DatePicker change: ', (value && value.format(format)));
    this.setState({
      value,
    });
  }

  onShowTimeChange = (e) => {
    this.setState({
      showTime: e.target.checked,
    });
  }

  onShowDateInputChange = (e) => {
    this.setState({
      showDateInput: e.target.checked,
    });
  }

  onOpenChange = (open) => {
    this.setState({
      open,
    });
  }

  onFocus = () => {
    if (!this.state.open && this.state.isMouseDown) {
      // focus from a "click" event, let the picker trigger automatically open the calendar
      this.setState({
        isMouseDown: false,
      });
    } else {
      // focus not caused by "click" (such as programmatic or via keyboard)
      this.setState({
        open: true,
      });
    }
  }

  onMouseDown = () => {
    this.setState({
      isMouseDown: true,
    });
  }

  getCalendarContainer = () => this.calendarContainerRef.current;

  toggleDisabled = () => {
    this.setState({
      disabled: !this.state.disabled,
    });
  }

  render() {
    const state = this.state;
    const calendar = (<Calendar
      locale={cn ? zhCN : enUS}
      style={{ zIndex: 1001 }}
      dateInputPlaceholder="please input"
      format={getFormat(state.showTime)}
      disabledTime={state.showTime ? disabledTime : null}
      timePicker={state.showTime ? timePickerElement : null}
      defaultValue={this.props.defaultCalendarValue}
      showDateInput={state.showDateInput}
      disabledDate={disabledDate}
      focusablePanel={false}
    />);
    return (<div style={{ width: 400, margin: 20 }}>
      <div style={{ marginBottom: 10 }}>
        <label>
          <input
            type="checkbox"
            checked={state.showTime}
            onChange={this.onShowTimeChange}
          />
          showTime
        </label>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <label>
          <input
            type="checkbox"
            checked={state.showDateInput}
            onChange={this.onShowDateInputChange}
          />
          showDateInput
        </label>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <label>
          <input
            checked={state.disabled}
            onChange={this.toggleDisabled}
            type="checkbox"
          />
          disabled
        </label>
      </div>
      <div style={{
        boxSizing: 'border-box',
        position: 'relative',
        display: 'block',
        lineHeight: 1.5,
        marginBottom: 22,
      }}
      >
        <DatePicker
          animation="slide-up"
          calendar={calendar}
          value={state.value}
          onChange={this.onChange}
          getCalendarContainer={this.getCalendarContainer}
          onOpenChange={this.onOpenChange}
          open={state.open}
          style={{ zIndex: 1001 }}
        >
          {
            ({ value }) => {
              return (
                <span tabIndex="0" onMouseDown={this.onMouseDown} onFocus={this.onFocus}>
                  <input
                    placeholder="please select"
                    style={{ width: 250 }}
                    disabled={state.disabled}
                    readOnly
                    tabIndex="-1"
                    className="ant-calendar-picker-input ant-input"
                    value={value && value.format(getFormat(state.showTime)) || ''}
                  />
                  <div ref={this.calendarContainerRef} />
                </span>
              );
            }
          }
        </DatePicker>
      </div>
    </div>);
  }
}

const multiFormats = ['DD/MM/YYYY', 'DD/MM/YY', 'DDMMYY', 'D/M/YY'];

class DemoMultiFormat extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: now,
    };
  }

  onChange = (value) => {
    console.log('Calendar change: ', (value && value.format(format)));
    this.setState({
      value,
    });
  }

  render() {
    const state = this.state;
    return (<div style={{ width: 400, margin: 20 }}>
      <div style={{ marginBottom: 10 }}>
        Accepts multiple input formats
        <br />
        <small>{multiFormats.join(', ')}</small>
        <br/>
      </div>
      <Calendar
        locale={cn ? zhCN : enUS}
        style={{ zIndex: 1000 }}
        dateInputPlaceholder="please input"
        format={multiFormats}
        value={state.value}
        onChange={this.onChange}
        focusablePanel={false}
      />
    </div>);
  }
}

function onStandaloneSelect(value) {
  console.log('onStandaloneSelect');
  console.log(value && value.format(format));
}

function onStandaloneChange(value) {
  console.log('onStandaloneChange');
  console.log(value && value.format(format));
}


ReactDOM.render((<div
  style={{
    zIndex: 1000,
    position: 'relative',
    width: 900,
    margin: '20px auto',
  }}
>
  <div>
    <div style={{ margin: 10 }}>
      <Calendar
        showWeekNumber={false}
        locale={cn ? zhCN : enUS}
        defaultValue={now}
        disabledTime={disabledTime}
        showToday
        format={getFormat(true)}
        showOk={false}
        timePicker={timePickerElement}
        onChange={onStandaloneChange}
        disabledDate={disabledDate}
        onSelect={onStandaloneSelect}
        renderFooter={(mode) => (<span>{mode} extra footer</span>)}
      />
    </div>
    <div style={{ float: 'left', width: 300 }}>
      <Demo defaultValue={now} />
    </div>
    <div style={{ float: 'right', width: 300 }}>
      <Demo defaultCalendarValue={defaultCalendarValue} />
    </div>
    <div style={{ clear: 'both' }}></div>
    <div>
      <DemoMultiFormat />
    </div>
  </div>
</div>), document.getElementById('__react-content'));
