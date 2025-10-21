import React, { useEffect, useState } from 'react'
import Square from './Square'
import './Game.css';
import Placar from './Placar';


function calculateWinner(squares){
  
  const lines =[
              [0,1,2], [3,4,5], [5,7,8], //linhas
              [0,3,6],[1,4,7], [2,5,8], //colunas
              [0,4,8],[2,4,6] //diagonais
   ];


   for(let [a,b,c] of lines){
    
      //Testando a primaria conbinação
      if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]){
        return squares[a];
      }

   }

    return null;
}

function Game() {

  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsProximo,setIsProximo] = useState(true);
  const [ganhador, setGanhador] = useState(null);

  let teste = 10;
  let newRound = false;
  const winner = calculateWinner(squares);
  let status;

  useEffect(()=>{
      if(winner && ganhador !== winner){
        setGanhador(winner);
      }else if(!winner){
        setGanhador(null);
      }
  }, [winner, ganhador])

  if(winner){
    
    status = "Vencedor "+winner;
    newRound = true;

  }else if(!squares.includes(null)){
    status = "Empate !"
    newRound = true;
  }else{
    status = "Próxima Jogada: "+(xIsProximo ? "X":"O");
    newRound =  false;
    
  }

function handleSquareClick(i){

  if(squares[i] || winner) return; //Verifica se existe uma elemento na posição i, nesse caso caso exista não é feito nada.ou existe vencedor

  const nextSquares = [...squares]; //cria uma cópia

    nextSquares[i] = xIsProximo ? 'X' : 'O';

    setSquares(nextSquares);
    setIsProximo(!xIsProximo);

}

function resetGame(){

  setSquares(Array(9).fill(null));
  setIsProximo(true);
}


  return (
    <div className="game">

        <h1 className="title">Jogo da velha</h1>

        <Placar ganhador={ganhador} />
        <div className={winner?"status winner":"status"}>{status}</div>
        <div className="board">
            <div className="row">{[0,1,2].map((i)=><Square value={squares[i]} onClick={()=>handleSquareClick(i)} key={i}/>)}</div>
            <div className="row">{[3,4,5].map((i)=><Square value={squares[i]} onClick={()=>handleSquareClick(i)} key={i}/>)}</div>
            <div className="row">{[6,7,8].map((i)=><Square value={squares[i]} onClick={()=>handleSquareClick(i)} key={i}/>)}</div>
        </div>
       {newRound && <button className="reset" onClick={resetGame}>Novo Jogo</button> }

    </div>
  )
}

export default Game