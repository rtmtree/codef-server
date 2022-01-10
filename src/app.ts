import { Server } from "socket.io";
import { onSocketEvent } from "./controller/socketController";
import server from "./server";
import http from "http";

const port = process.env.PORT || 3000;
const httpServer = http.createServer(server);
const io = new Server(httpServer);

const start = () => {
  try {
    io.on("connection", onSocketEvent);
    httpServer.listen(port, () => {
      console.log(`Starting server on ${port}...`);
    });
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

start();
