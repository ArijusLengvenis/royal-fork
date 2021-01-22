# The Royal fork

A chess puzzle publishing and solving forum.

On the website users can interact with it while registered or otherwise. Being registered unlocks some functionality, like additional filering options for browsing the forum, the ability to create and publish your own fully-customizable chess puzzles, with castling rites taken into account as well, as well as it assigns your own ELO value, which then gets change according yto your performance at solving puzzles.

Users can jump in the forum and start exploring the puzzles they wish to solve. The website offers a rating system, where each puzzle is ranked according to its presumed ELO rating by its author as well as a counter which depicts the popularity of the puzzle. As such, chess players of all ranges can enjoy the ability to quickly find a puzzle of their level for a fair challenge and even write feedback comments on the puzzles or have an engaging discussion afterwards. Once logged in, users themselves are granted with an ELO rating, which dynamically changes when a user correctly solves a puzzle. This creates initiative for users to continue to use the website and get their ELO rating as high as possible.

The UX is intuitive, simple, yet informative and adapts to the user. Works well both on mobile and desktop.

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

requires the user to be signed in, a valid postition to be created on the chessboard, a valid move order (ie, an odd number of moves) and a valid rating to be provided,

A user can also choose to include their own title for the puzzle, otherwise the title will be made from the id of the puzzle.

A puzzle includes all of the aforementioned properties and in addition a counter to indicated how many times the puzzle was solved, a comments object with its properties as well as a solvers object within which the users who have solved the puzzle are stored.

After the request was made the user is redirected to the congratulations page, where the details of the created puzzle are showed off so that the user could choose to either keep the puzzle or scrap it.

# 2. Delete a puzzle with "/delete-puzzle/:id" (DELETE)

requires the user username as well as the creator of the puzzle for verification as well as to provide a valid puzzle id.

The deletion methos goes in two steps - the first one being the delivery of the required ids to the server and afterwards forwarding the verification information to a DELETE request.

The puzzle can be deleted from two locations - one is right after a puzzle was created, on the congratulations page there will be an option to delete the freshly created puzzle, and there will be a button on the solver page when a user will try to solve their own created puzzle.

After the puzzle is deleted, it is completely omitted from the original list and the user is notified with a helpful headline.

# 3. Update the the list of which people have solved a specific puzzle with "/solvers/" (POST)

requires the user to be signed in as well as the id of the puzzle.

This is used in combination with updating the user's ELO after completing a puzzle.

This route returns the user to the puzzle which they just solved with their new ELO rating then being displayed and in the forum menu the puzzle is now signalled as completed to the user.

After a user has been added to the list, they will not be ever added again or removed from it.

# 4. Update the the counter which indicates how many times the puzzle was completed with "/incr/:id" (POST)

requires a valid id of a puzzle.

Simply finds the puzzle and increments the counter to indicate, that the puzzle was solved.

Does not require the user to be signed in to work.

# 5. Add a comment to a specific puzzle with "/add-comment/:id" (POST)

requires a valid id of a puzzle.

Adds a comment to the solver page of the puzzle along with the meta data like when the comment was posted and by who. Also has a response object associated with the specific comment.

It can be done both signed in and anonymously.

# 6. Add a response to a specific comment in a specific puzzle with "/comment/add-response" (POST)

requires a valid id of a puzzle as well as a valid id of a comment.

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

# render pages/authentification routes

# 1. Render the home page with "/" (GET)

Accepts a large variety of query strings, such as filtering options, sorting options, redirect variables and deleted puzzle notification information.

It loads a fully functional forum hub page, where users are prompted to register or log in, create puzzles and solve any puzzles they like.

The page is rendered with "index.handlebars" and does not require for the users to be signed in to use, except for some features, like that logged in users get notified for which puzzles they have already solved or made themselves, filtering options associated with this among other things.

# 2. Render a puzzle solving page with "/solver/" (GET)

requires a valid puzzle id.

Can also accept query strings associated with the state of the puzzle (solved or not) as well as a value indicating the ELO change of the user solving it.

It loads a fully functional puzzle solving page, with an interactable chessboard, a move history wall, hint and solve puzzle buttons and a fully-fleshed out comment section among other things.

Users have the ability to spend as much time as they want on solving puzzles, when they're stuck they can ask for a "hint" which will highlight the correct squares to move to, they can simply click "solve puzzle" to go straight into the comment section (which is blocked until the user solves the puzzle in case of spoilers) to share and discuss about that specific position. Each comment has their own replies associated with them as well.

The page is rendered with "solvers.handlebars" and does not require for users to be signed in to use, but when the user is logged in, the page keeps track of the errors the person made, the number of hints they used and once the puzzle is finished calculates the ELO rating change and updates it immediately. Furthermore, the comment section also signs comments made by the user with the user's name, where otherwise it would sign as "anonymous".

# 3. Render the register page with "/register/" (GET)

It loads a simple and intuitive form which asks for a username, password and a repeat of the password to prevent unwanted mistypes.

The page is rendered with "credentials.handlebars" and does not require the users to be signed in to use.

# 4. Render the login page with "/login/" (GET)

It loads a simple and intuitive form which asks for a username and a password. Used for authentication.

The page is rendered with "login.handlebars" and does not require the users to be signed in to use.

# 5. Access the authentication route with "/login/" (POST)

requires a username and password, which are present in the users database.

With the use of Express middleware this api serves the purpose of authenticating a user who wants to log in.

More details about this API can be found on: http://www.passportjs.org/packages/passport-local/.

# 6. Logout from an account with "/logout/" (GET)

requires the user to be logged in.

With the use of Express middleware this api serves to deserialize the user from the website and return back to the state of not-logged in.

Redirects to the homepage.

# 7. Render the puzzle editor page with "/editor/" (GET)

requires the user to be signed in to access.

It loads a fully functional puzzle creating page, which allows the user to quickly and intuitively assemble basically any possible chess position that exists.

The page is divided into 2 parts. One focuses on assembling the starting board, where then the user can drag the pieces onto the board to set up any postion they please, along with setting the rules such as who is first to move and who has and does not have castling rites. There are buttons like "Clear position" and "Flip board position" to aid them in creating.

Once the user is happy with their initial position and have set the necessary rules, they can press the "Set position" button and proceed to the "Move maker" phase, where the chessboard now becomes one which only follows the strict rules of chess and as such the move order can be assembled. The user can also then access a button labeled "Undo" to undo the previously made move if a mishap had occured. Once the user is happy with the move order of the puzzle, they can set a title for it if they please, they must give it an ELO rating, so that other users solving this puzzle would get a fair assumption at the difficulty of the puzzle and then finally they can submit.

The page is rendered with "editor.handlebars".

# 8. Render the congratulating page for creating a puzzle with "/congratulations/:id" (GET)

requires the user to be signed in and a valid puzzle id.

It loads a congratulations page, which showcases the puzzle that the user had just created.

When viewing the puzzle information, the user has a choice of either going back into the editor and creating another puzzle, going back to the forum or if they are not happy with the puzzle that they have assembled - they can delete it entirely.

The page is rendered with "congratulations.handlebars".

# 9. Render a custom 404 page with "/*" (GET)

It loads a simple 404 page which serves to convey the information, that the user has reached a link, which does not exist.

A similar page is loaded when an error occurs during the operation of any other api mentioned previously, which clearly states the problem that occured in the server and provides an appropriate link back with each instance.

These pages are rendered with "404_error_template.handlebars" as well as "error.handlebars" respectively.

# Later implementations/improvements of the website could involve: 

* Making a leaderboard for users to see where they stand against others with regards to their rating, puzzles solved and created.

* Integrating a chess engine to give live feedback and meaning behind the chess moves and see why the ones that were chosen were in fact the right moves.

* Adding a live timer to when a user starts solving a problem to showcase how much time they took on it as well as if they took too long - take that into account when adjusting their ELO rating as well.

* Ovehauling the move history wall on the solver page in a way that allows the creator of the puzzle to input comments under moves they choose to or even seperate variations to explain different ideas in complicated positions. The user then could click on any move on there and the board would assemble itself to that position and if a comment was available to go along with it, it would then be highlighted.

* A more robust and secure authentication system, complete with an online database and a secure hashing function to hide password information. Also, add emails so that forgotten passwords would be addressed as well.

* Add connectivity with Google, Facebook and Apple for quick, easy and secure sign ups for users.

* A more complete comment section with a liking system, sorting of most liked ones to the top, spoiler shrouds, multiple layered responses, profanity filters, etc, all in the effort to make the forum more engaging and accessible.

* Sounds, animations, glyphicons and loading screens to improve the UX when highlighting or moving through pages.

* A more sophisticated algortihm to calculate ELO rating changes after solving puzzles.

* The ability for users to add custom profile icons to their profiles.

* Ambitious implementation: puzzle battles, to let users compete against one another to see who can solve more puzzles correctly in a given timeframe and post that on the leaderboard as well. Users can choose random opponents or challenge any chosen opponent through a search bar (or just do it alone to see how far they get). Note: requires a large backlog of puzzles to work properly.

# Created with the use of the following apis:

# Passport-local by jaredhanson
used for safe* authentification on the website.

# Chessboardjs by oakmac
used for creating and rendering chess boards, pieces, their dragability, editing and more.

# Chess.js by jhlywa
used ion conjunction with Chessboardjs to create a position which detects valid chess moves, tracks the move order, chess FEN string manipulation and more.

*safe after the update which includes a database with a robust hashing function.
