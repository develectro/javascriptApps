//Settings window and timer/game and gameOver
let settings = document.getElementById('settings');
let settingsDisplay = document.getElementsByClassName('settings')[0];
let settingsOkButton = document.getElementById('settingsOkButton');
let settings_switcher_circle = document.getElementsByClassName('settings_switcher_circle')[0];
let settings_switcher = document.getElementsByClassName('settings_switcher')[0];
let settings_switcher1 = document.getElementsByClassName('settings_switcher')[1];
let settings_switcher2 = document.getElementsByClassName('settings_switcher')[2];
let darkModeFilter = document.getElementsByClassName('darkMode')[0];
//to reset language, and settings titles.
let switcherLang = document.getElementById('switcherLang');
let switcherTheme = document.getElementById('switcherTheme');
let switcherTimer = document.getElementById('switcherTimer');
let settings_language = document.getElementById('settings_language');
let settings_theme = document.getElementById('settings_theme');
let settings_timer = document.getElementById('settings_timer');
let gameTimer = document.getElementsByClassName('gameTimer')[0];
let resetForNewGame = document.getElementById('resetForNewGame');
var gameStarted = false; //to control timer depending on game state
var gameEnded = false; //to control timer depending on game state, used in playAlphaBeta() and turnOnTimer()





//window and gui things
settings.addEventListener('click', () => {
    positionedElementCentering(settingsDisplay);
    settingsDisplay.style.visibility = 'visible';
});
window.addEventListener('resize', () => {
    positionedElementCentering(settingsDisplay);
});
settingsOkButton.addEventListener('click', () => {
    settingsDisplay.style.visibility = 'hidden';
});

/*
//reset moved to minimax.js
let checkResetState;
resetForNewGame.addEventListener('click', function () {
    checkResetState = confirm('do you want to reset the current game?');
    console.log(checkResetState);
});
*/

//Switchers
let langCheck = false;
switcherLang.addEventListener('click', () => {
    if (!langCheck) {
        switcher(langCheck, switcherLang);
        settings_switcher.style.backgroundColor = 'greenyellow';
        settings_language.innerHTML = 'اللغة: العربية';
        langCheck = true;
    } else {
        switcher(langCheck, switcherLang);
        settings_switcher.style.backgroundColor = 'greenyellow';
        settings_language.innerHTML = 'Language: english';

        langCheck = false;
    }
});

let themeCheck = false;
switcherTheme.addEventListener('click', () => {
    if (!themeCheck) {
        switcher(themeCheck, switcherTheme);
        settings_switcher1.style.backgroundColor = 'black';
        settings_theme.innerHTML = 'Theme: Night';
        darkModeFilter.style.visibility = 'visible';
        themeCheck = true;
    } else {
        switcher(themeCheck, switcherTheme);
        settings_switcher1.style.backgroundColor = 'greenyellow';
        settings_theme.innerHTML = 'Theme: Day';
        darkModeFilter.style.visibility = 'hidden';
        themeCheck = false;
    }

});
let timerCheck; //check for ui component (switcher) state
var isTimerRunning = true; //check timer functionlity

switcherTimer.addEventListener('click', () => {

    if (!timerCheck) {
        doTimerSwitchingOff();
    } else {

        if (gameStarted) {
            //to terminate game if user tried to reswitch on timer while playing
            killTimer = true;
            gameStarted = false;
            console.log('game reset due to reswitch timer while playing');

            console.log('current game terminated');
            doTimerSwitchingOn();
        } else {
            doTimerSwitchingOn();
        }


    }
});

function doTimerSwitchingOff() {
    switcher(timerCheck, switcherTimer);
    settings_switcher2.style.backgroundColor = 'gray';
    settings_timer.innerHTML = 'Timer: OFF';
    switchTimerState(gameTimer);
    timerCheck = true;
}

function doTimerSwitchingOn() {
    switcher(timerCheck, switcherTimer);
    settings_switcher2.style.backgroundColor = 'greenyellow';
    settings_timer.innerHTML = 'Timer: ON';
    switchTimerState(gameTimer);
    //turnOnTimer(gameTimer);
    timerCheck = false;

}

//functions
function switcher(on_off, switcher) {
    if (!on_off)
        switcher.style.left = '50%';
    else
        switcher.style.left = '0%';
}

//darkmode function

function darkMode() {

}
//change language function
function setLanguage() {

}
//turn off/on timer function

function switchTimerState(gameTimer) {
    if (isTimerRunning) {
        gameTimer.innerHTML = '∞';
        isTimerRunning = false;
        console.log(9);
        return false;
    } else if (!isTimerRunning) {
        gameTimer.innerHTML = '0:00';
        isTimerRunning = true;
        return true;
    }


}


//Just makes timer ON and OFF
//this function needs optimization for speed.
function turnOnTimer(gameTimer) {

    console.log('Timer is to strat!');
    gameStarted = true;

    //00:00:00
    //minutes:seconds:centisecond(100 for each sec) just like centimeter :/
    let centisecond = 0;
    let seconds = 0;
    let minutes = 0;
    let interval =
        setInterval(() => {
            console.log("timer is running: " + isTimerRunning);

            if (timerCheck) {
                killTimer = false;
                clearInterval(interval);
            } else if (seconds >= 15 || gameEnded) { // OR if gameOver 
                //you can set minutes insted of seconds
                console.log('GameOver, timer is off');
                gameStarted = false;
                gameEnded = false;
                console.log('GAME ENDED set to: ' + gameEnded)
                clearInterval(interval);

            } else if (seconds <= 9) {
                gameTimer.innerHTML = minutes + ":0" + seconds++;

            } else if (seconds <= 59) {
                gameTimer.innerHTML = minutes + ":" + seconds++;

            } else {
                seconds = 0;
                minutes += 1;
                gameTimer.innerHTML = minutes + ":0" + seconds++;
            }

        }, 1000);
}



//Starting and Ending game different conditions: this is no longer valid,
// now we start timer using box events on minimax.js 
//var gameStarted is now defined within Game constructor of minimax.js
/*
for (let item of gridItemsArray) {
    item.addEventListener('click', () => {
        if (!gameStarted) {
            gameStarted = true;
            turnOnTimer(gameTimer, isTimerRunning);
        } else if (gameStarted) {
            console.log('x and o :/)');
            //if any losing state happened terminate game here, this is a MUST.
        }

    });
}
*/