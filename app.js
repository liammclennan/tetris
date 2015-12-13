import * as React from 'react';
import * as ReactDOM  from 'react-dom';
import * as Components from './components';
import * as Model from './model';
import { createStore } from 'redux'

function reducer(state = [
  Model.makeA('O').at(new Model.Point(2,2)),
  Model.makeA('L').at(new Model.Point(1,5)),
  Model.makeA('I').at(new Model.Point(1,9)),
  Model.makeA('T').at(new Model.Point(1,12)),
  Model.makeA('Z').at(new Model.Point(1,16))
], action) {
  switch (action.type) {
    case 'TICK':
      return state.map(shapes => shapes.map(s => Object.assign({}, s, {row: s.row + 1})));
    default: return state;
  }
}

let store = createStore(reducer);
store.subscribe(() => {
  ReactDOM.render(
  <div>
    {store.getState().map(c => <Components.ShapeView key={c.key} shape={c} />)}
  </div>,
      document.getElementById('container')
  );
});
var counter = 1;
setInterval(() => store.dispatch({ type: 'TICK', data: counter++ }),1000);
