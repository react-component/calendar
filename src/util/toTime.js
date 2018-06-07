export function goStartMonth(time) {
  return time.clone().startOf('month');
}

export function goEndMonth(time) {
  return time.clone().endOf('month');
}

export function goTime(time, direction, unit) {
  return time.clone().add(direction, unit);
}
