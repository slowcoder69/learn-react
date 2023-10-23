import { useState } from 'react'
import './App.css'

function Square({ win, value, onClick }) {
  return (
    <button className={`square ${win ? "win" : ""}`} onClick={onClick}>{value}</button>
  )
}

function Board({ squares, xIsNext, onSquareClick }) {
  const end = squares.every((i) => i)
  const result = calculateWinner(squares)
  const info = !!result.length
    ? `Winner: ${xIsNext ? "O" : "X"}`
    : !end ? `Next player: ${xIsNext ? "X" : "O"}` : `Draw!!`

  const boardRows = []
  for (let i = 0; i < 3; i++) {
    const boardColumns = []
    for (let j = 0; j < 3; j++) {
      const idx = 3 * i + j
      boardColumns[j] = (
        <Square
          key={j}
          win={result.includes(idx)}
          value={squares[idx]}
          onClick={() => onSquareClick(idx, [i, j])}
        />
      )
    }
    boardRows[i] = <div key={i} className='board-row'>{boardColumns}</div>
  }

  return (
    <div className='board'>
      {boardRows}
      <div>{info}</div>
    </div>
  )
}

function History({ histories, onItemClick }) {
  const [sortAsc, setSortAsc] = useState(true)

  function handleSortClick() {
    setSortAsc(!sortAsc)
  }

  const historiesComponents = histories.map((item, i) => {
    if (histories > 1 && i === histories.length - 1) return

    return (
      <button key={i} className='history-item' onClick={() => onItemClick(i)}>
        {i === 0 ? "Go to game start" : `Go to move #${i} (${item.move.join(",")})`}
      </button>
    )
  })

  if (!sortAsc) {
    historiesComponents.reverse()
  }

  return (
    <div className='histories'>
      <button className='history-item' onClick={handleSortClick}>
        Sort: {sortAsc ? "ASC" : "DESC"}
      </button>
      {historiesComponents}
      <div className='history-label'>
        You are at move #{histories.length - 1}
      </div>
    </div>
  )
}

function App() {
  const [histories, setHistories] = useState([
    { squares: Array(9).fill(""), move: [] }
  ])
  const [currentHistory, setCurrentHistory] = useState(0)

  const squares = histories[currentHistory].squares

  function handleSquareClick(index, move) {
    if (squares[index] || !!calculateWinner(squares).length) return

    const newSquares = squares.slice()
    newSquares[index] = xIsNext ? "X" : "O"

    const newHistories = [
      ...histories.slice(0, currentHistory + 1),
      { squares: newSquares, move }
    ]

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
      return lines[i]
    }
  }

  return []
}

export default App

// todo: continue react docs (thinking in react)