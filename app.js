const boxes = document.querySelectorAll('.box');
const finalMsg = document.querySelector('.finalMessage');
const finalText = document.querySelector('.finalText');
const playAgain = document.querySelector('.replay');
let currPlayerSymbol;
let gameStartPlayer = "X";
let counter = 0;

const winningCombinations = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

function setBoard(){
    counter = 0;
    if (gameStartPlayer == "X"){
        currPlayerSymbol = 'playerX';
        gameStartPlayer = "O";
    }
    else{
        currPlayerSymbol = 'playerO';
        gameStartPlayer = "X";
    }
    boxes.forEach(myBox  => {
        myBox.classList.remove("playerX");
        myBox.classList.remove("playerO");
        finalMsg.style.display = 'none';
        // setting once = true makes it so that the event listener is fired only once
        myBox.removeEventListener('click', play);
        myBox.addEventListener('click', play , {once: true});
    })
}

function changePlayer(){

    currPlayerSymbol = currPlayerSymbol == 'playerX' ? 'playerO' : 'playerX';

}

function play(){
    counter++;
    this.classList.add(currPlayerSymbol);
    if (counter == 9){
        finalMsg.style.display = "block";
        finalText.innerText = "Its a draw !";
    }
    else if (chkWin()){
        finalMsg.style.display = "block";
        finalText.innerText = currPlayerSymbol == "playerX" ? "Player X Wins !" : "Player O Wins !";
    }
    changePlayer();
    // this.removeEventListener('click', play);
}

function chkWin(){
    return winningCombinations.some(currCombination =>{
        return currCombination.every(currIndex =>{
            return boxes[currIndex].classList.contains(currPlayerSymbol);
        })
    })
}

playAgain.addEventListener('click', setBoard)

setBoard();