import React from "react";
import moment from "moment";

class TimeFooter extends React.Component {
  constructor() {
    super();
    this.clickInput = this.clickInput.bind(this);
    this.inputValue = this.inputValue.bind(this);
    this.changeValue = this.changeValue.bind(this);

  }

  componentWillMount() {
    let current = this.props.value;
  }

  inputValue(timePosition) {
    let v = "";
    let selectedValue = this.props.selectedValue;
    if (selectedValue) {
      if (timePosition == "hour") {
        v = selectedValue.hour();
      }
      if (timePosition == "min") {
        v = selectedValue.minute();
      }
      if (timePosition == "second") {
        v = selectedValue.second();
      }
    }
    return v == "0" ? "" : v;
  }

  changeValue(timePosition, v) {
    let s = this.props.selectedValue.clone();
    if (!s) {
      s = moment();
      s.hour(0);
      s.minute(0);
      s.second(0);
    }
    if (timePosition == "hour") {
      s.hour(v);
    }
    if (timePosition == "min") {
      s.minute(v);
    }
    if (timePosition == "second") {
      s.second(v);
    }
    this.props.onChange(s);

  }

  clickInput(timePosition) {
    this.props.onChangeTimePosition(timePosition, this.props.onCloseTimePicker)
    this.props.onOpenTimePicker();
  }

  render() {
    return (<span className="rc-calendar-time">
            <input className="rc-calendar-time-input" value={this.inputValue("hour")} onFocus={() => {
              this.clickInput("hour")
            }}
                   onChange={e => {
                     this.changeValue("hour", e.target.value)
                   }}
                   title="上一小时(上方向键), 下一小时(下方向键)"/>
            <span className="rc-calendar-time-minute">
                <span> : </span>
                <input className="rc-calendar-time-input"
                       value={this.inputValue("min")}
                       onChange={e => {
                         this.changeValue("min", e.target.value)
                       }}
                       onFocus={() => {
                         this.clickInput("min")
                       }}
                       title="上一分钟(上方向键), 下一分钟(下方向键)"/>
            </span>
            <span className="rc-calendar-time-second">
                <span> : </span>
                <input className="rc-calendar-time-input"
                       value={this.inputValue("second")}
                       onChange={e => {
                         this.changeValue("second", e.target.value)
                       }}
                       onFocus={() => {
                         this.clickInput("second")
                       }}
                       title="上一秒(上方向键), 下一小时(下方向键)"/>
            </span>
        </span>);
  }
}

export default TimeFooter;
