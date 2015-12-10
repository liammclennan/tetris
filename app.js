import * as React from 'react';
import * as ReactDOM  from 'react-dom';
import * as Components from './components';
import * as Model from './model';
import { createStore } from 'redux'

var data = [new Model.O(1,1), new Model.L(1,4)];

function reducer(state = [], action) {
  switch (action.type) {
    case 'TICK':
      state.push(new Model.O(action.data*2,action.data*2));
      return state;
    default: return state;
  }
  return [new Model.O(1,1), new Model.L(1,4)];
}

let store = createStore(reducer);
store.subscribe(() => {
  console.dir(store.getState());
  ReactDOM.render(
  <div>
    {store.getState().map(c => <Components.ShapeView shape={c} />)}
  </div>,
      document.getElementById('container')
  );
});
var counter = 1;
setInterval(() => store.dispatch({ type: 'TICK', data: counter++ }),1000);
