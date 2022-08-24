//importer libraiire express
const express = require("express");
//creer une instance de la librairie express
const app = express();
//importer lib http
const http = require("http");

//Importer class Server de la lib
const { Server } = require("socket.io");

const cors = require("cors");
app.use(cors());
//creer le server
const server = http.createServer(app);

//creer var qui va manger tout ce qui concerner le socket io
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

//Listening to events
io.on("connection", (socket) => {
  console.log("User connected", socket.id);

  socket.on("send_message", (data) => {
    socket.broadcast.emit("receive_message", data);
  });
});

server.listen(3001, () => {
  console.log("Server is running");
});
