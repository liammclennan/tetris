'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Point = exports.Point = (function () {
    function Point(row, col) {
        _classCallCheck(this, Point);

        this.row = row;
        this.col = col;
    }

    _createClass(Point, [{
        key: 'add',
        value: function add(otherPoint) {
            return new Point(this.row - 1 + otherPoint.row, this.col - 1 + otherPoint.col);
        }
    }, {
        key: 'sameAs',
        value: function sameAs(p2) {
            return this.row === p2.row && this.col === p2.col;
        }
    }]);

    return Point;
})();

var Tetromino = exports.Tetromino = (function () {
    function Tetromino(name, rotator) {
        _classCallCheck(this, Tetromino);

        this.name = name;
        this.rotator = rotator;
    }

    _createClass(Tetromino, [{
        key: 'pointsRotated',
        value: function pointsRotated(rotation) {
            return this.rotator(rotation);
        }
    }]);

    return Tetromino;
})();
// an instance of a tetromino on the board

var Piece = exports.Piece = (function () {
    function Piece(shape, rows, cols) {
        var offset = arguments.length <= 3 || arguments[3] === undefined ? new Point(1, 10) : arguments[3];

        _classCallCheck(this, Piece);

        this.shape = shape;
        this.rows = rows;
        this.cols = cols;
        this.offset = offset;
        this.rotation = 'N';
    }

    _createClass(Piece, [{
        key: 'points',
        value: function points() {
            var _this = this;

            return this.shape.pointsRotated(this.rotation).map(function (point) {
                return point.add(_this.offset);
            });
        }
    }, {
        key: 'maxRow',
        value: function maxRow() {
            return Math.max.apply(null, this.points().map(function (point) {
                return point.row;
            }));
        }
    }, {
        key: 'maxCol',
        value: function maxCol() {
            return Math.max.apply(null, this.points().map(function (point) {
                return point.col;
            }));
        }
    }, {
        key: 'minCol',
        value: function minCol() {
            return Math.min.apply(null, this.points().map(function (point) {
                return point.col;
            }));
        }
    }, {
        key: 'rotate',
        value: function rotate() {
            this.rotation = Piece.rotations()[(Piece.rotations().indexOf(this.rotation) + 1) % 4];
        }
    }, {
        key: 'unRotate',
        value: function unRotate() {
            this.rotation = Piece.rotations()[(Piece.rotations().indexOf(this.rotation) - 1) % 4];
        }
    }, {
        key: 'hasPoint',
        value: function hasPoint(point) {
            return this.points().some(function (item) {
                return item.sameAs(point);
            });
        }
    }, {
        key: 'fallOne',
        value: function fallOne() {
            this.offset = new Point(this.offset.row + 1, this.offset.col);
        }
    }, {
        key: 'liftOne',
        value: function liftOne() {
            this.offset = new Point(this.offset.row - 1, this.offset.col);
        }
    }, {
        key: 'left',
        value: function left() {
            this.offset = new Point(this.offset.row, this.offset.col - 1);
        }
    }, {
        key: 'right',
        value: function right() {
            this.offset = new Point(this.offset.row, this.offset.col + 1);
        }
    }], [{
        key: 'rotations',
        value: function rotations() {
            return ['N', 'E', 'S', 'W'];
        }
    }]);

    return Piece;
})();

var Game = exports.Game = (function () {
    function Game() {
        _classCallCheck(this, Game);

        this.rows = 15;
        this.cols = 20;
        this.startAPiece();
        this.rubble = [];
    }

    _createClass(Game, [{
        key: 'tick',
        value: function tick() {
            var _this2 = this;

            this.transactionDo(function () {
                return _this2.fallingPiece.fallOne();
            }, function () {
                return _this2.fallingPiece.liftOne();
            });
            if (this.fallingPiece.maxRow() == this.rows) {
                this.convertToRubble();
                return this;
            }
            var nextPos = this.fallingPiece.points().map(function (p) {
                return new Point(p.row + 1, p.col);
            });
            if (nextPos.some(function (p) {
                return _this2.rubble.some(function (r) {
                    return r.sameAs(p);
                });
            })) {
                this.convertToRubble();
            }
            ;
            return this;
        }
    }, {
        key: 'convertToRubble',
        value: function convertToRubble() {
            this.rubble = this.rubble.concat(this.fallingPiece.points());
            this.startAPiece();
        }
    }, {
        key: 'startAPiece',
        value: function startAPiece() {
            this.fallingPiece = new Piece(selectRandomShape(), this.rows, this.cols);
        }
    }, {
        key: 'rotate',
        value: function rotate() {
            var _this3 = this;

            this.transactionDo(function () {
                return _this3.fallingPiece.rotate();
            }, function () {
                return _this3.fallingPiece.unRotate();
            });
            return this;
        }
    }, {
        key: 'left',
        value: function left() {
            var _this4 = this;

            this.transactionDo(function () {
                return _this4.fallingPiece.left();
            }, function () {
                return _this4.fallingPiece.right();
            });
            return this;
        }
    }, {
        key: 'right',
        value: function right() {
            var _this5 = this;

            this.transactionDo(function () {
                return _this5.fallingPiece.right();
            }, function () {
                return _this5.fallingPiece.left();
            });
            return this;
        }
    }, {
        key: 'fallingPieceIsOutOfBounds',
        value: function fallingPieceIsOutOfBounds() {
            return this.fallingPiece.minCol() < 1 || this.fallingPiece.maxCol() > this.cols || this.fallingPiece.maxRow() > this.rows;
        }
    }, {
        key: 'fallingPieceOverlapsRubble',
        value: function fallingPieceOverlapsRubble() {
            var _this6 = this;

            return this.fallingPiece.points().some(function (p) {
                return _this6.rubble.some(function (r) {
                    return r.sameAs(p);
                });
            });
        }
    }, {
        key: 'transactionDo',
        value: function transactionDo(thing, compensation) {
            thing();
            if (this.fallingPieceIsOutOfBounds() || this.fallingPieceOverlapsRubble()) {
                compensation();
            }
        }
    }]);

    return Game;
})();
// dictionary of shape type to square offsets

var shapes = exports.shapes = {
    'O': new Tetromino('O', function (rotation) {
        return [new Point(1, 1), new Point(1, 2), new Point(2, 1), new Point(2, 2)];
    }),
    'I': new Tetromino('I', function (rotation) {
        switch (rotation) {
            case 'N':
                return [new Point(1, 1), new Point(2, 1), new Point(3, 1), new Point(4, 1)];
            case 'E':
                return [new Point(2, 1), new Point(2, 2), new Point(2, 3), new Point(2, 4)];
            case 'S':
                return [new Point(1, 1), new Point(2, 1), new Point(3, 1), new Point(4, 1)];
            case 'W':
                return [new Point(2, 1), new Point(2, 2), new Point(2, 3), new Point(2, 4)];
        }
    }),
    'T': new Tetromino('T', function (rotation) {
        switch (rotation) {
            case 'N':
                return [new Point(1, 1), new Point(1, 2), new Point(2, 2), new Point(1, 3)];
            case 'E':
                return [new Point(1, 2), new Point(2, 2), new Point(3, 2), new Point(2, 1)];
            case 'S':
                return [new Point(1, 2), new Point(2, 1), new Point(2, 2), new Point(2, 3)];
            case 'W':
                return [new Point(1, 1), new Point(2, 1), new Point(3, 1), new Point(2, 2)];
        }
    }),
    'L': new Tetromino('L', function (rotation) {
        switch (rotation) {
            case 'N':
                return [new Point(1, 1), new Point(2, 1), new Point(1, 2), new Point(1, 3)];
            case 'E':
                return [new Point(1, 1), new Point(1, 2), new Point(2, 2), new Point(3, 2)];
            case 'S':
                return [new Point(1, 3), new Point(2, 1), new Point(2, 2), new Point(2, 3)];
            case 'W':
                return [new Point(1, 1), new Point(2, 1), new Point(3, 1), new Point(3, 2)];
        }
    }),
    'Z': new Tetromino('Z', function (rotation) {
        switch (rotation) {
            case 'N':
                return [new Point(1, 1), new Point(1, 2), new Point(2, 2), new Point(2, 3)];
            case 'E':
                return [new Point(1, 2), new Point(2, 2), new Point(2, 1), new Point(3, 1)];
            case 'S':
                return [new Point(1, 1), new Point(1, 2), new Point(2, 2), new Point(2, 3)];
            case 'W':
                return [new Point(1, 2), new Point(2, 2), new Point(2, 1), new Point(3, 1)];
        }
    })
};
function selectRandomShape() {
    var index = Math.floor(Math.random() * 1000000 % 5);
    return shapes[Object.keys(shapes)[index]];
}