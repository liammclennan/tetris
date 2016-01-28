/// <reference path="../typings/tsd.d.ts" />
/// <reference path="redux.d.ts" />
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as Components from './components';
import * as Model from './model';
import { createStore } from 'redux';
import * as Mousetrap from 'mousetrap';
function reducer(state = new Model.Game(), action) {
    switch (action.type) {
        case 'TICK':
            const revedState = state.tick();
            setTimeout(() => store.dispatch({ type: 'TICK' }), 500);
            return revedState;
        case 'ROTATE':
            return state.rotate();
        case 'LEFT':
            return state.left();
        case 'RIGHT':
            return state.right();
        default: return state;
    }
}
Mousetrap.bind('space', () => store.dispatch({ type: 'ROTATE' }));
Mousetrap.bind('left', () => store.dispatch({ type: 'LEFT' }));
Mousetrap.bind('right', () => store.dispatch({ type: 'RIGHT' }));
let store = createStore(reducer);
store.subscribe(() => {
    ReactDOM.render(React.createElement(Components.GameView, {"game": store.getState()}), document.getElementById('container'));
});
store.dispatch({ type: 'TICK' });
