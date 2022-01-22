import server from "./server";
import http from "http";
import { logInfo } from "./middleware/logger";
import { SERVICE_PORT } from "./rawConfig";

const port = SERVICE_PORT;
const httpServer = http.createServer(server);

const start = () => {
  try {
    httpServer.listen(port, () => {
      logInfo(`Starting server on ${port}...`);
    });
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

start();
