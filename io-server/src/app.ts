import { Server } from "socket.io";
import { onSocketEvent } from "./controller/socketController";
import server from "./server";
import http from "http";
import { logInfo } from "./middleware/logger";
import { corsOptions } from "./middleware/cors";
import { SERVICE_PORT } from "./rawConfig";

const port = SERVICE_PORT;
const httpServer = http.createServer(server);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

const start = () => {
  try {
    io.on("connection", onSocketEvent);
    httpServer.listen(port, () => {
      logInfo(`Starting server on ${port}...`);
    });
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

start();
