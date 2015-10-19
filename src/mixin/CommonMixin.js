import {PropTypes} from 'react';
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
};
