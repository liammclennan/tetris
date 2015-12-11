import * as React from 'react';
import * as ReactDOM  from 'react-dom';
import * as Components from './components';
import * as Model from './model';
import { createStore } from 'redux'

var data = [
  Model.makeA('O').at(new Model.Point(2,2)),
  Model.makeA('L').at(new Model.Point(1,5))
];

function reducer(state = [], action) {
  return data;
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
store.dispatch({ type: 'TICK', data: counter++ });
// setInterval(() => store.dispatch({ type: 'TICK', data: counter++ }),1000);
