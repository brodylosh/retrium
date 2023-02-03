/**
 * These example boards represent the row and column of live cells, where an empty array
 * represents an empty row. Feel free to keep this data structure or change it to something
 * that works better for you.
 */

export const BLOCK_BOARD = [
  [0, 0, 0, 0, 0, 0],
  [0, 0, 1, 1, 0, 0],
  [0, 0, 1, 1, 0, 0],
  [0, 0, 0, 0, 0, 0],
];

export const BLINKER_BOARD = [
  [0, 0, 0, 0, 0],
  [0, 0, 1, 0, 0],
  [0, 0, 1, 0, 0],
  [0, 0, 1, 0, 0],
  [0, 0, 0, 0, 0],
];

export const BLINKER_GEN_TWO_BOARD = [
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
  [0, 1, 1, 1, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
];

export const EDGE_OSCILLATOR_BOARD = [
  [0, 0, 0, 0, 0, 0],
  [1, 0, 0, 0, 0, 0],
  [1, 0, 0, 0, 0, 0],
  [1, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
];

export const EDGE_GEN_TWO_BOARD = [
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [1, 1, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
];

export const DEAD_BOARD = [
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
];

//Functions:

//  Determining how many neighbors are alive, disregarding the given cell
export function countNeighbors(board, x, y) {
  let sum = 0;

  for (let i = -1; i < 2; i++) {
    for (let j = -1; j < 2; j++) {
      const newRow = x + i;
      const newCol = y + j;
      if (newRow >= board.length || newRow < 0) {
        continue;
      }
      if (newCol >= board[newRow].length || newCol < 0) {
        continue;
      }
      sum += board[x + i][y + j];
    }
  }
  sum -= board[x][y];
  return sum;
}

// Prints the grid to the console for visual purposes
// export function printGrid(board) {
// 	for (let row = 0; row < Object.keys(board).length; row++) {
// 		for (let col = 0; col < board[row].length; col++) {
// 			process.stdout.write(board[row][col] ? 'x' : '-');
// 		}
// 	}
// }

// Implement the Game of Life here to transform the inputBoard into the outputBoard!
export function getNextGeneration(inputBoard) {
  // Creates a deep copy of the inputBoard to be manipulated and used for the next generation
  const outputBoard = JSON.parse(JSON.stringify(inputBoard));

  // Determines the number of rows and columns for the inputBoard
  let rows = inputBoard.length;
  let cols = inputBoard[0].length;

  // Iterates through each row and column to check current state and update the new state based on neighbors
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      // Current State
      let state = inputBoard[i][j];

      // Count the number of live neighbors
      let neighbors = countNeighbors(inputBoard, i, j);

      // Rules to update
      if (state === 0 && neighbors === 3) {
        outputBoard[i][j] = 1;
      } else if (state === 1 && (neighbors < 2 || neighbors > 3)) {
        outputBoard[i][j] = 0;
      } else {
        outputBoard[i][j] = state;
      }
    }
  }

  return outputBoard;
}
