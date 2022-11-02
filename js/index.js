// Header Buttons
let start = document.getElementById("start");
let pause =  document.getElementById("pause");
let reset = document.getElementById("reset");
let rules = document.getElementById("rules");
let eraser = document.getElementById("eraser");
let intervalID;

start.addEventListener("click", () => {
    // starts a session or resumes ongoing session from pause.
    intervalID = setInterval(startSession, 1000);
});
pause.addEventListener("click", () => {
    // Pauses ongoing session.
    clearInterval(intervalID);
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
    // Active the eraser icon for the boards.
    activateEraserIcon()
});

function activateEraserIcon() {
    let boards = document.getElementsByClassName('boards-container')[0]
    if (eraserOn === false) {
        boards.setAttribute('id',  'change-cursor');
        eraserOn = true;
        eraser.innerHTML = "Eraser(ON)";

    } else {
        boards.removeAttribute('id');
        eraserOn = false;
        eraser.innerHTML = "Eraser(OFF)";
    }
}

// Boards logic
function generatePalette(n) {
    // Generate board
    for (let i = 0; i < (n*n); i++) {
        let divElem = document.createElement('div');
        divElem.setAttribute('class', 'cell');
        divElem.setAttribute('id', `${i}`);
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
    document.querySelectorAll('.cell').forEach((item) => {
        let itemId = item.getAttribute('id');
        let res = checkNeighbors(itemId);
        if (res === 0) {
            // (alive)
            item.style.backgroundColor = 'black';
        } else if (res === 1) {
            // (dead)
            item.style.backgroundColor = 'white';
        }
    });
}

function checkNeighbors(strN) {
    // return 0 (alive) or 1 (dead) for each cell based on its neighbours.
    // if 0 <= n <= 499 (top row)
    // if 62000 <= n <= 62500 (bottom row)
    // if (n % 500) == 0 (left-most column)
    // if (n + 1) % 500 == 0 (right-most column)
    const n = parseInt(strN);
    const edges = [0, 499, 62000, 62499];
    let allNeighbors;    
    let allColors;

    if (edges.indexOf(n) !== -1) {
        // one of the 4 edges
        if (edges.indexOf(n) === 0) {
            //left-top edge
            allNeighbors = getNeighbors(n, 'E', 'S', 'SE');

        } else if (edges.indexOf(n) === 1) {
            //right-top edge
            allNeighbors = getNeighbors(n, 'W', 'SW', 'S');

        } else if (edges.indexOf(n) === 2) {
            //left-down edge
            allNeighbors = getNeighbors(n, 'N', 'E', 'NE');

        } else {
            //right-down edge
            allNeighbors = getNeighbors(n, 'N', 'W', 'NW');
        }

    } else if (0 <= n && n <= 499) {
        // top row
        allNeighbors = getNeighbors(n, 'W', 'E', 'S', 'SW', 'SE')

    } else if (62000 <= n && n <= 62499) {
        // bottom row
        allNeighbors = getNeighbors(n, 'W', 'E', 'N', 'NW', 'NE');

    } else if (n % 500 === 0) {
        // left column
        allNeighbors = getNeighbors(n, 'N', 'S', 'E', 'NE', 'SE');

    } else if ((n + 1) % 500 === 0) {
        // right column
        allNeighbors = getNeighbors(n, 'N', 'S', 'W', 'NW', 'SW');

    } else {
        // regular position
        allNeighbors = getNeighbors(n, 'N', 'NW', 'NE', 'W', 'E', 'S', 'SW', 'SE');
    }

    allColors = getBackgroundColors(allNeighbors);
    let res = isAlive(n, allColors);
    return res;
}

function isAlive(cellN, neighbours) {
    let cell = getColor(cellN);
    let n = noOfLiveCells(neighbours);

    if (cell === "black") {
        // Live cell
        // Any live cell with two or three live neighbours lives on to the next generation (returns 0)
        // Any live cell with fewer than two live neighbours dies (returns 1)
        //Any live cell with more than three live neigbours dies (returns 1)
        let res = (n === 2 || n === 3) ? 0 : 1 
        return res
    } else {
        // Dead cell
        // Any dead cell with exactly three live neigbours becomes a live cell. returns (0) 
        // Every other case. returns (1)
        let res = (n === 3) ? 0 : 1
        return res
    }
}
function noOfLiveCells(arr) {
    // Takes an array of colors (string) and return an array of two elemenets.
    // result[0] -> no of alive cells
    // result[1] -> no of dead cells
    let alive = 0;
    arr.forEach((item) => {
        if (item === "black") {
            alive += 1;
        } 
    });
    return alive 
}

// Helpers
function getNeighbors(n, ...arr) {
    let res = arr.map((dir) => {
        return getOneNeighbor(n, dir);
    });
    return res;
}
function getOneNeighbor(n, dir) {
    switch(dir) {
        case 'N':
            return (n - 500) 
        case 'NW':
            return (n - 500) - 1; 
        case 'NE':
            return (n - 500) + 1; 
        case 'W':
            return (n - 1);
        case 'E':
            return (n + 1);
        case 'S':
            return (n + 500); 
        case 'SW':
            return (n + 500) - 1; 
        case 'SE':
            return (n + 500) + 1; 
    }
}
function getBackgroundColors(...arr) {
    let res = arr[0].map((n) => {
        let color = getColor(n);
        return color
    });
    return res
}
function getColor(n) {
    let color = (document.getElementById(`${n}`)
    .style.backgroundColor === "black") ? "black" : "white";
    return color;
}

function main() {
    // Loads the palette on page load.
    // (250x250 cells) with a spread of 500. i.e. 62500 (250x250) cells created and
    // these cells are on a grid with 500 column. (500 columns, 125 rows)
    generatePalette(250);
}

