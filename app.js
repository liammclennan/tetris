var React = require('react');
var ReactDOM = require('react-dom');

var Square = React.createClass({
    render: function() {
    		var s = {
        	left: (this.props.col-1) * 25 + 'px',
          top: (this.props.row-1) * 25 + 'px'
        };
        return <div className="square" style={s}></div>;
    }
});

var OShape = React.createClass({
	render: function () {
  	return <div>
    	<Square row={this.props.row} col={this.props.col} />
  bb		<Square row={this.props.row} col={this.props.col+1} />
      <Square row={this.props.row+1} col={this.props.col} />
  		<Square row={this.props.row+1} col={this.props.col+1} />
    </div>;
  }
});

var LShape = React.createClass({
	render: function () {
  	return <div>
    	<Square row={this.props.row} col={this.props.col} />
  		<Square row={this.props.row+1} col={this.props.col} />
      <Square row={this.props.row+2} col={this.props.col} />
  		<Square row={this.props.row+3} col={this.props.col} />
    </div>;
  }
});

var SShape = React.createClass({
	render: function () {
  	return <div>
    	<Square row={this.props.row} col={this.props.col+1} />
  		<Square row={this.props.row} col={this.props.col+2} />
      <Square row={this.props.row+1} col={this.props.col} />
  		<Square row={this.props.row+1} col={this.props.col+1} />
    </div>;
  }
});

ReactDOM.render(
<div>
	<OShape row={1} col={1} />
  <LShape row={1} col={4} />
  <SShape row={1} col={6} />
</div>,
    document.getElementById('container')
);
