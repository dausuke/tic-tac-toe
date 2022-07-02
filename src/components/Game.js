import { useState, useEffect } from "react";
import Board from "./Board";
import "../App.css";

const Game = () => {
  const [histories, setHistories] = useState([
    {
      squares: Array(9).fill(null),
    },
  ]);
  const [xIsNext, setXIsNext] = useState(true);
  const [stepNumber, setStepNumber] = useState(0);
  const [status, setStatus] = useState("");

  const handleClick = (boardNumber) => {
    const history = histories.slice(0, stepNumber + 1);
    const current = history[history.length - 1];
    const squares = [...current.squares];
    const winner = calculateWinner(current.squares);

    if (winner || squares[boardNumber]) {
      return;
    }

    squares[boardNumber] = xIsNext ? "X" : "O";

    setHistories([...history, ...[{ squares: squares }]]);
    setStepNumber(history.length);
    setXIsNext(!xIsNext);
  };

  const jumpTo = (step) => {
    setStepNumber(step);
    setXIsNext(step % 2 === 0);
  };

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

      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }

    return null;
  };

  useEffect(() => {
    const current = histories[stepNumber];
    const winner = calculateWinner(current.squares);

    winner
      ? setStatus("Winner: " + winner)
      : setStatus("Next player: " + (xIsNext ? "X" : "O"));
  }, [histories, stepNumber, xIsNext]);

  return (
    <div className="game">
      <div className="game-board">
        <Board
          squares={histories[stepNumber].squares}
          onClick={(i) => handleClick(i)}
        />
      </div>
      <div className="game-info">
        <div>{status}</div>
        <ol>
          {histories.map((_, move) => (
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
