import * as React from 'react';
import * as ReactDOM  from 'react-dom';
import * as Components from './components';
import * as Model from './model';
import { createStore } from 'redux'

function reducer(state = new Model.Game(), action) {
  switch (action.type) {
    case 'TICK':
      return state.tick();
    default: return state;
  }
}

let store = createStore(reducer);
store.subscribe(() => {
  ReactDOM.render(<Components.GameView game={store.getState()} />, document.getElementById('container'));
});
var counter = 1;
setInterval(() => store.dispatch({ type: 'TICK' }),500);
