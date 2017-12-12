import 'rc-calendar/assets/index.less';
import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import Calendar from 'rc-calendar';
import DatePicker from 'rc-calendar/src/Picker';
import zhCN from 'rc-calendar/src/locale/zh_CN';
import 'rc-time-picker/assets/index.css';
import TbTimePicker from './taobao-calendar-warp/TimePicker';
import TbTimeFooter from './taobao-calendar-warp/TimeFooter';


import moment from 'moment';
import 'moment/locale/zh-cn';
import "./taobao-calendar-warp/my-calendar.css"
class TbCalendar extends React.Component {
    static propTypes = {
        defaultValue: PropTypes.string,
        format:PropTypes.string,
        onChange:PropTypes.func,
        showTime:PropTypes.bool
    }
    static defaultProps = {
        defaultValue: null,
        format:"YYYY-MM-DD HH:mm:ss",
        onChange:()=>{},
        showTime:true
    }

    constructor(props) {
        super(props);

        this.state = {
            value: props.defaultValue && moment(props.defaultValue,props.format),
            timePosition: "hour" //hour min second
        };
        this.onChangeTimePosition = this.onChangeTimePosition.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    onChange = (value) => {
        this.setState({
                          value,
                      });
        this.props.onChange && this.props.onChange(value && value.format(this.props.format) || "");
    }

    onChangeTimePosition(timePosition,onCloseTimePicker)
    {
        this.setState({"timePosition":timePosition,"onCloseTimePicker":onCloseTimePicker});
    }

    render() {
        const state = this.state;

        const timePickerElement = <TbTimePicker {...state} />;

        const self = this;

        const renderFooter = (argumes) => {
            return (
                <TbTimeFooter {...argumes} onChangeTimePosition={this.onChangeTimePosition} />
            )
        }

        const defaultValue = this.props.defaultValue && moment(this.props.defaultValue, this.props.format)
                             || null;

        const calendar = (<Calendar
            locale={zhCN}
            style={{ zIndex: 1000 }}
            dateInputPlaceholder="请选择"
            formatter={self.props.format}
            timePicker={self.props.showTime?timePickerElement:null}
            defaultValue={defaultValue}
            showDateInput={true}
            renderFooter={self.props.showTime?renderFooter:()=>{}}
        />);
        return (
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
                                    value={value && value.format(self.props.format) || ''}
                                />
                                </span>
                            );
                        }
                    }
                </DatePicker>);
    }
}

export default TbCalendar;