"use strict";

const puzzles = [
    {
        id: 1,
        title: 'The Starting Board Gambit',
        creator: 'Arijus Lengvenis',
        fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
        pgn: '<br> 1. e4 e5 <br> 2. f4',
        final_fen: 'rnbqkbnr/pppp1ppp/8/4p3/4PP2/8/PPPP2PP/RNBQKBNR b KQkq - 0 1',
        first_move: 'white',
        rating: 1400,
        completed: 100000,
        moves: [
            { color: 'w', from: 'e2', to: 'e4', flags: 'b', piece: 'p', san: 'e4' },
            { color: 'b', from: 'e7', to: 'e5', flags: 'b', piece: 'p', san: 'e5' },
            { color: 'w', from: 'f2', to: 'f4', flags: 'b', piece: 'p', san: 'f4' }
        ],
        comments: [
            { id: 1, comment: "This is a comment", author: "Arijus", responses: [
                { id: 1, response: "Haha, funny", author: "Arijus"}
            ]},
            { id: 2, comment: "This is another comment", author: "anonymous", responses: [
                { id: 1, response: "Haha, funny", author: "Arijus"}
            ]}
        ],
        solvers: [
            { by: "Curlio"}
        ]  
    },
    {
        id: 2,
        title: 'Test1',
        creator: 'Arijus',
        fen: '3kb3/3qr3/3r4/8/8/3R4/3RQ3/3K4 b - - 0 1',
        pgn: '<br> 1. ... Rxd3 <br> 2. Qxe7+ Qxe7 <br> 3. Rxd3+ Kc8',
        final_fen: '2k1b3/4q3/8/8/8/3R4/8/3K4 w - - 0 1',
        first_move: 'black',
        rating: 154,
        completed: 1,
        moves: [
            {
            color: 'b',
            from: 'd6',
            to: 'd3',
            flags: 'c',
            piece: 'r',
            captured: 'r',
            san: 'Rxd3'
            },
            {
            color: 'w',
            from: 'e2',
            to: 'e7',
            flags: 'c',
            piece: 'q',
            captured: 'r',
            san: 'Qxe7+'
            },
            {
            color: 'b',
            from: 'd7',
            to: 'e7',
            flags: 'c',
            piece: 'q',
            captured: 'q',
            san: 'Qxe7'
            },
            {
            color: 'w',
            from: 'd2',
            to: 'd3',
            flags: 'c',
            piece: 'r',
            captured: 'r',
            san: 'Rxd3+'
            },
            {
            color: 'b',
            from: 'd8',
            to: 'c8',
            flags: 'n',
            piece: 'k',
            san: 'Kc8'
            }
        ],
        comments: [
            { id: 1, comment: "This is a comment", author: "anonymous", responses: [
                { id: 1, response: "Haha, funny", author: "Arijus"}
            ]},
            { id: 2, comment: "This is another comment", author: "anonymous", responses: [
                { id: 1, response: "Haha, funny", author: "Arijus"}
            ]}
        ],
        solvers: [
            { by: "Arijus Lengvenis" }
        ]        
    },
    {
        id: 3,
        title: 'Sneaky trick',
        creator: 'Nice guy',
        fen: 'r3k2r/1pP2pp1/p6p/P3pn2/8/BBNPb3/1K1Q2P1/7q w kq - 0 1',
        pgn: '<br> 1. Ba4+ b5 <br> 2. axb6#',
        final_fen: 'r3k2r/2P2pp1/pP5p/4pn2/B7/B1NPb3/1K1Q2P1/7q b kq - 0 2',
        first_move: 'white',
        rating: 1542,
        completed: 1569,
        moves: [
          {
            color: 'w',
            from: 'b3',
            to: 'a4',
            flags: 'n',
            piece: 'b',
            san: 'Ba4+'
          },
          {
            color: 'b',
            from: 'b7',
            to: 'b5',
            flags: 'b',
            piece: 'p',
            san: 'b5'
          },
          {
            color: 'w',
            from: 'a5',
            to: 'b6',
            flags: 'e',
            piece: 'p',
            captured: 'p',
            san: 'axb6#'
          }
        ],
        comments: [],
        solvers: [{by: "Arijus"}]
    },
    {
        id: 4,
        title: 'Puzzle #4',
        creator: 'The legend',
        fen: '3kq3/3nn3/8/8/8/3R4/3R4/3K4 w - - 0 1',
        pgn: '1. Rxd7+ Qxd7 <br> 2. Rxd7+',
        final_fen: '3k4/3Rn3/8/8/8/8/8/3K4 b - - 0 2',
        first_move: 'white',
        rating: 756,
        completed: 897410,
        moves: [
          {
            color: 'w',
            from: 'd3',
            to: 'd7',
            flags: 'c',
            piece: 'r',
            captured: 'n',
            san: 'Rxd7+'
          },
          {
            color: 'b',
            from: 'e8',
            to: 'd7',
            flags: 'c',
            piece: 'q',
            captured: 'r',
            san: 'Qxd7'
          },
          {
            color: 'w',
            from: 'd2',
            to: 'd7',
            flags: 'c',
            piece: 'r',
            captured: 'q',
            san: 'Rxd7+'
          }
        ],
        comments: [],
        solvers: [{by: "Arijus"}]
    },
    {
      id: 5,
      title: 'Knight and Bishop hike',
      creator: 'Arijus',
      fen: '8/3k4/8/8/8/4N3/3KB3/8 w - - 0 1',
      pgn: '<br> 1. Nc4 Ke6 <br> 2. Kd3 Kd7 <br> 3. Ke4 Ke7 <br> 4. Kd5 Kd7 <br> 5. Ne5+ Kc7 <br> 6. Bb5 Kb7 <br> 7. Kd6 Kc8 <br> 8. Kc6 Kb8 <br> 9. Nd7+ Kc8 <br> 10. Ba6+ Kd8 <br> 11. Kd6 Ke8 <br> 12. Ne5 Kd8 <br> 13. Bb5 Kc8 <br> 14. Kc6 Kb8 <br> 15. Ba6 Ka8 <br> 16. Kb6 Kb8 <br> 17. Nc6+ Ka8, <br> 18. Bb7#',
      final_fen: 'k7/1B6/1KN5/8/8/8/8/8 b - - 35 18',
      first_move: 'white',
      rating: 756,
      completed: 1,
      moves: [
        {
          color: 'w',
          from: 'e3',
          to: 'c4',
          flags: 'n',
          piece: 'n',
          san: 'Nc4'
        },
        {
          color: 'b',
          from: 'd7',
          to: 'e6',
          flags: 'n',
          piece: 'k',
          san: 'Ke6'
        },
        {
          color: 'w',
          from: 'd2',
          to: 'd3',
          flags: 'n',
          piece: 'k',
          san: 'Kd3'
        },
        {
          color: 'b',
          from: 'e6',
          to: 'd7',
          flags: 'n',
          piece: 'k',
          san: 'Kd7'
        },
        {
          color: 'w',
          from: 'd3',
          to: 'e4',
          flags: 'n',
          piece: 'k',
          san: 'Ke4'
        },
        {
          color: 'b',
          from: 'd7',
          to: 'e7',
          flags: 'n',
          piece: 'k',
          san: 'Ke7'
        },
        {
          color: 'w',
          from: 'e4',
          to: 'd5',
          flags: 'n',
          piece: 'k',
          san: 'Kd5'
        },
        {
          color: 'b',
          from: 'e7',
          to: 'd7',
          flags: 'n',
          piece: 'k',
          san: 'Kd7'
        },
        {
          color: 'w',
          from: 'c4',
          to: 'e5',
          flags: 'n',
          piece: 'n',
          san: 'Ne5+'
        },
        {
          color: 'b',
          from: 'd7',
          to: 'c7',
          flags: 'n',
          piece: 'k',
          san: 'Kc7'
        },
        {
          color: 'w',
          from: 'e2',
          to: 'b5',
          flags: 'n',
          piece: 'b',
          san: 'Bb5'
        },
        {
          color: 'b',
          from: 'c7',
          to: 'b7',
          flags: 'n',
          piece: 'k',
          san: 'Kb7'
        },
        {
          color: 'w',
          from: 'd5',
          to: 'd6',
          flags: 'n',
          piece: 'k',
          san: 'Kd6'
        },
        {
          color: 'b',
          from: 'b7',
          to: 'c8',
          flags: 'n',
          piece: 'k',
          san: 'Kc8'
        },
        {
          color: 'w',
          from: 'd6',
          to: 'c6',
          flags: 'n',
          piece: 'k',
          san: 'Kc6'
        },
        {
          color: 'b',
          from: 'c8',
          to: 'b8',
          flags: 'n',
          piece: 'k',
          san: 'Kb8'
        },
        {
          color: 'w',
          from: 'e5',
          to: 'd7',
          flags: 'n',
          piece: 'n',
          san: 'Nd7+'
        },
        {
          color: 'b',
          from: 'b8',
          to: 'c8',
          flags: 'n',
          piece: 'k',
          san: 'Kc8'
        },
        {
          color: 'w',
          from: 'b5',
          to: 'a6',
          flags: 'n',
          piece: 'b',
          san: 'Ba6+'
        },
        {
          color: 'b',
          from: 'c8',
          to: 'd8',
          flags: 'n',
          piece: 'k',
          san: 'Kd8'
        },
        {
          color: 'w',
          from: 'c6',
          to: 'd6',
          flags: 'n',
          piece: 'k',
          san: 'Kd6'
        },
        {
          color: 'b',
          from: 'd8',
          to: 'e8',
          flags: 'n',
          piece: 'k',
          san: 'Ke8'
        },
        {
          color: 'w',
          from: 'd7',
          to: 'e5',
          flags: 'n',
          piece: 'n',
          san: 'Ne5'
        },
        {
          color: 'b',
          from: 'e8',
          to: 'd8',
          flags: 'n',
          piece: 'k',
          san: 'Kd8'
        },
        {
          color: 'w',
          from: 'a6',
          to: 'b5',
          flags: 'n',
          piece: 'b',
          san: 'Bb5'
        },
        {
          color: 'b',
          from: 'd8',
          to: 'c8',
          flags: 'n',
          piece: 'k',
          san: 'Kc8'
        },
        {
          color: 'w',
          from: 'd6',
          to: 'c6',
          flags: 'n',
          piece: 'k',
          san: 'Kc6'
        },
        {
          color: 'b',
          from: 'c8',
          to: 'b8',
          flags: 'n',
          piece: 'k',
          san: 'Kb8'
        },
        {
          color: 'w',
          from: 'b5',
          to: 'a6',
          flags: 'n',
          piece: 'b',
          san: 'Ba6'
        },
        {
          color: 'b',
          from: 'b8',
          to: 'a8',
          flags: 'n',
          piece: 'k',
          san: 'Ka8'
        },
        {
          color: 'w',
          from: 'c6',
          to: 'b6',
          flags: 'n',
          piece: 'k',
          san: 'Kb6'
        },
        {
          color: 'b',
          from: 'a8',
          to: 'b8',
          flags: 'n',
          piece: 'k',
          san: 'Kb8'
        },
        {
          color: 'w',
          from: 'e5',
          to: 'c6',
          flags: 'n',
          piece: 'n',
          san: 'Nc6+'
        },
        {
          color: 'b',
          from: 'b8',
          to: 'a8',
          flags: 'n',
          piece: 'k',
          san: 'Ka8'
        },
        {
          color: 'w',
          from: 'a6',
          to: 'b7',
          flags: 'n',
          piece: 'b',
          san: 'Bb7#'
        }
      ],
      comments: [],
      solvers: []
    }
];


module.exports = puzzles;

