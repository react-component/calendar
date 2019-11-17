import PropTypes from 'prop-types';
import moment from 'moment';
import { getTodayTime } from '../util/index';

function noop() {}

export function getNowByCurrentStateValue(value) {
  let ret;
  if (value) {
    ret = getTodayTime(value);
  } else {
    ret = moment();
  }
  return ret;
}

export const calendarMixinPropTypes = {
  value: PropTypes.object,
  defaultValue: PropTypes.object,
  onKeyDown: PropTypes.func,
};

export const calendarMixinDefaultProps = {
  onKeyDown: noop,
};
