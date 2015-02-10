function cx(classNames) {
  if (typeof classNames === 'object') {
    return Object.keys(classNames).filter(function (className) {
      return classNames[className];
    }).join(' ');
  } else {
    return Array.prototype.join.call(arguments, ' ');
  }
}

var KeyCode = {
  ESC: 27,
  ENTER: 13,
  PAGE_UP: 33,
  PAGE_DOWN: 34,
  END: 35,
  HOME: 36,
  LEFT: 37,
  UP: 38,
  RIGHT: 39,
  DOWN: 40
};

module.exports = {
  cx: cx,
  createChainedFunction: function (one, two) {
    var hasOne = typeof one === 'function';
    var hasTwo = typeof two === 'function';

    if (!hasOne && !hasTwo) {
      return null;
    }
    if (!hasOne) {
      return two;
    }
    if (!hasTwo) {
      return one;
    }

    return function chainedFunction() {
      one.apply(this, arguments);
      two.apply(this, arguments);
    };
  },
  prefixClsFn: function () {
    var prefixCls = this.state.prefixCls;
    var args = Array.prototype.slice.call(arguments, 0);
    return args.map(function (s) {
      return prefixCls + '-' + s;
    }).join(' ');
  },
  KeyCode: KeyCode
};
