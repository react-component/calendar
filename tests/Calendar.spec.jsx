
var keyCode = require('rc-util').KeyCode;
var expect = require('expect.js');
var Calendar = require('../index');
var React = require('react/addons');
var TestUtils = React.addons.TestUtils;
var Simulate = TestUtils.Simulate;
var async = require('async');

describe('Calendar', function () {
  var calendar;
  var container = document.createElement('div');
  document.body.appendChild(container);

  beforeEach(function (done) {
    React.render(<Calendar showToday={true} showWeekNumber={true} showTime={true}/>, container, function () {
      calendar = this;
      done();
    });
  });

  afterEach(function () {
    React.unmountComponentAtNode(container);
  });

  describe('keyboard works', function () {
    it('left works', function (done) {
      var original = calendar.state.value;
      var expected = original.clone();
      expected.addDayOfMonth(-1);
      Simulate.keyDown(React.findDOMNode(calendar), {
        keyCode: keyCode.LEFT
      });
      setTimeout(function () {
        expect(calendar.state.value.getDayOfMonth()).to.be(expected.getDayOfMonth());
        done();
      }, 10);
    });


    it('right works', function (done) {
      var original = calendar.state.value;
      var expected = original.clone();
      expected.addDayOfMonth(1);
      Simulate.keyDown(React.findDOMNode(calendar), {
        keyCode: keyCode.RIGHT
      });
      setTimeout(function () {
        expect(calendar.state.value.getDayOfMonth()).to.be(expected.getDayOfMonth());
        done();
      }, 10);
    });

    it('up works', function (done) {
      var original = calendar.state.value;
      var expected = original.clone();
      expected.addDayOfMonth(-7);
      Simulate.keyDown(React.findDOMNode(calendar), {
        keyCode: keyCode.UP
      });
      setTimeout(function () {
        expect(calendar.state.value.getDayOfMonth()).to.be(expected.getDayOfMonth());
        done();
      }, 10);
    });

    it('down works', function (done) {
      var original = calendar.state.value;
      var expected = original.clone();
      expected.addDayOfMonth(7);
      Simulate.keyDown(React.findDOMNode(calendar), {
        keyCode: keyCode.DOWN
      });
      setTimeout(function () {
        expect(calendar.state.value.getDayOfMonth()).to.be(expected.getDayOfMonth());
        done();
      }, 10);
    });

    it('pageDown works', function (done) {
      var original = calendar.state.value;
      var expected = original.clone();
      expected.addMonth(1);
      Simulate.keyDown(React.findDOMNode(calendar), {
        keyCode: keyCode.PAGE_DOWN
      });
      setTimeout(function () {
        expect(calendar.state.value.getMonth()).to.be(expected.getMonth());
        done();
      }, 10);
    });

    it('pageUp works', function (done) {
      var original = calendar.state.value;
      var expected = original.clone();
      expected.addMonth(-1);
      Simulate.keyDown(React.findDOMNode(calendar), {
        keyCode: keyCode.PAGE_UP
      });
      setTimeout(function () {
        expect(calendar.state.value.getMonth()).to.be(expected.getMonth());
        done();
      }, 10);
    });

    it('ctrl left works', function (done) {
      var original = calendar.state.value;
      var expected = original.clone();
      expected.addYear(-1);
      Simulate.keyDown(React.findDOMNode(calendar), {
        keyCode: keyCode.LEFT,
        ctrlKey: 1
      });
      setTimeout(function () {
        expect(calendar.state.value.getYear()).to.be(expected.getYear());
        done();
      }, 10);
    });


    it('ctrl right works', function (done) {
      var original = calendar.state.value;
      var expected = original.clone();
      expected.addYear(1);
      Simulate.keyDown(React.findDOMNode(calendar), {
        keyCode: keyCode.RIGHT,
        ctrlKey: 1
      });
      setTimeout(function () {
        expect(calendar.state.value.getYear()).to.be(expected.getYear());
        done();
      }, 10);
    });
  });

  it('next month works', function (done) {
    var month = calendar.state.value.getMonth();
    if (month === 11) {
      month = -1;
    }
    Simulate.click(TestUtils.scryRenderedDOMComponentsWithClass(calendar, 'rc-calendar-next-month-btn')[0]);
    setTimeout(function () {
      expect(calendar.state.value.getMonth()).to.be(month + 1);
      done();
    }, 10);
  });

  it('previous month works', function (done) {
    var month = calendar.state.value.getMonth();
    if (month === 0) {
      month = 12;
    }
    Simulate.click(TestUtils.scryRenderedDOMComponentsWithClass(calendar, 'rc-calendar-prev-month-btn')[0]);
    setTimeout(function () {
      expect(calendar.state.value.getMonth()).to.be(month - 1);
      done();
    }, 10);
  });

  it('next year works', function (done) {
    var year = calendar.state.value.getYear();
    Simulate.click(TestUtils.scryRenderedDOMComponentsWithClass(calendar, 'rc-calendar-next-year-btn')[0]);
    setTimeout(function () {
      expect(calendar.state.value.getYear()).to.be(year + 1);
      done();
    }, 10);
  });

  it('previous year works', function (done) {
    var year = calendar.state.value.getYear();
    Simulate.click(TestUtils.scryRenderedDOMComponentsWithClass(calendar, 'rc-calendar-prev-year-btn')[0]);
    setTimeout(function () {
      expect(calendar.state.value.getYear()).to.be(year - 1);
      done();
    }, 10);
  });

  it('render works', function () {
    expect(TestUtils.scryRenderedDOMComponentsWithClass(calendar, 'rc-calendar-cell').length).to.above(0);
  });

  it('onSelect works', function (done) {
    var day;

    function onSelect(d) {
      expect(d.getDayOfMonth()).to.be(parseInt(day.props.children), 10);
      done();
    }

    calendar = React.render(<Calendar showToday={true}
      onSelect={onSelect}
      showWeekNumber={true} showTime={true}/>, container);
    day = TestUtils.scryRenderedDOMComponentsWithClass(calendar, 'rc-calendar-date')[5];
    Simulate.click(day);
  });

  it('month panel shows', function (done) {
    expect(TestUtils.scryRenderedDOMComponentsWithClass(calendar, 'rc-calendar-month-panel').length).to.be(0);
    Simulate.click(TestUtils.findRenderedDOMComponentWithClass(calendar, 'rc-calendar-month-select'));
    async.series([function (next) {
      expect(TestUtils.scryRenderedDOMComponentsWithClass(calendar, 'rc-calendar-month-panel').length).to.be(1);
      expect(TestUtils.scryRenderedDOMComponentsWithClass(calendar, 'rc-calendar-month-panel-month').length).to.be(12);
      var m = TestUtils.scryRenderedDOMComponentsWithClass(calendar, 'rc-calendar-month-panel-month')[9];
      Simulate.click(m);
      setTimeout(next, 10);
    }, function (next) {
      expect(calendar.state.value.getMonth()).to.be(9);
      next();
    }], done);
  });

  it('year panel works', function (done) {
    var text;
    async.series([function (done) {
      Simulate.click(TestUtils.findRenderedDOMComponentWithClass(calendar, 'rc-calendar-month-select'));
      setTimeout(done, 10);
    }, function (done) {
      Simulate.click(TestUtils.findRenderedDOMComponentWithClass(calendar, 'rc-calendar-month-panel-year-select'));
      setTimeout(done, 10);
    }, function (done) {
      expect(TestUtils.scryRenderedDOMComponentsWithClass(calendar, 'rc-calendar-year-panel').length).to.be(1);
      expect(TestUtils.scryRenderedDOMComponentsWithClass(calendar, 'rc-calendar-year-panel-year').length).to.be(12);
      var year = TestUtils.scryRenderedDOMComponentsWithClass(calendar, 'rc-calendar-year-panel-year')[9];
      text = year.props.children;
      Simulate.click(year);
      setTimeout(done, 10);
    }, function (done) {
      var m = TestUtils.scryRenderedDOMComponentsWithClass(calendar, 'rc-calendar-month-panel-month')[9];
      Simulate.click(m);
      setTimeout(done, 10);
    }, function (done) {
      expect(calendar.state.value.getYear()).to.be(text);
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
