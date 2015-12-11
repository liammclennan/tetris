
export class Point {
  constructor(row,col) {
    this.row = row;
    this.col = col;
  }
  add(otherPoint) {
    return new Point(this.row -1 + otherPoint.row, this.col - 1 + otherPoint.col);
  }
}

// dictionary of shape type to square offsets
export var shapes = {
  'O': [new Point(1,1),new Point(1,2), new Point(2,1),new Point(2,2)],
  'L': [new Point(1,1), new Point(2,1),new Point(3,1), new Point(4,1)]
};

export function makeA(shapeType) {
  function makeFromPointOffsets(topLeft, pointOffsets) {
    return pointOffsets.map((p) => p.add(topLeft));
  }

  return {
    at: (point) => makeFromPointOffsets(point, shapes[shapeType])
  };
}
