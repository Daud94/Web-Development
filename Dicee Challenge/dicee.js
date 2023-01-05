
const images = ["dice1.png","dice2.png","dice3.png","dice4.png","dice5.png","dice6.png"];


let player1_roll_index = Math.floor(Math.random()*6);
let player1_roll = player1_roll_index +1;
document.querySelectorAll("img")[0].setAttribute('src',`images/${images[player1_roll_index]}`);


let player2_roll_index = Math.floor(Math.random()*6);
let player2_roll = player1_roll_index +1;
document.querySelectorAll("img")[1].setAttribute('src',`images/${images[player2_roll_index]}`);

if (player1_roll > player2_roll){
    document.querySelector("h1").innerHTML = "Player 1 Won!";
} else if (player2_roll > player1_roll){
    document.querySelector("h1").innerHTML = "Player 2 Won!";
} else {
    document.querySelector("h1").innerHTML = "Draw";
}