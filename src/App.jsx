import { useState } from 'react'
import './App.css'

function Square({ value, onClick }) {
  return (
    <button className='square' onClick={onClick}>{value}</button>
  )
}

function Board({ squares, xIsNext, onSquareClick }) {
  const winner = calculateWinner(squares)

  let info = ""
  if (winner) {
    info = "Winner: " + winner
  } else if (xIsNext) {
    info = "Next player: X"
  } else {
    info = "Next player: O"
  }

  return (
    <div className='board'>
      <div className='board-row'>
        <Square value={squares[0]} onClick={() => onSquareClick(0)} />
        <Square value={squares[1]} onClick={() => onSquareClick(1)} />
        <Square value={squares[2]} onClick={() => onSquareClick(2)} />
      </div>
      <div className='board-row'>
        <Square value={squares[3]} onClick={() => onSquareClick(3)} />
        <Square value={squares[4]} onClick={() => onSquareClick(4)} />
        <Square value={squares[5]} onClick={() => onSquareClick(5)} />
      </div>
      <div className='board-row'>
        <Square value={squares[6]} onClick={() => onSquareClick(6)} />
        <Square value={squares[7]} onClick={() => onSquareClick(7)} />
        <Square value={squares[8]} onClick={() => onSquareClick(8)} />
      </div>
      <div>{info}</div>
    </div>
  )
}

function History({ histories, onItemClick }) {
  return (
    <div className='histories'>
      {histories.map((_, i) => (
        <button key={i} className='history-item' onClick={() => onItemClick(i)}>
          #{i + 1}
        </button>
      ))}
    </div>
  )
}

function App() {
  const [histories, setHistories] = useState([Array(9).fill("")])
  const [currentHistory, setCurrentHistory] = useState(0)

  const squares = histories[currentHistory]

  function handleSquareClick(index) {
    if (squares[index] || calculateWinner(squares)) return

    const newHistory = squares.slice()
    newHistory[index] = xIsNext ? "X" : "O"

    const newHistories = [...histories.slice(0, currentHistory + 1), newHistory]

    setHistories(newHistories)
    setCurrentHistory(currentHistory + 1)
  }

  function handleHistoryClick(index) {
    setCurrentHistory(index)
  }

  const xIsNext = currentHistory % 2 === 0

  return (
    <div className='game'>
      <Board xIsNext={xIsNext} squares={squares} onSquareClick={handleSquareClick} />
      <History histories={histories} onItemClick={handleHistoryClick} />
    </div>
  )
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]
    if (squares[a] && squares[a] === squares[b] && squares[b] === squares[c]) {
      return squares[a]
    }
  }

  return ""
}

export default App

// todo: tic tac toe improvement from react docs