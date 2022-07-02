import Square from "./Square";
import "../App.css";

const Board = (props) => {
  return (
    <div className="board">
      {props.squares.map((val, index) => (
        <Square key={index} value={val} onClick={() => props.onClick(index)} />
      ))}
    </div>
  );
};

export default Board;
