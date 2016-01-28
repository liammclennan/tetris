"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.GameView = undefined;

var _react = require("react");

var React = _interopRequireWildcard(_react);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var count = 0; /// <reference path="../typings/tsd.d.ts" />

var GameView = exports.GameView = React.createClass({
    render: function render() {
        return React.createElement("div", { "className": "border", "style": { width: this.props.game.cols * 25, height: this.props.game.rows * 25 } }, this.props.game.isGameOver() ? React.createElement("span", { "className": "score-display" }, "GAME OVER") : React.createElement("span", null, React.createElement(PieceView, { "piece": this.props.game.fallingPiece }), React.createElement(RubbleView, { "rubble": this.props.game.rubble }), React.createElement(ScoreView, { "score": this.props.game.score })));
    }
});
var ScoreView = React.createClass({
    render: function render() {
        return React.createElement("div", { "className": "score-display" }, this.props.score);
    }
});
var PieceView = React.createClass({
    render: function render() {
        return React.createElement("div", null, this.props.piece.points().map(function (sq) {
            return React.createElement(Square, { "key": (count++).toString(), "row": sq.row, "col": sq.col });
        }));
    }
});
var RubbleView = React.createClass({
    render: function render() {
        return React.createElement("span", null, this.props.rubble.map(function (sq) {
            return React.createElement(Square, { "key": (count++).toString(), "row": sq.row, "col": sq.col });
        }));
    }
});
var Square = React.createClass({
    render: function render() {
        var s = {
            left: (this.props.col - 1) * 25 + 'px',
            top: (this.props.row - 1) * 25 + 'px'
        };
        return React.createElement("div", { "className": "square", "style": s });
    }
});