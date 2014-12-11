/** @jsx React.DOM */

var expect = require('expect.js');
var Calendar = require('../index');
var React = require('react');
var sinon = require('sinon');
var $ = require('jquery');
var simulateDomEvent = require('simulate-dom-event');

describe('calendar', function () {
  function onSelect() {
  }

  React.render(<Calendar showToday={1} onSelect={onSelect}/>, document.getElementById('content'));

  it('works',function(){});
});
