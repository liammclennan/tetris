
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
  fallOne() {
    return new Point(this.row +1, this.col);
  }
}

// a tetromino
export class Shape {
  constructor(name, points) {
    this.name = name;
    this.points = points;
  }
  at(point) {
    return new Piece(this, point);
  }
}

// an instance of a tetromino on the board
export class Piece {
  constructor(shape, offset = new Point(1,10)) {
    this.shape = shape;
    this.offset = offset;
  }
  points() {
    return this.shape.points.map(point => point.add(this.offset));
  }
  maxRow() {
    return Math.max.apply(null, this.points().map(point => point.row));
  }
  maxCol() {
    return Math.max.apply(null, this.points().map(point => point.col));
  }
}

export class Game {
  constructor() {
    this.startAPiece();
    this.rows = 15;
    this.cols = 20;
    this.rubble = [];
  }
  tick() {
    if (this.fallingPiece.maxRow() == this.rows) {
      this.convertToRubble();
      return this;
    }
    this.fallingPiece.offset = this.fallingPiece.offset.fallOne();
    return this;
  }
  convertToRubble() {
    this.rubble = this.rubble.concat(this.fallingPiece.points());
    this.startAPiece();
  }
  startAPiece() {
    this.fallingPiece = new Piece(shapes.selectRandom());
  }
}

// dictionary of shape type to square offsets
export var shapes = {
  'O': new Shape('O', [new Point(1,1),new Point(1,2), new Point(2,1),new Point(2,2)]),
  'I': new Shape('I', [new Point(1,1), new Point(2,1),new Point(3,1), new Point(4,1)]),
  'T': new Shape('T', [new Point(1,1), new Point(1,2), new Point(2,2), new Point(1,3)]),
  'L': new Shape('L', [new Point(1,1), new Point(2,1), new Point(1,2), new Point(1,3)]),
  'Z': new Shape('Z', [new Point(1,1), new Point(1,2), new Point(2,2), new Point(2,3)])
};
shapes.selectRandom = function() {
  var index = Math.floor(Math.random()*1000000%4);
  return shapes[Object.keys(shapes)[index]];
}
