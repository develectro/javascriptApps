// By develctro
// console.logs for debugging

//UI constants and variables
const welcomeBanner = document.getElementsByClassName('welcomeBanner')[0];
const newGameButton = document.getElementById('newGame');
const highScore = document.getElementById('highScore');
const highScoresView = document.getElementsByClassName('highScoresView')[0];
var highScoresViewShape = highScoresView.getBoundingClientRect();
var highScoreViewHeigh = highScoresViewShape.height;
var highScoresViewWidth = highScoresViewShape.width;

const highScoresViewButton = document.getElementById('highScoresViewButton');


//Events and Actions

//Open new game page
newGameButton.addEventListener('click', () => {
    window.location.href = "Game.html";
});
//show high scores
highScore.addEventListener('click', () => {
    highScoresView.style.visibility = "visible";
});
//hide high scores
highScoresViewButton.addEventListener('click', () => {
    highScoresView.style.visibility = "hidden";

});


//High Scores absolute div tag centering
var highScoresViewStyle = window.getComputedStyle(highScoresView);
var highScoresViewPadding = highScoresViewStyle.getPropertyValue('padding-top');
//here we use 'padding-top' instead of padding due to SHORTHANDS->'padding' compatability issues
var highScoresViewTop = highScoresViewStyle.getPropertyValue('top');
var highScoresViewLeft = highScoresViewStyle.getPropertyValue('left');


// Absolute positioned items centering function
function highScoresViewContainer() {

    //Converting String Property Values into floats:
    let topFloat = parseFloat(highScoresViewTop);
    // console.log(topFloat)
    let leftFloat = parseFloat(highScoresViewLeft);
    // console.log(leftFloat)

    //Calculations: formula to set abs <div> into center: top 50% - (height/2) AND same for width.
    highScoresView.style.top = (topFloat - (highScoreViewHeigh / 2)) + "px";
    highScoresView.style.left = (leftFloat - (highScoresViewWidth / 2)) + "px";

}
highScoresViewContainer();