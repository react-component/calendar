import React, {PropTypes} from 'react';
import DateTimeFormat from 'gregorian-calendar-format';
import GregorianCalendar from 'gregorian-calendar';
import {classSet} from 'rc-util';
import CalendarPart from './range-calendar/CalendarPart';
import {syncTime, getTodayElement, getOkElement, getTodayTime} from './util/';
import assign from 'object-assign';
import CommonMixin from './mixin/CommonMixin';

function noop() {
}

function getNow() {
  const value = new GregorianCalendar();
  value.setTime(Date.now());
  return value;
}

function onAnchorChange(direction, current) {
  let anchor;
  anchor = current;
  if (direction === 'right') {
    anchor.addMonth(-1);
  }
  this.fireAnchorChange(anchor);
}

function normalizeAnchor(props, init) {
  const value = props.value || init && props.defaultValue || [];
  return props.anchor || init && props.defaultAnchor || value[0] || init && getNow();
}

function onTimeSelect(direction, selectedValue) {
  const index = direction === 'left' ? 0 : 1;
  let value = this.state.value;
  if (value[index]) {
    value = value.concat();
    value[index] = value[index].clone();
    syncTime(selectedValue, value[index]);
    this.fireValueChange(value);
  }
}

function onInputSelect(direction, selectedValue) {
  const originalValue = this.state.value;
  const value = originalValue.concat();
  const index = direction === 'left' ? 0 : 1;
  value[index] = selectedValue;
  if (value[0].getTime() > value[1].getTime()) {
    value.length = 1;
  }
  this.fireValueChange(value);
}

const RangeCalendar = React.createClass({
  propTypes: {
    defaultAnchor: PropTypes.object,
    anchor: PropTypes.object,
    value: PropTypes.array,
    defaultValue: PropTypes.array,
    onOk: PropTypes.func,
    onChange: PropTypes.func,
    onSelect: PropTypes.func,
    formatter: PropTypes.object,
  },

  mixins: [CommonMixin],

  getInitialState() {
    const props = this.props;
    const value = props.value || props.defaultValue;
    const anchor = normalizeAnchor(props, 1);
    return {value, anchor};
  },

  getDefaultProps() {
    return {
      defaultValue: [],
      onAnchorChange: noop,
      formatter: new DateTimeFormat('yyyy-MM-dd'),
    };
  },

  componentWillReceiveProps(nextProps) {
    const newState = {};
    if ('anchor' in nextProps) {
      if (nextProps.anchor) {
        newState.anchor = nextProps.anchor;
      } else {
        newState.anchor = normalizeAnchor(nextProps, 0);
      }
      this.setState(newState);
    }
  },

  onSelect(selectedValue) {
    const originalValue = this.state.value;
    const value = originalValue.concat();
    let changed = false;
    if (!value.length || value.length === 2 && !originalValue.hovering) {
      value.length = 1;
      value[0] = selectedValue;
      changed = true;
    } else if (value[0].getTime() < selectedValue.getTime()) {
      value[1] = selectedValue;
      changed = true;
    } else if (value[0].getTime() > selectedValue.getTime()) {
      value.length = 1;
      value[0] = selectedValue;
      changed = true;
    }
    if (changed) {
      this.fireValueChange(value);
    }
  },

  onDayHover(hoverValue) {
    let value = this.state.value;
    if (!value.length || value.length === 2 && !value.hovering) {
      return;
    }
    if (hoverValue.getTime() < value[0].getTime()) {
      return;
    }
    value = value.concat();
    value[1] = hoverValue;
    value.hovering = 1;
    this.fireValueChange(value);
  },

  onToday() {
    this.setState({
      anchor: getTodayTime(this.state.anchor),
    });
  },

  onOk() {
    this.props.onOk(this.state.value);
  },

  getAnchor() {
    let anchor = this.state.anchor;
    const value = this.state.value;
    if (value[0]) {
      anchor = anchor.clone();
      syncTime(value[0], anchor);
    }
    return anchor;
  },

  getAnchorEndValue() {
    const endValue = this.state.anchor.clone();
    endValue.addMonth(1);
    const value = this.state.value;
    if (value[1]) {
      syncTime(value[1], endValue);
    }
    return endValue;
  },

  render() {
    const props = this.props;
    const state = this.state;
    const prefixCls = props.prefixCls;
    const orient = state.orient;
    const className = {
      [props.className]: !!props.className,
      [prefixCls]: 1,
      [`${prefixCls}-hidden`]: !props.visible,
      [prefixCls + '-range']: 1,
    };
    if (orient) {
      orient.forEach(o => {
        className[`${prefixCls}-orient-${o}`] = 1;
      });
    }
    const classes = classSet(className);
    const newProps = {
      range: state.value,
      onSelect: this.onSelect,
      onDayHover: this.onDayHover,
    };

    return (<div className={classes} style={props.style}
                 tabIndex="0" onFocus={this.onFocus}
                 onBlur={this.onBlur}>
      <CalendarPart {...props} {...newProps} direction="left"
                                             value={this.getAnchor()}
                                             onInputSelect={onInputSelect.bind(this, 'left')}
                                             onTimeSelect={onTimeSelect.bind(this, 'left')}
                                             onAnchorChange={onAnchorChange.bind(this, 'left')}/>
      <CalendarPart {...props} {...newProps} direction="right"
                                             value={this.getAnchorEndValue()}
                                             onInputSelect={onInputSelect.bind(this, 'right')}
                                             onTimeSelect={onTimeSelect.bind(this, 'right')}
                                             onAnchorChange={onAnchorChange.bind(this, 'right')}/>

      <div style={{textAlign: 'center'}}>
        {getTodayElement(assign({}, props, {value: state.anchor, onToday: this.onToday}))}
        {getOkElement(assign({}, props, {
          value: state.anchor,
          onOk: this.onOk,
          okDisabled: state.value.length !== 2 || state.value.hovering,
        }))}
      </div>
    </div>);
  },

  fireValueChange(value) {
    if (!('value' in this.props)) {
      this.setState({value});
    }
    this.props.onChange(value);
    if (value.length === 2 && !value.hovering) {
      this.props.onSelect(value);
    }
  },

  fireAnchorChange(anchor) {
    const props = this.props;
    if (!('anchor' in props)) {
      this.setState({anchor});
    }
    props.onAnchorChange(anchor);
  },
});

export default RangeCalendar;
