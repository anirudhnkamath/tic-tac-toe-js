const winPatterns = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];


//declarations
let boxes = document.querySelectorAll('.box');
let resetButton = document.querySelector('.reset-button');
let newGameButton = document.querySelector('.newgame-button');
let winnerContainer = document.querySelector('.winner-container');
let winnerMessage = document.querySelector('.winner-msg');
let chanceDisplayer = document.querySelector('.chance-displayer');
let footer = document.querySelector('.footer');

let chance = 0;
let boxClicks = 0;


//iterating through all boxes and giving value
boxes.forEach((box) => {
    box.addEventListener('click', () => {
        if (chance == 0) {
            box.innerHTML = 'O';
            chance = 1;
            chanceDisplayer.innerHTML = "X Goes Next";
        }
        else {
            box.innerHTML = 'X';
            chance = 0;
            chanceDisplayer.innerHTML = "O Goes Next"
        }

        box.disabled = true;
        boxClicks++;

        checkWinner(); 

        if(boxClicks == 9 && winnerContainer.classList.contains('hide')){
            drawCondition();
        }
    })
})



function gameFinisher(winner){
    boxes.forEach((box)=>{             //disables all boxes so that once game is over,no one can edit
        box.disabled = true;
    });
    footer.classList.add('hide');
    winnerContainer.classList.remove('hide');          //hiding reset and showing winner container

    winnerMessage.innerHTML = winner + " WON";
}   



//checks for winner
function checkWinner() {
    for (let pattern of winPatterns) {
        let pos1 = boxes[pattern[0]].innerHTML;
        let pos2 = boxes[pattern[1]].innerHTML;
        let pos3 = boxes[pattern[2]].innerHTML;

        if (pos1 != '' && pos2 != '' && pos3 != '') {
            if (pos1 == pos2 && pos2 == pos3) {
                gameFinisher(pos1);                  //executes (only once in a game) only if there is a winner
            }
        }
    }
}


// works when its draw
function drawCondition(){
    winnerContainer.classList.remove('hide');
    winnerMessage.innerHTML = "DRAW";
    footer.classList.add('hide');
}


resetButton.addEventListener('click',()=>{
    boxes.forEach((box) =>{
        box.innerHTML = "";
        box.disabled = false;
    })

    boxClicks = 0;
    chance = 0;
})

newGameButton.addEventListener('click',()=>{
    boxes.forEach((box) =>{
        box.innerHTML = "";
        box.disabled = false;
    })
    boxClicks = 0;
    chance = 0;

    winnerContainer.classList.add('hide');
    footer.classList.remove('hide');
    chanceDisplayer.innerHTML = "O Goes First";
})