module.exports = function () {
  var prefixCls = this.state.prefixCls;
  var args = Array.prototype.slice.call(arguments, 0);
  return args.map(function (s) {
    return prefixCls + '-' + s;
  }).join(' ');
};
