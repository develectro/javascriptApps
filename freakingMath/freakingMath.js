 /** developed by: @java_eng  **/


 /*
  ***************************************************************************************
  *                                                                                     *
  * This game is developed by: java_eng, a learner from SoloLearn.com, Inspired by:     *
  *                                                                                     *
  * the awesome game "freaking math" which developed by: Nguyen Loung Bang.             *
  *                                                                                     *
  * Feel free to edit the code and to make it better for your personal usages,          *
  * please don't just copy and paste it.                                                *
  *                                                                                     *
  * Credits for:                                                                        *
  * Nguyen Loung Bang                                                                   *
  *                                                                                     *
  * Date Modified: 22nd December 2019                                                   *
  ***************************************************************************************
  */



 var score = 0;
 var currentScore = 0;
 var highestScore = 0;
 var num1 = document.getElementById("num1");
 var num2 = document.getElementById("num2");
 var sum = document.getElementById("sum");
 var plus = document.getElementById("plus");
 var scoreVal = document.getElementById("score");

 var currentScoreText = document.getElementById("showScore");
 var highestScoreText = document.getElementById("showHighestScore");

 var yesButton = document.getElementById("yes");
 var noButton = document.getElementById("no");
 var newGame = document.getElementById("newGameB");
 var newGameY = document.getElementById("newGameY");
 var newGameN = document.getElementById("newGameN");
 var lvlButton = document.getElementById("levelButton");
 var easyLvl = document.getElementById("easyLvl");
 var mediumLvl = document.getElementById("mediumLvl");
 var masterLvl = document.getElementById("masterLvl");
 var speaker = document.getElementById("speaker");

 var popup = document.querySelector(".pop_up");
 var levelSelector = document.querySelector(".levelSelector");

 var domText = [num1, num2, sum, plus, scoreVal, yesButton, noButton, ];
 var gameButtons = [newGame, lvlButton, speaker];

 var trueAns = 0;
 var viewedQuizzNumber = 0;

 var UIcontent = {

     fadeOut: function (object) {
         var optc = 1;
         var r = setInterval(function () {
             fade()
         }, 30);

         function fade() {
             if (optc <= 0.1) {
                 clearInterval(r);
                 object.style.display = "none";
                 return;
             } else {
                 optc -= 0.1;
                 tempOpct = parseFloat(optc).toFixed(1);
                 object.style.opacity = tempOpct;
             }
         }
     },
     fadeIn: function (object) {
         var optc = 0;
         var r = setInterval(function () {
             fade()
         }, 30);

         function fade() {
             if (optc <= 1) {
                 clearInterval(r);
                 if (object.style.display == "none") {
                     object.style.display = "block";
                 }
                 object.style.display = "";
                 object.style.opacity = 1;
                 return;
             } else {
                 optc += 0.1;
                 tempOpct = parseFloat(optc).toFixed(1);
                 object.style.opacity = tempOpct;
             }
         }
     },
 }

 var soundEffects = {
     audio1: null,
     audio2: null,
     audio3: null,
     getAudio: function () {
         this.audio1 = new Audio("https://ia601508.us.archive.org/33/items/freaking_math_yes_soundeffect/freaking_math_yes_soundeffect.mp3");
         this.audio2 = new Audio("https://ia801505.us.archive.org/32/items/freaking_math_no_soundeffect/freaking_math_no_soundeffect.mp3");
         this.audio3 = new Audio("https://ia801408.us.archive.org/24/items/freaking_math_new_game_soundeffect/freaking_math_new_game_soundeffect.mp3");
     },

     speakerSwitch: true,
     audio1Play: function () {
         if (this.speakerSwitch) {
             this.audio1.pause();
             this.audio1.currentTime = 0;
             this.audio1.play();
         }
     },
     audio2Play: function () {
         if (this.speakerSwitch) {
             this.audio2.pause();
             this.audio2.currentTime = 0;
             this.audio2.play();
         }
     },
     audio3Play: function () {
         if (this.speakerSwitch) {
             this.audio3.pause();
             this.audio3.currentTime = 0;
             this.audio3.play();
         }
     },
 }

 //Quizz numbers function
 var a;
 var b;

 function generateRandoms() {
     //generating quizz:
     a = Math.floor(Math.random() * 15) + 1;
     b = Math.floor(Math.random() * 12) + 1;

     //Easy level:
     // var a = Math.floor(Math.random() * 10) + 1;
     // var b = Math.floor(Math.random() * 10) + 1;

     trueAns = a + b;
     var wrongAnsArr = [trueAns + 1, trueAns - 1, trueAns + 2, trueAns - 2];
     var wrongAns = wrongAnsArr[Math.floor(Math.random() * wrongAnsArr.length)];

     var quizzArr = [wrongAns, trueAns];
     viewedQuizzNumber = quizzArr[Math.floor(Math.random() * quizzArr.length)];

     //setting DOM:
     num1.innerHTML = a;
     num2.innerHTML = b;
     sum.innerHTML = "= " + viewedQuizzNumber;
 }

 //Game Over function:
 function gameOver() {

     yesButton.style.display = "none";
     noButton.style.display = "none";

     currentScore = score;
     if (highestScore < currentScore) {
         highestScore = currentScore;
     } else {}
     score = 0;
     num1.innerHTML = 0;
     num2.innerHTML = 0;
     sum.innerHTML = 0;
     scoreVal.innerHTML = "Score: " + 0;
     currentScoreText.innerHTML = " Score:" + currentScore;
     highestScoreText.innerHTML = "Highest: " + highestScore;
     trueAns = 0;
     viewedQuizzNumber = 0;
     switch2 = false;
     a = 0;
     b = 0;
     isAnsWrong = false;
     trueAnsPointer = false;
     for (item of domText) {
         UIcontent.fadeOut(item);
     }

     setTimeout(function () {
         UIcontent.fadeIn(popup);
     }, 50);
 }

 //level function:
 var level = 0;

 function selectLevel() {
     level = prompt("select level number: 1 [easy],2 [medium], 3 [master]");
     switch (level) {
         case "1":
             level = 28;
             break;
         case "2":
             level = 18;
             break;
         case "3":
             level = 10
             break;
         default:
             level = 28;
             break;
     }
 }

 //Progress Bar function:
 var timerVal;
 var interval;
 var switch2 = false; //to turn off progress bar
 var isTimerRunning = false; //to check if timer runnig, therefore avoid duplicate gameOver() invoking.

 function setGameTimer() {
     timerVal = 0;
     isTimerRunning = true;
     clearInterval(interval);
     var progress = document.getElementsByClassName("progressBar")[0];
     interval = setInterval(() => {
         fill();
     }, level);


     function fill() {
         if (timerVal >= 100 || switch2) {
             clearInterval(interval);
             timerVal = 0;
             isTimerRunning = false;
             //switch2 = false; // better to be inside gameOver.
             progress.style.width = "0%";
             gameOver();
         } else {

             timerVal++;
             progress.style.width = "" + timerVal + "%";
         }
     }
 }

 //Listeners section:
 yesButton.addEventListener("click", function () {
     if (trueAns == viewedQuizzNumber) {
         score += 1;
         scoreVal.innerHTML = "Score: " + score;
         soundEffects.audio1Play();
         generateRandoms();
         setGameTimer();
         interactiveBG();

     } else {
         if (isTimerRunning) {
             switch2 = true;
             soundEffects.audio2Play();
             //for normal playing
             //gameOver invoked by the timer
         } else {
             //for new game (after game over) where timer is not running.
             soundEffects.audio2Play();
             gameOver();
         }

     }
 });

 noButton.addEventListener("click", function () {
     if (trueAns != viewedQuizzNumber) {
         score += 1;
         scoreVal.innerHTML = "Score: " + score;
         soundEffects.audio1Play();
         generateRandoms();
         setGameTimer();
         interactiveBG();
     } else {
         if (isTimerRunning) {
             switch2 = true;
             soundEffects.audio2Play();
             //gameOver invoked by the timer
         } else {
             soundEffects.audio2Play();
             gameOver();
         }
     }
 });

 newGameY.addEventListener("click", function () {
     generateRandoms();
     UIcontent.fadeOut(popup);
     for (var item of domText) {
         UIcontent.fadeIn(item);
     }
     soundEffects.audio3Play();
 });
 newGameN.addEventListener("click", function () {
     for (var item of gameButtons) {
         UIcontent.fadeIn(item);
     }
     UIcontent.fadeOut(popup);

 });
 newGame.addEventListener("click", function () {
     generateRandoms();
     for (var item of domText) {
         UIcontent.fadeIn(item);
     }
     for (var item of gameButtons) {
         UIcontent.fadeOut(item);
     }
     soundEffects.audio3Play();

 });

 levelButton.addEventListener("click", function () {
     UIcontent.fadeIn(levelSelector);
     for (var item of gameButtons) {
         UIcontent.fadeOut(item);
     }
 });
 easyLvl.addEventListener("click", function () {
     level = 28;
     UIcontent.fadeOut(levelSelector);
     for (var item of gameButtons) {
         UIcontent.fadeIn(item);
     }
 });
 mediumLvl.addEventListener("click", function () {
     level = 18;
     UIcontent.fadeOut(levelSelector);
     for (var item of gameButtons) {
         UIcontent.fadeIn(item);
     }

 });
 masterLvl.addEventListener("click", function () {
     level = 10;
     UIcontent.fadeOut(levelSelector);
     for (var item of gameButtons) {
         UIcontent.fadeIn(item);
     }

 });

 speaker.addEventListener("click", function () {
     switch (soundEffects.speakerSwitch) {
         case true:
             soundEffects.speakerSwitch = false;
             speaker.innerHTML = "<i class='fas fa-volume-mute'></i>"
             break;
         case false:
             soundEffects.speakerSwitch = true;
             speaker.innerHTML = "<i class='fas fa-volume-up'></i>"
             break;
         default:
             break;

     }
 });

 //Interactive Background
 var count = 0;
 var container = document.querySelector(".container");
 var colors = [
     "blue", "blueviolet", "deeppink", "springgreen", "gold", "cornflowerblue",
     "orangered", "darkmagenta", "lime", "fuchsia", "lightseagreen", "indigo", "red",
     "aquamarine", "green", "coral", "crimson", "purple", "darkcyan", "firebrick",
     "springgreen"
 ]

 function interactiveBG() {
     count++;
     if (count >= 20) {
         count = 0;
     } else {
         container.style.backgroundColor = colors[count];
         for (var item of gameButtons) {
             item.style.color = colors[count - 1];
         }
     }
 }

 generateRandoms();
 selectLevel();
 soundEffects.getAudio();

 function responsiveView() {
     //this function is used to correct the height of the elements.
     //works when the height being shrinked due to browser's top bar.
     if (window.innerHeight < document.body.scrollHeight) {
         var w = window.innerHeight;
         var d = document.body.scrollHeight;
         var x = d - w;
         var topVal = document.querySelector(".innerDiv").style.top;
         topVal = topVal - x;
         topVal = "" + topVal + "px"
         document.querySelector(".innerDiv").style.top = topVal;
     }
 }
 responsiveView();