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
                    `<div class = "tile black" id = ${id} ondrop="drop(event)" ondragover="allowDrop(event)" onclick = "clickMove(event)"></div>`;
                }
                if(piece != undefined) {
                    board.innerHTML += 
                        `<div class = "tile black" id = ${id} ondrop="drop(event)" ondragover="allowDrop(event)" onclick = "clickMove(event)">
                            <i class="devicon-${piece}-plain ${piece}" id = p-${id} ondragstart="drag(event)" style = "color: ${clr}" draggable = "true" ondragover="allowDrop(event)" ondrop="drop(event)" onclick = "clickMove(event)"></i>
                        </div>`;
                }
            }
            else {
                if(piece === undefined) {
                    board.innerHTML += 
                    `<div class = "tile white" id = ${id} ondrop="drop(event)" ondragover="allowDrop(event)" onclick = "clickMove(event)"></div>`;
                }
                if(piece != undefined) {
                    board.innerHTML += 
                        `<div class = "tile white" id = ${id} ondrop="drop(event)" ondragover="allowDrop(event)" onclick = "clickMove(event)">
                            <i class="devicon-${piece}-plain ${piece}" id = p-${id} ondragstart="drag(event)" style = "color: ${clr}" draggable = "true" ondragover="allowDrop(event)" ondrop="drop(event)" onclick = "clickMove(event)"></i>
                        </div>`;
                }
            }
        }
    }
}

var encounter = 0;
function validMoves(piece) {

    //Valid moves for black pawn
    if(piece.classList.contains('html5') && piece.style.color === 'black') {
        var pieceColor = piece.style.color;
        var location = piece.parentNode.id;
        var valid = [];
        
        if(location % 10 === 7) {
            let i = 1;
            while(isValidPawn(location - i) && i < 3) {
                valid.push(document.getElementById(location - i));
                i++
            }
        }

        if(isValidPawn(location - 1) && location != 7) {
            valid.push(document.getElementById(location - 1));
        }

        //Right diagonal attack
        if(isValid(location - 1 + 10, pieceColor)) {
            var right = document.getElementById(location - 1 + 10);
            if(right.children.length > 0) {
                valid.push(right);
                if(encounter === 1) {
                    resetEncounters();
                }
            }
        }
        
        //Left diagonal attack
        if(isValid(location - 1 - 10, pieceColor)) {
            var right = document.getElementById(location - 1 - 10);
            if(right.children.length > 0) {
                valid.push(right);
                if(encounter === 1) {
                    resetEncounters();
                }
            }
        }
    }

    //Valid moves for white pawn
    if(piece.classList.contains('html5') && piece.style.color === 'white') {
        var pieceColor = piece.style.color;
        var location = piece.parentNode.id;
        var valid = [];

        if(location % 10 === 2) {
            let i = 1;
            while(isValidPawn(location - (-i), pieceColor) && i < 3) {
                valid.push(document.getElementById(location - (-i)));
                i++
            }
        }

        if(isValidPawn(location - (-1), pieceColor) && location != 7) {
            valid.push(document.getElementById(location - (-1)));
        }

        //Right diagonal attack
        if(isValid(location - (-1) + 10, pieceColor)) {
            var right = document.getElementById(location - (-1) + 10);
            if(right.children.length > 0) {
                valid.push(right);
                if(encounter === 1) {
                    resetEncounters();
                }
            }
        }
        
        //Left diagonal attack
        if(isValid(location - (-1) - 10, pieceColor)) {
            var right = document.getElementById(location - (-1) - 10);
            if(right.children.length > 0) {
                valid.push(right);
                if(encounter === 1) {
                    resetEncounters();
                }
            }
        }

        
    }

    //Valid rook moves
    if(piece.classList.contains('javascript')) {
        var pieceColor = piece.style.color;
        var location = piece.parentNode.id;
        var valid = [];

        //Down
        let d = 1;
        while (isValid(location - d, pieceColor)) {
            valid.push(document.getElementById(location - d));
            if(encounter === 1) {
                resetEncounters();
                break;
            }
            d++;
        }

        //Up
        let u = 1;
        while (isValid((location - (-u)), pieceColor)) {
            valid.push(document.getElementById(location - (-u)));
            if(encounter === 1) {
                resetEncounters();
                break;
            }
            u++;
        }

        //Left
        let l = 1;
        while (isValid(location - (l * 10), pieceColor)) {
            valid.push(document.getElementById(location - (l * 10)));
            if(encounter === 1) {
                resetEncounters();
                break;
            }
            l++;
        }

        //Right
        let r = 1;
        while (isValid(location - (-(r * 10)), pieceColor)) {
            valid.push(document.getElementById(location - (-(r * 10))));
            if(encounter === 1) {
                resetEncounters();
                break;
            }
            r++;
        }
    }

    //Valid Knight moves
    if(piece.classList.contains('css3')) {
        var pieceColor = piece.style.color;
        var location = piece.parentNode.id;
        var valid = [];

        if(isValid((location - 2) + 10, pieceColor)) {
            valid.push(document.getElementById((location - 2) + 10));
            if(encounter === 1) {
                resetEncounters();
            }
        }

        if(isValid((location - 2) - 10, pieceColor)) {
            valid.push(document.getElementById((location - 2) - 10));
            if(encounter === 1) {
                resetEncounters();
            }
        }

        if(isValid((location - 20) + 1, pieceColor)) {
            valid.push(document.getElementById((location - 20) + 1));
            if(encounter === 1) {
                resetEncounters();
            }
        }

        if(isValid((location - 20) - 1, pieceColor)) {
            valid.push(document.getElementById((location - 20) - 1));
            if(encounter === 1) {
                resetEncounters();
            }
        }

        if(isValid((location - (-2)) + 10, pieceColor)) {
            valid.push(document.getElementById((location - (-2)) + 10));
            if(encounter === 1) {
                resetEncounters();
            }
        }

        if(isValid((location - (-2)) - 10, pieceColor)) {
            valid.push(document.getElementById((location - (-2)) - 10));
            if(encounter === 1) {
                resetEncounters();
            }
        }

        if(isValid((location - (-20)) + 1, pieceColor)) {
            valid.push(document.getElementById((location - (-20)) + 1));
            if(encounter === 1) {
                resetEncounters();
            }
        }

        if(isValid((location - (-20)) - 1, pieceColor)) {
            valid.push(document.getElementById((location - (-20)) - 1));
            if(encounter === 1) {
                resetEncounters();
            }
        }
    }

    //Valid Bishop moves
    if(piece.classList.contains('react')) {
        var pieceColor = piece.style.color;
        var location = piece.parentNode.id;
        var valid = [];

        //Forward Left
        let fl = 1;
        while (isValid(location - fl - (fl * 10), pieceColor)) {
            valid.push(document.getElementById(location - fl - (fl *10)));
            if(encounter === 1) {
                resetEncounters();
                break;
            }
            fl++;
        }

        //Back Right
        let br = 1;
        while (isValid(location - (-br) - ((-br) * 10), pieceColor)) {
            valid.push(document.getElementById(location - (-br) - ((-br) *10)));
            if(encounter === 1) {
                resetEncounters();
                break;
            }
            br++;
        }

        //Back Left
        let bl = 1;
        while (isValid(location - (-bl) - (bl * 10), pieceColor)) {
            valid.push(document.getElementById(location - (-bl) - (bl * 10)));
            if(encounter === 1) {
                resetEncounters();
                break;
            }
            bl++;
        }

        //Forward Right
        let fr = 1;
        while (isValid(location  - fr - (-(fr * 10)), pieceColor)) {
            valid.push(document.getElementById(location  - (fr) - (-(fr * 10))));
            if(encounter === 1) {
                resetEncounters();
                break;
            }
            fr++;
        }
    }

    //Valid Queen moves
    if(piece.classList.contains('python')) {
        var pieceColor = piece.style.color;
        var location = piece.parentNode.id;
        var valid = [];

        let fl = 1;
        while (isValid(location - fl - (fl * 10), pieceColor)) {
            valid.push(document.getElementById(location - fl - (fl *10)));
            if(encounter === 1) {
                resetEncounters();
                break;
            }
            fl++;
        }

        let br = 1;
        while (isValid(location - (-br) - ((-br) * 10), pieceColor)) {
            valid.push(document.getElementById(location - (-br) - ((-br) *10)));
            if(encounter === 1) {
                resetEncounters();
                break;
            }
            br++;
        }

        let bl = 1;
        while (isValid(location - (-bl) - (bl * 10), pieceColor)) {
            valid.push(document.getElementById(location - (-bl) - (bl * 10)));
            if(encounter === 1) {
                resetEncounters();
                break;
            }
            bl++;
        }

        let fr = 1;
        while (isValid(location  - fr - (-(fr * 10)), pieceColor)) {
            valid.push(document.getElementById(location  - (fr) - (-(fr * 10))));
            if(encounter === 1) {
                resetEncounters();
                break;
            }
            fr++;
        }

        //Down
        let d = 1;
        while (isValid(location - d, pieceColor)) {
            valid.push(document.getElementById(location - d));
            if(encounter === 1) {
                resetEncounters();
                break;
            }
            d++;
        }

        //Up
        let u = 1;
        while (isValid((location - (-u)), pieceColor)) {
            valid.push(document.getElementById(location - (-u)));
            if(encounter === 1) {
                resetEncounters();
                break;
            }
            u++;
        }

        //Left
        let l = 1;
        while (isValid(location - (l * 10), pieceColor)) {
            valid.push(document.getElementById(location - (l * 10)));
            if(encounter === 1) {
                resetEncounters();
                break;
            }
            l++;
        }

        //Right
        let r = 1;
        while (isValid(location - (-(r * 10)), pieceColor)) {
            valid.push(document.getElementById(location - (-(r * 10))));
            if(encounter === 1) {
                resetEncounters();
                break;
            }
            r++;
        }
    }

    //Valid King Moves
    if(piece.classList.contains('java')) {
        var pieceColor = piece.style.color;
        var location = piece.parentNode.id;
        var valid = [];
        
        //Down
        if(isValid(location - 1, pieceColor)) {
            valid.push(document.getElementById(location - 1));
            if(encounter === 1) {
                resetEncounters();
            }
        }

        //Down left
        if(isValid(location - 1 - 10, pieceColor)) {
            valid.push(document.getElementById(location - 1 - 10));
            if(encounter === 1) {
                resetEncounters();
            }
        }

        //Left
        if(isValid(location - 10, pieceColor)) {
            valid.push(document.getElementById(location - 10));
            if(encounter === 1) {
                resetEncounters();
            }
        }

        //Up Left
        if(isValid(location - (-1) - 10, pieceColor)) {
            valid.push(document.getElementById(location - (-1) - 10));
            if(encounter === 1) {
                resetEncounters();
            }
        }

        //Up
        if(isValid(location - (-1), pieceColor)) {
            valid.push(document.getElementById(location - (-1)));
            if(encounter === 1) {
                resetEncounters();
            }
        }

        //Up right
        if(isValid(location - (-1) - (-10), pieceColor)) {
            valid.push(document.getElementById(location - (-1) - (-10)));
            if(encounter === 1) {
                resetEncounters();
            }
        }

        //Right
        if(isValid(location - (-10), pieceColor)) {
            valid.push(document.getElementById(location - (-10)));
            if(encounter === 1) {
                resetEncounters();
            }
        }

        //Down Right
        if(isValid(location - 1 - (-10), pieceColor)) {
            valid.push(document.getElementById(location - 1 - (-10)));
            if(encounter === 1) {
                resetEncounters();
            }
        }

    }

    if(valid.length > 0) {
        for(let i = 0; i < valid.length; i++) {
            valid[i].classList.add('valid')
        }
    }
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

    //prevents inserting into other icon elements or non-valid moves
    try {
        if(ev.target.classList.contains('valid') || ev.target.parentNode.classList.contains('valid')) { 
            if(!ev.target.children.length > 0 && ev.target.nodeName != 'I') {
                ev.target.appendChild(document.getElementById(data));
            }
            else if(ev.target.nodeName === 'I') {
                ev.target.replaceWith(document.getElementById(data));
            }
            else {
                ev.target.firstElementChild.replaceWith(document.getElementById(data));
            }
        }
    }
    catch(err) {
        console.log('Piece Captured')
    }

    //Removes color of valid move
    var valid = document.querySelectorAll('div');
    for(let i = 0; i < valid.length; i++){
        if(valid[i].classList.contains('valid')) {
            valid[i].classList.remove('valid')
        }
    }

}

//Determines if the space is a valid spot to place piece
function isValid(number, pieceColor) {
    if(number > 10 && number < 89  && (number % 10) != 0 && (number % 10) != 9 && canCapture(number, pieceColor)) {
        return true;
    }
    return false;
}

function isValidPawn(number) {
    const parent = document.getElementById(number);
    if(number > 10 && number < 89  && (number % 10) != 0 && (number % 10) != 9 && !parent.children.length > 0) {
        return true;
    }
    return false;
}

//Determines if the piece is capturable
function canCapture(location, pieceColor) {
    const parent = document.getElementById(location);
    if(parent.children.length > 0){
        color = parent.firstElementChild.style.color;

        if(pieceColor === color) {
            return false;
        }
        encounter += 1;
    }
    return true
}

function capture(){

}

function resetEncounters() {
    encounter -= 1;
}

//Click to move and Capture
var id = null;
function clickMove(ev) {
    if(ev.target.nodeName === 'I' && id === null) {
        let piece = ev.target;
        validMoves(piece);
        id = ev.target.id;
    }

    try {
        ev.preventDefault();
        if(ev.target.classList.contains('valid') || ev.target.parentNode.classList.contains('valid')) { 
            if(!ev.target.children.length > 0 && ev.target.nodeName != 'I') {
                ev.target.appendChild(document.getElementById(id));
                id = null;

                var valid = document.querySelectorAll('div');
                for(let i = 0; i < valid.length; i++) {
                    if(valid[i].classList.contains('valid')) {
                        valid[i].classList.remove('valid')
                    }
                }
            }
            else if(ev.target.nodeName === 'I') {
                ev.target.replaceWith(document.getElementById(id));
                id = null;

                var valid = document.querySelectorAll('div');
                for(let i = 0; i < valid.length; i++) {
                    if(valid[i].classList.contains('valid')) {
                        valid[i].classList.remove('valid')
                    }
                }
            }
            else {
                ev.target.firstElementChild.replaceWith(document.getElementById(id));
                id = null;

                var valid = document.querySelectorAll('div');
                for(let i = 0; i < valid.length; i++) {
                    if(valid[i].classList.contains('valid')) {
                        valid[i].classList.remove('valid')
                    }
                }
            }
        }
    }
    catch(err) {
        console.log('Piece Captured')
    }


}
