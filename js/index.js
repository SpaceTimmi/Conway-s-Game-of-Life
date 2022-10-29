// Header Buttons
let start = document.getElementById("start");
let pause =  document.getElementById("pause");
let reset = document.getElementById("reset");
let instructions = document.getElementById("instructions");
let eraser = document.getElementById("eraser");
let resize = document.getElementById("resize");

start.addEventListener("click", () => {
    // Resumes ongoing session from pause.

});
pause.addEventListener("click", () => {
    // Pauses ongoing session.

});
reset.addEventListener("click", () => {
    // Restarts the game to blank position.

});

instructions.addEventListener("click", () => {
    // Toogle the instructions menu off and on.

});

let eraserOn = false; 
/* Not-so bright idea lol.
keeps track of if I'm trying to clear a cell or mark a cell.
*/
eraser.addEventListener("click", () => {
    // Allow user to erase cells that have been marked.
    let cells = document.querySelectorAll(".cell");
    let eraserElem = document.getElementById('eraser');

    if (eraserOn === false) {
        cells.forEach((item) => {
            item.setAttribute('id', 'change-cursor');
        });
        eraserOn = true;
        eraserElem.innerHTML = "Eraser(ON)";

    } else {
        cells.forEach((item) => {
            item.removeAttribute('id');
        })
        eraserOn = false;
        eraserElem.innerHTML = "Eraser(OFF)";
    }
});

resize.addEventListener("click", () => {
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

            if (eraserOn) { // eraserOn from line 27. 
                item.style.backgroundColor = "white";
            } else {
                item.style.backgroundColor = "black";
            }
        })

    });

}

function resizePalette(n) {
    // generatePalette(...);
}


function checkNeigbours() {
    // return 0 (alive) or 1 (dead) for each cell based on its neighbours.

}



// Make mouse move the page.
