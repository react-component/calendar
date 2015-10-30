import warning from 'warning';

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

export function getAlignFromPlacement(placementStr) {
  const align = placementAlignMap[placementStr];
  if (!align) {
    warning(false, 'can not find align for placement ' + placementStr);
  }
  return align;
}

export function getPlacementFromAlign(align) {
  const points = align.points;
  for (const placement in placementAlignMap) {
    if (placementAlignMap.hasOwnProperty(placement)) {
      if (isPointsEq(placementAlignMap[placement].points, points)) {
        return placement;
      }
    }
  }
  warning(false, 'can not find placement for', points.join(','));
}
