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

# 1. Create and add a new puzzle to the forum with "/add-puzzle" (POST)

requires the user to be signed in, a valid postition to be created on the chessboard, a valid move order (ie, an odd number of moves) to be made and a valid rating to be provided,

A user can also choose to include their own title for the puzzle, otherwise the title will be made from the id of the puzzle.

A puzzle includes all of the aforementioned properties and in addition a counter to indicated how many times the puzzle was solved, a comments object with its properties as well as a solvers object within which the users who have solved the puzzle are stored.

After the request was made the user is redirected to the congratulations page, where the details of the created puzzle are showed off so that the user could choose to either keep the puzzle or scrap it.

# 2. Delete a puzzle with "/delete-puzzle/:id" (DELETE)

requires the user username as well as the creator of the puzzle for verification as well as to provide the puzzle id.

The deletion methos goes in two steps - the first one being the delivery of the required ids to the server and afterwards forwarding the verification information to a DELETE request.

The puzzle can be deleted from two locations - one is right after a puzzle was created, on the congratulations page there will be an option to delete the freshly created puzzle, and there will be a button on the solver page when a user will try to solve their own created puzzle.

After the puzzle is deleted, it is completely omitted from the original list and the user is notified with a helpful headline.

# 3. Update the the list of which people have solved a specific puzzle with "/solvers/" (POST)

requires the user to be signed in as well as the id of the puzzle.

This is used in combination with updating the user's ELO after completing a puzzle.

This route returns the user to the puzzle which they just solved with their new ELO rating then being displayed and in the forum menu the puzzle is now signalled as completed to the user.

After a user has been added to the list, they will not be ever added again or removed from it.

# 4. Update the the counter which indicates how many times the puzzle was completed with "/incr/:id" (POST)

requires the id of the puzzle.

Simply finds the puzzle and increments the counter to indicate, that the puzzle was solved.

Does not require the user to be signed in to work.

# 5. Add a comment to a specific puzzle with "/add-comment/:id" (POST)

requires the id of the puzzle.

Adds a comment to the solver page of the puzzle along with the meta data like when the comment was posted and by who. Also has a response object associated with the specific comment.

It can be done both signed in and anonymously.

# 6. Add a response to a specific comment in a specific puzzle with "/comment/add-response" (POST)

requires the id of the puzzle as well as the comment.

Adds a reply comment directly attached to the comment in the solver page of the puzzle along with the meta data like when the comment was posted and by who. Multiple replies can be written by one or multiple people.

It can be done both signed in and anonymously.

# users route:
includes functionality like adding a user and updating their ELO rating after solving a puzzle.

# 1. Add a user with "/" (POST)

requires a username, the password and a repetition of the password to prevent mistypes.

Used to add a valid account to the website. It also initialises a user's ELO to 600 and allows the person to log in with these credentials to unlock features.

Can be done only once per user. No users can be created with the name "anonymous" or "#" in their name.

# 2. Update a user's ELO rating with with "/" (POST)

requires the user to be logged in and a puzzle to be solved correctly.

This updates the user's ELO by either increasing or decreasing it by a margin provided by an algorithm in the frontend.

Used in combination with adding the user as a solver of a particular puzzle.

# Created with the use of the following apis:

# Passport-local by jaredhanson
used for safe* authentification on the website.

# Chessboardjs by oakmac
used for creating and rendering chess boards, pieces, their dragability, editing and more.

# Chess.js by jhlywa
used ion conjunction with Chessboardjs to create a position which detects valid chess moves, tracks the move order, chess FEN string manipulation and more.

*safe after the update which includes a database with a robust hashing function.
