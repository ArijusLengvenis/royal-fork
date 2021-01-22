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
                { id: 1, response: "Haha, funny", author: "Arijus", date: 'Thu, 21 Jan 2021 08:54:57 '}
            ], date: 'Thu, 21 Jan 2021 08:54:57 '},
            { id: 2, comment: "This is another comment", author: "anonymous", responses: [
                { id: 1, response: "Haha, funny", author: "Arijus", date: 'Thu, 21 Jan 2021 08:54:57 '}
            ], date: 'Thu, 21 Jan 2021 08:54:57 '}
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
                { id: 1, response: "Haha, funny", author: "Arijus", date: 'Thu, 21 Jan 2021 08:54:57 '}
            ], date: 'Thu, 21 Jan 2021 08:54:57 '},
            { id: 2, comment: "This is another comment", author: "anonymous", responses: [
                { id: 1, response: "Haha, funny", author: "Arijus", date: 'Thu, 21 Jan 2021 08:54:57 '}
            ], date: 'Thu, 21 Jan 2021 08:54:57 '}
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
    },
    {
      id: 6,
      title: 'Pinned queen',
      creator: 'ArijusG7',
      fen: 'r1b2bkr/ppp3pp/2n5/3qp3/2B5/8/PPPP1PPP/RNB1K2R w - - 0 1',
      pgn: '<br> 1. Bxd5+ Be6 <br> 2. Bxe6#',
      final_fen: 'r4bkr/ppp3pp/2n1B3/4p3/8/8/PPPP1PPP/RNB1K2R b - - 0 2',
      first_move: 'white',
      rating: 650,
      completed: 1,
      moves: [
        {
          color: 'w',
          from: 'c4',
          to: 'd5',
          flags: 'c',
          piece: 'b',
          captured: 'q',
          san: 'Bxd5+'
        },
        {
          color: 'b',
          from: 'c8',
          to: 'e6',
          flags: 'n',
          piece: 'b',
          san: 'Be6'
        },
        {
          color: 'w',
          from: 'd5',
          to: 'e6',
          flags: 'c',
          piece: 'b',
          captured: 'b',
          san: 'Bxe6#'
        }
      ],
      comments: [],
      solvers: []
    },
    {
      id: 7,
      title: 'Generous gift',
      creator: 'ArijusG7',
      fen: 'r2qkb1r/pp1nnp2/2p1p2p/3pPbp1/3P4/P1PB4/1P1N1PPP/RNBQ1RK1 b - - 0 1',
      pgn: '<br> 1. ... Bxd3',
      final_fen: 'r2qkb1r/pp1nnp2/2p1p2p/3pP1p1/3P4/P1Pb4/1P1N1PPP/RNBQ1RK1 w - - 0 2',
      first_move: 'black',
      rating: 700,
      completed: 1,
      moves: [
        {
          color: 'b',
          from: 'f5',
          to: 'd3',
          flags: 'c',
          piece: 'b',
          captured: 'b',
          san: 'Bxd3'
        }
      ],
      comments: [],
      solvers: []
    },
    {
      id: 8,
      title: 'Diagonal attack',
      creator: 'ArijusG7',
      fen: 'r3kbnr/p2n1p2/3qp3/2p3p1/Q2PP1P1/2N5/P3BP2/R1B2RK1 b - - 0 1',
      pgn: '<br> 1. ... Qh2#',
      final_fen: 'r3kbnr/p2n1p2/4p3/2p3p1/Q2PP1P1/2N5/P3BP1q/R1B2RK1 w - - 1 2',
      first_move: 'black',
      rating: 800,
      completed: 1,
      moves: [
        {
          color: 'b',
          from: 'd6',
          to: 'h2',
          flags: 'n',
          piece: 'q',
          san: 'Qh2#'
        }
      ],
      comments: [],
      solvers: []
    },
    {
      id: 9,
      title: 'Knight says "Thank you"',
      creator: 'ArijusG7',
      fen: '8/2p1k2p/p1P5/1p6/3b4/4NP2/P2K2P1/8 w - - 0 1',
      pgn: '<br> 1. Nf5+ Ke6 <br> 2. Nxd4+',
      final_fen: '8/2p4p/p1P1k3/1p6/3N4/5P2/P2K2P1/8 b - - 0 2',
      first_move: 'white',
      rating: 900,
      completed: 1,
      moves: [
        {
          color: 'w',
          from: 'e3',
          to: 'f5',
          flags: 'n',
          piece: 'n',
          san: 'Nf5+'
        },
        {
          color: 'b',
          from: 'e7',
          to: 'e6',
          flags: 'n',
          piece: 'k',
          san: 'Ke6'
        },
        {
          color: 'w',
          from: 'f5',
          to: 'd4',
          flags: 'c',
          piece: 'n',
          captured: 'b',
          san: 'Nxd4+'
        }
      ],
      comments: [],
      solvers: []
    },
    {
      id: 10,
      title: 'Sacrifice everything',
      creator: 'ArijusG7',
      fen: 'br3rk1/R4p1p/B3p1p1/8/4P3/2P2P2/P2R2PP/7K b - - 0 1',
      pgn: '<br> 1. ... Rb1+ <br> 2. Rd1 Rxd1+ <br> 3. Bf1 Rxf1#',
      final_fen: 'b4rk1/R4p1p/4p1p1/8/4P3/2P2P2/P5PP/5r1K w - - 0 4',
      first_move: 'black',
      rating: 900,
      completed: 1,
      moves: [
        {
          color: 'b',
          from: 'b8',
          to: 'b1',
          flags: 'n',
          piece: 'r',
          san: 'Rb1+'
        },
        {
          color: 'w',
          from: 'd2',
          to: 'd1',
          flags: 'n',
          piece: 'r',
          san: 'Rd1'
        },
        {
          color: 'b',
          from: 'b1',
          to: 'd1',
          flags: 'c',
          piece: 'r',
          captured: 'r',
          san: 'Rxd1+'
        },
        {
          color: 'w',
          from: 'a6',
          to: 'f1',
          flags: 'n',
          piece: 'b',
          san: 'Bf1'
        },
        {
          color: 'b',
          from: 'd1',
          to: 'f1',
          flags: 'c',
          piece: 'r',
          captured: 'b',
          san: 'Rxf1#'
        }
      ],
      comments: [],
      solvers: []
    },
    {
      id: 11,
      title: 'Royal pin',
      creator: 'ArijusG7',
      fen: 'r1bqkbnr/pppp1ppp/2n5/8/4P3/2Q5/PPP2PPP/RNB1KBNR b - - 0 1',
      pgn: '<br> 1. ... Bb4 <br> 2. Bd2 Bxc3',
      final_fen: 'r1bqk1nr/pppp1ppp/2n5/8/4P3/2b5/PPPB1PPP/RN2KBNR w - - 0 3',
      first_move: 'black',
      rating: 950,
      completed: 1,
      moves: [
        {
          color: 'b',
          from: 'f8',
          to: 'b4',
          flags: 'n',
          piece: 'b',
          san: 'Bb4'
        },
        {
          color: 'w',
          from: 'c1',
          to: 'd2',
          flags: 'n',
          piece: 'b',
          san: 'Bd2'
        },
        {
          color: 'b',
          from: 'b4',
          to: 'c3',
          flags: 'c',
          piece: 'b',
          captured: 'q',
          san: 'Bxc3'
        }
      ],
      comments: [],
      solvers: []
    },
    {
      id: 12,
      title: 'Sneak attack',
      creator: 'ArijusG7',
      fen: '3k4/6p1/3K1pPp/3PrP2/p7/P7/3Q3P/1q6 w - - 0 1',
      pgn: '<br> 1. Qa5+ Ke8 <br> 2. Qa8+ Qb8+ <br> 3. Qxb8#',
      final_fen: '1Q2k3/6p1/3K1pPp/3PrP2/p7/P7/7P/8 b - - 0 3',
      first_move: 'white',
      rating: 1050,
      completed: 1,
      moves: [
        {
          color: 'w',
          from: 'd2',
          to: 'a5',
          flags: 'n',
          piece: 'q',
          san: 'Qa5+'
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
          from: 'a5',
          to: 'a8',
          flags: 'n',
          piece: 'q',
          san: 'Qa8+'
        },
        {
          color: 'b',
          from: 'b1',
          to: 'b8',
          flags: 'n',
          piece: 'q',
          san: 'Qb8+'
        },
        {
          color: 'w',
          from: 'a8',
          to: 'b8',
          flags: 'c',
          piece: 'q',
          captured: 'q',
          san: 'Qxb8#'
        }
      ],
      comments: [],
      solvers: []
    },
    {
      id: 13,
      title: 'Bishop says "Thank you"',
      creator: 'ArijusG7',
      fen: '8/2R2pk1/6p1/6b1/6PP/3n2K1/8/8 b - - 0 1',
      pgn: '<br> 1. ... Bf4+ <br> 2. Kh3 Bxc7',
      final_fen: '8/2b2pk1/6p1/8/6PP/3n3K/8/8 w - - 0 3',
      first_move: 'black',
      rating: 1000,
      completed: 1,
      moves: [
        {
          color: 'b',
          from: 'g5',
          to: 'f4',
          flags: 'n',
          piece: 'b',
          san: 'Bf4+'
        },
        {
          color: 'w',
          from: 'g3',
          to: 'h3',
          flags: 'n',
          piece: 'k',
          san: 'Kh3'
        },
        {
          color: 'b',
          from: 'f4',
          to: 'c7',
          flags: 'c',
          piece: 'b',
          captured: 'r',
          san: 'Bxc7'
        }
      ],
      comments: [],
      solvers: []
    },
    {
      id: 14,
      title: 'Name of the site',
      creator: 'ArijusG7',
      fen: 'rn3rk1/1p3ppp/p1qp2b1/2pN4/4P1B1/3Q3P/PbPN1PP1/3R1RK1 w - - 0 1',
      pgn: '<br> 1. Ne7+ Kh8 <br> 2. Nxc6',
      final_fen: 'rn3r1k/1p3ppp/p1Np2b1/2p5/4P1B1/3Q3P/PbPN1PP1/3R1RK1 b - - 0 2',
      first_move: 'white',
      rating: 1100,
      completed: 1,
      moves: [
        {
          color: 'w',
          from: 'd5',
          to: 'e7',
          flags: 'n',
          piece: 'n',
          san: 'Ne7+'
        },
        {
          color: 'b',
          from: 'g8',
          to: 'h8',
          flags: 'n',
          piece: 'k',
          san: 'Kh8'
        },
        {
          color: 'w',
          from: 'e7',
          to: 'c6',
          flags: 'c',
          piece: 'n',
          captured: 'q',
          san: 'Nxc6'
        }
      ],
      comments: [],
      solvers: []
    },
    {
      id: 15,
      title: 'Mighty sacrifice',
      creator: 'ArijusG7',
      fen: 'rn1r2k1/1pq2p1p/p2p1bpB/3P4/P3Q3/2PB4/5PPP/2R1R1K1 w - - 0 1',
      pgn: '<br> 1. Qe8+ Rxe8 <br> 2. Rxe8#',
      final_fen: 'rn2R1k1/1pq2p1p/p2p1bpB/3P4/P7/2PB4/5PPP/2R3K1 b - - 0 2',
      first_move: 'white',
      rating: 1200,
      completed: 1,
      moves: [
        {
          color: 'w',
          from: 'e4',
          to: 'e8',
          flags: 'n',
          piece: 'q',
          san: 'Qe8+'
        },
        {
          color: 'b',
          from: 'd8',
          to: 'e8',
          flags: 'c',
          piece: 'r',
          captured: 'q',
          san: 'Rxe8'
        },
        {
          color: 'w',
          from: 'e1',
          to: 'e8',
          flags: 'c',
          piece: 'r',
          captured: 'r',
          san: 'Rxe8#'
        }
      ],
      comments: [],
      solvers: []
    }
];


module.exports = puzzles;

