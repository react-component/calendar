import React, {PropTypes} from 'react';
import enUs from '../locale/en-us';
import DateTimeFormat from 'gregorian-calendar-format';

function noop() {
}

export default {
  propTypes: {
    className: PropTypes.string,
    locale: PropTypes.object,
    style: PropTypes.object,
    visible: PropTypes.bool,
    onSelect: PropTypes.func,
    prefixCls: PropTypes.string,
    onChange: PropTypes.func,
    onOk: PropTypes.func,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    orient: PropTypes.arrayOf(PropTypes.oneOf(['left', 'top', 'right', 'bottom'])),
  },

  getDefaultProps() {
    return {
      locale: enUs,
      style: {},
      visible: true,
      prefixCls: 'rc-calendar',
      className: '',
      onSelect: noop,
      onChange: noop,
      onFocus: noop,
      onBlur: noop,
    };
  },

  shouldComponentUpdate(nextProps) {
    return this.props.visible || nextProps.visible;
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
      const header = this.refs.header;
      if (header) {
        header.setState({
          showMonthPanel: 0,
          showYearPanel: 0,
        });
      }

      const footer = this.refs.footer;
      if (footer) {
        const time = footer.refs.time;
        if (time) {
          time.setState({
            showHourPanel: 0,
            showMinutePanel: 0,
            showSecondPanel: 0,
          });
        }
      }

      this.props.onBlur();
    }, 100);
  },

  getFormatter() {
    const formatter = this.props.formatter;
    if (formatter) {
      if (typeof formatter === 'string') {
        if (formatter === this.lastFormatter) {
          return this.normalFormatter;
        }
        this.normalFormatter = new DateTimeFormat(formatter);
        this.lastFormatter = formatter;
        return this.normalFormatter;
      }
      return formatter;
    }
    if (this.props.showTime) {
      if (!this.showTimeFormatter) {
        this.showTimeFormatter = new DateTimeFormat('yyyy-MM-dd HH:mm:ss');
      }
      return this.showTimeFormatter;
    }
    if (!this.showDateFormatter) {
      this.showDateFormatter = new DateTimeFormat('yyyy-MM-dd');
    }
    return this.showDateFormatter;
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
