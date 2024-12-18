const { createServer } = require("http");
const { parse } = require("url");
const next = require("next");
const { Server } = require("socket.io");
require("dotenv").config();

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

const connectedUsers = {};

app.prepare().then(() => {
  const server = createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  });

  const io = new Server(server);

  io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);

    // Store user connection
    socket.on("register", (userId) => {
      connectedUsers[userId] = socket.id;
    });

    socket.on("disconnect", () => {
      console.log("A user disconnected:", socket.id);
      for (const userId in connectedUsers) {
        if (connectedUsers[userId] === socket.id) {
          delete connectedUsers[userId];
        }
      }
    });
  });

  // Make the io instance and connected users available globally
  global.io = io;
  global.connectedUsers = connectedUsers;

  server.listen(3000, (err) => {
    if (err) throw err;
    console.log("> Ready on http://localhost:3000");
  });
});
