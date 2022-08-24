//importer libraiire express
const express = require("express");
//creer une instance de la librairie express
const app = express();
//importer lib http
const http = require("http");
const port = process.env.PORT || 3001;

//Importer class Server de la lib
const { Server } = require("socket.io");

const cors = require("cors");
app.use(cors());
//creer le server
const server = http.createServer(app);

console.log("XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX");

//creer var qui va manger tout ce qui concerner le socket io
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

console.log("YYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYY");

//Listening to events
io.on("connection", (socket) => {
  console.log("User connected", socket.id);

  socket.on("send_message", (data) => {
    socket.broadcast.emit("receive_message", data);
  });
});

server.listen(port, () => {
  console.log("Server is running");
});
