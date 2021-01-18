'use strict';

const conditionalRendering = require('../../../client/js/conditionalRendering');
const test_puzzles = require('../../../client/json/test_Puzzles');
let puzzles = JSON.stringify(test_puzzles.puzzles_test);
let partitionIndex = conditionalRendering.partitionIndex;
let user = {
    username: 'Arijus'
};


describe("Test the filtering and sorting methods", () => {
    test("given a list of puzzles, it returns an ascending sorted list by rating", () => {
        expect(JSON.stringify(partitionIndex(puzzles, 'lrtg'))).toBe(test_puzzles.puzzles_lrtg);
    });

    test("given a list of puzzles, it returns a descending sorted list by completion", () => {
        expect(JSON.stringify(partitionIndex(puzzles, 'hpop'))).toBe(test_puzzles.puzzles_hpop);
    });

    test("given a list of puzzles, it returns a list filtered out by name", () => {
        expect(JSON.stringify(partitionIndex(puzzles, '', 'The Starting Board Gambit'))).toBe(test_puzzles.puzzles_title);
    });

    test("given a list of puzzles, it returns a list filtered out by creator", () => {
        expect(JSON.stringify(partitionIndex(puzzles, '', '', 'Arijus'))).toBe(test_puzzles.puzzles_creator);
    });

    test("given a list of puzzles, it returns a list filtered out by rating (lower bound)", () => {
        expect(JSON.stringify(partitionIndex(puzzles, '', '', '', 757))).toBe(test_puzzles.puzzles_low);
    });

    test("given a list of puzzles, it returns a list filtered out by rating (lower and upper bound)", () => {
        expect(JSON.stringify(partitionIndex(puzzles, '', '', '', 756, 1400))).toBe(test_puzzles.puzzles_lowHigh);
    });

    test("given a list of puzzles, it returns a list filtered out by the user's created puzzles", () => {
        expect(JSON.stringify(partitionIndex(puzzles, '', '', '', '', '', '', 'true', user))).toBe(test_puzzles.puzzles_user);
    });

    test("given a list of puzzles, it returns a list filtered out by the puzzles created by others", () => {
        expect(JSON.stringify(partitionIndex(puzzles, '', '', '', '', '', '', 'false', user))).toBe(test_puzzles.puzzles_notUser);
    });

    test("given a list of puzzles, it returns a list filtered out by the user's solved puzzles", () => {
        expect(JSON.stringify(partitionIndex(puzzles, '', '', '', '', '', 'true', '', user))).toBe(test_puzzles.puzzles_solved);
    });

    test("given a list of puzzles, it returns a list filtered out by the user's unsolved puzzles", () => {
        expect(JSON.stringify(partitionIndex(puzzles, '', '', '', '', '', 'false', '', user))).toBe(test_puzzles.puzzles_unsolved);
    });
});