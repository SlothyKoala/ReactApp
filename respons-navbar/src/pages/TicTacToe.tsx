import { useEffect, useState, useCallback } from "react";
import "../css/styles.css";

interface SquareProps {
  value: string;
  onSquareClick: () => void;
}

function Square({ value, onSquareClick }: SquareProps) {
  return (
    <button
      className="bg-gray-700 text-white border border-gray-500 rounded-md w-16 h-16 text-2xl transition duration-200 hover:bg-green-600 hover:scale-105"
      onClick={onSquareClick}
    >
      {value}
    </button>
  );
}

interface BoardProps {
  xIsNext: boolean;
  squares: string[];
  onPlay: (nextSquares: string[]) => void;
  playerSymbol: string;
  computerSymbol: string;
}

function Board({ xIsNext, squares, onPlay, playerSymbol, computerSymbol }: BoardProps) {
  function handleClick(i: number) {
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = playerSymbol;
    } else {
      nextSquares[i] = computerSymbol;
    }
    onPlay(nextSquares);
  }

  const winner = calculateWinner(squares);
  const status = winner
    ? `Winner: ${winner}`
    : squares.every((square) => square !== null)
    ? "It's a draw!"
    : xIsNext && !computerSymbol ? `Next player: X` : '';

  return (
    <div className="flex flex-col items-center">
      <div className="text-lg text-gray-300 mb-4">{status}</div>
      <div className="grid grid-cols-3 gap-2">
        {squares.map((square, i) => (
          <Square key={i} value={square} onSquareClick={() => handleClick(i)} />
        ))}
      </div>
    </div>
  );
}

export default function Game() {
  const [history, setHistory] = useState<string[][]>([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const [isAgainstComputer, setIsAgainstComputer] = useState(false);
  const [computerSymbol, setComputerSymbol] = useState<string>("");
  const [playerSymbol, setPlayerSymbol] = useState<string>("");

  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  const handlePlay = useCallback(
    (nextSquares: string[]) => {
      const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
      setHistory(nextHistory);
      setCurrentMove(nextHistory.length - 1);
    },
    [history, currentMove]
  );

  function jumpTo(nextMove: number) {
    setCurrentMove(nextMove);
  }

  const resetGame = useCallback(() => {
    setHistory([Array(9).fill(null)]);
    setCurrentMove(0);
    assignSymbols();
  }, []);

  function assignSymbols() {
    const isPlayerX = Math.random() < 0.5; 
    const newPlayerSymbol = isPlayerX ? "X" : "O";
    setPlayerSymbol(newPlayerSymbol);
    setComputerSymbol(isPlayerX ? "O" : "X");
  }

  const moves = history.map((_squares, move) => {
    const description = move > 0 ? `Move #${move}` : "Game Start";
    return (
      <li key={move} className="transition duration-200">
        <button
          onClick={() => jumpTo(move)}
          className="text-blue-300 hover:bg-gray-600 hover:text-green-400 rounded-md p-2 w-full text-left"
        >
          {description}
        </button>
      </li>
    );
  });

  useEffect(() => {
    if (isAgainstComputer && !xIsNext) {
      const emptySquares = currentSquares
        .map((square, index) => (square === null ? index : null))
        .filter((index) => index !== null) as number[];
      const randomIndex =
        emptySquares[Math.floor(Math.random() * emptySquares.length)];
      if (randomIndex !== undefined) {
        const nextSquares = currentSquares.slice();
        nextSquares[randomIndex] = computerSymbol;
        handlePlay(nextSquares);
      }
    }
  }, [currentSquares, isAgainstComputer, xIsNext, handlePlay, computerSymbol]);

  useEffect(() => {
    if (history.length === 1) {
      assignSymbols();
    }
  }, [history]);

  useEffect(() => {
    const winner = calculateWinner(currentSquares);
    if (winner || currentSquares.every((square) => square !== null)) {
      setTimeout(resetGame, 1250);
    }
  }, [currentSquares, resetGame]);

  return (
    <div className="p-6 bg-gray-900 min-h-screen text-gray-300 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-4">Tic Tac Toe</h1>
      <div className="flex flex-row mb-4">
        <button
          onClick={() => {
            setIsAgainstComputer(false);
            resetGame();
          }}
          className={`p-2 bg-gray-800 text-white rounded-lg mr-2 ${!isAgainstComputer ? "bg-blue-600" : ""}`}
        >
          Local (Friends)
        </button>
        <button
          onClick={() => {
            setIsAgainstComputer(true);
            resetGame();
          }}
          className={`p-2 bg-gray-800 text-white rounded-lg ${isAgainstComputer ? "bg-blue-600" : ""}`}
        >
          Against Computer
        </button>
      </div>
      <div className="flex flex-row items-start justify-between w-full max-w-4xl">
        <div className="p-4 bg-gray-800 rounded-lg shadow-md flex-grow mr-4 flex flex-col items-center">
          <p className="text-center text-lg text-gray-300 mb-4">
            Player is: {playerSymbol}
          </p>
          <Board
            xIsNext={xIsNext}
            squares={currentSquares}
            onPlay={handlePlay}
            playerSymbol={playerSymbol}
            computerSymbol={computerSymbol}
          />
        </div>
        <div className="mt-4 w-1/3">
          <h3 className="text-lg font-semibold mb-2">Game History</h3>
          <ol className="bg-gray-800 rounded-lg p-2 shadow-md">{moves}</ol>
        </div>
      </div>
    </div>
  );
}

function calculateWinner(squares: (string | null)[]): string | null {
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
}