//Custom Error:
var MyError = function(){
    console.log("An error detected");
    throw "this error is because you have entered a string";
}


function getName(name){
  if(typeof(name) =="string"){
      throw MyError();
  }
}

getName('Mustafa');


//Error Handling Using if..else:
function Computer(myComputer){
  if(typeof(myComputer) == "string"){
      if(myComputer == 'DELL'){
          console.log('It\'s DELL!');
      }
      if(myComputer == 'TOSHIBA'){
        console.log('It\'s TOSHIBA!');
    }
     if(myComputer == 'hp'){
        console.log('It\'s Helwet Packard!');
    }else{  
        console.log('Unrecognized!');
    }
  }else{
      console.log("Cannot work because it's not a string");
  }
}
Computer("DELL");

//Error Handling Using try..catch: 
function CapitalizeName(name){

      try{
          var x = name.toUpperCase();
      }catch(error){
        throw "This is a Syntax Error";
      }finally{
          console.log('Done')
      }
      return x;
}

console.log(CapitalizeName(890));

