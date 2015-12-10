import * as React from 'react';
import * as ReactDOM from 'react-dom';

export var ShapeView = React.createClass({
  render: function () {
    return <div>
      {this.props.shape.squares().map(sq => <Square row={sq.row} col={sq.col} />)}
    </div>;
  }
});

export var Square = React.createClass({
    render: function() {
    		var s = {
        	left: (this.props.col-1) * 25 + 'px',
          top: (this.props.row-1) * 25 + 'px'
        };
        return <div className="square" style={s}></div>;
    }
});

export var LShape = React.createClass({
	render: function () {
  	return <div>
    	<Square row={this.props.row} col={this.props.col} />
  		<Square row={this.props.row+1} col={this.props.col} />
      <Square row={this.props.row+2} col={this.props.col} />
  		<Square row={this.props.row+3} col={this.props.col} />
    </div>;
  }
});

export var SShape = React.createClass({
	render: function () {
  	return <div>
    	<Square row={this.props.row} col={this.props.col+1} />
  		<Square row={this.props.row} col={this.props.col+2} />
      <Square row={this.props.row+1} col={this.props.col} />
  		<Square row={this.props.row+1} col={this.props.col+1} />
    </div>;
  }
});
