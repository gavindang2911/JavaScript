window.onload = function () {
  
  var seconds = 00; 
  var tens = 00; 
  var appendTens = document.getElementById("tens")
  var appendSeconds = document.getElementById("seconds")
  var buttonStart = document.getElementsByClassName('btn btn-primary')[0];
  var buttonStop = document.getElementsByClassName('btn btn-secondary')[0];
  var buttonReset = document.getElementsByClassName('btn btn-danger')[0];
  var Interval ;

  buttonStart.onclick = function() {
    
     clearInterval(Interval);
     Interval = setInterval(startTimer, 10);
  }
  
    buttonStop.onclick = function() {
       clearInterval(Interval);
  }
  

  buttonReset.onclick = function() {
     clearInterval(Interval);
    tens = "00";
  	seconds = "00";
    appendTens.innerHTML = tens;
  	appendSeconds.innerHTML = seconds;
  }
  
   
  
  function startTimer () {
    tens++; 
    
    if(tens < 9){
      appendTens.innerHTML = "0" + tens;
    }
    
    if (tens > 9){
      appendTens.innerHTML = tens;
      
    } 
    
    if (tens > 99) {
      console.log("seconds");
      seconds++;
      appendSeconds.innerHTML = "0" + seconds;
      tens = 0;
      appendTens.innerHTML = "0" + 0;
    }
    
    if (seconds > 9){
      appendSeconds.innerHTML = seconds;
    }
  
  }
  

}
const rainbow = ['red','orange','yellow','green','blue','rebeccapurple','violet'];

function myFunction() {      
  document.body.style.background = rainbow[Math.floor(7*Math.random())];
}

const quiz = [
  ["What is the syntax to print the string upper case?", "toUpperCase"],
  ["What is the syntax to print the string lower case?", "toLowerCase"],
  ["What is the syntax to print the string's length?", "length"]
];

let score = 0;
function startQuiz(){
  for(const [question, answer] of quiz){
    const reponse = prompt(question);
    if(reponse == answer){
      score++;
      alert("Correct! Bingo");
    }
    else{
      alert(`Wrong, The correct answer is ${answer}`);
    }
  }
  alert(`Game Over, you scored ${score} point${score !== 1 ? 's' : ''}`);
}

