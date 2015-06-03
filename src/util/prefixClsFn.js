'use strict';

module.exports = function () {
  var prefixCls = this.state.prefixCls;
  if (arguments.length === 0) {
    return prefixCls;
  }
  var args = Array.prototype.slice.call(arguments, 0);
  return args.map(s => {
    return prefixCls + '-' + s;
  }).join(' ');
};
