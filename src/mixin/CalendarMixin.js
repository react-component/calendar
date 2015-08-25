import React from 'react';
import enUs from '../locale/en-us';
import {classSet} from 'rc-util';
import GregorianCalendar from 'gregorian-calendar';

function noop() {
}

function getNow() {
  const value = new GregorianCalendar();
  value.setTime(Date.now());
  return value;
}

function getNowByCurrentStateValue(value) {
  let ret;
  if (value) {
    ret = value.clone();
    ret.setTime(Date.now());
  } else {
    ret = getNow();
  }
  return ret;
}

const CalendarMixin = {
  propTypes: {
    value: React.PropTypes.object,
    defaultValue: React.PropTypes.object,
    className: React.PropTypes.string,
    orient: React.PropTypes.arrayOf(React.PropTypes.oneOf(['left', 'top', 'right', 'bottom'])),
    locale: React.PropTypes.object,
    style: React.PropTypes.object,
    visible: React.PropTypes.bool,
    onSelect: React.PropTypes.func,
    prefixCls: React.PropTypes.string,
    onKeyDown: React.PropTypes.func,
    onChange: React.PropTypes.func,
    onFocus: React.PropTypes.func,
    onBlur: React.PropTypes.func,
  },

  getDefaultProps() {
    return {
      locale: enUs,
      style: {},
      visible: true,
      prefixCls: 'rc-calendar',
      className: '',
      onKeyDown: noop,
      onSelect: noop,
      onChange: noop,
      onFocus: noop,
      onBlur: noop,
    };
  },

  getInitialState() {
    const props = this.props;
    const value = props.value || props.defaultValue || getNow();
    return {value};
  },

  componentWillReceiveProps(nextProps) {
    let value = nextProps.value;
    if (value !== undefined) {
      value = value || nextProps.defaultValue || getNowByCurrentStateValue(this.state.value);
      this.setState({
        value,
      });
    }
  },

  shouldComponentUpdate(nextProps) {
    return this.props.visible || nextProps.visible;
  },

  onSelect(value, keyDownEvent) {
    this.setValue(value);
    if (!keyDownEvent) {
      if (this.isAllowedDate(value)) {
        this.props.onSelect(value);
      }
    }
  },

  onFocus() {
    if (this._blurTimer) {
      clearTimeout(this._blurTimer);
      this._blurTimer = null;
    } else {
      this.props.onFocus();
    }
  },

  onBlur() {
    if (this._blurTimer) {
      clearTimeout(this._blurTimer);
    }
    this._blurTimer = setTimeout(()=> {
      this.props.onBlur();
    }, 100);
  },

  renderRoot(newProps) {
    const props = this.props;
    const state = this.state;
    const prefixCls = props.prefixCls;

    const className = {
      [prefixCls]: 1,
      [`${prefixCls}-hidden`]: !props.visible,
      [props.className]: !!props.className,
    };

    const orient = state.orient;
    if (orient) {
      orient.forEach(o => {
        className [`${prefixCls}-orient-${o}`] = 1;
      });
    }

    return (
      <div className={`${classSet(className)} ${newProps.className}`} style={this.props.style}
           tabIndex="0" onFocus={this.onFocus}
           onBlur={this.onBlur} onKeyDown={this.onKeyDown}>
        {newProps.children}
      </div>
    );
  },

  setValue(value) {
    if (!('value' in this.props)) {
      this.setState({
        value,
      });
    }
    this.props.onChange(value);
  },

  isAllowedDate(value) {
    const disabledDate = this.props.disabledDate;
    return !disabledDate || !disabledDate(value);
  },

  setOrient(orient) {
    // FIXME: hack to prevent breaking rc-animate
    if (this.state.orient === orient) {
      return;
    }
    this.state.orient = orient;
    const prefixCls = this.props.prefixCls;
    const root = React.findDOMNode(this);
    let className = root.className.replace(new RegExp(`${prefixCls}-orient-\\w+`, 'g'), '');
    if (orient) {
      orient.forEach(o => {
        className += ` ${prefixCls}-orient-${o}`;
      });
    }
    root.className = className;
  },
};

export default CalendarMixin;
