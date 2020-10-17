//Minimax alpha-beta seaching algorithm implementation (Algorithm by: stackabuse.com)
//Important: This is NOT a pure minimax, it's modified to work with DOM

class Game {
    constructor() {
        this.currentState = [
            ['.', '.', '.'],
            ['.', '.', '.'],
            ['.', '.', '.'],
        ];

        this.result = null;
        this.playerTurn = 'X';
        this.x = null;
        this.y = null;
        this.loop = null;
        this.score = null;
        this.gameCase = '';

    }


    initializeGame() {

        this.currentState = [
            ['.', '.', '.'],
            ['.', '.', '.'],
            ['.', '.', '.'],
        ];
        console.log('Let\'s play again');
        this.result = null;
        console.log('Result is set to: ' + this.result);
    }

    drawBoard() {
        let tempArr = [];
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                tempArr[j] = this.currentState[i][j];
            }
            console.log(tempArr[0] + " | " + tempArr[1] + " | " + tempArr[2] + " | ");
            console.log('\n');
        }
    }
    isValid(px, py) {
        if (px < 0 || py < 0 || px > 2 || py > 2)
            return false;

        else if (this.currentState[px][py] != '.')
            return false;

        else
            return true;
    }
    isEnd() {

        //Verticall winning:
        for (let i = 0; i < 3; i++) {
            if (
                this.currentState[0][i] != '.' &&
                (this.currentState[0][i] == this.currentState[1][i]) &&
                (this.currentState[1][i] == this.currentState[2][i])
            )
                return this.currentState[0][i];
        }

        /*
         Horizontal winning:
          this is works in python not javascript :(
          for (let i = 0; i < 3; i++) {
              if (this.currentState[i] == ['X', 'X', 'X']) {
                  console.log('Done Horizontal!')
                  return 'X';
              } else if (this.currentState[i] == ['O', 'O', 'O'])
                  return 'O';
          }
        */

        for (let i = 0; i < 3; i++) {
            if (this.currentState[i][0] != '.' &&
                (this.currentState[i][0] == this.currentState[i][1]) &&
                (this.currentState[i][1] == this.currentState[i][2])) {
                return this.currentState[i][0];
            }
        }

        //Right Diagonal Winning:

        if (
            this.currentState[0][2] != '.' &&
            this.currentState[0][2] == this.currentState[1][1] &&
            this.currentState[0][2] == this.currentState[2][0]
        )
            return this.currentState[0][2];

        //Left Diagonal Winning:
        if (
            this.currentState[0][0] != '.' &&
            (this.currentState[0][0] == this.currentState[1][1]) &&
            (this.currentState[0][0] == this.currentState[2][2])
        )
            return this.currentState[0][0];

        //Check for Empty fields to continue game :
        else {
            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 3; j++) {
                    if (this.currentState[i][j] == '.')
                        return null;
                }
            }
        }

        //Draw
        return '.';
    }


    //Alpha-beta pruning:
    //Much better than normal algorithm in terms of performance:
    //minimax recursion using max() <-> min():

    maxAlphaBeta(alpha, beta) {

        let max = -2;
        let px = null;
        let py = null;
        let m = null;
        let min_i = null;
        let min_j = null;
        //pxpy id for drawing 'O' of the AI:
        let pxpy = null;

        let result = this.isEnd();
        if (result == "X")
            return [-1, 0, 0];
        else if (result == "O")
            return [1, 0, 0];
        else if (result == '.')
            return [0, 0, 0];

        //else
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (this.currentState[i][j] == '.') {
                    this.currentState[i][j] = 'O';

                    let tmp = [m, min_i, min_j] = this.minAlphaBeta(alpha, beta);
                    if (m > max) {
                        max = m;
                        px = i;
                        py = j;
                    }
                    this.currentState[i][j] = '.';
                    //Alpha-beta:
                    if (max >= beta) {
                        return [max, px, py]
                    }
                    if (max > alpha) {
                        alpha = max
                    }
                }
            }
        }
        return [max, px, py];
    }

    //Alpha-Beta min:
    minAlphaBeta(alpha, beta) {

        let min = 2;
        let qx = null;
        let qy = null;
        let m = null;
        let max_i = null;
        let max_j = null;




        let result = this.isEnd();
        if (result == "X")
            return [-1, 0, 0];
        else if (result == "O")
            return [1, 0, 0];
        else if (result == '.')
            return [0, 0, 0];

        //else

        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (this.currentState[i][j] == '.') {
                    this.currentState[i][j] = 'X';
                    [m, max_i, max_j] = this.maxAlphaBeta(alpha, beta);
                    if (m < min) {
                        min = m;
                        qx = i;
                        qy = j;
                    }
                    this.currentState[i][j] = '.';

                    //Alpha-Beta for min()
                    if (min <= alpha) {
                        return [min, qx, qy];
                    }
                    if (min < beta) {
                        beta = min;
                    }
                }
            }
        }
        return [min, qx, qy];
    }

    drawO(n) {
        //this is a helper function for palyAlphaBeta to draw 'O' on UI for AI's turn:
        //this is imported array from Game.js
        switch (n) {
            case '00':
                gridItemsArray[0].innerHTML = "O";
                break;
            case '01':
                gridItemsArray[1].innerHTML = "O";

                break;
            case '02':
                gridItemsArray[2].innerHTML = "O";

                break;
            case '10':
                gridItemsArray[3].innerHTML = "O";

                break;
            case '11':
                gridItemsArray[4].innerHTML = "O";

                break;
            case '12':
                gridItemsArray[5].innerHTML = "O";

                break;
            case '20':
                gridItemsArray[6].innerHTML = "O";

                break;
            case '21':
                gridItemsArray[7].innerHTML = "O";

                break;
            case '22':
                gridItemsArray[8].innerHTML = "O";
                break;
            default:
                break;
        }
    }
    clearBoard() {
        //this is a helper function for playAlphaBeta() to handle Gaming-Over tasks:
        //griditemsAray  is imported from Game.js
        for (let item of gridItemsArray) {
            item.innerHTML = "";
        }
    }


    gameOver() {
        switch (this.gameCase) {
            case 'winning':
                gameOverText.innerText = 'You Won!';
                this.gameCase = '';
                break;
            case 'losing':
                gameOverText.innerText = 'You Are Losing!';
                this.gameCase = '';

                break;
            case 'draw':
                gameOverText.innerText = 'Game is Draw';
                this.gameCase = '';

                break;
            default:
                break;
        }
        // gameOverAlert imported from Game.js
        gameOverAlert.style.visibility = 'visible';
        gameOverOk.style.transitionDuration = 0.5 + 's';
        gameOverNewGame.style.transitionDuration = 0.5 + 's';

        //reset timer, the return value is used for timer:


    }
    playAlphaBeta(x, y, loop, clickedBox) {

        let m = null;
        let px = null;
        let py = null;
        let qx = null;
        let qy = null;

        do {
            loop += 1;
            this.drawBoard();
            this.result = this.isEnd();
            XOtextColor();

            console.log(this.result + " is the result")
            console.log(this.playerTurn)

            // checking for the winner, and notifying by the winner 
            if (this.result != null) {
                if (this.result == 'X') {
                    console.log('X is the Winner');
                    gameEnded = true;
                    this.gameCase = 'winning';
                    this.gameOver();
                    return; //to prevent playing on an already finished game

                } else if (this.result == 'O') {
                    console.log('O is the Winner');
                    console.log('AI is the winner');
                    gameEnded = true;
                    this.gameCase = 'losing';
                    this.gameOver();
                    return; //to prevent playing on an already finished game

                } else if (this.result == '.') {
                    console.log('It is a Draw!');
                    gameEnded = true;
                    this.gameCase = 'draw';
                    this.gameOver();
                    return; //to prevent playing on an already finished game
                }

                this.initializeGame();
                return;
            }

            //Human player's turn
            else if (this.playerTurn == 'X') {

                console.log('Human\'s turn');

                [m, qx, qy] = this.minAlphaBeta(-2, 2); //this is necessary ONLY if you want to hint player1.
                //then use qx, qy to tell him the recommended moves

                console.log('Recommended Move at: ' + "X coordinate: " + qx + "\n Y coordinate: " + qy);
                console.log('Enter your move coordinates: ');

                /*
                //this is for console playing only.
                 px = prompt("enter x coordinate: ");
                 py = prompt("enter y coordinate: ");
                 qx = px;
                 qy = py;
                */

                px = x;
                py = y;
                qx = px;
                qy = py;
                //Entered Moves:
                console.log('Entered X is: ' + x);
                console.log('Entered Y is: ' + y);


                if (this.isValid(px, py)) {
                    console.log("Yes valid, Now AI turn")
                    this.currentState[px][py] = 'X';

                    //Drawing X and O on UI:
                    clickedBox.innerHTML = 'X';

                    this.playerTurn = 'O';
                    // break; TO WHILE CHANGE
                } else {
                    console.log('Move is not valid, try again ..');

                    console.log('NOT VALID X is: ' + x);
                    console.log('NOT VALID Y is: ' + y);
                    console.log('NOTICE: THIS IS NOT A BUG!');
                    // console.log('THIS IS BEACUSE WE NEED LOOP TO WORK TWICE')
                    // console.log('SO NEXT TIME IT WILL FIND THE CLICKED BOX IS STILL')
                    // console.log('THIS IS A FEATURE!')

                }

            } else {
                //AI's turn
                [m, px, py] = this.maxAlphaBeta(-2, 2);
                this.currentState[px][py] = 'O';
                this.playerTurn = 'X';
                //small function to Draw O for the AI:
                this.pxpy = px + '' + py + '';
                this.drawO(this.pxpy);

            }
            // break;

            px = null;
            py = null
        }
        while (loop <= 2);
    }
}

let play = new Game();



for (let item of gridItemsArray) {
    item.addEventListener('click', function () {
        this.loop = 0;

        //some variables are imported from GameConfigs.js : gameStarted , gameTimer, isTimerRunning
        if (!gameStarted) {
            // gameStarted = true; it's inside turnOnTimer()
            turnOnTimer(gameTimer, isTimerRunning);
        } else if (!gameStarted) {
            turnOnTimer(gameTimer, isTimerRunning);
            console.log('x and o :/)');
            //if any losing state happened terminate game here, this is optional
        }


        switch (item) {
            case box1:
                this.x = 0;
                this.y = 0;
                break;
            case box2:
                this.x = 0;
                this.y = 1;
                break;
            case box3:
                this.x = 0;
                this.y = 2;
                break;
            case box4:
                this.x = 1;
                this.y = 0;
                break;
            case box5:
                this.x = 1;
                this.y = 1;
                break;
            case box6:
                this.x = 1;
                this.y = 2;
                break;
            case box7:
                this.x = 2;
                this.y = 0;
                break;
            case box8:
                this.x = 2;
                this.y = 1;
                break;
            case box9:
                this.x = 2;
                this.y = 2;
                break;
            default:
                break;
        }

        // if (play.result != null) {
        //     setTimeout(function () {
        //         play.clearBoard();
        //         alert("A new Game is Set now and ready to start!")
        //         play.playAlphaBeta(this.x, this.y, this.loop, item);
        //         return
        //     }, 3000)
        // }
        console.log(play.result + " :EVENT RESULT")
        play.playAlphaBeta(this.x, this.y, this.loop, item);

    });
}



//EVENTS: 
//variables are imported from Game.js
gameOverOk.addEventListener('click', function () {
    hideGameStateWindow();
});
gameOverNewGame.addEventListener('click', function () {
    hideGameStateWindow();
    play.clearBoard()
    play.initializeGame();
    play.playerTurn = 'X'; // currently there is a bug that i don't know its cause so i use this
});

function hideGameStateWindow() {
    gameOverOk.style.transitionDuration = 0 + 's';
    gameOverNewGame.style.transitionDuration = 0 + 's';
    gameOverAlert.style.visibility = 'hidden';
}


//reset game:
let checkResetState;
resetForNewGame.addEventListener('click', function () {
    checkResetState = confirm('do you want to reset the current game?');
    if (checkResetState) {
        play.clearBoard()
        play.initializeGame();
        play.playerTurn = 'X'; // currently there is a bug that i don't know its cause so i use this
        gameEnded = false;
    }
    console.log('is user wants to reset game?: ' + checkResetState);
});