'use strict';

//Initialize all modules and variables that will be needed to manage
//the backend, authentification, logging and connection checking.
const express = require('express');
const app = express();
const exphbs = require('express-handlebars');
const passport = require('passport');
var Strategy = require('passport-local').Strategy;
var db = require('./client/js/index');

//Statically serve every js, css and image files, because they will always be needed
//for every part of the website during runtime.
app.use(express.static('client'));
app.use(express.static('solver')); 
app.use(express.static('congratulations'));
app.use(express.static('editor'));

//Load middleware (the latter 3 are for logging purposes).
app.use(express.json()); //Parse JSON-encoded bodies
app.use(require('morgan')('combined'));
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));

//Load the necessary variables from js files in the directory
const puzzles = require('./client/json/Puzzles');
const users = require('./client/json/users');
const conditionalRendering = require('./client/js/conditionalRendering');
const partitionIndex = conditionalRendering.partitionIndex;

//puzzle API routes
app.use('/api/puzzles', require('./routes/api/puzzles'));
app.use('/api/users', require('./routes/api/users'));

//Set the Express rendering engine to use handlebars.
//Handlebars are a concept which is used when one wants to incorporate templates in order to
//save on writing redundant blocks of code. The templates are esentially composed of HTML code
//interspersed with variables tagged with "{{}}" notation. These variables are called handlebars
//or moustashes and in the middle of rendering the HTML template these handlebars are replaced
//with their corresponding values, which are sent from the backend as an object.
//For example, if we have the code:
//
//...
//<h1>{{name.person}} wants to say Hello {{name.world}}!</h1>
//...
//
//where the sent in object is:
//
//name = {
// world: "World",
// person: "Arijus"	
//}
//
//Will in the end render as:
//...
//<h1>Arijus wants to say Hello World!</h1>
//...
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');


// Configure the local strategy for use by Passport.
//
// The local strategy require a `verify` function which receives the credentials
// (`username` and `password`) submitted by the user.  The function must verify
// that the password is correct and then invoke `cb` with a user object, which
// will be set at `req.user` in route handlers after authentication.
passport.use(new Strategy(
	function(username, password, cb) {
	db.records.findByUsername(username, function(err, user) {
		if (err) { return cb(err); }
		if (!user) { return cb(null, false); }
		if (user.password != password) { return cb(null, false); }
		return cb(null, user);
	});
}));
  
  
  // Configure Passport authenticated session persistence.
  //
  // In order to restore authentication state across HTTP requests, Passport needs
  // to serialize users into and deserialize users out of the session.  The
  // typical implementation of this is as simple as supplying the user ID when
  // serializing, and querying the user record by ID from the database when
  // deserializing.
  passport.serializeUser(function(user, cb) {
	cb(null, user.id);
  });
  
  passport.deserializeUser(function(id, cb) {
	db.records.findById(id, function (err, user) {
		if (err) { return cb(err); }
		cb(null, user);
	});
  });

app.use(passport.initialize());
app.use(passport.session());


//Homepage route
app.get('/', (req, res) => {

	//Check if the rating limiting variables are integer values and are sensible.
	if (!Number.isInteger(req.query.filterRatingLow) && req.query.filterRatingLow || !Number.isInteger(req.query.filterRatingHigh) && req.query.filterRatingHigh) {
		let error = {
			msg: "Rating interval must be depicted in integer values!",
			url: "/"
		};
        return res.status(400).render('error', { error: error });
	}

	//Create the filter limting variable.
	let limit = {
		sort: req.query.sortChoice,
		title: req.query.filterTitle,
		creator: req.query.filterCreator,
		low: parseInt(req.query.filterRatingLow),
		high: parseInt(req.query.filterRatingHigh),
		solved: `${req.query.solvedOptions}`,
		yours: `${req.query.creatorOptions}`
	};

	//Check if the user is logged in.
	if (!req.user) {
		limit.solved = null;
		limit.yours = null;
	}

	//Reset non-existant rating filters for easier checking.
	if (!req.query.filterRatingLow) {
		limit.low = '';
	}
	if (!req.query.filterRatingHigh) {
		limit.high = '';
	}

	//Create a clone object of all of the Puzzles, which abides by the filtering and sorting options selected.
	let puzzles_clone = partitionIndex(`${JSON.stringify(puzzles)}`, limit.sort, limit.title, limit.creator, limit.low, limit.high, limit.solved, limit.yours, req.user);
	
	res.render('index', {
		puzzles_clone,
		user: req.user
	});
});

//Solver route
app.get('/solver/', (req, res) => {

	//Initialize object which denotes if there exists a prompt (done) which says that the puzzle
	//has been solved before.
	let done = {
		done: false,
		counter: 'null'
	};
	if(req.query.done === "true") {
		done.done = true;
		if (req.query.counter) {
			done.counter = parseInt(req.query.counter);
		}
	}

	//Check if the id is valid.
	const found = puzzles.some(puzzle => puzzle.id === parseInt(req.query.id));

	if (found) {
		const two = (puzzles.filter(puzzle => puzzle.id === parseInt(req.query.id)));
		const one = two[0];
		res.render('solver', {
			one,
			user: req.user,
			done
		});
	}
	else {
		res.status(404).render('404_error_template');
	}
})

//Credentials register route.
app.get('/register/', (req, res) => {
	res.render('credentials', {
		register: true,
		users,
		user: req.user
	});
})

//Credentials login route
app.get('/login/', (req, res) => {
	res.render('login', {
		user: req.user
	});
})

//login authentification route
app.post('/login/',
	passport.authenticate('local', { failureRedirect: '/login/' }),
	(req, res) => {
		res.redirect('/');
})

//logout route
app.get('/logout/',
  function(req, res){
    req.logout();
    res.redirect('/');
  });

//congratulations route
app.get('/congratulations/:id',
	require('connect-ensure-login').ensureLoggedIn(), 
	(req, res) => {
		//Only enterable if logged in.
		//Check if the id is valid.
		const found = puzzles.some(puzzle => puzzle.id === parseInt(req.params.id));

		if (found) {
			const two = (puzzles.filter(puzzle => puzzle.id === parseInt(req.params.id)));
			const one = two[0];
			if (one.creator !== req.user.username) {
				let error = {
					msg: "This is not your puzzle!",
					url: "/"
				};
				return res.status(403).render('error', { error: error });
			}
			res.render('congratulations', {
				one,
				user: req.user
			});
		}
		else {
			res.status(404).render('404_error_template');
		}
})

//Editor route
app.get('/editor/',
	require('connect-ensure-login').ensureLoggedIn(),
	(req, res) => {
		//Only enterable if logged in.
		res.render('editor', {
			puzzles,
			user: req.user
	});
})

//Not found route
app.get('*', function(req, res){
    res.status(404).render('404_error_template');
});

module.exports = app;