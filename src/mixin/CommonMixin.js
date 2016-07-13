import { PropTypes } from 'react';
import enUs from '../locale/en_US';
import { getFormatter } from '../util/index';

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
      onClear: noop,
    };
  },

  shouldComponentUpdate(nextProps) {
    return this.props.visible || nextProps.visible;
  },

  getFormatter() {
    let formatter = this.props.formatter;
    const locale = this.props.locale;
    if (!formatter) {
      if (this.props.timePicker) {
        formatter = locale.dateTimeFormat;
      } else {
        formatter = locale.dateFormat;
      }
    }
    if (this.normalFormatter && formatter === this.lastFormatter) {
      return this.normalFormatter;
    }
    this.normalFormatter = getFormatter(formatter, locale);
    this.lastFormatter = formatter;
    return this.normalFormatter;
  },

  focus() {
    if (this.refs.root) {
      this.refs.root.focus();
    }
  },
};
