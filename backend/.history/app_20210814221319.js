const express = require("express");
const http = require("http");
const app = express();
const server = http.createServer(app);
const io = require("socket.io")(server);
const dashboardRoute = require("routes/dashboard.route");
const loginRoute = require("routes/login.route");
const registerRouter = require("routes/register.route");
const cors = require("cors");
const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
io.on("connection", (socket) => {
  console.log(socket.id);
});

server.listen(process.env.PORT || 8000, () => {
  console.log("server on listening 8000");
});
