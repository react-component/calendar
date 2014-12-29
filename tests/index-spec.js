/** @jsx React.DOM */
if (location.href.indexOf('spmjs.io')!==-1) {
  alert('not support SPM!');
} else {
  var expect = require('expect.js');
  var Calendar = require('../index');
  var React = require('react/addons');
// var sinon = require('sinon');
  var TestUtils = React.addons.TestUtils;
  var Simulate = TestUtils.Simulate;
  var async = require('async');
  require('/assets/dpl.css');

  describe('calendar', function () {
    var calendar;
    var container = document.createElement('div');
    document.body.appendChild(container);

    beforeEach(function (done) {
      React.render(<Calendar showToday={1} />, container, function () {
        calendar = this;
        done();
      });
    });

    afterEach(function () {
      React.unmountComponentAtNode(container);
    });

    it('render works', function () {
      expect(TestUtils.scryRenderedDOMComponentsWithClass(calendar, 'rc-calendar-cell').length).to.above(0);
    });

    it('onSelect works', function (done) {
      var day;
      calendar.setProps({
        onSelect: function (d) {
          expect(d.getDayOfMonth()).to.be(parseInt(day.props.children), 10);
          done();
        }
      }, function () {
        calendar = this;
        day = TestUtils.scryRenderedDOMComponentsWithClass(calendar, 'rc-calendar-date')[5];
        Simulate.click(day);
      });
    });

    it('month panel shows', function (done) {
      expect(TestUtils.scryRenderedDOMComponentsWithClass(calendar, 'rc-calendar-month-panel').length).to.be(0);
      Simulate.click(TestUtils.findRenderedDOMComponentWithClass(calendar, 'rc-calendar-month-select'));
      setTimeout(function () {
        expect(TestUtils.scryRenderedDOMComponentsWithClass(calendar, 'rc-calendar-month-panel').length).to.be(1);
        expect(TestUtils.scryRenderedDOMComponentsWithClass(calendar, 'rc-calendar-month-panel-month').length).to.be(12);
        done();
      }, 10);

    });

    it('year panel works', function (done) {
      async.series([function (done) {
        Simulate.click(TestUtils.findRenderedDOMComponentWithClass(calendar, 'rc-calendar-month-select'));
        setTimeout(done, 10);
      }, function (done) {
        Simulate.click(TestUtils.findRenderedDOMComponentWithClass(calendar, 'rc-calendar-month-panel-year-select'));
        setTimeout(done, 10);
      }, function (done) {
        expect(TestUtils.scryRenderedDOMComponentsWithClass(calendar, 'rc-calendar-year-panel').length).to.be(1);
        expect(TestUtils.scryRenderedDOMComponentsWithClass(calendar, 'rc-calendar-year-panel-year').length).to.be(12);
        done();
      }], done);
    });

    it('decade panel works', function (done) {
      async.series([function (done) {
        Simulate.click(TestUtils.findRenderedDOMComponentWithClass(calendar, 'rc-calendar-month-select'));
        setTimeout(done, 10);
      }, function (done) {
        Simulate.click(TestUtils.findRenderedDOMComponentWithClass(calendar, 'rc-calendar-month-panel-year-select'));
        setTimeout(done, 10);
      }, function (done) {
        Simulate.click(TestUtils.findRenderedDOMComponentWithClass(calendar, 'rc-calendar-year-panel-decade-select'));
        setTimeout(done, 10);
      }, function (done) {
        expect(TestUtils.scryRenderedDOMComponentsWithClass(calendar, 'rc-calendar-decade-panel').length).to.be(1);
        expect(TestUtils.scryRenderedDOMComponentsWithClass(calendar, 'rc-calendar-decade-panel-decade').length).to.be(12);
        done();
      }], done);
    });
  });
}
