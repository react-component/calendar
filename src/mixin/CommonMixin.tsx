import PropTypes from 'prop-types';
import enUs from '../locale/en_US';

function noop() {}

export const propType = {
  className: PropTypes.string,
  locale: PropTypes.object,
  style: PropTypes.object,
  visible: PropTypes.bool,
  onSelect: PropTypes.func,
  prefixCls: PropTypes.string,
  onChange: PropTypes.func,
  onOk: PropTypes.func,
};

export const defaultProp = {
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
