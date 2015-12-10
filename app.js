var React = require('react');
var ReactDOM = require('react-dom');
var Components = require('./components');
var Model = require('./model');

var data = [new Model.O(1,1), new Model.L(1,4)];


ReactDOM.render(
<div>
  {data.map(c => <Components.ShapeView shape={c} />)}
</div>,
    document.getElementById('container')
);
