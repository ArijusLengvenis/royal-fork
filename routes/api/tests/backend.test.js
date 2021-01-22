'use strict';

const request = require('supertest');
const app = require('../../../app');

describe("Test the root path", () => {
    test("It should response the GET method", done => {
        request(app).get("/").then(response => {
            expect(response.statusCode).toBe(200);
            done();
        });
    });

    test("It should throw error if the lower bound for the rating is not an integer value", done => {
        request(app).get('/?sortChoice=""&filterTitle=""&filterCreator=""&filterRatingLow=a&filterRatingHigh=&solvedOptions=""').then(response => {
            expect(response.statusCode).toBe(400);
            done();
        });
    });

    test("It should throw error if the upper bound for the rating is not an integer value", done => {
        request(app).get('/?sortChoice=""&filterTitle=""&filterCreator=""&filterRatingLow=""&filterRatingHigh=a&solvedOptions=""').then(response => {
            expect(response.statusCode).toBe(400);
            done();
        });
    });

    test("It should return a filtered list by solved puzzles", done => {
        request(app).get('/?sortChoice=""&filterTitle=""&filterCreator=""&filterRatingLow=&filterRatingHigh=&solvedOptions=true').then(response => {
            expect(response.statusCode).toBe(200);
            done();
        });
    });

    test("It should return a filtered list by unsolved puzzles", done => {
        request(app).get('/?sortChoice=""&filterTitle=""&filterCreator=""&filterRatingLow=&filterRatingHigh=&solvedOptions=false').then(response => {
            expect(response.statusCode).toBe(200);
            done();
        });
    });

    test("It should return a filtered list by user created puzzles", done => {
        request(app).get('/?sortChoice=""&filterTitle=""&filterCreator=""&filterRatingLow=&filterRatingHigh=&solvedOptions=trueC').then(response => {
            expect(response.statusCode).toBe(200);
            done();
        });
    });

    test("It should return a filtered list of puzzles created by other users", done => {
        request(app).get('/?sortChoice=""&filterTitle=""&filterCreator=""&filterRatingLow=&filterRatingHigh=&solvedOptions=falseC').then(response => {
            expect(response.statusCode).toBe(200);
            done();
        });
    });

    test("It should focus on puzzle 2", done => {
        request(app).get('/?deleted=true&redirect=2').then(response => {
            expect(response.statusCode).toBe(200);
            done();
        });
    });
});

describe("Test the credentials page", () => {
    test("It should response the GET method for the login page", done => {
        request(app).get("/login/").then(response => {
            expect(response.statusCode).toBe(200);
            done();
        });
    });

    test("It should response the GET method for the register page", done => {
        request(app).get("/register/").then(response => {
            expect(response.statusCode).toBe(200);
            done();
        });
    });

    test("It should response the GET method for the event of logout", done => {
        request(app).get("/logout/").then(response => {
            expect(response.statusCode).toBe(302);
            done();
        });
    });

    test("It should response the POST method for authenticating a user", done => {
        request(app).post("/login/").send({
            username: "Arijus",
            password: "Lengvenis",
        }).then(response => {
            expect(response.statusCode).toBe(302);
            done();
        });
    });

    test("It should response the POST method for adding a user", done => {
        request(app).post("/api/users/").send({
            username: "ArijusG7",
            password: "123",
            password2: "123"
        }).then(response => {
            expect(response.statusCode).toBe(302);
            done();
        });
    });

    test("It should throw an error because of lack of second password", done => {
        request(app).post("/api/users/").send({
            username: "ArijusG7",
            password: "123",
            password2: ""
        }).then(response => {
            expect(response.statusCode).toBe(400);
            done();
        });
    });

    test("It should throw an error because of lack of first password", done => {
        request(app).post("/api/users/").send({
            username: "ArijusG7",
            password: "",
            password2: "123"
        }).then(response => {
            expect(response.statusCode).toBe(400);
            done();
        });
    });

    test("It should throw an error because of lack of username", done => {
        request(app).post("/api/users/").send({
            username: "",
            password: "123",
            password2: "123"
        }).then(response => {
            expect(response.statusCode).toBe(400);
            done();
        });
    });

    test("It should throw an error because of # symbol in username", done => {
        request(app).post("/api/users/").send({
            username: "Arijus#",
            password: "123",
            password2: "123"
        }).then(response => {
            expect(response.statusCode).toBe(400);
            done();
        });
    });
});

describe("Test the solver page", () => {
    test("It should response the GET method for solving a specific puzzle", done => {
        request(app).get("/solver/?id=2").then(response => {
            expect(response.statusCode).toBe(200);
            done();
        });
    });

    test("It should response the GET method for a solved specific puzzle", done => {
        request(app).get("/solver/?id=2&done=true").then(response => {
            expect(response.statusCode).toBe(200);
            done();
        });
    });

    test("It should response the GET method for a solved specific puzzle with an elo counter", done => {
        request(app).get("/solver/?id=2&done=true&counter=15").then(response => {
            expect(response.statusCode).toBe(200);
            done();
        });
    });

    test("It should throw an error, because the puzzle does not exist", done => {
        request(app).get("/solver/?id=500").then(response => {
            expect(response.statusCode).toBe(404);
            done();
        });
    });

    test("It should response the POST method for incrementing the completed variable of a specific puzzle", done => {
        request(app).post("/api/puzzles/incr/2").then(response => {
            expect(response.statusCode).toBe(302);
            done();
        });
    });

    test("It should throw an error, because the puzzle does not exist", done => {
        request(app).post("/api/puzzles/incr/500").then(response => {
            expect(response.statusCode).toBe(400);
            done();
        });
    });

    test("It should response the POST method for incrementing the completed variable of a specific puzzle", done => {
        request(app).post("/api/puzzles/solvers/?id=2&solver=Ari&counter=15").then(response => {
            expect(response.statusCode).toBe(302);
            done();
        });
    });

    test("It should throw an error, because the puzzle does not exist", done => {
        request(app).post("/api/puzzles/500").then(response => {
            expect(response.statusCode).toBe(404);
            done();
        });
    });

    test("It should response the POST method for adding a comment on a specific puzzle", done => {
        request(app).post("/api/puzzles/add-comment/2").send({
            write_comment: "test1",
            author: ""
        }).then(response => {
            expect(response.statusCode).toBe(302);
            done();
        });
    });

    test("It should throw an error, because the comment is empty", done => {
        request(app).post("/api/puzzles/add-comment/2").send({
            write_comment: "",
            author: ""
        }).then(response => {
            expect(response.statusCode).toBe(400);
            done();
        });
    });

    test("It should throw an error, because the comment does not exist", done => {
        request(app).post("/api/puzzles/add-comment/500").send({
            write_comment: "test1",
            author: ""
        }).then(response => {
            expect(response.statusCode).toBe(400);
            done();
        });
    });

    test("It should response the POST method for replying to a specific comment on a specific puzzle", done => {
        request(app).post("/api/puzzles/comment/add-response/").send({
            response: "test response",
            author: "",
            puzzleid: '2',
            commentid: '1'
        }).then(response => {
            expect(response.statusCode).toBe(302);
            done();
        });
    });

    test("It should throw an error, because the puzzle does not exist", done => {
        request(app).post("/api/puzzles/comment/add-response/").send({
            response: "test response",
            author: "",
            puzzleid: '',
            commentid: '1'
        }).then(response => {
            expect(response.statusCode).toBe(400);
            done();
        });
    });

    test("It should throw an error, because the comment does not exist", done => {
        request(app).post("/api/puzzles/comment/add-response/").send({
            response: "test response",
            author: "",
            puzzleid: '2',
            commentid: ''
        }).then(response => {
            expect(response.statusCode).toBe(400);
            done();
        });
    });

    test("It should throw an error, because there is no written response", done => {
        request(app).post("/api/puzzles/comment/add-response/").send({
            response: "",
            author: "",
            puzzleid: '2',
            commentid: '1'
        }).then(response => {
            expect(response.statusCode).toBe(400);
            done();
        });
    });
});

describe("Test the editor page", () => {
    test("It should response the GET method for the editor page", done => {
        request(app).get("/editor/").then(response => {
            expect(response.statusCode).toBe(302);
            done();
        });
    });

    test("It should response the GET method for the editor page when loading a fen", done => {
        request(app).get("/editor/?fen=8/2R2pk1/6p1/6b1/6PP/3n2K1/8/8 b - - 0 1").then(response => {
            expect(response.statusCode).toBe(302);
            done();
        });
    });

    test("It should response the POST method for adding a puzzle", done => {
        request(app).post("/api/puzzles/add-puzzle/").send({
            title: '',
            creator: 'Arijus Lengvenis',
            fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
            pgn: '1. Rxd7+ Qxd7 <br> 2. Rxd7+',
            final_fen: 'rnbqkbnr/pppp1ppp/8/4p3/4PP2/8/PPPP2PP/RNBQKBNR b KQkq - 0 1',
            first: 'white',
            rating: '1500',
            history: '[{"color":"w","from":"e2","to":"e4","flags":"b","piece":"p","san":"e4"},{"color":"b","from":"e7","to":"e5","flags":"b","piece":"p","san":"e5"},{"color":"w","from":"f2","to":"f4","flags":"b","piece":"p","san":"f4"}]'
        }).then(response => {
            expect(response.statusCode).toBe(302);
            done();
        });
    });

    test("It should throw an error because the editor isn't logged in", done => {
        request(app).post("/api/puzzles/add-puzzle/").send({
            title: '',
            creator: '',
            fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
            pgn: '1. Rxd7+ Qxd7 <br> 2. Rxd7+',
            final_fen: 'rnbqkbnr/pppp1ppp/8/4p3/4PP2/8/PPPP2PP/RNBQKBNR b KQkq - 0 1',
            first: 'white',
            rating: '1500',
            history: '[{"color":"w","from":"e2","to":"e4","flags":"b","piece":"p","san":"e4"},{"color":"b","from":"e7","to":"e5","flags":"b","piece":"p","san":"e5"},{"color":"w","from":"f2","to":"f4","flags":"b","piece":"p","san":"f4"}]'
        }).then(response => {
            expect(response.statusCode).toBe(403);
            done();
        });
    });

    test("It should throw an error because the starting fen is invalid", done => {
        request(app).post("/api/puzzles/add-puzzle/").send({
            title: '',
            creator: 'Arijus Lengvenis',
            fen: '',
            pgn: '1. Rxd7+ Qxd7 <br> 2. Rxd7+',
            final_fen: 'rnbqkbnr/pppp1ppp/8/4p3/4PP2/8/PPPP2PP/RNBQKBNR b KQkq - 0 1',
            first: 'white',
            rating: '1500',
            history: '[{"color":"w","from":"e2","to":"e4","flags":"b","piece":"p","san":"e4"},{"color":"b","from":"e7","to":"e5","flags":"b","piece":"p","san":"e5"},{"color":"w","from":"f2","to":"f4","flags":"b","piece":"p","san":"f4"}]'
        }).then(response => {
            expect(response.statusCode).toBe(400);
            done();
        });
    });

    test("It should throw an error because the final fen is invalid", done => {
        request(app).post("/api/puzzles/add-puzzle/").send({
            title: '',
            creator: 'Arijus Lengvenis',
            fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
            pgn: '1. Rxd7+ Qxd7 <br> 2. Rxd7+',
            final_fen: '',
            first: 'white',
            rating: '1500',
            history: '[{"color":"w","from":"e2","to":"e4","flags":"b","piece":"p","san":"e4"},{"color":"b","from":"e7","to":"e5","flags":"b","piece":"p","san":"e5"},{"color":"w","from":"f2","to":"f4","flags":"b","piece":"p","san":"f4"}]'
        }).then(response => {
            expect(response.statusCode).toBe(400);
            done();
        });
    });

    test("It should throw an error because there is no first move", done => {
        request(app).post("/api/puzzles/add-puzzle/").send({
            title: '',
            creator: 'Arijus Lengvenis',
            fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
            pgn: '1. Rxd7+ Qxd7 <br> 2. Rxd7+',
            final_fen: 'rnbqkbnr/pppp1ppp/8/4p3/4PP2/8/PPPP2PP/RNBQKBNR b KQkq - 0 1',
            first: '',
            rating: '1500',
            history: '[{"color":"w","from":"e2","to":"e4","flags":"b","piece":"p","san":"e4"},{"color":"b","from":"e7","to":"e5","flags":"b","piece":"p","san":"e5"},{"color":"w","from":"f2","to":"f4","flags":"b","piece":"p","san":"f4"}]'
        }).then(response => {
            expect(response.statusCode).toBe(400);
            done();
        });
    });

    test("It should throw an error because the rating was not stated", done => {
        request(app).post("/api/puzzles/add-puzzle/").send({
            title: '',
            creator: 'Arijus Lengvenis',
            fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
            pgn: '1. Rxd7+ Qxd7 <br> 2. Rxd7+',
            final_fen: 'rnbqkbnr/pppp1ppp/8/4p3/4PP2/8/PPPP2PP/RNBQKBNR b KQkq - 0 1',
            first: 'white',
            rating: '',
            history: '[{"color":"w","from":"e2","to":"e4","flags":"b","piece":"p","san":"e4"},{"color":"b","from":"e7","to":"e5","flags":"b","piece":"p","san":"e5"},{"color":"w","from":"f2","to":"f4","flags":"b","piece":"p","san":"f4"}]'
        }).then(response => {
            expect(response.statusCode).toBe(400);
            done();
        });
    });

    test("It should throw an error because there is no move history", done => {
        request(app).post("/api/puzzles/add-puzzle/").send({
            title: '',
            creator: 'Arijus Lengvenis',
            fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
            pgn: '1. Rxd7+ Qxd7 <br> 2. Rxd7+',
            final_fen: 'rnbqkbnr/pppp1ppp/8/4p3/4PP2/8/PPPP2PP/RNBQKBNR b KQkq - 0 1',
            first: 'white',
            rating: '1500',
            history: ''
        }).then(response => {
            expect(response.statusCode).toBe(400);
            done();
        });
    });

    test("It should throw an error because the move number is invalid", done => {
        request(app).post("/api/puzzles/add-puzzle/").send({
            title: '',
            creator: 'Arijus Lengvenis',
            fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
            pgn: '1. Rxd7+ Qxd7 <br> 2. Rxd7+',
            final_fen: 'rnbqkbnr/pppp1ppp/8/4p3/4PP2/8/PPPP2PP/RNBQKBNR b KQkq - 0 1',
            first: 'white',
            rating: '1500',
            history: '[{"color":"w","from":"e2","to":"e4","flags":"b","piece":"p","san":"e4"},{"color":"b","from":"e7","to":"e5","flags":"b","piece":"p","san":"e5"}]'
        }).then(response => {
            expect(response.statusCode).toBe(400);
            done();
        });
    });

    test("It should throw an error because the pgn is invalid", done => {
        request(app).post("/api/puzzles/add-puzzle/").send({
            title: '',
            creator: 'Arijus Lengvenis',
            fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
            pgn: '',
            final_fen: 'rnbqkbnr/pppp1ppp/8/4p3/4PP2/8/PPPP2PP/RNBQKBNR b KQkq - 0 1',
            first: 'white',
            rating: '1500',
            history: '[{"color":"w","from":"e2","to":"e4","flags":"b","piece":"p","san":"e4"},{"color":"b","from":"e7","to":"e5","flags":"b","piece":"p","san":"e5"}]'
        }).then(response => {
            expect(response.statusCode).toBe(400);
            done();
        });
    });
});

describe("Test the congratulations page", () => {
    test("It should response the GET method for the congratulations page", done => {
        request(app).get("/congratulations/2").then(response => {
            expect(response.statusCode).toBe(302);
            done();
        });
    });
});

describe("Test the error page", () => {
    test("It should response the GET method for getting a correct error response on a tier 1 non-existant url", done => {
        request(app).get("/random/").then(response => {
            expect(response.statusCode).toBe(404);
            done();
        });
    });

    test("It should response the GET method for getting a correct error response on a tier 2 non-existant url", done => {
        request(app).get("/random/random/").then(response => {
            expect(response.statusCode).toBe(404);
            done();
        });
    });

    test("It should response the GET method for getting a correct error response on a tier 3 non-existant url", done => {
        request(app).get("/random/random/random/").then(response => {
            expect(response.statusCode).toBe(404);
            done();
        });
    });
});