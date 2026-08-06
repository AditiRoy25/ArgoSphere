require("dotenv").config();

const http = require("http");
const { Server } = require("socket.io");
const app = require("./app");
const connectDb = require("./app/config/db");
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*", credentials: true } });
require("./app/sockets/notification.socket")(io);

// for frontend

// import { io } from "socket.io-client";

// const socket =
// io(
//   process.env.NEXT_PUBLIC_SOCKET_URL
// );

// socket.emit(
//   "join",
//   userId
// );

// socket.on(
//   "newNotification",
//   (data) => {

//     console.log(data);

//   }
// );

connectDb();

const PORT = process.env.PORT || 5001;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
