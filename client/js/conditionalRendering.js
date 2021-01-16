'use strict';

//SORTING AND FILTERING OPTIONS
function sortOption(string) {
    if (string === 'none') {
        document.querySelector('#dropdownMenuButton').textContent = 'Puzzle sorting options';
    }
    else if(string === 'lrtg') {
        document.querySelector('#dropdownMenuButton').textContent = 'By rating: low to high';
    }
    else if(string === 'hrtg') {
        document.querySelector('#dropdownMenuButton').textContent = 'By rating: high to low';
    }
    else if(string === 'lpop') {
        document.querySelector('#dropdownMenuButton').textContent = 'By popularity: low to high';
    }
    else {
        document.querySelector('#dropdownMenuButton').textContent = 'By popularity: high to low';
    }
    document.querySelector('#sortChoice').innerHTML = `<input class="d-none" name="sortChoice" value="${string}">`;
}

function filterThreads (puzzles, title, creator, low, high) {
    for (let i = 0; i < puzzles.length; i++) {
        if (title && title !== puzzles[i].title || creator && creator !== puzzles[i].creator || low && low > puzzles[i].rating || high && high < puzzles[i].rating) {
            puzzles = puzzles.filter(puzzle => puzzle !== puzzles[i]);
            i--;
        }
    }
    return puzzles;
}

function advFilterThreads(puzzles, username, solved, yours) {
    if (solved === 'true') {
        for (let i = 0; i < puzzles.length; i++) {
            let bool = false;
            for (let j = 0; j < puzzles[i].solvers.length; j++) {
                if (username === puzzles[i].solvers[j].by) {
                    bool = true;
                    break;
                }
            }
            if (!bool) {
                puzzles = puzzles.filter(puzzle => puzzle !== puzzles[i]);
                i--;
            }
        }
    }
    else if (solved === 'false') {
        for (let i = 0; i < puzzles.length; i++) {
            let bool = false;
            for (let j = 0; j < puzzles[i].solvers.length; j++) {
                if (username === puzzles[i].solvers[j].by) {
                    bool = true;
                    break;
                }
            }
            if (bool) {
                puzzles = puzzles.filter(puzzle => puzzle !== puzzles[i]);
                i--;
            }
        }
    }
    if (yours ==='true') {
        for (let i = 0; i < puzzles.length; i++) {
            if (username !== puzzles[i].creator) {
                puzzles = puzzles.filter(puzzle => puzzle !== puzzles[i]);
                i--;
            }
        }
    }
    else if (yours === 'false') {
        for (let i = 0; i < puzzles.length; i++) {
            if (username === puzzles[i].creator) {
                puzzles = puzzles.filter(puzzle => puzzle !== puzzles[i]);
                i--;
            }
        }
    }

    return puzzles;
}

function advancedFilter(username) {
    if (username) {
        document.querySelector('#advancedFilter').innerHTML = '<span>Additional filtering options: </span><div class="form-check form-check-inline"><input class="form-check-input" checked type="radio" name="solvedOptions" id="inlineRadio" value="null"><label class="form-check-label" for="inlineRadio1">none</label></div><div class="form-check form-check-inline"><input class="form-check-input" type="radio" name="solvedOptions" id="inlineRadio2" value="true"><label class="form-check-label" for="inlineRadio2">Filter out solved puzzles</label></div><div class="form-check form-check-inline"><input class="form-check-input" type="radio" name="solvedOptions" id="inlineRadio3" value="false"><label class="form-check-label" for="inlineRadio3">Filter out unsolved puzzles</label></div><br>'
        document.querySelector('#advancedFilter').innerHTML += '<div class="mr-5"></div><div class="form-check form-check-inline"><input class="form-check-input" checked type="radio" name="creatorOptions" id="inlineRadio1" value="null"><label class="form-check-label" for="inlineRadio1">none</label></div><div class="form-check form-check-inline"><input class="form-check-input" type="radio" name="creatorOptions" id="inlineRadio2" value="true"><label class="form-check-label" for="inlineRadio2">Filter out your puzzles</label></div><div class="form-check form-check-inline"><input class="form-check-input" type="radio" name="creatorOptions" id="inlineRadio3" value="false"><label class="form-check-label" for="inlineRadio3">Filter out puzzles created by others</label></div>'
    }
    else {
        document.querySelector('#advancedFilter').innerHTML = '<span>Additional filtering options: </span><div class="form-check form-check-inline"><input  class="form-check-input" type="radio" name="none" id="inlineRadio1" value="option1" disabled><label class="form-check-label" for="inlineRadio1">none</label></div><div class="form-check form-check-inline"><input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2" disabled><label class="form-check-label" for="inlineRadio2">Filter out solved puzzles</label></div><div class="form-check form-check-inline"><input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio3" value="option3" disabled><label class="form-check-label" for="inlineRadio3">Filter out unsolved puzzles</label></div>'
        document.querySelector('#advancedFilter').innerHTML += '<hr class=".d-block .d-sm-none"><br><span>(Only if you sign up!) </span><div class="form-check form-check-inline"><input class="form-check-input" type="radio" name="none" id="inlineRadio1" value="option1" disabled><label class="form-check-label" for="inlineRadio1">none</label></div><div class="form-check form-check-inline"><input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2" disabled><label class="form-check-label" for="inlineRadio2">Filter out your puzzles</label></div><div class="form-check form-check-inline"><input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio3" value="option3" disabled><label class="form-check-label" for="inlineRadio3">Filter out puzzles created by others</label></div>'
    }
}

function increasingSort(puzzles, sub) {
    if (sub === 'rtg') {
        for (let i = 0; i < puzzles.length; i++) {
            let j = i;
            while (j > 0 && puzzles[j].rating < puzzles[j-1].rating) {
                let temp = puzzles[j];
                puzzles[j] = puzzles[j-1];
                puzzles[j-1] = temp;
                j--;
            }
        }
    }
    else {
        for (let i = 0; i < puzzles.length; i++) {
            let j = i;
            while (j > 0 && puzzles[j].completed < puzzles[j-1].completed) {
                let temp = puzzles[j];
                puzzles[j] = puzzles[j-1];
                puzzles[j-1] = temp;
                j--;
            }
        }
    }
    return;
}

function decreasingSort(puzzles, sub) {
    if (sub === 'rtg') {
        for (let i = 0; i < puzzles.length; i++) {
            let j = i;
            while (j > 0 && puzzles[j].rating > puzzles[j-1].rating) {
                let temp = puzzles[j];
                puzzles[j] = puzzles[j-1];
                puzzles[j-1] = temp;
                j--;
            }
        }
    }
    else {
        for (let i = 0; i < puzzles.length; i++) {
            let j = i;
            while (j > 0 && puzzles[j].completed > puzzles[j-1].completed) {
                let temp = puzzles[j];
                puzzles[j] = puzzles[j-1];
                puzzles[j-1] = temp;
                j--;
            }
        }
    }
    return;
}

function partitionIndex(puzzles, sort, title, creator, low, high, solved, yours, user) {
    puzzles = JSON.parse(puzzles);
    if (sort !== 'none' && sort) {
        let direction = sort[0];
        let sub = sort.substring(1, sort.length);
        if (direction === 'l') {
            increasingSort(puzzles, sub);
        }
        else {
            decreasingSort(puzzles, sub);
        }
    }
    if (title || creator || low || high) puzzles = filterThreads(puzzles, title, creator, low, high);
    if (solved || yours) return advFilterThreads(puzzles, user.username, solved, yours);
    return puzzles;
}
//SORTING AND FILTERING END

//DELETION BUTTON

function deletionImminent() {
    const none = document.querySelector('#deletion-form');
    if (none.classList.contains('d-none')) {
        document.querySelector('#deletion-form').classList.remove('d-none');
        document.querySelector('#abort').classList.remove('d-none');
    }
    else {
        document.querySelector('#deletion-form').classList.add('d-none');
        document.querySelector('#abort').classList.add('d-none');
    }
}

function loadDelButton(username, creator) {
    if (username === creator) {
        document.querySelector('#checkUserDelete').innerHTML = '<button class="mb-3" onClick="deletionImminent()">Delete thread</button>'
    }
}

//REPLY TO COMMENTS

function insertResponseUrl(puzzleid, commentid, username) {
    let id = "responseText" + commentid;
    document.querySelector('.undone').innerHTML = `<a onClick="responseText(${puzzleid}, ${commentid}, '${id}', '${username}')">reply</a>`;
    document.querySelector('.undone').classList.add(`${id}`);
    document.querySelector('.undone').classList.remove('undone');
}

function responseText(puzzleid, commentid, id, username) {
    id = "." + id;
    document.querySelector(`${id}`).innerHTML = `<form action="/api/puzzles/comment/add-response" method="POST"><input type="text" name="response" size="53"><input class="d-none" name="puzzleid" value="${puzzleid}"><input class="d-none" name="commentid" value="${commentid}"><input class="d-none" name="author" value="${username}">&nbsp;<button type="submit" value="Reply to comment">Reply</button></form>`;
}

//FORUM THREAD BACKGROUND COLOUR CHANGER

function forumThreadCheck(username, creator, solvers) {
    if (username === creator) {
        document.querySelector('.undone').classList.add('owner');
        document.querySelector('.undone').classList.remove('defaultThread');
    }
    else {
        for (let i = 0; i < solvers.length; i++) {
            if(solvers[i].by === username) {
                document.querySelector('.undone').classList.add('solved');
                document.querySelector('.doneAdd').textContent = "(Completed!)";
                document.querySelector('.undone').classList.remove('defaultThread');
                break;
            }
        }
    }
}

//LOG IN BUTTONS OR GREETING

function navLoginCheck(username) {
    if (!username) {
        let message = '<li class="nav-item">';
        message += '<div  id="nav-reg-bg">';
        message += '<a href="/register/" class="nav-link">';
        message += '<span id="nav-reg">Register</span> </a> </div> </li>';
        message += '<li class="nav-item"><div id="nav-reg-bg"><a href="/login/" class="nav-link">';
        message += '<span id="nav-reg">Log in</span> </a></div>';
        document.getElementById('nav-list').innerHTML = message;
        
    }
    else {
        document.getElementById('nav-list').innerHTML = `<li class="nav-item"><div id="nav-reg-bg"><p id="user-online"><a href="/?creatorOptions=true">Hello ${username}!</a></p></div></li><li class="nav-item"><div id="nav-reg-bg"><a href="/logout/" class="nav-link"><span id="nav-reg">Log out</span></a></div></li></li>`;       
    }
}

//BUTTON TO LINK TO EDITOR TOGGLE

function linkToEditor (username) {
    if (!username) {
        document.getElementById('link-to-creator').innerHTML = '<a href="/login/">Log in to create and share a new puzzle!</a>';
        
    }
    else {
        document.getElementById('link-to-creator').innerHTML = '<a href="/editor/">Click here to create and share a new puzzle!</a>';       
    }
}

//WHILE REGISTERING ASK FOR PASSWORD AGAIN

function register(bool) {
    if (bool) {
        document.getElementById('register').innerHTML = '<label for="password2">Repeat password:&nbsp;</label><input type="password" id="password2" name="password2"><br>';
    }
    else {
        document.getElementById('register').textContent = "";
    }
}

exports.sortOption = sortOption;
exports.advancedFilter = advancedFilter;
exports.partitionIndex = partitionIndex;
exports.deletionImminent = deletionImminent;
exports.loadDelButton = loadDelButton;
exports.insertResponseUrl = insertResponseUrl;
exports.responseText = responseText;
exports.forumThreadCheck = forumThreadCheck;
exports.navLoginCheck = navLoginCheck;
exports.linkToEditor = linkToEditor;
exports.register = register;