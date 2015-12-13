
export class Point {
  constructor(row,col) {
    this.row = row;
    this.col = col;
    this.key = Math.random().toString();
  }
  add(otherPoint) {
    var p = new Point(this.row -1 + otherPoint.row, this.col - 1 + otherPoint.col);
    p.key = this.key;
    return p;
  }
}

// dictionary of shape type to square offsets
export var shapes = {
  'O': [new Point(1,1),new Point(1,2), new Point(2,1),new Point(2,2)],
  'I': [new Point(1,1), new Point(2,1),new Point(3,1), new Point(4,1)],
  'T': [new Point(1,1), new Point(1,2), new Point(2,2), new Point(1,3)],
  'L': [new Point(1,1), new Point(2,1), new Point(1,2), new Point(1,3)],
  'Z': [new Point(1,1), new Point(1,2), new Point(2,2), new Point(2,3)]
};

export function makeA(shapeType) {
  function makeFromPointOffsets(topLeft, pointOffsets) {
    return pointOffsets.map((p) => p.add(topLeft));
  }

  return {
    at: (point) => makeFromPointOffsets(point, shapes[shapeType])
  };
}
