/// <reference path="../typings/tsd.d.ts" />
import * as React from 'react';
var count = 0;
export var GameView = React.createClass({
    render: function () {
        return React.createElement("div", {"onKeyUp": this.handleKeyUp, "className": "border", "style": { width: this.props.game.cols * 25, height: this.props.game.rows * 25 }}, React.createElement(PieceView, {"piece": this.props.game.fallingPiece}), React.createElement(RubbleView, {"rubble": this.props.game.rubble}));
    },
    handleKeyUp: function (e) {
        console.log('key pressed');
        console.dir(e);
    }
});
export var PieceView = React.createClass({
    render: function () {
        return React.createElement("div", null, this.props.piece.points().map(sq => React.createElement(Square, {"key": (count++).toString(), "row": sq.row, "col": sq.col})));
    }
});
export var RubbleView = React.createClass({
    render: function () {
        return React.createElement("span", null, this.props.rubble.map(sq => React.createElement(Square, {"key": (count++).toString(), "row": sq.row, "col": sq.col})));
    }
});
export var Square = React.createClass({
    render: function () {
        var s = {
            left: (this.props.col - 1) * 25 + 'px',
            top: ((this.props.row - 1) * 25) + 'px'
        };
        return React.createElement("div", {"className": "square", "style": s});
    }
});
