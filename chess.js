if(document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready);
} else {
    ready();
}

function ready() {
    populate();
}

const pieces = [];

//Pawns
for(let i = 0; i < 8; i++){
    pieces.push({
        type: 'html5',
        color: 'black', 
        xAxis: 6, 
        yAxis: i
    })
}

for(let i = 0; i < 8; i++){
    pieces.push({
        type: 'html5',
        color: 'white', 
        xAxis: 1, 
        yAxis: i
    })
}

for(let i = 0; i < 2; i++){
    const type = (i === 0) ? "white" : "black";
    const xAxis = (i === 0) ? 0 : 7;
  
    //Rooks
    pieces.push({type: 'javascript', color: type, xAxis, yAxis: 0 });
    pieces.push({type: 'javascript', color: type, xAxis, yAxis: 7 });

    //Knights
    pieces.push({type: 'css3', color: type, xAxis, yAxis: 1 });
    pieces.push({type: 'css3', color: type, xAxis, yAxis: 6 });

    //Bishops
    pieces.push({type: 'react', color: type, xAxis, yAxis: 2 });
    pieces.push({type: 'react', color: type, xAxis, yAxis: 5 });

    //Queens
    pieces.push({type: 'python', color: type, xAxis, yAxis: 3 });

    //Kings
    pieces.push({type: 'java', color: type, xAxis, yAxis: 4 });
}

//Puts everthing on the board
function populate() {
    const board = document.getElementsByClassName('chessboard')[0];
    let x = ['A', 'B', 'C', 'D', 'E','F', 'G', 'H']
    for(var i = 7; i >= 0; i--) {
        for(var j = 0; j < 8; j++) {
            let piece = undefined;
            let clr = undefined;
            let id = `${j + 1}${i+1}`;

            pieces.forEach(p => {
                if(p.xAxis === i && p.yAxis === j){
                    piece = p.type;
                    clr = p.color
                }
            });

            if((i-j) % 2 === 0) {
                if(piece === undefined) {
                    board.innerHTML += 
                    `<div class = "tile black" id = ${id} ondrop="drop(event)" ondragover="allowDrop(event)"></div>`;
                }
                if(piece != undefined) {
                    board.innerHTML += 
                        `<div class = "tile black" id = ${id} ondrop="drop(event)" ondragover="allowDrop(event)">
                            <i class="devicon-${piece}-plain ${piece}" id = p-${id} ondragstart="drag(event)" style = "color: ${clr}" draggable = "true"></i>
                        </div>`;
                }
            }
            else {
                if(piece === undefined) {
                    board.innerHTML += 
                    `<div class = "tile white" id = ${id} ondrop="drop(event)" ondragover="allowDrop(event)"></div>`;
                }
                if(piece != undefined) {
                    board.innerHTML += 
                        `<div class = "tile white" id = ${id} ondrop="drop(event)" ondragover="allowDrop(event)">
                            <i class="devicon-${piece}-plain ${piece}" id = p-${id} ondragstart="drag(event)" style = "color: ${clr}" draggable = "true"></i>
                        </div>`;
                }
            }
        }
    }
}

function validMoves(piece) {

    //Valid moves for black pawn
    if(piece.classList.contains('html5') && piece.style.color === 'black') {
        var location = parseInt(piece.parentNode.id);
        if(location % 10 === 7) {
            var valid = [document.getElementById(location - 1), document.getElementById(location - 2)];
            for(var i = 0; i < valid.length; i++) {
                valid[i].classList.add('valid')
            }
        }
        else {
            var valid = document.getElementById(location - 1);
            valid.classList.add('valid')
        }
    }

    //Valid moves for white pawn
    if(piece.classList.contains('html5') && piece.style.color === 'white') {
        var location = piece.parentNode.id;
        if(location % 10 === 2) {
            var valid = [document.getElementById(location - (-1)), document.getElementById(location - (-2))];
            for(var i = 0; i < valid.length; i++) {
                valid[i].classList.add('valid')
            }
        }
        else {
            var valid = document.getElementById(location - (-1));
            valid.classList.add('valid')
        }
    }

    //Valid rook moves
    // if(piece.classList.contains('javascript')) {
    //     var location = piece.parentNode.id;
    //     console.log((location - 1) % 10)
    //     var valid = [];
    //     for(let i = 1; i < 9; i++) {
    //         if((location - i) % 10 > 0  && (location - (-i)) % 10 < 9) {
    //             valid[i] = document.getElementById(location - i);
    //         }
    //     }

    //     if(valid.length > 0) {
    //         for(let i = 1; i < valid.length; i++) {
    //             console.log(valid[i])
    //             //valid[i].classList.add('valid')
    //         }
    //     }
    // }
}

function allowDrop(ev) {
    ev.preventDefault();
}
  
function drag(ev) {
    let piece = ev.target;
    validMoves(piece);
    piece.classList.add('hide'); //Hides original element when drag start
    ev.dataTransfer.setData("icon", ev.target.id);
}
  
function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("icon");
    document.getElementById(data).classList.remove('hide'); //Shows original element once dropped

    //prevents inserting into other icon elements or elements w/ children or non-valid moves
    if(!ev.target.children.length > 0 && ev.target.nodeName != 'I'  && ev.target.classList.contains('valid')) { 
        ev.target.appendChild(document.getElementById(data));
    }

    //Removes color of valid move
    var valid = document.querySelectorAll('div');
    for(let i = 0; i < valid.length; i++){
        if(valid[i].classList.contains('valid')) {
            valid[i].classList.remove('valid')
        }
    }

}
