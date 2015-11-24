import DateTimeFormat from 'gregorian-calendar-format';

export function getTodayTime(value) {
  const today = value.clone();
  today.setTime(Date.now());
  return today;
}

export function getTitleString(value) {
  return value.getYear() + '-' + (value.getMonth() + 1) + '-' + value.getDayOfMonth();
}

export function getTodayTimeStr(value) {
  const today = getTodayTime(value);
  return getTitleString(today);
}

export function compareByDay(v1, v2) {
  if (v1.getYear() > v2.getYear()) {
    return 1;
  }
  if (v1.getYear() < v2.getYear()) {
    return -1;
  }
  if (v1.getMonth() > v2.getMonth()) {
    return 1;
  }
  if (v1.getMonth() < v2.getMonth()) {
    return -1;
  }

  if (v1.getDayOfMonth() > v2.getDayOfMonth()) {
    return 1;
  }
  if (v1.getDayOfMonth() < v2.getDayOfMonth()) {
    return -1;
  }

  return 0;
}

export function getFormatter(format, locale) {
  if (typeof format === 'string') {
    return new DateTimeFormat(format, locale.format);
  }
  return format;
}

export function syncTime(from, to) {
  to.setHourOfDay(from.getHourOfDay());
  to.setMinutes(from.getMinutes());
  to.setSeconds(from.getSeconds());
}
