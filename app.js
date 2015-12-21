import * as React from 'react';
import * as ReactDOM  from 'react-dom';
import * as Components from './components';
import * as Model from './model';
import {createStore} from 'redux';
import * as Mousetrap from 'mousetrap';


function reducer(state = new Model.Game(), action) {
  switch (action.type) {
    case 'TICK':
      return state.tick();
    case 'ROTATE':
      return state.rotate();
    default: return state;
  }
}

let store = createStore(reducer);
store.subscribe(() => {
  ReactDOM.render(<Components.GameView game={store.getState()} />, document.getElementById('container'));
});
var counter = 1;
setInterval(() => store.dispatch({ type: 'TICK' }),500);

Mousetrap.bind('space', function() { store.dispatch({type:'ROTATE'}); });
