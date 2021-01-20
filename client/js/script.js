'use strict';

let touch = false;
let eloCounter = 0;
let hints = 0;
let usernameMem = '';
let puzzleidMem = '';

function incrCounter(id) {
    document.querySelector('#changeElo').innerHTML = `<form class="d-none" action="/api/puzzles/incr/${id}" method="POST"><button type="submit" value="Increment counter" id="autoClick"></button></form>`;
    $("#autoClick").trigger("click");
}

function eloChanger(state, usernameIn, userElo,  puzzleid, puzzleElo) {
    if (state === 0) {
        document.querySelector('#changeElo').innerHTML = `<form class="d-none" action="/api/users/elo" method="POST"><input value="${usernameMem}" name="username"><input value="${puzzleidMem}" name="puzzleid"><input value="${eloCounter}" name="elo"><button type="submit" value="Change elo" id="autoClick"></button></form>`;
        $("#autoClick").trigger("click");
    }
    else if (state === 3) {
        if (!userElo) {
            return;
        }
        userElo = parseInt(userElo);
        usernameMem = usernameIn;
        puzzleidMem = puzzleid;
        hints = 0;
        let eloDifference = puzzleElo - userElo;
        if (eloDifference < -500) {
            eloCounter = 1;
        }
        else if (eloDifference >= -500 && eloDifference < -200) {
            eloCounter = 5;
        }
        else if (eloDifference >= -200 && eloDifference < 0) {
            eloCounter = 10;
        }
        else if (eloDifference >= 0 && eloDifference < 200) {
            eloCounter = 15;
        }
        else {
            eloCounter = 20;
        }
    }
    else if (state === 1) {
        if (eloCounter > -15) {
            eloCounter -= Math.floor(Math.random() * 7);
        }
    }
    else {
        hints++;
        if (eloCounter > -15) {
            eloCounter -= Math.floor(Math.random() * 5 * hints);
        }
    }
    return;
}

//DISPLAY IMAGE OF A CHESSBOARD

function displayBoardImage(board_name, fen, notation=false, orient="white") {
    let config = {
        showNotation: notation,
        position: fen,
        orientation: orient
    };
    let board = Chessboard(board_name, config);
    $(window).resize(board.resize);
}

//DISPLAY A BOARD WHERE PIECES CAN BE ADDED FROM THE SIDE

function editorBoard(pos, orient, touch, window) {
    function onChange(oldPos, newPos) {
        window.pos = Chessboard.objToFen(newPos);
    }

    function onDragStart() {
        if (touch) {
            document.querySelector('body').classList.add('scroll');
        }
    }

    function onDrop() {
        document.querySelector('body').classList.remove('scroll');
    }

    let config = {
        position: pos,
        orientation: orient,
        draggable: true,
        dropOffBoard: 'trash',
        sparePieces: true,
        onChange: onChange,
        onDragStart: onDragStart,
        onDrop: onDrop
    };

    let board = Chessboard("boardEd", config);
    $(window).resize(board.resize);

    $('#flip').on('click', function() {
        board.flip();
        if (window.orient === "white") {
            window.orient = "black";
        }
        else {
            window.orient = "white";
        }
    });
    $('#clearBtn').on('click', board.clear);
}

//DISPLAY A BOARD WHICH FOLLOWS CHESS RULES FOR SETTING UP PUZZLE MOVE ORDER AND STRUCTURE

function moveMaker(pos, orient, touch, window) {

    let first = "";
    function oneTimeChange(newPos) {
        let temp_fen = Chessboard.objToFen(newPos);
        let first_to_move = document.getElementById('first_to_move').checked;
        let white_ks = document.getElementById('white-ks').checked;
        let white_qs = document.getElementById('white-qs').checked;
        let black_ks = document.getElementById('black-ks').checked;
        let black_qs = document.getElementById('black-qs').checked;

        if (first_to_move) {
            temp_fen += ' w';
            first = "white";
        }
        else {
            temp_fen += ' b';
            first = "black";
        }
    
        if (!white_ks && !white_qs && !black_ks && !black_qs) {
            temp_fen += ' -';
        }
        else {
            temp_fen += ' ';
            if (white_ks) {
                temp_fen += 'K';
            }
            if (white_qs) {
                temp_fen += 'Q';
            }
            if (black_ks) {
                temp_fen += 'k';
            }
            if (black_qs) {
                temp_fen += 'q';
            }
        }
        temp_fen += ' - 0 1';

        window.pos = temp_fen;
        return window.pos;
    }

    pos = oneTimeChange(Chessboard.fenToObj(pos));
    const starting_fen = pos;
    let boardMo = null;
    let game = new Chess();
    let $pgn = $('#pgn');
    let $status = $('#status');
    game.load(pos);   
    

    function onDragStart (source, piece) {
        // do not pick up pieces if the game is over
        if (touch) {
            document.querySelector('body').classList.add('scroll');
        }
        if (game.game_over()) return false;

        // only pick up pieces for the side to move
        if ((game.turn() === 'w' && piece.search(/^b/) !== -1) ||
            (game.turn() === 'b' && piece.search(/^w/) !== -1)) {
                return false;
            }
        }

    function onDrop (source, target) {
        document.querySelector('body').classList.remove('scroll');
        // see if the move is legal
            let move = game.move({
                from: source,
                to: target,
                promotion: 'q' // NOTE: always promote to a queen for example simplicity
        });

        // illegal move
        if (move === null) return 'snapback';

        updateStatus();
    }

    // update the boardMo position after the piece snap
    // for castling, en passant, pawn promotion
    function onSnapEnd () {
        boardMo.position(game.fen());
        let history = game.history({ verbose: true });
        if (history.length % 2 == 1) {
            document.querySelector('#submitStatus').innerHTML = '<button type="submit" id="sendPuzzle" value="Send puzzle">submit</button>';
        }
        else {
            document.querySelector('#submitStatus').innerHTML = '<button type="submit" id="button-off" value="Send puzzle" disabled>submit</button><p>You have to make the <span>last move!</span></p>';
        }
        updateStatus();
    }
        
    function updateStatus () {
        let temp = game.pgn();
        temp = temp.replace(/ *\[[^\]]*]/, '');
        temp = temp.replace(/ *\[[^\]]*]/, '');

        let temp1 = "";
        let temp2 = "";
        for (let i = 0; i < temp.length; i++) {
            temp2 = "";
            while (Number.isInteger(parseInt(temp[i]))) {
                temp2 += temp[i];
                i++;
            }
            if (i !== 0 && temp[i] === '.' && Number.isInteger(parseInt(temp[i-1]))) {
                temp1 += "<br> ";
            }
            temp1 += temp2;
            if (temp[i]) {
                temp1 += temp[i];
            }
        }
        temp = temp1;

        let status = '';
        
        let moveColor = 'White';
        if (game.turn() === 'b') {
            moveColor = 'Black';
        }
        
        // checkmate?
        if (game.in_checkmate()) {
            status = 'Game over, ' + moveColor + ' is in checkmate.';
        }
        
        // draw?
        else if (game.in_draw()) {
            status = 'Game over, drawn position';
        }
        
        // game still on
        else {
            status = moveColor + ' to move';
        
            // check?
            if (game.in_check()) {
            status += ', ' + moveColor + ' is in check';
            }
        }
        
        $status.html(status);
        $pgn.html(temp);

        let history = game.history({ verbose: true });
        history = JSON.stringify(history);
        const ending_fen = game.fen();
        const pgn = document.querySelector('#pgn').innerHTML;
        let sendBack = "";
        sendBack += `<input class="d-none" name="history" value='${history}'>`;
        sendBack += `<input class="d-none" name="fen" value="${starting_fen}">`;
        sendBack += `<input class="d-none" name="pgn" value="${pgn}">`;
        sendBack += `<input class="d-none" name="first" value="${first}">`;
        sendBack += `<input class="d-none" name="final_fen" value="${ending_fen}">`;
        document.querySelector('#history').innerHTML = sendBack;
    }

    let config = {
        orientation: orient,
        draggable: true,
        position: pos,
        onDragStart: onDragStart,
        onDrop: onDrop,
        onSnapEnd: onSnapEnd
    };
    
    boardMo = Chessboard('boardMo', config);
    $(window).resize(boardMo.resize);

    updateStatus();

    $('#flip').on('click', function() {
        boardMo.flip();
        if (window.orient === "white") {
            window.orient = "black";
        }
        else {
            window.orient = "white";
        }
    });

    $('#undo').on('click', function() {
        game.undo();
        boardMo.position(game.fen());
        updateStatus();
    });
}

//CONDITIONAL RENDERING: TOGGLE FOR EDITOR BOARD AND MOVE MAKER

function setPosition (window) {
    if (document.querySelector('#setBtn').innerHTML === '<button onclick="setPosition(window)">Set Initial Puzzle Position</button>') {
        document.querySelector('#checkboxes').classList.add('d-none');
        document.querySelector('#setBtn').textContent = "";
        document.querySelector('#clearBtn').classList.add('d-none');
        document.querySelector('#unsetBtn').innerHTML = '<button onClick="setPosition(window)">Unset Initial Puzzle Position</button>';
        document.querySelector('#undo').innerHTML = '<button id="undoBtn" class="mt-2">Undo button</button>';
        document.querySelector('#changeBoard').innerHTML = '<div id="boardMo" style="width: 75%"></div>';
        document.querySelector('#progress').textContent = '';
        document.querySelector('#success').innerHTML = '<label for="title">How would you like to name this puzzle?</label><br><input class="mb-3" type="text" name="title" size="50" id="title">';
        document.querySelector('#success').innerHTML += '&nbsp;<br><label for="rating">How would you rate this puzzle?</label><br class=".d-block .d-sm-none"> <input maxlength="4" class="mb-3" type="text" name="rating" size="4" id="rating">';
        document.querySelector('#success').innerHTML += '&nbsp;ELO<br><div id="history"></div><div id="submitStatus"><button class="mt-4" type="submit" id="button-off" value="Send puzzle" disabled>submit</button><p><span>Note:</span> You have to make the <span>last move!</span></p></div>';
        document.querySelector('#touchHandler').innerHTML = "<script>document.getElementById('boardMo').addEventListener('touchstart', function onFirstTouch(event) {touch = true;event.preventDefault();}, { passive: false });</script>";
        moveMaker(window.pos, window.orient, touch, window);
    }
    else {
        document.querySelector('#setBtn').innerHTML = '<button onClick="setPosition(window)">Set Initial Puzzle Position</button>';
        document.querySelector('#unsetBtn').innerHTML = "";
        document.querySelector('#checkboxes').classList.remove('d-none');
        document.querySelector('#undo').innerHTML = "";
        document.querySelector('#clearBtn').classList.remove('d-none');
        document.querySelector('#changeBoard').innerHTML = '<div id="boardEd" style="width: 75%"></div>';
        document.querySelector('#pgn').textContent = "";
        document.querySelector('#status').innerHTML = "";
        document.querySelector('#progress').textContent = "Create your board!";
        document.querySelector('#success').innerHTML = "";
        document.querySelector('#touchHandler').innerHTML = "<script>document.getElementById('boardEd').addEventListener('touchstart', function onFirstTouch(event) {touch = true;event.preventDefault();}, { passive: false });</script>";
        editorBoard(window.pos, window.orient, touch, window);
    }
}

//DISPLAY BACK TO FORUM AND COMMENT SECTION AFTER COMPLETING PUZZLE

function doneContent(name, fen, id, pgn, bool, orient, username, notSolvedBy, notSamePerson, counter=null, puzzleDone=false, userEloMem) {
    document.getElementById('progress').textContent = 'Congratulations!';
    document.querySelector('#ruler-for-solved1').classList.remove('d-none');
    document.querySelector('#ruler-for-solved2').classList.remove('d-none');
    document.getElementById('progress').classList.add('gold');
    document.getElementById('counterBtn').classList.remove('d-none');
    document.getElementById('puzzle-solved').classList.remove('d-none');
    document.getElementById("comments").classList.remove('d-none');
    document.getElementById('status').classList.add('d-none');
    document.getElementById("hint").classList.add('d-none');
    document.getElementById('solve').classList.add('d-none');

    let change = null;
    if (puzzleDone && notSolvedBy && notSamePerson) {
        eloChanger(0);
        return;
    }
    else if (counter !== null) {
        change = counter;
    }
    else if (username) {
        change = 0;
    }
    if (change || change === 0) {
        if (change > 0) {
            document.getElementById('eloChange').innerHTML = `<p id="increase">Your ELO rating of <span>${userEloMem-change}</span> has increased by <span>${change}</span>!<br>Your rating is now: <span>${userEloMem}</span></p>`
        }
        else if (change < 0) {
            document.getElementById('eloChange').innerHTML = `<p id="decrease">Your ELO rating of <span>${userEloMem-change}</span> has unfortunately decreased by <span>${change}</span>.<br>Your rating is now: <span>${userEloMem}</span></p>`
        }
        else if (change === 0){
            document.getElementById('eloChange').innerHTML = '<p>Your ELO rating for completing this puzzle has not changed.</p>'
        }
    }

    pgn = pgn.replace(/&lt;/g, "<");
    pgn = pgn.replace(/&gt;/g, ">");

    document.querySelector('#pgn').innerHTML = pgn;
    if (puzzleDone) incrCounter(id);
    displayBoardImage(name, fen, bool, orient);
}

//DISPLAY A CHESS BOARD WHICH FOLLOWS CHESS RULES AND IS USED FOR SOLVING PROBLEMS

function solver (initial_pos, moves, id, pgn, touch, username, notSolvedBy, notSamePerson) {
    let s_idx = 0;
    let $board = $('#myBoard');
    let game = new Chess();
    game.load(initial_pos);
    let squareClass = 'square-55d63';
    let squareToHighlight = null;
    let colorToHighlight = null;
    let board = null;
    let $status = $('#status');
    let $pgn = $('#pgn');

    function onDragStart (source, piece) {
        if (touch) {
            document.querySelector('body').classList.add('scroll');
        }
        // do not pick up pieces if the game is over
        if (game.game_over()) return false;

        // only pick up pieces for the side to move
        if ((game.turn() === 'w' && piece.search(/^b/) !== -1) ||
            (game.turn() === 'b' && piece.search(/^w/) !== -1)) {
            return false;
        }
    }

    function onDrop (source, target) {
        // see if the move is legal
        document.querySelector('body').classList.remove('scroll');
        if (moves.length > s_idx) {
            if (source !== moves[s_idx].from || target !== moves[s_idx].to) {
                if (source !== target) {
                    document.getElementById('progress').textContent = 'Incorrect Move!';
                    eloChanger(1);
                } 
                return 'snapback';
            }
        }

        let move = game.move({
            from: source,
            to: target,
            promotion: 'q' // NOTE: always promote to a queen for example simplicity
        });

        if (move === null) {
            return 'snapback';
        }
        s_idx++;
        if (moves.length <= s_idx) {
            doneContent('myBoard', game.fen(), id, pgn, true, window.orient, username, notSolvedBy, notSamePerson, null, true);
        } 
        game.move(moves[s_idx]);
        s_idx++;
        if (moves.length > s_idx) {
            document.getElementById('progress').textContent = 'Correct!';
        }    

    // illegal move    
        
        updateStatus();
    }

    // update the board position after the piece snap
    // for castling, en passant, pawn promotion
    function onSnapEnd () {
        board.position(game.fen());
    }

    function updateStatus () {
        let temp = game.pgn();
        temp = temp.replace(/ *\[[^\]]*]/, '');
        temp = temp.replace(/ *\[[^\]]*]/, '');

        let status = '';

        let moveColor = 'White';
        if (game.turn() === 'b') {
            moveColor = 'Black';
        }

        let temp1 = "";
        let temp2 = "";
        for (let i = 0; i < temp.length; i++) {
            temp2 = "";
            while (Number.isInteger(parseInt(temp[i]))) {
                temp2 += temp[i];
                i++;
            }
            if (i !== 0 && temp[i] === '.' && Number.isInteger(parseInt(temp[i-1]))) {
                temp1 += "<br> ";
            }
            temp1 += temp2;
            if (temp[i]) {
                temp1 += temp[i];
            }
        }
        temp = temp1;

        // checkmate?
        if (game.in_checkmate()) {
            status = 'Game over, ' + moveColor + ' is in checkmate.';
        }

        // draw?
        else if (game.in_draw()) {
            status = 'Game over, drawn position';
        }

        // game still on
        else {
            status = moveColor + ' to move';

            // check?
            if (game.in_check()) {
            status += ', ' + moveColor + ' is in check';
            }
        }

        $status.html(status);
        $pgn.html(temp);

    }

    function onMoveEnd() {
        $board.find('.' + squareClass).removeClass('highlight-white');
        $board.find('.' + squareClass).removeClass('highlight-black');
    }

    $('#hint').on('click', function () {
        eloChanger(2);
        let move = {};
        move.from = moves[s_idx].from;
        move.to = moves[s_idx].to;
        move.color = moves[s_idx].color;
        if (move.color === 'w') {
            $board.find('.' + squareClass).removeClass('highlight-white');
            $board.find('.square-' + move.from).addClass('highlight-white');
            squareToHighlight = move.to;
            colorToHighlight = 'white';
          } 
        else {
            $board.find('.' + squareClass).removeClass('highlight-black');
            $board.find('.square-' + move.from).addClass('highlight-black');
            squareToHighlight = move.to;
            colorToHighlight = 'black';
        }
        $board.find('.square-' + squareToHighlight).addClass('highlight-' + colorToHighlight);
    });

    let config = {
        draggable: true,
        position: initial_pos,
        onDragStart: onDragStart,
        onDrop: onDrop,
        onSnapEnd: onSnapEnd,
        onMoveEnd: onMoveEnd
    };

    board = Chessboard('myBoard', config);
    $(window).resize(board.resize);
    if (game.turn() === 'b') {
        board.flip();
        window.orient = "black";
    }

    updateStatus();
}

exports.eloChanger = eloChanger;
exports.displayBoardImage = displayBoardImage;
exports.editorBoard = editorBoard;
exports.moveMaker = moveMaker;
exports.setPosition = setPosition;
exports.doneContent = doneContent;
exports.solver = solver;