import { useState } from "react";
import Board from "./Board";
import "../App.css";

const Game = () => {
  const [history, setHistory] = useState([
    {
      squares: Array(9).fill(null),
    },
  ]);
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXIsNext] = useState(true);
  const [status, setStatus] = useState("");
  const currentHistory = history.slice(0, stepNumber + 1);

  const handleClick = (i) => {
    const current = currentHistory[currentHistory.length - 1];
    const squares = current.squares.slice();
    const winner = calculateWinner(current.squares);

    if (winner || squares[i]) {
      return;
    }

    squares[i] = xIsNext ? "X" : "O";
    setHistory(
      currentHistory.concat([
        {
          squares: squares,
        },
      ])
    );
    setStepNumber(history.length);
    setXIsNext(!xIsNext);

    if (winner) {
      setStatus("Winner: " + winner);
    } else {
      setStatus("Next player: " + (xIsNext ? "X" : "O"));
    }
  };

  const jumpTo = (step) => {
    setStepNumber(step);
    setXIsNext(step % 2 === 0);
  };

  return (
    <div className="game">
      <div className="game-board">
        <Board
          squares={currentHistory[currentHistory.length - 1].squares}
          onClick={(i) => handleClick(i)}
        />
      </div>
      <div className="game-info">
        <div>{status}</div>
        <ol>
          {history.map((_, move) => (
            <li key={move}>
              <button onClick={() => jumpTo(move)}>
                {move ? "Go to move #" + move : "Go to game start"}
              </button>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default Game;

const calculateWinner = (squares) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }

  return null;
};
