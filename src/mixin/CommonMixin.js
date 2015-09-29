import enUs from '../locale/en-us';
import DateTimeFormat from 'gregorian-calendar-format';

function noop() {
}

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
