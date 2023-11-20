const Square = ({id, player, setPlayer, newState}) => {
  const [color, setColor] = React.useState('cyan');
  const [status, setStatus] = React.useState(null);
  const XorO = ["O","X"];

  const palet =['cyan','purple','green'];
  const getRandomColor = () => palet[Math.floor(Math.random()*3)];
  return (
    <button onClick={(e) =>{
      if(status != null) return;
      let col = getRandomColor();
      setColor(col);
      newState({id:id,color:col});
      let nextPlayer = newState(id);
      setStatus(nextPlayer);
      e.target.style.background = (nextPlayer === 0) ? 'cyan': 'goldenrod';
    }}>
      <h1 className="symbol">
        {XorO[status]}
      </h1>
    </button>
  )
}


const Board = () => {
  const [player, setPlayer] = React.useState(1);
  const [state, setState] = React.useState(Array(9).fill(null));

  //define check winner function
  const checkWinner = (state) => {
    const win = [
      [0,1,2],
      [3,4,5],
      [6,7,8],
      [0,3,6],
      [1,4,7],
      [2,5,8],
      [0,4,8],
      [2,4,6]
    ];

    for (let i = 0; i <win.length; i++) {
      const [a,b,c] = win[i];
      if(state[a] == state[b] && state[a] == state[c] && state[a] != null) {
        return state[a];
      }
    };
    return null;
  }

  let status = `Player ${player}`;
  let winner = checkWinner(state);
  if(winner != null) status = `Player ${winner} wins`

  //define newState function
  const newState = idOfSquare => {
    let thePlayer = player;
    state[idOfSquare] = player;
    setState(state);
    let nextPlayer = (player + 1) %2;
    setPlayer(nextPlayer);
    console.log(`adding state ${JSON.stringify((state))}`);

    return thePlayer;
  }
  
  function renderSquare(i, updatePlayer) {
    return <Square id={i} player={player} setPlayer={updatePlayer} newState={newState}/>
  }
  return (
    <div className="game-board">
      <div className="grid-row">
        {renderSquare(0, setPlayer)}{renderSquare(1, setPlayer)}{renderSquare(2, setPlayer)}
      </div>
      <div className="grid-row">
        {renderSquare(3, setPlayer)}{renderSquare(4, setPlayer)}{renderSquare(5, setPlayer)}
      </div>
      <div className="grid-row">
        {renderSquare(6, setPlayer)}{renderSquare(7, setPlayer)}{renderSquare(8, setPlayer)}
      </div>
      <div id="info">
        <h1>{status}</h1>
      </div>
    </div>
  );
};

// ========================================

ReactDOM.render(<Board />, document.getElementById("root"));
