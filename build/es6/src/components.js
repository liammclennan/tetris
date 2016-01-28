/// <reference path="../typings/tsd.d.ts" />
import * as React from 'react';
var count = 0;
export var GameView = React.createClass({
    render: function () {
        return React.createElement("div", {"className": "border", "style": { width: this.props.game.cols * 25, height: this.props.game.rows * 25 }}, this.props.game.isGameOver() ?
            React.createElement("span", {"className": "score-display"}, "GAME OVER") : React.createElement("span", null, React.createElement(PieceView, {"piece": this.props.game.fallingPiece}), React.createElement(RubbleView, {"rubble": this.props.game.rubble}), React.createElement(ScoreView, {"score": this.props.game.score})));
    }
});
const ScoreView = React.createClass({
    render: function () {
        return React.createElement("div", {"className": "score-display"}, this.props.score);
    }
});
const PieceView = React.createClass({
    render: function () {
        return React.createElement("div", null, this.props.piece.points().map(sq => React.createElement(Square, {"key": (count++).toString(), "row": sq.row, "col": sq.col})));
    }
});
const RubbleView = React.createClass({
    render: function () {
        return React.createElement("span", null, this.props.rubble.map(sq => React.createElement(Square, {"key": (count++).toString(), "row": sq.row, "col": sq.col})));
    }
});
const Square = React.createClass({
    render: function () {
        var s = {
            left: (this.props.col - 1) * 25 + 'px',
            top: ((this.props.row - 1) * 25) + 'px'
        };
        return React.createElement("div", {"className": "square", "style": s});
    }
});
