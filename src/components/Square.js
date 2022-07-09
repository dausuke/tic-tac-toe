import '../App.css';

const Square = porps => {
  return (
    <button className="square" onClick={porps.onClick}>
      {porps.value}
    </button>
  );
};

export default Square;
