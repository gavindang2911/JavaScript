
var randomNumber1 = Math.floor(Math.random() *6) + 1;
var randomNumber2 = Math.floor(Math.random() *6) + 1

var randomDiceImage1 = "dice" + randomNumber1 + ".png";
var randomDiceImage2 = "dice" + randomNumber2 + ".png";

var randomDiceSource1 = "images/" + randomDiceImage1;
var randomDiceSource2 = "images/" + randomDiceImage2;

var image1InHTML = document.querySelectorAll("img")[0];
image1InHTML.setAttribute("src", randomDiceSource1);

var image2InHTML = document.querySelectorAll("img")[1];
image2InHTML.setAttribute("src", randomDiceSource2);

if (randomNumber1 > randomNumber2) {
    var notify = document.querySelector("h1");
    notify.innerHTML = "Player 1 won";
}
else if (randomNumber1 > randomNumber2) {
    var notify = document.querySelector("h1");
    notify.innerHTML("Draw");
}
else {
    var notify = document.querySelector("h1");
    notify.innerHTML("Player 2 won!");
}


