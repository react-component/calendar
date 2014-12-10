var serve = require('koa-static');
var app = require('koa')();
var path = require('path');
var fs = require('fs');
var root = path.resolve(__dirname, './');
var serveIndex = require('koa-serve-index');
var modularize = require('koa-modularize');
var mount = require('koa-mount');
var jsx = require('koa-jsx');
var cwd = __dirname;
var koaBody = require('koa-body');
var jscoverHandler = require('koa-node-jscover');
var jscoverCoveralls = require('node-jscover-coveralls/lib/koa');

// parse application/x-www-form-urlencoded
app.use(koaBody());
app.use(jscoverHandler({
  onlyLoad: function () {
    return 1;
  },
  next: function () {
    return 1;
  }
}));
app.use(jsx(root, {
  reactTools: require('react-tools'),
  next: function () {
    return 1;
  }
}));
app.use(jscoverHandler({
  jscover: require('node-jscover'),
  next: function () {
    return 1;
  }
}));
app.use(mount('/', modularize(root, {
  nowrap: function () {
    return this.url.indexOf('nowrap') != -1 || this.url.indexOf('/node_modules/node-jscover/') != -1;
  }
})));
app.use(jscoverCoveralls());
app.use(serveIndex(root, {
  hidden: true,
  view: 'details'
}));
app.use(serve(root, {
  hidden: true
}));
var port = process.env.npm_package_config_port;
app.listen(port);
console.log('listen at ' + port);