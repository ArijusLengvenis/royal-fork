# The Royal fork

![Royal Fork Website Img](https://github.com/ArijusLengvenis/royal-fork/blob/main/img/the-royal-fork.png?raw=true)

A feature-rich chess puzzle publishing and solving forum with a dynamic ELO rating system.

## Features
- Intuitive puzzle browsing and solving platform for chess enthusiasts of all skill levels.
- Fully-customizable puzzle editor with ELO rating system for user skill ranking.
- Comment section beneath each puzzle to promote feedback and interactivity.
- User authentication with Passport-Local for user statistics and posts tracking.
- Mobile and Desktop friendly UI.
- Jest tests for frontend and backend functionality.

*NOTE:* this was my first project with HTML/CSS/JavaScript, so the design and UX of the app closely resenbles those from the 2010s.

## Installation & Usage
Clone the repository and navigate to the project directory. Run the following commands:

- Install dependencies: `npm install`
- Start the server: `npm start`
- Pre-test (runs a linter): `npm run pre-test`
- Run tests: `npm test`

## API Endpoints

### Puzzle Routes

1. Create a new puzzle: `POST /add-puzzle`
2. Delete a puzzle: `DELETE /delete-puzzle/:id`
3. Update solvers of a puzzle: `POST /solvers/`
4. Update the counter of puzzle completion: `POST /incr/:id`
5. Add a comment to a puzzle: `POST /add-comment/:id`
6. Add a response to a comment in a puzzle: `POST /comment/add-response`

### User Routes

1. Add a new user: `POST /`
2. Update a user's ELO rating: `POST /elo`

## Render Pages/Authentification Routes

1. Home page: `GET /`
2. Puzzle solving page: `GET /solver/`
3. Registration page: `GET /register/`
4. Login page: `GET /login/`
5. Authentication: `POST /login/`
6. Logout: `GET /logout/`
7. Puzzle editor page: `GET /editor/`
8. Puzzle creation congratulation page: `GET /congratulations/:id`
9. Custom 404 page: `GET /*`

# Later implementations/improvements of the website could involve: 

- Unique more modern website style and logo
- User leaderboards
- Live feedback with an integrated chess engine
- Timer for tracking time to solve a puzzle
- Improved move history wall with interactivity and branching paths
- More secure authentication system
- Enhanced comment section with comment threads
- User profile customization
- Real-time multiplayer puzzle-solving
- Enhanced ELO rating algorithm

## Technology Used
- Passport-local by jaredhanson
- Chessboardjs by oakmac
- Chess.js by jhlywa
