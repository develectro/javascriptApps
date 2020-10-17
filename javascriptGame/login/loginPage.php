<?php require_once __DIR__."/login.php";?>

<!DOCTYPE html>
<html>

<head>
    <title>Login Page</title>
    <meta charset="utf-8" />
    <meta name="author" content="mustafa" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="" />

    <style type="text/css">
        <?php include __DIR__ . "/loginPage.css"; ?>
    </style>
    <script type="text/javascript"></script>
</head>

<div class="flexContainer">

    <!-- first to left -->
    <aside class="aside" id="aside">
        <canvas id="mycanvas"></canvas>
    </aside>

    <!-- second to left -->
    <form class="loginForm" method="post" action="<?php htmlspecialchars("/login.php") ?>">

        <table>
            <tr>
                <td><input type="email" name="email" placeholder="Enter Your Email" required /></td>
            </tr>
            <tr>
                <td><input type="passowrd" name="pass" placeholder="Enter Your Password" required /></td>
            </tr>
            <tr>
                <td><input type="submit" name="signIn" value="login" id="submit"></td>
            </tr>
        </table>

    </form>


</div>
<?php echo isset($_POST['pass'])? $wrong: null; ?>

<script type="text/javascript">

const canvas = document.querySelector("#mycanvas");
const aside = document.querySelector("#aside");
function setCanvasSize(){
    canvas.width = aside.clientWidth;
    canvas.height  = aside.clientHeight;
}

window.addEventListener('load',function(){
    setCanvasSize();
});

window.addEventListener('resize',function(){
    setCanvasSize();
});

var ctx  = canvas.getContext("2d");

function Exes(x,y){
this.x = x;
this.y = y;

this.vx =  (Math.random() * 3) +1;
this.vx *=  Math.floor(Math.random()*2) ==1 ? 1: -1;
this.vy =  (Math.random() * 3) +1;
this.vy *=  Math.floor(Math.random() *2) ==1 ? 1: -1;

this.renderX = function(){
    ctx.beginPath();
    ctx.moveTo(this.x,this.y);
    ctx.lineTo(this.x*2,this.y*2);

    ctx.moveTo(this.x*2,this.y); 
    ctx.lineTo(this.x,this.y*2); 
    ctx.lineWidth = 5;
    ctx.strokeStyle  = '#816a9a';
    ctx.stroke();
  }
  this.animate = function(){
      this.x += this.vx;
      this.y += this.vy;

      if(this.x > canvas.width || this.x <0){
         this.vx = -this.vx;
     }
      if(this.y  > canvas.height || this.y <0){
         this.vy = -this.vy;
     }
      this.renderX();
  }
}


function Circle(x,y,r,c){
this.x = x;
this.y = y;
this.r = r;
this.c = c;

this.vx =  (Math.random() * 3) +1;
this.vx *=  Math.floor(Math.random()*2) ==1 ? 1: -1;
this.vy =  (Math.random() * 3) +1;
this.vy *=  Math.floor(Math.random() *2) ==1 ? 1: -1;

this.renderCircle = function(){
    ctx.beginPath();
    ctx.strokeStyle = this.c;
    ctx.arc(this.x, this.y, this.r, 0,2*3.14)
    ctx.lineWidth = 5;
    ctx.stroke();
  }

this.animate = function(){
 this.x  +=  this.vx;
 this.y  +=  this.vy;
 if(this.x +this.r > canvas.width || this.x-this.r <0){
     this.vx = -this.vx;
 }
 if(this.y +this.r > canvas.height || this.y-this.r <0){
     this.vy = -this.vy;
 }
 this.renderCircle();
  }
}
var ballsArray = new Array(); // for O
//var exesAray = new Array();   // for X

for(let i = 0; i<12; i++){
    //for circles
    let r = Math.floor(Math.random()*25)+15;
    let x = Math.floor( Math.random()*(canvas.width -2*r))+r;
    let y = Math.floor( Math.random()*(canvas.height -2*r))+r;
    let ball = new Circle(x,y,r,"#84157d"); //new ball;

    ball.renderCircle();
    ballsArray.push(ball);
    
    //for Exes (X)
    // let x1 =Math.floor( Math.random()*200)+50;
    // let y1 = Math.floor( Math.random()*200)+50;
    //  x1 /=4;
    //  y1 /=4;
    // let xSign = new Exes(x1,y1);                  
    // xSign.renderX();
    // exesAray.push(xSign);
    

}



function update(){
    ctx.clearRect(0,0,canvas.width, canvas.height);
     for(let i=0; i< ballsArray.length; i++){
        console.log("a");
        ballsArray[i].animate();
        //exesAray[i].animate();
     }
     requestAnimationFrame(update);
}
update();


</script>

<body></body>

</html>