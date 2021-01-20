'use strict';

const express = require('express');
const router = express.Router();
const puzzles = require('../../client/json/Puzzles');

let p_idx = puzzles.length + 1;

//create a puzzle
router.post('/add-puzzle', function(req, res) {
    let error = {
        msg: "empty error",
        url: "/editor"
    };
    if (!req.body.history) {
        error.msg = "Invalid position!";
        return res.status(400).render('error', { error: error });
    }
    let move_obj = JSON.parse(req.body.history);
    const newPuzzle = {
        id: p_idx,
        title: req.body.title || `Puzzle #${p_idx}`,
        creator: req.body.creator,
        fen: req.body.fen,
        pgn: req.body.pgn,
        final_fen: req.body.final_fen,
        first_move: req.body.first,
        rating: parseInt(req.body.rating),
        completed: 1,
        moves: move_obj,
        comments: [],
        solvers: []
    };

    if (!newPuzzle.rating) {
        error.msg = "Please rate this puzzle!";
        return res.status(400).render('error', { error: error });
    }
    if (!Number.isInteger(newPuzzle.rating) || newPuzzle.rating < 1 || newPuzzle.rating > 9001) {
        error.msg = "Rating is invalid!";
        return res.status(400).render('error', { error: error });
    }
    if (!newPuzzle.creator) {
        error.msg = "Please log in!";
        return res.status(403).render('error', { error: error });
    }
    if (!newPuzzle.fen || !newPuzzle.final_fen || !newPuzzle.first_move || !newPuzzle.pgn) {
        error.msg = "Invalid position!";
        return res.status(400).render('error', { error: error });
    }
    if (newPuzzle.moves.length % 2 === 0) {
        error.msg = "Invalid puzzle (you must make the final move)!";
        return res.status(400).render('error', { error: error });
    }    

    puzzles.push(newPuzzle);
    //console.log(newPuzzle);
    p_idx++;
    res.redirect(`/congratulations/${newPuzzle.id}`);
});

//delete puzzle
router.delete('/delete-puzzle/:id', function(req, res) {
    const found = puzzles.some(puzzle => puzzle.id === parseInt(req.params.id));
		if (found) {
            for (let i = 0; i < puzzles.length; i++) {
                if (puzzles[i].id === parseInt(req.params.id)) {
                    //puzzles = puzzles.filter(puzzle => puzzle !== puzzles[i]);
                    res.redirect('/');
                    break;
                }
            }
			
		}
		else {
			return res.status(400).json({ msg: `No puzzle with the id ${parseInt(req.params.id)}`});
		}
})

//temporary route for delete puzzle
router.post('/delete-puzzle/:id', function(req, res) {
    let error = {
        msg: "empty error",
        url: `/congratulations/${req.params.id}`
    };
    const found = puzzles.some(puzzle => puzzle.id === parseInt(req.params.id));
		if (found) {
            for (let i = 0; i < puzzles.length; i++) {
                if (puzzles[i].id === parseInt(req.params.id)) {
                    res.send(puzzles.filter(puzzle => puzzle !== puzzles[i]));
                    break;
                }
            }
			
		}
		else {
			error.msg = `No puzzle with the id ${parseInt(req.params.id)}!`;
            return res.status(400).render('error', { error: error });
		}
})

//update solvers and counter
router.post('/solvers/', function(req, res) {
    let error = {
        msg: "empty error",
        url: `/solver/?id=${req.query.id}`
    };
    let newSolver = {
        by: req.query.solver
    }

    const found = puzzles.some(puzzle => puzzle.id === parseInt(req.query.id));

	if (found) {
        for (let i = 0; i < puzzles.length; i++) {
            if (puzzles[i].id === parseInt(req.query.id)) {
                if (puzzles[i].completed < 10000000) puzzles[i].completed++;
                if (newSolver.by && newSolver.by !== puzzles[i].creator) {
                    const found_solver = puzzles[i].solvers.some(solver => solver.by === newSolver.by);
                    if (!found_solver) puzzles[i].solvers.push(newSolver);
                }
                res.redirect(`/solver/?id=${req.query.id}&done=true&counter=${req.query.counter}`);
                break;
            }
        }      
	}
	else {
		error.msg = `No puzzle with the id ${parseInt(req.query.id)}!`;
        return res.status(400).render('error', { error: error });
	}
});

//update counter
router.post('/incr/:id', function(req, res) {
    let error = {
        msg: "empty error",
        url: `/solver/?id=${req.params.id}`
    };

    const found = puzzles.some(puzzle => puzzle.id === parseInt(req.params.id));

	if (found) {
        for (let i = 0; i < puzzles.length; i++) {
            if (puzzles[i].id === parseInt(req.params.id)) {
                if (puzzles[i].completed < 10000000) puzzles[i].completed++;
                res.redirect(`/solver/?id=${req.params.id}&done=true`);
                break;
            }
        }      
	}
	else {
		error.msg = `No puzzle with the id ${parseInt(req.params.id)}!`;
        return res.status(400).render('error', { error: error });
	}
});


//add comment
router.post('/add-comment/:id', function(req, res) {
    let error = {
        msg: "empty error",
        url: `/solver/?id=${req.params.id}`
    };
    let newComment = {
        id: 0,
        comment: req.body.write_comment,
        author: req.body.author || "anonymous",
        responses: []
    }

    if (!newComment.comment) {
        error.msg = "Please write a comment!";
        return res.status(400).render('error', { error: error });
    }

    const found = puzzles.some(puzzle => puzzle.id === parseInt(req.params.id));

	if (found) {
        for (let i = 0; i < puzzles.length; i++) {
            if (puzzles[i].id === parseInt(req.params.id)) {
                newComment.id = puzzles[i].comments.length + 1;
                puzzles[i].comments.push(newComment);
                res.redirect(`/solver/?id=${parseInt(req.params.id)}&done=${true}`);
                break;
            }
        }      
	}
	else {
		error.msg = `No puzzle with the id ${parseInt(req.params.id)}!`;
        return res.status(400).render('error', { error: error });
	}
})

router.post('/comment/add-response', function(req, res) {
    let error = {
        msg: "empty error",
        url: `/solver/?id=${req.params.id}`
    };
    let newResponse = {
        id: 0,
        response: req.body.response,
        author: req.body.author || "anonymous"
    }

    if (!newResponse.response) {
        error.msg = "Please write a comment!";
        return res.status(400).render('error', { error: error });
    }

    const found = puzzles.some(puzzle => puzzle.id === parseInt(req.body.puzzleid));

	if (found) {
        for (let i = 0; i < puzzles.length; i++) {
            if (puzzles[i].id === parseInt(req.body.puzzleid)) {
                const found_com = puzzles[i].comments.some(comment => comment.id === parseInt(req.body.commentid));

                if (found_com) {
                    for (let j = 0; j < puzzles[i].comments.length; j++) {
                        if (puzzles[i].comments[j].id === parseInt(req.body.commentid)) {
                            newResponse.id = puzzles[i].comments[j].responses.length + 1;
                            puzzles[i].comments[j].responses.push(newResponse);
                            res.redirect(`/solver/?id=${parseInt(req.body.puzzleid)}&done=${true}`);
                            break;
                        }
                    }    
                }
                else {
                    error.msg = `No comment with the id ${parseInt(req.params.id)}!`;
                    return res.status(400).render('error', { error: error });
                }
             }
         }    
    }
    else {
        error.msg = `No puzzle with the id ${parseInt(req.params.id)}!`;
        return res.status(400).render('error', { error: error });
    }
})

module.exports = router;