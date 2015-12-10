var React = require('react');
var ReactDOM = require('react-dom');
var Components = require('./components');

ReactDOM.render(
<div>
	<Components.OShape row={1} col={1} />
  <Components.LShape row={1} col={4} />
  <Components.SShape row={1} col={6} />
</div>,
    document.getElementById('container')
);
