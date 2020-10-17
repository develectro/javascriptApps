/* Developed by: Develectro "Mustafa" */


//Imported scripts 'modules'
// import * as functionModules from './ServerModule/reusableFunctions.js';


//VARIABLES:

//User Game Option:
var computerOption = 'X';
var userOption = 'O';
// Grid and Grid Items
const gridContainer = document.getElementsByClassName('container')[0];
const box1 = document.getElementById("box1");
const box2 = document.getElementById("box2");
const box3 = document.getElementById("box3");
const box4 = document.getElementById("box4");
const box5 = document.getElementById("box5");
const box6 = document.getElementById("box6");
const box7 = document.getElementById("box7");
const box8 = document.getElementById("box8");
const box9 = document.getElementById("box9");
var gridItem = document.getElementsByClassName('gridItem')[0];
var gameOverText = document.getElementById('gameOverText');

//Game Over Popup Items:
var gameOverAlert = document.getElementsByClassName('gameOverAlert')[0];
var gameOverOk = document.getElementById('gameOverOk');
var gameOverNewGame = document.getElementById('gameOverNewGame');


let gridItemsArray = new Array();
gridItemsArray = [box1, box2, box3, box4, box5, box6, box7, box8, box9];

//Grid Boxes Variables 
const
    box1Val = 1,
    box2Val = 2,
    box3Val = 3,
    box4Val = 4,
    box5Val = 5,
    box6Val = 6,
    box7Val = 7,
    box8Val = 8,
    box9Val = 9;

//Grid Boxes groups "based on game's rules"
let verticalRight, verticalLeft, verticalMid;
let horizontalTop, horizontalMiddle, horizontalBottom;
let righDiagonal, leftDiagonal;

//Boxes Groups:
//verticals:
verticalLeft = [box1Val, box4Val, box7Val];
verticalMid = [box2Val, box5Val, box8Val];
verticalRight = [box3Val, box6Val, box9Val];
//horizontals:
horizontalTop = [box1Val, box2Val, box3Val];
horizontalMiddle = [box4Val, box5Val, box6Val];
horizontalBottom = [box7Val, box8Val, box9Val];
//diagonals:
righDiagonal = [box3Val, box5Val, box7Val];
leftDiagonal = [box1Val, box5Val, box9Val];
//Group:
let dimentionsVerticalGroup = [verticalLeft, verticalMid, verticalRight];
let dimentionsHorizontalGroup = [horizontalMiddle, horizontalTop, horizontalBottom];
let dimentionsDiagonalGroup = [righDiagonal, leftDiagonal];







// UI FUNCTIONS:
const exit = document.getElementById('exit');


positionedElementCentering(gameOverAlert); //Imported function
for (let item of gridItemsArray) {
    textCenteringInsideDiv(item);
}

window.addEventListener('resize', () => {
    positionedElementCentering(gameOverAlert);
    for (let item of gridItemsArray) {
        textCenteringInsideDiv(item);
    }
});
exit.addEventListener('click', () => {
    window.location.href = 'GameWelcome.html';
});