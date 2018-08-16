const path = require("path");
const express = require("express");

require("dotenv").config();
const port = process.env.PORT || 5050;

const server = express();
const http = require("http").Server(server).listen(port, () => {
  console.log(`Arkham 0.4 Server is listening on port ${port}`);
});
const io = require("socket.io").listen(http);
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const helmet = require("helmet");

const routes = require('./api/routes');

const corsOptions = {
  origin: "http://localhost:3000",
  methods: "GET, HEAD, PUT, PATCH, POST, DELETE",
  preflightContinue: false,
  optionsSuccessStatus: 204,
  credentials: true,
};

//server.use(helmet());
server.use(bodyParser.json());
server.use(cors(corsOptions));
server.use(express.static(path.join(__dirname, 'client/build')));

mongoose
  .connect(`mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_SERVER}`)
  .then(conn => {
    console.log("Arkham 0.4 Server connected to Database");
  })
  .catch(err => {
    console.log("Mongoose failed to connect to the Database with the following error: ", err);
  });

routes(server);



const liveGames = [];

console.log(io);

io.on('connection', function(socket) {
  console.log("Got a socket conn: ", socket);
})

setInterval(function() {
  io.sockets.emit('message', 'hi!');
  console.log(io.id);
}, 2000);