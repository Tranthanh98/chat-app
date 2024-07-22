// const passport = require("passport");
// const GoogleStrategy = require("passport-google-oauth20").Strategy;
// const mongoose = require("mongoose");
// require("dotenv").config();

// // User model
// const User = mongoose.model("User");

// // Passport configuration
// passport.use(
//   new GoogleStrategy(
//     {
//       clientID: process.env.GG_CLIENT_ID,
//       clientSecret: process.env.GG_CLIENT_SECRET,
//       callbackURL: "/api/auth/google/callback",
//     },
//     async (accessToken, refreshToken, profile, done) => {
//       // Find or create the user
//       const existingUser = await User.findOne({ oauthProvider: profile.id });
//       if (existingUser) {
//         return done(null, existingUser);
//       }

//       const newUser = new User({
//         oauthProvider: profile.id,
//         username: profile.displayName,
//         email: profile.emails[0].value,
//       });

//       await newUser.save();
//       done(null, newUser);
//     }
//   )
// );

// // Serialize and deserialize user
// passport.serializeUser((user, done) => {
//   done(null, user.id);
// });

// passport.deserializeUser(async (id, done) => {
//   const user = await User.findById(id);
//   done(null, user);
// });
