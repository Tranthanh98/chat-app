const { OAuth2Client } = require("google-auth-library");
const jwt = require("jsonwebtoken");
const User = require("../models/users");
const { jwtSecret } = require("../configs/config");
require("dotenv").config();

const client = new OAuth2Client(process.env.GG_CLIENT_ID);

exports.googleAuth = async (req, res) => {
  const { credential: idToken } = req.body;

  try {
    const ticket = await client.verifyIdToken({
      idToken,
      audience: process.env.GG_CLIENT_ID,
    });

    const { name, email, picture, sub, given_name } = ticket.getPayload();

    // Check if user exists
    let user = await User.findOne({ email });
    if (!user) {
      user = new User({
        username: name || email,
        email,
        avatartUrl: picture,
        oauthProvider: `google-${sub}`,
        createdDate: new Date().toISOString(),
        friendlyName: `${given_name}`,
      });
      user.lastActive = new Date().toISOString();
      await user.save();
    }

    // Generate JWT
    const token = jwt.sign({ id: user._id }, jwtSecret, {
      expiresIn: process.env.EXPIRED_TOKEN,
    });

    res.json({
      token,
      userInfo: {
        createdDate: user.createdDate,
        email: user.email,
        name: user.friendlyName || user.email,
        active: user.active,
        userId: user._id,
        avatartUrl: user.avatartUrl,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
