import './EnzymeExt';

const MockDate = require('mockdate');
MockDate.set(new Date('2017-03-29').getTime() + (new Date().getTimezoneOffset() * 60 * 1000));

global.requestAnimationFrame = global.requestAnimationFrame || function requestAnimationFrame(cb) {
  return setTimeout(cb, 0);
};

const Enzyme = require('enzyme');
const Adapter = require('enzyme-adapter-react-16');

Enzyme.configure({ adapter: new Adapter() });
