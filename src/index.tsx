import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

type Symbol = 'X' | 'O' | '';

interface SquareProps {
  symbol: Symbol;
  onClick: () => void;
}

class Square extends React.Component<SquareProps> {
  render() {
    return (
      <button className="square" onClick={() => this.props.onClick()}>
        {this.props.symbol}
      </button>
    );
  }
}

interface BoardProps {}

interface BoardState {
  symbols: Array<Symbol>;
  step_idx: number;
}

class Board extends React.Component<BoardProps, BoardState> {
  constructor(props: BoardProps) {
    super(props);
    this.state = {
      symbols: Array<Symbol>(9).fill(''),
      step_idx: 0,
    };
  }

  handleClick(i: number) {
    console.log('handleClick: ' + i);
    const symbols = this.state.symbols.slice();
    if (symbols[i] !== '') {
      return;
    }
    if (this.state.step_idx % 2 === 0) {
      symbols[i] = 'X';
    } else {
      symbols[i] = 'O';
    }
    this.setState({ symbols: symbols, step_idx: this.state.step_idx + 1 });
  }

  renderSquare(i: number) {
    return (
      <Square
        symbol={this.state.symbols[i]}
        onClick={() => this.handleClick(i)}
      />
    );
  }

  render() {
    const status = 'Next player: X';

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(<Game />, document.getElementById('root'));
