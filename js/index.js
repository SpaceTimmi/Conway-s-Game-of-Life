// Header Buttons
let newGame = document.getElementById("new-game"); 
let Pause =  document.getElementById("pause"); 
let Reset = document.getElementById("reset"); 
let Resize = document.getElementById("resize"); 

newGame.addEventListener("click", () => {
    // Restarts the game with the set position.

});
Pause.addEventListener("click", () => {
    // Pauses ongoing session.

});
Reset.addEventListener("click", () => {
    // Resets the board to blank.

});
Resize.addEventListener("click", () => {
    // Resize the pixels onscreen.
     generatePalette(250);
});

// Boards logic

function generatePalette(n) {
    // Generate board  
    for (let i = 0; i < (n*n); i++) {
        let divElem = document.createElement('div');
        divElem.setAttribute('class', 'cell');
        document
        .getElementById("boards")
        .appendChild(divElem)
    }

    document.querySelectorAll(".cell").forEach((item) => {
        item.addEventListener("click", () => {
            console.log("clicked")
            item.style.backgroundColor = "black";
        })

    });
    
}

function resizePalette(n) {
    // generatePalette(...);
}


function checkNeigbours() {
    // return 0 (alive) or 1 (dead) for each cell based on its neighbours. 
    
}




