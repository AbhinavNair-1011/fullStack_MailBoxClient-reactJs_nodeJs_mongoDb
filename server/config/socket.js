const { Server } = require("socket.io");
const jwt = require("jsonwebtoken");

let io;

function init(server) {
  io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
      credentials: true,
    },
  });

  io.use((socket, next) => {
    try {
      const cookie = socket.handshake.headers.cookie;

      if (!cookie) {
        socket.disconnect(true);
        return;
      }

      const token = cookie
        .split("; ")
        .find((c) => c.startsWith("accessToken="))
        ?.split("=")[1];

      if (!token) {
        socket.disconnect(true);
        return;
      }

      const user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

      socket.user = user;

      next(); 
    } catch (err) {
      socket.disconnect(true);
    }
  });

  io.on("connection", (socket) => {
    console.log(`Socket Connected ${socket.user.email}`);

    socket.join(socket.user.id);

    socket.on("disconnect", () => {
      console.log(`Socket Disconnected ${socket.user.email}`);
    });
  });

  return io;
}

function getIO() {
  if (!io) {
    throw new Error("Socket.IO not initialized");
  }

  return io;
}

module.exports = {
  init,
  getIO,
};
