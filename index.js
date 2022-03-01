const express = require('express');
const ngrok = require('ngrok');

const app = express();
const port = process.env.PORT || 3000;
const fs=require('fs');

var server = require("http").Server(app);

var io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:8080",
    methods: ["GET", "POST"]
  }
})
var messages = [
  {
    id: 1,
    text: "Hola soy un mensaje",
    author: "Carlos Azaustre",
  },
];

app.use(express.static("public"));

app.get("/hello", function (req, res) {
  res.status(200).send("Hello World!");
});

io.on("connection", function (socket) {
  console.log("Alguien se ha conectado con Sockets");
  socket.emit("messages", messages);
  socket.on("new-message", function (data) {
    messages.push(data);
    io.sockets.emit("messages", messages);
  });
  fs.watchFile('test.txt', function (event, filename) {
    fs.readFile('test.txt', 'utf8', function(err, data){
      socket.emit("reader", JSON.parse(data))
    });
  });
});





app.use('/', require("./routes/route"))
app.use('/alexa', require('./routes/alexaRoutes'));


server.listen(port, async() => {
    const url = await ngrok.connect(port);
    console.log(url, port);
})