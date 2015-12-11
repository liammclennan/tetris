import * as React from 'react';
import * as ReactDOM from 'react-dom';

export var ShapeView = React.createClass({
  render: function () {
    return <div>
      {this.props.shape.map(sq => <Square row={sq.row} col={sq.col} />)}
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
