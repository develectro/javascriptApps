document.addEventListener('DOMContentLoaded', () => {
    const gameBoardElement = document.querySelector('.game-board');
    const newGameButton = document.getElementById('newGameButton');
    let htmlCellElements = []; // To store references to the HTML cell elements (will be 2D)

    let numRows = 0;
    let numCols = 0;

    // Game state
    let playerPos = null; // { r: row, c: col }
    let cats = [];        // Array of { r, c, id, trapped }
    let cheesePos = null; // { r, c } (if used, currently just visual)

    // Define what each cell type means in the logical board
    const EMPTY = 0;
    const WALL = 1;
    const BLOCK = 2;
    const CHEESE_ITEM = 3; // If cheese is an item to pick up

    // Initialize a 2D array for the game logic board (terrain and pushable blocks)
    let logicalBoard = [];

    function initializeBoardFromHTML() {
        const flatHtmlCells = Array.from(gameBoardElement.querySelectorAll('.cell'));

        const gameBoardStyles = window.getComputedStyle(gameBoardElement);
        numCols = gameBoardStyles.gridTemplateColumns.split(' ').length;
        numRows = flatHtmlCells.length / numCols;

        htmlCellElements = []; // Reset and make 2D
        logicalBoard = [];
        cats = [];
        playerPos = null;
        // cheesePos = null; // If cheese is dynamic

        let cellIndex = 0;
        for (let r = 0; r < numRows; r++) {
            logicalBoard[r] = [];
            htmlCellElements[r] = [];
            for (let c = 0; c < numCols; c++) {
                const cellElement = flatHtmlCells[cellIndex++];
                htmlCellElements[r][c] = cellElement;

                if (cellElement.classList.contains('wall')) {
                    logicalBoard[r][c] = WALL;
                } else if (cellElement.classList.contains('player')) {
                    playerPos = { r, c };
                    logicalBoard[r][c] = EMPTY; // Player stands on an empty cell
                } else if (cellElement.classList.contains('cat')) {
                    cats.push({ r, c, id: `cat-${cats.length}`, trapped: false });
                    logicalBoard[r][c] = EMPTY; // Cat stands on an empty cell
                } else if (cellElement.classList.contains('block')) {
                    logicalBoard[r][c] = BLOCK;
                } else if (cellElement.classList.contains('cheese')) {
                    logicalBoard[r][c] = CHEESE_ITEM; // Represents the cheese item itself
                    cheesePos = {r, c}; // Track its initial position if needed
                } else if (cellElement.classList.contains('trapped-cat')) {
                    logicalBoard[r][c] = BLOCK; // A trapped cat IS a block
                    cats.push({ r, c, id: `cat-${cats.length}`, trapped: true });
                } else {
                    logicalBoard[r][c] = EMPTY;
                }
            }
        }
    }

    function renderBoard() {
        if (!playerPos && cats.length === 0) return; // Avoid rendering if not initialized

        for (let r = 0; r < numRows; r++) {
            for (let c = 0; c < numCols; c++) {
                const cellElement = htmlCellElements[r][c];
                cellElement.className = 'cell'; // Reset classes

                // Set base type from logicalBoard
                switch (logicalBoard[r][c]) {
                    case WALL:
                        cellElement.classList.add('wall');
                        break;
                    case BLOCK:
                        cellElement.classList.add('block');
                        // Check if a cat is trapped at this block location
                        const trappedCatHere = cats.find(cat => cat.r === r && cat.c === c && cat.trapped);
                        if (trappedCatHere) {
                            cellElement.classList.add('trapped-cat'); // Special styling for block with trapped cat
                        }
                        break;
                    case CHEESE_ITEM:
                        cellElement.classList.add('cheese');
                        break;
                    default: // EMPTY
                        cellElement.classList.add('empty');
                        break;
                }

                // Overlay player
                if (playerPos && playerPos.r === r && playerPos.c === c) {
                    cellElement.classList.add('player');
                }

                // Overlay active (non-trapped) cats
                const activeCatHere = cats.find(cat => cat.r === r && cat.c === c && !cat.trapped);
                if (activeCatHere) {
                    cellElement.classList.add('cat');
                }
            }
        }
    }

    function movePlayer(dr, dc) {
        if (!playerPos) return; // Game over or not started

        let playerActionTaken = false;
        const newR = playerPos.r + dr;
        const newC = playerPos.c + dc;

        // Boundary checks
        if (newR < 0 || newR >= numRows || newC < 0 || newC >= numCols) {
            renderBoard(); // Re-render to show no change
            return;
        }

        const targetCellType = logicalBoard[newR][newC];
        const catAtTarget = cats.find(cat => cat.r === newR && cat.c === newC && !cat.trapped);

        if (catAtTarget) {
            gameOver("A cat got you!");
            renderBoard();
            return;
        }

        if (targetCellType === WALL) {
            // No action, player bumped wall
        } else if (targetCellType === BLOCK) {
            const blockPushToR = newR + dr;
            const blockPushToC = newC + dc;

            if (blockPushToR >= 0 && blockPushToR < numRows && blockPushToC >= 0 && blockPushToC < numCols) {
                const afterBlockCellType = logicalBoard[blockPushToR][blockPushToC];
                const catAtBlockPushTarget = cats.find(cat => cat.r === blockPushToR && cat.c === blockPushToC && !cat.trapped);

                if (afterBlockCellType === EMPTY && !catAtBlockPushTarget) {
                    logicalBoard[blockPushToR][blockPushToC] = BLOCK; // New block position
                    logicalBoard[newR][newC] = EMPTY;         // Old block position is now empty
                    playerPos.r = newR;
                    playerPos.c = newC;
                    playerActionTaken = true;
                    checkCatTraps(); // Check immediately after a push
                }
            }
        } else if (targetCellType === EMPTY || targetCellType === CHEESE_ITEM) {
            if (targetCellType === CHEESE_ITEM) {
                logicalBoard[newR][newC] = EMPTY; // Eat cheese
                console.log("Yum, cheese!");
                // Add scoring or other effects here
            }
            playerPos.r = newR;
            playerPos.c = newC;
            playerActionTaken = true;
        }

        if (playerActionTaken && playerPos) { // playerPos check in case game ended by player's own move (unlikely here)
            moveCats(); // Cats take their turn only if player acted
        }

        renderBoard(); // Render the final state of the turn

        if (playerPos) { // Only check win/loss if game is still active
            checkWinCondition();
        }
    }

    function checkCatTraps() {
        cats.forEach(cat => {
            if (cat.trapped || !playerPos) return;

            const { r, c } = cat;
            const neighbors = [ { dr: -1, dc: 0 }, { dr: 1, dc: 0 }, { dr: 0, dc: -1 }, { dr: 0, dc: 1 } ];
            let isTrapped = true;
            for (const offset of neighbors) {
                const nr = r + offset.dr;
                const nc = c + offset.dc;

                if (nr >= 0 && nr < numRows && nc >= 0 && nc < numCols) {
                    if (logicalBoard[nr][nc] !== WALL && logicalBoard[nr][nc] !== BLOCK) {
                        isTrapped = false;
                        break;
                    }
                } else {
                    // Being at the edge and blocked on other sides means effectively walled off by boundary
                }
            }

            if (isTrapped) {
                cat.trapped = true;
                logicalBoard[cat.r][cat.c] = BLOCK; // The cell the cat was on becomes a block
                console.log(`Cat at ${r},${c} is trapped!`);
            }
        });
    }

    function moveCats() {
        if (!playerPos) return; // Game over or no player

        cats.forEach(cat => {
            if (cat.trapped || !playerPos) return; // Skip trapped or if game ended

            // Basic AI: Random valid move. A real game needs smarter AI.
            const possibleMoves = [];
            const directions = [{dr: -1, dc: 0}, {dr: 1, dc: 0}, {dr: 0, dc: -1}, {dr: 0, dc: 1}];
            // Add diagonal moves for more challenging cats if desired
            // const directions = [{dr: -1, dc: 0}, {dr: 1, dc: 0}, {dr: 0, dc: -1}, {dr: 0, dc: 1},
            //                     {dr: -1, dc: -1}, {dr: -1, dc: 1}, {dr: 1, dc: -1}, {dr: 1, dc: 1}];


            for (const dir of directions) {
                const newR = cat.r + dir.dr;
                const newC = cat.c + dir.dc;

                if (newR >= 0 && newR < numRows && newC >= 0 && newC < numCols &&
                    logicalBoard[newR][newC] === EMPTY) { // Can only move to empty cells
                    
                    // Check if another non-trapped cat is already at the target
                    const otherCatAtTarget = cats.find(other => other !== cat && !other.trapped && other.r === newR && other.c === newC);
                    if (!otherCatAtTarget) {
                         possibleMoves.push({ r: newR, c: newC });
                    }
                }
            }

            if (possibleMoves.length > 0) {
                const move = possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
                cat.r = move.r;
                cat.c = move.c;
            }

            // Check for collision with player AFTER cat moves
            if (playerPos && cat.r === playerPos.r && cat.c === playerPos.c && !cat.trapped) {
                gameOver("A cat caught you!");
                return; // Stop further cat moves if game over
            }
        });
        // Note: renderBoard() and checkWinCondition() are called after moveCats in movePlayer()
    }

    document.addEventListener('keydown', (event) => {
        if (!playerPos) return; // Game is over, no more input

        // Prevent page scrolling with arrow keys
        if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(event.key)) {
            event.preventDefault();
        }

        switch (event.key) {
            case 'ArrowUp':    movePlayer(-1, 0); break;
            case 'ArrowDown':  movePlayer(1, 0);  break;
            case 'ArrowLeft':  movePlayer(0, -1); break;
            case 'ArrowRight': movePlayer(0, 1);  break;
        }
    });

    function checkWinCondition() {
        if (!playerPos) return; // Game already over

        const activeCats = cats.filter(cat => !cat.trapped);
        if (activeCats.length === 0 && cats.length > 0) { // All cats are trapped and there were cats to begin with
            gameOver("You trapped all the cats! YOU WIN!");
        }
    }

    function gameOver(message) {
        if (playerPos) { // Ensure game over is called only once
            console.log(message);
            // Display message more prominently on the page in a real game
            setTimeout(() => alert(message), 10); // Timeout to allow final render to show
            playerPos = null; // This effectively stops the game
        }
    }

    function startGame() {
        initializeBoardFromHTML();
        if (playerPos || cats.length > 0) { // Check if board actually has game elements
            renderBoard();
            console.log("Game started. Use arrow keys to move.");
        } else {
            console.error("Board initialization failed or empty board.");
            alert("Error: Could not initialize the game board properly. Check your HTML structure.");
        }
    }

    // --- Initialize Game ---
    if (newGameButton) {
        newGameButton.addEventListener('click', startGame);
    }

    startGame();
});