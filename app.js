let boxes = document.querySelectorAll(".box");
let newBtn = document.querySelector("#new-btn");
let resetBtn = document.querySelector("#reset");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let turn0 =  true;




const winPatterns = [

    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8],

];

const resetGame = () => {

    turn0 = true;
    enableBox();
    msgContainer.classList.add("hide");

    for(let box of boxes){
        box.classList.remove("player-o");
        box.classList.remove("player-x");
    }

};

const disableBox =()=> {
     for(let val of boxes){
        val.disabled =true;
     }
};

const enableBox =()=> {
    for(let box of boxes){
       box.disabled =false;
       box.innerText = "";

    }
};

const showWinner = (winner) => {
    msg.innerText = `Congratulation, the winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBox()
}

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        console.log("box was clicked");
        if (turn0) {
            box.innerText = "O";
            box.classList.add("player-o"); // Add class for O
            turn0 = false;
        } else {
            box.innerText = "X";
            box.classList.add("player-x"); // Add class for X
            turn0 = true;
        }
        box.disabled=true;

        checkWinner();
    });
});


const checkWinner = () => {
    let draw = true; // Assume it's a draw initially
    for (let pattern of winPatterns) {
        let pos1 = boxes[pattern[0]].innerText;
        let pos2 = boxes[pattern[1]].innerText;
        let pos3 = boxes[pattern[2]].innerText;

        if (pos1 !== "" && pos2 !== "" && pos3 !== "") {
            if (pos1 === pos2 && pos2 === pos3) {
                // If there's a winner, display the winner and return
                showWinner(pos1);
                return;
            }
        } else {
            // If there's any empty box, it's not a draw
            draw = false;
        }
    }

    // If it reaches here, no winner has been found
    if (draw) {
        // If it's a draw, display a message for a draw
        msg.innerText = "It's a draw!";
        msgContainer.classList.remove("hide");
        disableBox();
    }
};


newBtn.addEventListener("click" , resetGame);
resetBtn.addEventListener("click" , resetGame);