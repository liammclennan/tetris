'use strict';

var _assert = require('assert');

var assert = _interopRequireWildcard(_assert);

var _model = require('../src/model');

var Models = _interopRequireWildcard(_model);

var _underscore = require('underscore');

var _ = _interopRequireWildcard(_underscore);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function pieceHasPoints(piece, points) {
    return points.every(function (item) {
        return piece.hasPoint(item);
    });
} /// <reference path="../typings/tsd.d.ts" />

describe('models', function () {
    describe('game', function () {
        describe('full rows', function () {
            describe('game with last row full', function () {
                var game = new Models.Game(function () {});
                game.rubble = _.range(1, game.cols + 1).map(function (col) {
                    return new Models.Point(game.rows, col);
                });
                it('should have one completed row', function () {
                    return assert.equal(1, game.completedRows().length);
                });
                it('should have row 15 as completed', function () {
                    return assert.equal(15, game.completedRows()[0]);
                });
            });
            describe('collapsing', function () {
                var game = new Models.Game(function () {});
                var row14 = [new Models.Point(game.rows - 1, 1), new Models.Point(game.rows - 1, 2)];
                game.rubble = _.range(1, game.cols + 1).map(function (col) {
                    return new Models.Point(game.rows, col);
                }).concat(row14);
                it('should move row 14 to row 15 (collapse)', function () {
                    assert.equal(22, game.rubble.length);
                    game.collapseRow(15);
                    assert.equal(2, game.rubble.length, 'the full row has been deleted');
                    assert.ok(_.some(game.rubble, function (point) {
                        return point.row === 15 && point.col === 1;
                    }), 'a point from the 2nd row has moved down');
                    assert.ok(_.some(game.rubble, function (point) {
                        return point.row === 15 && point.col === 2;
                    }), 'the other point from the 2nd row has moved down');
                });
            });
        });
    });
    describe('Piece', function () {
        describe('hasPoint', function () {
            var piece = new Models.Piece(Models.shapes.I, 15, 20, new Models.Point(1, 1));
            it('should have (1,1)', function () {
                return assert.ok(piece.hasPoint(new Models.Point(1, 1)));
            });
            it('should have (2,1)', function () {
                return assert.ok(piece.hasPoint(new Models.Point(2, 1)));
            });
            it('should have (3,1)', function () {
                return assert.ok(piece.hasPoint(new Models.Point(3, 1)));
            });
            it('should have (4,1)', function () {
                return assert.ok(piece.hasPoint(new Models.Point(4, 1)));
            });
            it('should not have (2,2)', function () {
                return assert.ok(!piece.hasPoint(new Models.Point(2, 2)));
            });
            it('should not have (1,2)', function () {
                return assert.ok(!piece.hasPoint(new Models.Point(2, 2)));
            });
            it('should not have (3,2)', function () {
                return assert.ok(!piece.hasPoint(new Models.Point(2, 2)));
            });
            it('should not have (3,3)', function () {
                return assert.ok(!piece.hasPoint(new Models.Point(2, 2)));
            });
        });
    });
    describe('rotation', function () {
        describe('general rotation', function () {
            it('should rotate clockwise indefinitely', function () {
                var piece = new Models.Piece(Models.shapes.I, 15, 20);
                assert.equal(piece.rotation, 'N');
                piece.rotate();
                assert.equal(piece.rotation, 'E');
                piece.rotate();
                assert.equal(piece.rotation, 'S');
                piece.rotate();
                assert.equal(piece.rotation, 'W');
                piece.rotate();
                assert.equal(piece.rotation, 'N');
                piece.rotate();
                assert.equal(piece.rotation, 'E');
                piece.rotate();
                assert.equal(piece.rotation, 'S');
                piece.rotate();
                assert.equal(piece.rotation, 'W');
                piece.rotate();
                assert.equal(piece.rotation, 'N');
            });
        });
        describe('rotating an I', function () {
            var piece = new Models.Piece(Models.shapes.I, 15, 20, new Models.Point(1, 1));
            it('should have the expected points to start with', function () {
                return assert.ok(pieceHasPoints(piece, [new Models.Point(1, 1), new Models.Point(2, 1), new Models.Point(3, 1), new Models.Point(4, 1)]));
            });
            it('should rotate to the correct E position', function () {
                piece.rotate();
                assert.ok(pieceHasPoints(piece, [new Models.Point(2, 1), new Models.Point(2, 2), new Models.Point(2, 3), new Models.Point(2, 4)]));
            });
            it('should rotate to the correct S position', function () {
                piece.rotate();
                assert.ok(pieceHasPoints(piece, [new Models.Point(1, 1), new Models.Point(2, 1), new Models.Point(3, 1), new Models.Point(4, 1)]));
            });
            it('should rotate to the correct W position', function () {
                piece.rotate();
                assert.ok(pieceHasPoints(piece, [new Models.Point(2, 1), new Models.Point(2, 2), new Models.Point(2, 3), new Models.Point(2, 4)]));
            });
            it('should rotate back to N', function () {
                piece.rotate();
                assert.ok(pieceHasPoints(piece, [new Models.Point(1, 1), new Models.Point(2, 1), new Models.Point(3, 1), new Models.Point(4, 1)]));
            });
        });
    });
});