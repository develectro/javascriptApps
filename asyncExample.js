 
//This is a simple Async Example:

function train1(){
    var train = function(){
        return 'this is a bullet train1 arrived';
    }
    return new Promise((resolve)=>{
        setTimeout(()=>{
            resolve(train());
        },5000);
    });
}

async function train2(){
    
    await train1()
    .then((result)=>{
        console.log(result + 'witout problems');
    })
    .then((result)=>{
        setTimeout(function(){
            console.log('this is train2 and it can now arrive safely');

        },1000);
    });
   
}train2();
