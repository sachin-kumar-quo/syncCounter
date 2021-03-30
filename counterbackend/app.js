const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const port = 5000;
var time = 30;
var start = false;
const timer = () => {
  if (!start) {
    return;
  }
  if (time > 0) {
    time = time - 1;
  } else {
    start = false;
  }
  console.log(time);
  setTimeout(() => timer(time), 1000);
};
const startTime = () => {
  start = true;
  timer();
};
const stopTime = () => {
  start = false;
};

io.on("connection", (socket) => {
  console.log("user connected" + socket.id);
  socket.on("connected1", () => {
    console.log("helloc");
    socket.broadcast.emit("onConnection", time);
  });
  socket.on("start", (msg) => {
    console.log("start");
    startTime();
  });
  socket.on("stop", (msg) => {
    console.log("stop");
    stopTime();
    socket.broadcast.emit("server", time);
  });
  socket.on("reset", () => {
    time = 30;
    socket.broadcast.emit("onReset", time);
  });
  const timer = () => {
    if (!start) {
      return;
    }
    if (time > 0) {
      time = time - 1;
    } else {
      start = false;
    }
    socket.broadcast.emit("timechange", time);
    setTimeout(() => timer(time), 1000);
  };
  const startTime = () => {
    start = true;
    timer();
  };
  const stopTime = () => {
    start = false;
  };
});

server.listen(port, () => {
  console.log("server is running on  " + port);
});
