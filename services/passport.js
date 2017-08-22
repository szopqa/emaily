const passport = require('passport');
const  GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys.js');
const monogoose = require('mongoose');

const User = monogoose.model('users');

passport.use(new GoogleStrategy({
		clientID: keys.googleClientID,
		clientSecret : keys.googleClientSecret,
		callbackURL : '/auth/google/callback'
	}, (accessToken, refreshToken, profile, done) => {
		User.findOne({googleId:profile.id})
			.then((existingUser) => {
				if(existingUser){
					//User has already registered
					done(null, existingUser);
				} else {
					new User({googleId:profile.id}).save()
						.then(user => done(null,user));
				}
			});
	})
);

