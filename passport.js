require('dotenv').config();

const passport = require('passport');

const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(new GoogleStrategy ({
	clientID: process.env.clientID,
	clientSecret: process.env.clientSecret,
	callbackURL: "http://localhost:4000/users/google/callback",
	passReqToCallback: true
},
	function(request, accessToken, refreshToken, profile, done) {
		return done(null, profile)
	}
))

passport.serializeUser(function(user, done) {
	done(null, user);
})

passport.deserializeUser(function(user, done) {
	done(null, user);
})