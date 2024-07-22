const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");
const connectDB = require("./configs/db");
const messageRoutes = require("./routes/messages");
const conversationRoutes = require("./routes/conversation.routes");
const session = require("express-session");
const passport = require("passport");
const authRoutes = require("./routes/auth.route");
const userroutes = require("./routes/user");
const bodyParser = require("body-parser");
const { initializeSocket } = require("./configs/socketio");
const { checkAuthenticated } = require("./configs/passport");

const app = express();
const server = http.createServer(app);

// Connect to MongoDB
connectDB();

const io = socketIo(server, {
  cors: {
    origin: "*",
  },
});

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({ secret: "secret", resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

// Define routes
app.use("/api/messages", checkAuthenticated, messageRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/user", userroutes);
app.use("/api/conversations", checkAuthenticated, conversationRoutes);

initializeSocket(server);

const PORT = process.env.PORT || 6969;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
