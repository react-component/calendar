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
import TimePickerPanel2 from './TimePicker';
import TimeFooter from './TimeFooter';


import moment from 'moment';
import 'moment/locale/zh-cn';
import 'moment/locale/en-gb';
import "./my-calendar.css"

import TbCalendar from "../src/TbCalendar";

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
  // console.log('disabledTime', date);
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

    this.state = {
      showTime: true,
      showDateInput: true,
      disabled: false,
      value: props.defaultValue,
      timePosition: "hour" //hour min second
    };
    this.onChangeTimePosition = this.onChangeTimePosition.bind(this);
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

  toggleDisabled = () => {
    this.setState({
      disabled: !this.state.disabled,
    });
  }

  onChangeTimePosition(timePosition,onCloseTimePicker)
  {
    this.setState({"timePosition":timePosition,"onCloseTimePicker":onCloseTimePicker});
  }



  render() {
    const state = this.state;

    const timePickerElement2 = <TimePickerPanel2 {...state} />;
    const timePickerElement = <TimePickerPanel />;

    const self = this;

    const renderFooter2 = (argumes) => {
      console.info("argumes",argumes)
      return (
        <TimeFooter {...argumes} onChangeTimePosition={this.onChangeTimePosition} />
        )
    }



    const calendar = (<Calendar
      locale={zhCN}
      style={{ zIndex: 1000 }}
      dateInputPlaceholder="please input"
      formatter={getFormat(state.showTime)}
      disabledTime={state.showTime ? disabledTime : null}
      timePicker={timePickerElement2}
      defaultValue={this.props.defaultCalendarValue}
      showDateInput={state.showDateInput}
      disabledDate={disabledDate}
      renderFooter={renderFooter2}
    />);
    return (<div style={{ width: 400, margin: 20 }}>
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
          disabled={state.disabled}
          calendar={calendar}
          value={state.value}
          onChange={this.onChange}
        >
          {
            ({ value }) => {
              return (
                <span tabIndex="0">
                <input
                  placeholder="please select"
                  style={{ width: 250 }}
                  disabled={state.disabled}
                  readOnly
                  tabIndex="-1"
                  className="ant-calendar-picker-input ant-input"
                  value={value && value.format(getFormat(state.showTime)) || ''}
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
    <div style={{ float: 'left', width: 300 }}>
      <TbCalendar showTime={true} defaultValue="2017-12-31 12:01:02" format="YYYY-MM-DD HH:mm:ss"/>
    </div>
  </div>
</div>), document.getElementById('__react-content'));
