import { PropTypes } from 'react';
import enUs from '../locale/en_US';

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
      renderFooter() {
        return null;
      },
      renderSidebar() {
        return null;
      },
    };
  },

  shouldComponentUpdate(nextProps) {
    return this.props.visible || nextProps.visible;
  },

  getFormat() {
    let { format } = this.props;
    const { locale, timePicker } = this.props;
    if (!format) {
      if (timePicker) {
        format = locale.dateTimeFormat;
      } else {
        format = locale.dateFormat;
      }
    }
    return format;
  },

  focus() {
    if (this.refs.root) {
      this.refs.root.focus();
    }
  },
};
