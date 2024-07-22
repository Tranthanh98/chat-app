const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const { ExtractJwt } = require("passport-jwt");
const mongoose = require("mongoose");
const User = require("../models/users");
const { jwtSecret } = require("./config");
const jwt = require("jsonwebtoken");

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: jwtSecret,
};

passport.use(
  new JwtStrategy(opts, async (jwt_payload, done) => {
    try {
      const user = await User.findById(jwt_payload.id);
      if (!user) {
        return done(null, false);
      }
      return done(null, user);
    } catch (error) {
      console.log("token failed");
      return done(error, false);
    }
  })
);

exports.checkAuthenticated = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.sendStatus(401); // Unauthorized
  }

  jwt.verify(token, jwtSecret, (err, user) => {
    if (err) {
      return res.sendStatus(403); // Forbidden
    }
    req.userId = user.id;
    next();
  });
};
