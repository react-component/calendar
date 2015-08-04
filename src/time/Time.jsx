import React from 'react';
import rcUtil, {KeyCode} from 'rc-util';
import TimePanel from './TimePanel';
const setHourOfDay = 'setHourOfDay';
const setMinutes = 'setMinutes';
const setSeconds = 'setSeconds';

function padding(number) {
  let ret = number;
  if (ret < 10) {
    ret = '0' + ret;
  }
  return ret;
}

function loop(value, min, max) {
  let ret = value;
  if (ret === min - 1) {
    ret = max;
  } else if (ret === max + 1) {
    ret = min;
  }
  return ret;
}

function keyDownWrap(method, min, max) {
  return function onKeyDown(e) {
    const value = e.target.value;
    let number = parseInt(value, 10);
    const keyCode = e.keyCode;
    let handled;
    if (keyCode === KeyCode.DOWN) {
      number++;
      e.stopPropagation();
      e.preventDefault();
      handled = 1;
    } else if (keyCode === KeyCode.UP) {
      number--;
      e.stopPropagation();
      e.preventDefault();
      handled = 1;
    }
    if (handled) {
      number = loop(number, min, max);
      const time = this.props.value.clone();
      time[method](number);
      this.props.onChange(time, e);
    }
  };
}

export default
class Time extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showHourPanel: 0,
      showMinutePanel: 0,
      showSecondPanel: 0,
    };
    const events = [
      'onHourKeyDown', 'onMinuteKeyDown',
      'onSecondKeyDown', 'onHourClick',
      'onMinuteClick', 'onSecondClick',
      'onSelectPanel',
    ];
    events.forEach(m => {
      this[m] = this[m].bind(this);
    });
  }

  shouldComponentUpdate() {
    return rcUtil.PureRenderMixin.shouldComponentUpdate.apply(this, arguments);
  }

  onSelectPanel(value, setter) {
    this.setState({
      showHourPanel: 0,
      showMinutePanel: 0,
      showSecondPanel: 0,
    }, ()=> {
      // ie9 has broken focus
      React.findDOMNode(this.refs[setter]).focus();
    });
    this.props.onChange(value);
  }

  onHourClick() {
    this.setState({
      showHourPanel: 1,
      showMinutePanel: 0,
      showSecondPanel: 0,
    });
  }

  onMinuteClick() {
    this.setState({
      showHourPanel: 0,
      showMinutePanel: 1,
      showSecondPanel: 0,
    });
  }

  onSecondClick() {
    this.setState({
      showHourPanel: 0,
      showMinutePanel: 0,
      showSecondPanel: 1,
    });
  }


  render() {
    const state = this.state;
    const props = this.props;
    const prefixCls = props.prefixCls;
    const value = props.value;
    const locale = props.locale;
    const hour = value.getHourOfDay();
    const minute = value.getMinutes();
    const second = value.getSeconds();
    let panel;
    const commonProps = {
      value: value,
      onSelect: this.onSelectPanel,
      rootPrefixCls: prefixCls,
    };
    if (state.showHourPanel) {
      panel = (<TimePanel rowCount={6} colCount={4} getter="getHourOfDay" setter={setHourOfDay}
                          title={locale.hourPanelTitle}
        {...commonProps}/>);
    } else if (state.showMinutePanel) {
      panel = (<TimePanel rowCount={6} colCount={10} getter="getMinutes" setter={setMinutes}
                          title={locale.minutePanelTitle}
        {...commonProps}/>);
    } else if (state.showSecondPanel) {
      panel = (<TimePanel rowCount={6} colCount={10} getter="getSeconds" setter={setSeconds}
                          title={locale.secondPanelTitle}
        {...commonProps}/>);
    }
    return (<span className={`${prefixCls}-time`}>
      <input className={`${prefixCls}-time-input`}
             title={locale.hourInput}
             ref={setHourOfDay}
             readOnly
             value={padding(hour)}
             onClick={this.onHourClick}
             onKeyDown={this.onHourKeyDown}/>
      <span className={`${prefixCls}-time-minute`}>
        <span> : </span>
        <input className={`${prefixCls}-time-input`}
               title={locale.minuteInput}
               ref={setMinutes}
               readOnly
               value={padding(minute)}
               onClick={this.onMinuteClick}
               onKeyDown={this.onMinuteKeyDown}/>
      </span>
      <span className={`${prefixCls}-time-second`}>
        <span> : </span>
        <input className={`${prefixCls}-time-input`}
               title={locale.secondInput}
               ref={setSeconds}
               readOnly
               value={padding(second)}
               onClick={this.onSecondClick}
               onKeyDown={this.onSecondKeyDown}/>
      </span>
      {panel}
    </span>);
  }
}

Time.prototype.onHourKeyDown = keyDownWrap('setHourOfDay', 0, 23);
Time.prototype.onMinuteKeyDown = keyDownWrap('setMinutes', 0, 59);
Time.prototype.onSecondKeyDown = keyDownWrap('setSeconds', 0, 59);

Time.propTypes = {
  onChange: React.PropTypes.func,
};

Time.defaultProps = {
  onChange() {
  },
};
