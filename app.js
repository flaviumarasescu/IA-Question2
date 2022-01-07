const express = require("express");
const { Socket } = require("socket.io");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});


app.set("view engine", "ejs");

app.get("/sample", (req, res) => {
  res.render("sample");
});

server.listen(3000, () => {
  console.log("listening on *:3000");
});
//Global timer
let timer = 0;
//Whenever someone connects this gets executed
io.on("connection", (socket) =>  {
    console.log("User connected",socket.id);
  
    setInterval(() => {
        timer++;
        io.emit('timer_data', timer)
    }, 1000);
    //Whenever someone disconnects this piece of code executed
    socket.on("disconnect", ()=> {
        console.log("Disconnected");
    })
  });