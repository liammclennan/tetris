/// <reference path="../typings/tsd.d.ts" />

import * as assert from 'assert';
import * as Models from '../src/model';
import * as _ from 'underscore';

function pieceHasPoints(piece, points) {
  return points.every(item => piece.hasPoint(item));
}

describe('models', function () {

  describe('game', ()=> {
    describe('full rows', ()=> {

      describe('game with last row full', ()=> {
        var game = new Models.Game(()=>{});
        game.rubble = _.range(1, game.cols+1).map(col => new Models.Point(game.rows, col));

        it('should have one completed row', ()=> assert.equal(1, game.completedRows().length));
        it('should have row 15 as completed', ()=> assert.equal(15, game.completedRows()[0]));
      });

      describe('collapsing', ()=> {
        var game = new Models.Game(()=>{});

        var row14 =  [new Models.Point(game.rows-1,1), new Models.Point(game.rows-1, 2)];
        game.rubble = _.range(1, game.cols+1)
          .map(col => new Models.Point(game.rows, col))
          .concat(row14);

        it('should move row 14 to row 15 (collapse)', ()=> {
          assert.equal(22, game.rubble.length);
          game.collapseRow(15);
          assert.equal(2, game.rubble.length, 'the full row has been deleted');
          assert.ok(_.some(game.rubble, point => point.row === 15 && point.col === 1), 'a point from the 2nd row has moved down');
          assert.ok(_.some(game.rubble, point => point.row === 15 && point.col === 2), 'the other point from the 2nd row has moved down');
        });
      });
    });
  });

  describe('Piece', ()=> {
    describe('hasPoint', ()=> {
      var piece = new Models.Piece(Models.shapes.I, 15,20, new Models.Point(1,1));
      it('should have (1,1)',()=> assert.ok(piece.hasPoint(new Models.Point(1,1))));
      it('should have (2,1)',()=> assert.ok(piece.hasPoint(new Models.Point(2,1))));
      it('should have (3,1)',()=> assert.ok(piece.hasPoint(new Models.Point(3,1))));
      it('should have (4,1)',()=> assert.ok(piece.hasPoint(new Models.Point(4,1))));
      it('should not have (2,2)',()=> assert.ok(!piece.hasPoint(new Models.Point(2,2))));
      it('should not have (1,2)',()=> assert.ok(!piece.hasPoint(new Models.Point(2,2))));
      it('should not have (3,2)',()=> assert.ok(!piece.hasPoint(new Models.Point(2,2))));
      it('should not have (3,3)',()=> assert.ok(!piece.hasPoint(new Models.Point(2,2))));
    });
  });

  describe('rotation', ()=> {
    describe('general rotation', ()=> {
      it('should rotate clockwise indefinitely', ()=> {
        var piece = new Models.Piece(Models.shapes.I, 15,20);
        assert.equal(piece.rotation, 'N')
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

    describe('rotating an I', ()=> {
      var piece = new Models.Piece(Models.shapes.I, 15,20, new Models.Point(1,1));
      it('should have the expected points to start with',
        ()=> assert.ok(pieceHasPoints(piece, [new Models.Point(1,1),new Models.Point(2,1),new Models.Point(3,1),new Models.Point(4,1)])));
      it('should rotate to the correct E position', ()=> {
        piece.rotate();
        assert.ok(pieceHasPoints(piece, [new Models.Point(2,1),new Models.Point(2,2),new Models.Point(2,3),new Models.Point(2,4)]));
      });
      it('should rotate to the correct S position', ()=> {
        piece.rotate();
        assert.ok(pieceHasPoints(piece, [new Models.Point(1,1),new Models.Point(2,1),new Models.Point(3,1),new Models.Point(4,1)]));
      });
      it('should rotate to the correct W position', ()=> {
        piece.rotate();
        assert.ok(pieceHasPoints(piece, [new Models.Point(2,1),new Models.Point(2,2),new Models.Point(2,3),new Models.Point(2,4)]));
      });
      it('should rotate back to N', ()=> {
        piece.rotate();
        assert.ok(pieceHasPoints(piece, [new Models.Point(1,1),new Models.Point(2,1),new Models.Point(3,1),new Models.Point(4,1)]));
      });
    });
  });
});
