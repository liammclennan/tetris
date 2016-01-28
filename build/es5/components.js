"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Square = exports.RubbleView = exports.PieceView = exports.GameView = undefined;

var _react = require("react");

var React = _interopRequireWildcard(_react);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var count = 0; /// <reference path="../typings/tsd.d.ts" />

var GameView = exports.GameView = React.createClass({
    render: function render() {
        return React.createElement("div", { "onKeyUp": this.handleKeyUp, "className": "border", "style": { width: this.props.game.cols * 25, height: this.props.game.rows * 25 } }, React.createElement(PieceView, { "piece": this.props.game.fallingPiece }), React.createElement(RubbleView, { "rubble": this.props.game.rubble }));
    },
    handleKeyUp: function handleKeyUp(e) {
        console.log('key pressed');
        console.dir(e);
    }
});
var PieceView = exports.PieceView = React.createClass({
    render: function render() {
        return React.createElement("div", null, this.props.piece.points().map(function (sq) {
            return React.createElement(Square, { "key": (count++).toString(), "row": sq.row, "col": sq.col });
        }));
    }
});
var RubbleView = exports.RubbleView = React.createClass({
    render: function render() {
        return React.createElement("span", null, this.props.rubble.map(function (sq) {
            return React.createElement(Square, { "key": (count++).toString(), "row": sq.row, "col": sq.col });
        }));
    }
});
var Square = exports.Square = React.createClass({
    render: function render() {
        var s = {
            left: (this.props.col - 1) * 25 + 'px',
            top: (this.props.row - 1) * 25 + 'px'
        };
        return React.createElement("div", { "className": "square", "style": s });
    }
});