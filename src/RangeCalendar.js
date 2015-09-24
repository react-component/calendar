import React, {PropTypes} from 'react';
import DateTimeFormat from 'gregorian-calendar-format';
import GregorianCalendar from 'gregorian-calendar';
import enUs from './locale/en-us';
import {classSet} from 'rc-util';
import CalendarPart from './RangeCalendar/CalendarPart';
import {syncTime, getTodayElement, getOkElement, getTodayTime} from './util/';
import assign from 'object-assign';

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
  const range = props.value || init && props.defaultValue || [];
  return props.anchor || init && props.defaultAnchor || range[0] || init && getNow();
}

function onTimeSelect(direction, value) {
  const index = direction === 'left' ? 0 : 1;
  let range = this.state.range;
  if (range[index]) {
    range = range.concat();
    range[index] = range[index].clone();
    syncTime(value, range[index]);
    this.fireValueChange(range);
  }
}

function onInputSelect(direction, value) {
  const originalRange = this.state.range;
  const range = originalRange.concat();
  const index = direction === 'left' ? 0 : 1;
  range[index] = value;
  if (range[0].getTime() > range[1].getTime()) {
    range.length = 1;
  }
  this.fireValueChange(range);
}

const RangeCalendar = React.createClass({
  propTypes: {
    visible: PropTypes.bool,
    defaultAnchor: PropTypes.object,
    anchor: PropTypes.object,
    value: PropTypes.array,
    defaultValue: PropTypes.array,
    onChange: PropTypes.func,
    formatter: PropTypes.object,
    onOk: PropTypes.func,
  },

  getInitialState() {
    const props = this.props;
    const range = props.value || props.defaultValue;
    const anchor = normalizeAnchor(props, 1);
    return {range, anchor};
  },

  getDefaultProps() {
    return {
      locale: enUs,
      defaultValue: [],
      onChange: noop,
      onAnchorChange: noop,
      onOk: noop,
      style: {},
      visible: true,
      formatter: new DateTimeFormat('yyyy-MM-dd'),
      prefixCls: 'rc-calendar',
      className: '',
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
    }
    this.fireAnchorChange(newState);
  },

  shouldComponentUpdate(nextProps) {
    return this.props.visible || nextProps.visible;
  },

  onSelect(value) {
    const originalRange = this.state.range;
    const range = originalRange.concat();
    let changed = false;
    if (!range.length || range.length === 2 && !originalRange.hovering) {
      range.length = 1;
      range[0] = value;
      changed = true;
    } else if (range[0].getTime() < value.getTime()) {
      range[1] = value;
      changed = true;
    } else if (range[0].getTime() > value.getTime()) {
      range.length = 1;
      range[0] = value;
      changed = true;
    }
    if (changed) {
      this.fireValueChange(range);
    }
  },

  onDayHover(value) {
    let range = this.state.range;
    if (!range.length || range.length === 2 && !range.hovering) {
      return;
    }
    if (value.getTime() < range[0].getTime()) {
      return;
    }
    range = range.concat();
    range[1] = value;
    range.hovering = 1;
    this.fireValueChange(range);
  },

  onToday() {
    this.setState({
      anchor: getTodayTime(this.state.anchor),
    });
  },

  onOk() {
    this.props.onOk(this.state.range);
  },

  getAnchor() {
    let anchor = this.state.anchor;
    const range = this.state.range;
    if (range[0]) {
      anchor = anchor.clone();
      syncTime(range[0], anchor);
    }
    return anchor;
  },

  getAnchorEndValue() {
    const endValue = this.state.anchor.clone();
    endValue.addMonth(1);
    const range = this.state.range;
    if (range[1]) {
      syncTime(range[1], endValue);
    }
    return endValue;
  },

  render() {
    const props = this.props;
    const state = this.state;
    const prefixCls = props.prefixCls;
    const classes = classSet({
      [props.className]: !!props.className,
      [prefixCls]: 1,
      [prefixCls + '-range']: 1,
    });
    const newProps = {
      range: state.range,
      onSelect: this.onSelect,
      onDayHover: this.onDayHover,
    };
    return (<div className={classes} style={props.style}>
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
          okDisabled: state.range.length !== 2 || state.range.hovering,
        }))}
      </div>
    </div>);
  },

  fireValueChange(range) {
    if (!('value' in this.props)) {
      this.setState({range});
    }
    this.props.onChange(range);
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
