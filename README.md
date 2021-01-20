# The Royal fork

A chess puzzle publishing and solving forum.

On the website users can interact with it while registered or otherwise. Being registered unlocks some functionality, like additional filering options for browsing the forum, the ability to create and publish your own fully-customizable chess puzzles, with castling rites taken into account as well, as well as it assigns your own ELO value, which then gets change according yto your performance at solving puzzles.

Users can jump in the forum and start exploring the puzzles they wish to solve. The website offers a rating system, where each puzzle is ranked according to its presumed ELO rating by its author as well as a counter which depicts the popularity of the puzzle. As such, chess players of all ranges can enjoy the ability to quickly find a puzzle of their level for a fair challenge and even write feedback comments on the puzzles or have an engaging discussion afterwards. Once logged in, users themselves are granted with an ELO rating, which dynamically changes when a user correctly solves a puzzle. This creates initiative for users to continue to use the website and get their ELO rating as high as possible.

The UX is intuitive, simple, yet informative and adapts to the user. Works well both on mobile and desktop.

Later implementations could involve a leaderboard for users to see where they stand with regards to their rating, puzzles solved and created as well as how much time they were registered on the website for.

# API shortcuts for setting up and testing purposes:

# npm install
installs all of the dependencies.

# npm start
initializes the server.

# npm run pre-test
runs a linter to check for code errors (JQuery '$', chessboard.js Chessboard constructer and chess.js Chess constructer are not recognised as assigned, but are dismissed as valid anyway).

# npm test
runs Jest scripts to test out frontend and backend functionality.

# puzzles route:
includes functionality such as adding a puzzle to the array of puzzles, modifying puzzles after users interact with them as well as deleting puzzles when their creators wish to do so (disabled for now).

# users route:
includes functionality like adding a user and updating their elo rating after solving a puzzle.

# Created with the use of the following apis:

# Passport-local by jaredhanson
used for safe* authentification on the website.

# Chessboardjs by oakmac
used for creating and rendering chess boards, pieces, their dragability, editing and more.

# Chess.js by jhlywa
used ion conjunction with Chessboardjs to create a position which detects valid chess moves, tracks the move order, chess FEN string manipulation and more.

*safe after the update which includes a database with a robust hashing function.
