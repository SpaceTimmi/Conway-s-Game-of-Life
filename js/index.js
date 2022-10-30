// Header Buttons
let start = document.getElementById("start");
let pause =  document.getElementById("pause");
let reset = document.getElementById("reset");
let rules = document.getElementById("rules");
let eraser = document.getElementById("eraser");

start.addEventListener("click", () => {
    // Resumes ongoing session from pause.

});
pause.addEventListener("click", () => {
    // Pauses ongoing session.

});
reset.addEventListener("click", () => {
    // Restarts the game to blank position.
    location.reload();
});
rules.addEventListener("click", () => {
    // Redirect to the instrcutions page (opens in a new tab)
    window.open(
        'https://github.com/SpaceTimmi/Conway-s-Game-of-Life/blob/main/README.md',
        '_blank'
    );
});



let eraserOn = false;
/* Not-so bright idea lol.
keeps track of if I'm trying to clear a cell or mark a cell.
*/
eraser.addEventListener("click", () => {
    // Allow user to erase cells that have been marked.
    let cells = document.querySelectorAll(".cell");

    if (eraserOn === false) {
        cells.forEach((item) => {
            item.setAttribute('id', 'change-cursor');
        });
        eraserOn = true;
        eraser.innerHTML = "Eraser(ON)";

    } else {
        cells.forEach((item) => {
            item.removeAttribute('id');
        })
        eraserOn = false;
        eraser.innerHTML = "Eraser(OFF)";
    }
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

function startSession() {
    // starts the game of life.
}

function checkNeigbours() {
    // return 0 (alive) or 1 (dead) for each cell based on its neighbours.

}


function main() {
    // Loads the palette on page load.
    generatePalette(250);
}

