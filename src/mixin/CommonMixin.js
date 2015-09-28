import enUs from '../locale/en-us';

function noop() {}

export default {
  propTypes: {
    className: React.PropTypes.string,
    locale: React.PropTypes.object,
    style: React.PropTypes.object,
    visible: React.PropTypes.bool,
    onSelect: React.PropTypes.func,
    prefixCls: React.PropTypes.string,
    onChange: React.PropTypes.func,
    onOk: React.PropTypes.func,
    onFocus: React.PropTypes.func,
    onBlur: React.PropTypes.func,
    orient: React.PropTypes.arrayOf(React.PropTypes.oneOf(['left', 'top', 'right', 'bottom'])),
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
