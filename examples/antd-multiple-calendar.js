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
    defaultValue: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.array,
    ]),
    defaultCalendarValue: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.array,
    ]),
  }

  constructor(props) {
    super(props);

    this.state = {
      showTime: true,
      disabled: false,
      value: props.defaultValue,
    };
  }

  onChange = (value) => {
    console.log('DatePicker change: ', value && value.map(item => item.format(format)));
    this.setState({
      value,
    });
  }

  toggleDisabled = () => {
    this.setState({
      disabled: !this.state.disabled,
    });
  }

  render() {
    const state = this.state;
    const calendar = (<Calendar
      locale={cn ? zhCN : enUS}
      style={{ zIndex: 1000 }}
      formatter={getFormat(state.showTime)}
      defaultValue={this.props.defaultCalendarValue}
      disabledDate={disabledDate}
      multiple
    />);
    return (<div style={{ width: 400, margin: 20 }}>
      <div style={{ marginBottom: 10 }}>
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
          multiple
          disabled={state.disabled}
          calendar={calendar}
          value={state.value}
          onChange={this.onChange}
        >
          {
            ({ value }) => {
              return (
                <span tabIndex="0">
                  <textarea
                    placeholder="please select"
                    style={{ width: 250 }}
                    disabled={state.disabled}
                    readOnly
                    tabIndex="-1"
                    className="ant-calendar-picker-input ant-input"
                    value={value && value.map(item => item.format(getFormat(false))) || ''}
                  />
                </span>
              );
            }
          }
        </DatePicker>
      </div>
    </div>);
  }
}

function onStandaloneSelect(value) {
  console.log('onStandaloneSelect', value && value.map(item => item.format(format)));
}

function onStandaloneChange(value) {
  console.log('onStandaloneChange', value && value.map(item => item.format(format)));
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
        disabledTime={disabledTime}
        showToday
        formatter={getFormat(true)}
        showOk={false}
        timePicker={timePickerElement}
        onChange={onStandaloneChange}
        disabledDate={disabledDate}
        onSelect={onStandaloneSelect}
        renderFooter={() => 'extra footer'}
        multiple
      />
    </div>
    <div style={{ float: 'left', width: 300 }}>
      <Demo defaultValue={[now]} />
    </div>
    <div style={{ float: 'right', width: 300 }}>
      <Demo defaultCalendarValue={[defaultCalendarValue]} />
    </div>
    <div style={{ clear: 'both' }}></div>
  </div>
</div>), document.getElementById('__react-content'));
