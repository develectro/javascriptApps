 
// Define the Tic-Tac-Toe board as a 3x3 array
let board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
];

// Define the players
const HUMAN = 'X';
const AI = 'O';

// Function to check if the game is over
function isGameOver(board) {
    // Check rows, columns, and diagonals for a win
    for (let i = 0; i < 3; i++) {
        if (board[i][0] !== '' && board[i][0] === board[i][1] && board[i][1] === board[i][2]) {
            return true; // Row win
        }
        if (board[0][i] !== '' && board[0][i] === board[1][i] && board[1][i] === board[2][i]) {
            return true; // Column win
        }
    }
    if (board[0][0] !== '' && board[0][0] === board[1][1] && board[1][1] === board[2][2]) {
        return true; // Diagonal win
    }
    if (board[0][2] !== '' && board[0][2] === board[1][1] && board[1][1] === board[2][0]) {
        return true; // Diagonal win
    }

    // Check for a tie (no empty spaces left)
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[i][j] === '') {
                return false; // Game is not over
            }
        }
    }
    return true; // Tie
}

// Function to evaluate the board
function evaluate(board) {
    // Check rows, columns, and diagonals for a win
    for (let i = 0; i < 3; i++) {
        if (board[i][0] === board[i][1] && board[i][1] === board[i][2]) {
            if (board[i][0] === AI) return +10; // AI wins
            else if (board[i][0] === HUMAN) return -10; // Human wins
        }
        if (board[0][i] === board[1][i] && board[1][i] === board[2][i]) {
            if (board[0][i] === AI) return +10; // AI wins
            else if (board[0][i] === HUMAN) return -10; // Human wins
        }
    }
    if (board[0][0] === board[1][1] && board[1][1] === board[2][2]) {
        if (board[0][0] === AI) return +10; // AI wins
        else if (board[0][0] === HUMAN) return -10; // Human wins
    }
    if (board[0][2] === board[1][1] && board[1][1] === board[2][0]) {
        if (board[0][2] === AI) return +10; // AI wins
        else if (board[0][2] === HUMAN) return -10; // Human wins
    }
    return 0; // No winner yet
}

// Minimax algorithm implementation
function minimax(board, depth, isMaximizing) {
    let score = evaluate(board);

    // If the game is over, return the score
    if (score === 10 || score === -10) {
        return score;
    }

    // If it's a tie, return 0
    if (isGameOver(board)) {
        return 0;
    }

    // If it's the AI's turn (maximizing player)
    if (isMaximizing) {
        let best = -Infinity;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (board[i][j] === '') {
                    board[i][j] = AI;
                    best = Math.max(best, minimax(board, depth + 1, !isMaximizing));
                    board[i][j] = ''; // Undo the move
                }
            }
        }
        return best;
    }
    // If it's the human's turn (minimizing player)
    else {
        let best = Infinity;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (board[i][j] === '') {
                    board[i][j] = HUMAN;
                    best = Math.min(best, minimax(board, depth + 1, !isMaximizing));
                    board[i][j] = ''; // Undo the move
                }
            }
        }
        return best;
    }
}

// Function to find the best move for the AI
function findBestMove(board) {
    let bestVal = -Infinity;
    let bestMove = { row: -1, col: -1 };

    // Traverse all cells and evaluate minimax for each empty cell
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[i][j] === '') {
                board[i][j] = AI;
                let moveVal = minimax(board, 0, false);
                board[i][j] = ''; // Undo the move

                // If the value of the current move is better than the best value, update best
                if (moveVal > bestVal) {
                    bestMove.row = i;
                    bestMove.col = j;
                    bestVal = moveVal;
                }
            }
        }
    }
    return bestMove;
}

// Example usage
let bestMove = findBestMove(board);
console.log(`Best move for AI: Row = ${bestMove.row}, Col = ${bestMove.col}`);
