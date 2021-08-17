const express = require("express");
const http = require("http");
const app = express();
const server = http.createServer(app);
const dashboardRoute = require("./routes/dashboard.route");
const loginRoute = require("./routes/auth.route");
const messageRoute = require("./routes/message.route");
const roomRoute = require("./routes/room.route");
const friendRoute = require("./routes/friend.route");

const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const connectDb = require("./database");
connectDb();
const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
const io = require("socket.io")(server, {
  cors: corsOptions,
});

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
io.use((socket, next) => {
  const username = socket.handshake.auth.username;
  if (!username) {
    return next(new Error("invalid username"));
  }
  socket.username = username;
  next();
});
io.on("connection", (socket) => {
  const users = [];
  for (let [id, socket] of io.of("/").sockets) {
    users.push({
      userID: id,
      username: socket.username,
    });
  }
  socket.emit("users", users);
  socket.on("private message", ({ messaging, to }) => {
    console.log(messaging, to);
  });
});

app.use("/dashboard", dashboardRoute);
app.use("/auth", loginRoute);
app.use("/message", messageRoute);
app.use("/room", roomRoute);
app.use("/friend", friendRoute);

server.listen(process.env.PORT || 8000, () => {
  console.log("server on listening 8000");
});
