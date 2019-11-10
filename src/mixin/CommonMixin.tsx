import PropTypes from 'prop-types';
import React from 'react';
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

export const commonMixinWrapper = (ComposeComponent: React.ComponentClass<any, any>) => {
  class Wrapper extends ComposeComponent {
    static displayName = 'CommonMixinWrapper';

    static defaultProps = ComposeComponent.defaultProps;

    static getDerivedStateFromProps = ComposeComponent.getDerivedStateFromProps;

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
    };

    focusElement: HTMLElement;

    rootInstance: HTMLElement;

    focus = () => {
      if (this.focusElement) {
        this.focusElement.focus();
      } else if (this.rootInstance) {
        this.rootInstance.focus();
      }
    };

    saveFocusElement = (focusElement: HTMLElement) => {
      this.focusElement = focusElement;
    };

    saveRoot = root => {
      this.rootInstance = root;
    };
  }
  return Wrapper;
};
