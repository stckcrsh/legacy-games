import Vector from 'victor';

// everything should be based on forward pointing up (0,-1)
// all the letters refer to a direction relative to the forward vector
// f = forward
// b = backward
// l = left
// r = right
// this way moving diagonal is just a combination of two letters
export const VECTOR_GRID: Array<[Vector, string, number]> = [
  [new Vector(0, 1), 'b', 1],
  [new Vector(0, -1), 'f', 1],
  [new Vector(1, 0), 'l', 1],
  [new Vector(-1, 0), 'l', 1],
  [new Vector(1, 1), 'lb', 1],
  [new Vector(1, -1), 'lf', 1],
  [new Vector(-1, 1), 'lb', 1],
  [new Vector(-1, -1), 'lf', 1],
  [new Vector(2,0), 'l', 2],
  [new Vector(-2, 0), 'l', 2],
  [new Vector(0, 2), 'b', 2],
  [new Vector(0, -2), 'f', 2],
  [new Vector(1, 2), 'b', 3],
  [new Vector(1, -2), 'f', 3],
  [new Vector(-1, 2), 'b', 3],
  [new Vector(-1, -2), 'f', 3],
  [new Vector(3, 0), 'l', 3],
  [new Vector(-3, 0), 'l', 3],
  [new Vector(0, 3), 'b', 3],
  [new Vector(0, -3), 'f', 3],
  [new Vector(2, -1), 'l', 3],
  [new Vector(2, 1), 'l', 3],
  [new Vector(-2, -1), 'l', 3],
  [new Vector(-2, 1), 'l', 3],
];

export const NEIGHBORS: Vector[] = [
  new Vector(0, 1),
  new Vector(0, -1),
  new Vector(1, 0),
  new Vector(-1, 0),
  new Vector(1, 1),
  new Vector(1, -1),
  new Vector(-1, 1),
  new Vector(-1, -1),
];

const onSegment = (p: Vector, q: Vector, r: Vector): boolean => {
  if (
    q.x <= Math.max(p.x, r.x) &&
    q.x >= Math.min(p.x, r.x) &&
    q.y <= Math.max(p.y, r.y) &&
    q.y >= Math.min(p.y, r.y)
  )
    return true;

  return false;
};

const orientation = (p: Vector, q: Vector, r: Vector) => {
  // See https://www.geeksforgeeks.org/orientation-3-ordered-points/
  // for details of below formula.
  const val = (q.y - p.y) * (r.x - q.x) - (q.x - p.x) * (r.y - q.y);

  if (val == 0) return 0; // collinear

  return val > 0 ? 1 : 2; // clock or counterclock wise
};

export const doIntersect = (
  _a: Vector,
  _b: Vector,
  _c: Vector,
  _d: Vector
): boolean => {
  const a = _a.clone();
  const b = _b.clone();
  const c = _c.clone();
  const d = _d.clone();

  const o1 = orientation(a, b, c);
  const o2 = orientation(a, b, d);
  const o3 = orientation(c, d, a);
  const o4 = orientation(c, d, b);

  if (o1 !== o2 && o3 !== o4) {
    return true;
  }

  if (o1 === 0 && onSegment(a, c, b)) {
    return true;
  }

  if (o2 === 0 && onSegment(a, d, b)) {
    return true;
  }

  if (o3 === 0 && onSegment(c, a, d)) {
    return true;
  }

  if (o4 === 0 && onSegment(c, b, d)) {
    return true;
  }

  return false;
};

// // if the angleOfVectors is <(PI/2) then you are moving forward
// // if angle is >(PI/2) then you are moving backwards
// // this lets us say that when you cross the finish line and your angle is
// export const angleOfVectorsRadians2 = (a: Vector, b: Vector) => {
//   // const dot = a.normalize().dot(b.normalize());
//   // const angle = Math.acos(dot);
//   // return angle;

//   const dot = a.dot(b);
//   const angle = Math.acos(dot / (a.length() * b.length()));
//   return angle
// };

/**
 * Calculates the angle between two vectors in radians
 */
export const angleOfVectorsRadians = (a: Vector, b: Vector) => {
  const cloneA = a.clone();
  const cloneB = b.clone();

  const dot = cloneA.normalize().dot(cloneB.normalize());
  const det = cloneA.x * cloneB.y - cloneA.y * cloneB.x;
  const angle = Math.atan2(det, dot);
  return angle;
};

export const scaleVector = (v: Vector, scale: Vector) => {
  return new Vector(v.x * scale.x, v.y * scale.y);
};

export const rotateVector2d = (v: Vector, radians: number): Vector => {
  const x = v.x * Math.cos(radians) - v.y * Math.sin(radians);
  const y = v.x * Math.sin(radians) + v.y * Math.cos(radians);
  return new Vector(x, y);
};


export const getVelocity = (start: Vector, end: Vector) => {
  const delta = end.clone().subtract(start);
  return delta;
};
