import * as React from 'react';
import * as ReactDOM from 'react-dom';

export var GameView = React.createClass({
  render: function () {
    return <div className="border" style={{width: this.props.game.cols*25, height: this.props.game.rows*25}}>
      <PieceView piece={this.props.game.fallingPiece} />
      <span>
        {this.props.game.rubble.map(sq => <Square key={"row"+sq.row+"col"+sq.col} row={sq.row} col={sq.col} />)}
      </span>
    </div>;
  }
});

export var PieceView = React.createClass({
  render: function () {
    return <div>
      {this.props.piece.points().map(sq => <Square key={"row"+sq.row+"col"+sq.col} row={sq.row} col={sq.col} />)}
    </div>;
  }
});

export var RubbleVew = React.createClass({
  render: function () {
    return <span>

    </span>;
  }
});

export var Square = React.createClass({
    render: function() {
    		var s = {
        	left: (this.props.col-1) * 25 + 'px',
          top: ((this.props.row-1) * 25) + 'px'
        };
        return <div className="square" style={s}></div>;
    }
});
