import PropTypes from 'prop-types';
import enUs from '../locale/en_US';

function noop() {
}

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

export const commonMixinWrapper = ComposeComponent => class extends ComposeComponent {
  static displayName = 'CommonMixinWrapper';

  shouldComponentUpdate(nextProps) {
    return this.props.visible || nextProps.visible;
  }

  getFormat = () => {
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
  }

  focus = () => {
    if (this.rootInstance) {
      this.rootInstance.focus();
    }
  }

  saveRoot = (root) => {
    this.rootInstance = root;
  }
};
