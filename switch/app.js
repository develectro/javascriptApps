 
 const text = document.getElementsByClassName("text")[0];
 const timerBar = document.getElementsByClassName("timerBar")[0];
 const start = document.getElementsByClassName("start")[0];
 const reset = document.getElementsByClassName("reset")[0];
 const stop =  document.getElementsByClassName("stop")[0];
 var x = 0;
 var barVaule = 0;
 var stopCheck = false;
 var resetCheck= false;
 var interval;

 function barFill(){
  interval =  setInterval(function(){   
    if(resetCheck){
    clearInterval(interval);
    resetCheck= false}
  else
    if(x<100){
      if(!stopCheck){
        
        x++;
        s = x+ "%";
        timerBar.style.width = s;
        text.innerHTML = s
        console.log(s)

     }else{

      clearInterval(interval)
      stopCheck = false
     }
    } 
  },15);
 
 }
 start.addEventListener("click",function(){
  barFill()
});

stop.addEventListener("click",function(){
 stopCheck = true;
 setTimeout(function(){stopCheck = false},15);

});

reset.addEventListener("click",function(){
resetCheck =true;
x= 0;
stopCheck = false;
s = x+ "%";
timerBar.style.width = s;
text.innerHTML = s
clearInterval(interval)
});
