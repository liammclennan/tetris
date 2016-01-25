/// <reference path="../typings/tsd.d.ts" />

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as Model from './model';

var count = 0;

interface GameViewProps {
  game: Model.Game;
}
export var GameView = React.createClass<GameViewProps,any>({
  render: function () {
    return <div className="border" style={{width: this.props.game.cols*25, height: this.props.game.rows*25}}>
      { this.props.game.isGameOver() ?
        <span>GAME OVER</span> : <span>
        <PieceView piece={this.props.game.fallingPiece} />
        <RubbleView rubble={this.props.game.rubble} />
        <ScoreView score={this.props.game.score} />
        </span>
      }
    </div>;
  }
});

interface ScoreViewProps { score:number; }
const ScoreView = React.createClass<ScoreViewProps,any>({
  render: function () {
    return <div className="score-display">{this.props.score}</div>;
  }
});

interface PieceViewProps { piece: Model.Piece; }
const PieceView = React.createClass<PieceViewProps,any>({
  render: function () {
    return <div>
      {this.props.piece.points().map(sq => <Square key={(count++).toString()} row={sq.row} col={sq.col} />)}
    </div>;
  }
});

interface RubbleViewProps { rubble: Model.Point[] }
const RubbleView = React.createClass<RubbleViewProps,any>({
  render: function () {
    return <span>
      {this.props.rubble.map(sq => <Square key={(count++).toString()} row={sq.row} col={sq.col} />)}
    </span>;
  }
});

interface SquareProps {
  row:number;
  col:number;
  key:string;
}
const Square = React.createClass<SquareProps,any>({
    render: function() {
    		var s = {
        	left: (this.props.col-1) * 25 + 'px',
          top: ((this.props.row-1) * 25) + 'px'
        };
        return <div className="square" style={s}></div>;
    }
});
