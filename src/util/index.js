import moment from 'moment-jalaali';
moment.loadPersian({
  usePersianDigits: true,
  dialect: 'persian-modern',
});

const defaultDisabledTime = {
  disabledHours() {
    return [];
  },
  disabledMinutes() {
    return [];
  },
  disabledSeconds() {
    return [];
  },
};

export function getTodayTime(value) {
  const today = moment();
  today.locale(value.locale()).utcOffset(value.utcOffset());
  return today;
}

export function getTitleString(value, calendarType) {
  return calendarType === 'jalali' ? value.format('jYYYY/jM/jD') : value.format('YYYY/M/D');
}

export function getTodayTimeStr(value) {
  const today = getTodayTime(value);
  return getTitleString(today);
}

export function getMonthName(month, calendarType) {
  const locale = month.locale();
  const localeData = month.localeData();
  let monthName;
  if (calendarType === 'jalali') {
    monthName = localeData[locale === 'fa' ? 'jMonths' : 'monthsShort'](month);
  } else {
    monthName = localeData[(locale === 'fa' || locale === 'zh-cn')
      ? 'months' : 'monthsShort'](month);
  }
  return monthName;
}

export function syncTime(from, to) {
  if (!moment.isMoment(from) || !moment.isMoment(to)) return;
  to.hour(from.hour());
  to.minute(from.minute());
  to.second(from.second());
  to.millisecond(from.millisecond());
}

export function getTimeConfig(value, disabledTime) {
  let disabledTimeConfig = disabledTime ? disabledTime(value) : {};
  disabledTimeConfig = {
    ...defaultDisabledTime,
    ...disabledTimeConfig,
  };
  return disabledTimeConfig;
}

export function isTimeValidByConfig(value, disabledTimeConfig) {
  let invalidTime = false;
  if (value) {
    const hour = value.hour();
    const minutes = value.minute();
    const seconds = value.second();
    const disabledHours = disabledTimeConfig.disabledHours();
    if (disabledHours.indexOf(hour) === -1) {
      const disabledMinutes = disabledTimeConfig.disabledMinutes(hour);
      if (disabledMinutes.indexOf(minutes) === -1) {
        const disabledSeconds = disabledTimeConfig.disabledSeconds(hour, minutes);
        invalidTime = disabledSeconds.indexOf(seconds) !== -1;
      } else {
        invalidTime = true;
      }
    } else {
      invalidTime = true;
    }
  }
  return !invalidTime;
}

export function isTimeValid(value, disabledTime) {
  const disabledTimeConfig = getTimeConfig(value, disabledTime);
  return isTimeValidByConfig(value, disabledTimeConfig);
}

export function isAllowedDate(value, disabledDate, disabledTime) {
  if (disabledDate) {
    if (disabledDate(value)) {
      return false;
    }
  }
  if (disabledTime) {
    if (!isTimeValid(value, disabledTime)) {
      return false;
    }
  }
  return true;
}

export function getYearString(year, calendarType) {
  const yearMoment = moment(year.toString());
  return calendarType === 'jalali' ? yearMoment.format('jYYYY') : yearMoment.format('YYYY');
}

export function getYearValue(year, calendarType) {
  return calendarType === 'jalali' ? year.jYear() : year.year();
}

export function getMonthValue(month) {
  const locale = month.locale();
  return locale === 'fa' ? month.jMonth() : month.month();
}

export function getDateString(value, calendarType) {
  return calendarType === 'jalali' ? value.format('jD') : value.format('D');
}

export function formatDate(value, format) {
  if (!value) {
    return '';
  }

  if (Array.isArray(format)) {
    format = format[0];
  }

  return value.format(format);
}
