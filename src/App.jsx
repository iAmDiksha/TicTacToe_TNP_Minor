
import './App.css'
import Block from './components/Block'
import {useState} from 'react'

function App() {
  const [state, setState] = useState(Array(9).fill(null));
  const [turn,setTurn] = useState('X');
  const [gameOver,setGameOver] = useState(false);
  const [draw,setDraw] = useState(false);

  const checkDraw = (newState)=>{
    return newState.every((cell) => cell!=null)
  }

  const checkWinner = (newState)=>{
    const win = [
      [0,1,2], [3,4,5], [6,7,8], [0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]
    ];
    
    for(let i=0;i<win.length;i++)
    {
      const [a,b,c] = win[i];
      if(newState[a] != null && newState[a] === newState[b] && newState[b] === newState[c]){
        return true;
      }
    }
    return false;
  }

   function handleClick(index){
     
    if(!gameOver && state[index] === null)
    {
      const newState = [...state]
      newState[index] = turn;
      setState(newState);

      //check if someone won the game
      const winner = checkWinner(newState);
      const isDraw = checkDraw(newState);
      if(winner === true){
        setGameOver(true);
      }

      else if(isDraw){
        setDraw(true);
      }

      //changing the turn
      else{
        setTurn((prev)=>prev==='X'? 'O':'X');
      }
    }
    
   }
  
  return (
    <div className="container">
    <div className="board">
      <div className="row">
        <Block value={state[0]} onSmash={()=>handleClick(0)}/>
        <Block value={state[1]} onSmash={()=>handleClick(1)}/>
        <Block value={state[2]} onSmash={()=>handleClick(2)}/>
      </div>
      <div className="row">
        <Block value={state[3]} onSmash={()=>handleClick(3)}/>
        <Block value={state[4]} onSmash={()=>handleClick(4)}/>
        <Block value={state[5]} onSmash={()=>handleClick(5)}/>
      </div>
      <div className="row">
        <Block value={state[6]} onSmash={()=>handleClick(6)}/>
        <Block value={state[7]} onSmash={()=>handleClick(7)}/>
        <Block value={state[8]} onSmash={()=>handleClick(8)}/>
      </div>
    </div>
    {gameOver && <h1>'{turn}' Won The Game! 🎉</h1>}
    {draw && <h1>It's a Draw! 😇</h1>}
    </div>
  )
}

export default App