export function getCalendarClassByAlign(prefixCls, placement) {
  const offset = placement.offset || [0, 0];
  let offsetClass = '';
  if (offset && offset.length) {
    offsetClass = `${prefixCls}-placement-offset-x-${offset[0]} ${prefixCls}-placement-offset-y-${offset[1]}`;
  }
  const points = placement.points;
  return `${offsetClass} ${prefixCls}-placement-points-${points[0]}-${points[1]}`;
}

export function getCalendarClassByPlacement(prefixCls, placement) {
  if (typeof placement === 'string') {
    return `${prefixCls}-placement-${placement}`;
  }
  return getCalendarClassByAlign(prefixCls, placement);
}

const autoAdjustOverflow = {
  adjustX: 1,
  adjustY: 1,
};

const targetOffset = [0, 0];

export const placementAlignMap = {
  topLeft: {
    points: ['tl', 'tl'],
    overflow: autoAdjustOverflow,
    offset: [0, -3],
    targetOffset,
  },
  topRight: {
    points: ['tr', 'tr'],
    overflow: autoAdjustOverflow,
    offset: [0, -3],
    targetOffset,
  },
  bottomRight: {
    points: ['br', 'br'],
    overflow: autoAdjustOverflow,
    offset: [0, 3],
    targetOffset,
  },
  bottomLeft: {
    points: ['bl', 'bl'],
    overflow: autoAdjustOverflow,
    offset: [0, 3],
    targetOffset,
  },
};

function isPointsEq(a1, a2) {
  return a1[0] === a2[0] && a1[1] === a2[1];
}

export function fromPlacementStrToAlign(placementStr) {
  return placementAlignMap[placementStr];
}

export function fromPointsToPlacement(align) {
  const points = align.points;
  for (const placement in placementAlignMap) {
    if (placementAlignMap.hasOwnProperty(placement)) {
      if (isPointsEq(placementAlignMap[placement].points, points)) {
        return placement;
      }
    }
  }
  throw new Error('can not find placement for', points);
}
