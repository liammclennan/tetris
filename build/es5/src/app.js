'use strict';

var _react = require('react');

var React = _interopRequireWildcard(_react);

var _reactDom = require('react-dom');

var ReactDOM = _interopRequireWildcard(_reactDom);

var _components = require('./components');

var Components = _interopRequireWildcard(_components);

var _model = require('./model');

var Model = _interopRequireWildcard(_model);

var _redux = require('redux');

var _mousetrap = require('mousetrap');

var Mousetrap = _interopRequireWildcard(_mousetrap);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

/// <reference path="../typings/tsd.d.ts" />
/// <reference path="redux.d.ts" />

function reducer() {
    var state = arguments.length <= 0 || arguments[0] === undefined ? new Model.Game(function () {}) : arguments[0];
    var action = arguments[1];

    if (state.isGameOver()) return state;
    switch (action.type) {
        case 'TICK':
            var revedState = state.tick();
            if (!revedState.isGameOver()) {
                setTimeout(function () {
                    return store.dispatch({ type: 'TICK' });
                }, 600);
            }
            return revedState;
        case 'ROTATE':
            return state.rotate();
        case 'LEFT':
            return state.left();
        case 'RIGHT':
            return state.right();
        default:
            return state;
    }
}
Mousetrap.bind('up', function () {
    return store.dispatch({ type: 'ROTATE' });
});
Mousetrap.bind('left', function () {
    return store.dispatch({ type: 'LEFT' });
});
Mousetrap.bind('right', function () {
    return store.dispatch({ type: 'RIGHT' });
});
var store = (0, _redux.createStore)(reducer);
store.subscribe(function () {
    ReactDOM.render(React.createElement(Components.GameView, { "game": store.getState() }), document.getElementById('container'));
});
store.dispatch({ type: 'TICK' });