"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const socket_io_1 = require("socket.io");
const socketController_1 = require("./controller/socketController");
const server_1 = __importDefault(require("./server"));
const http_1 = __importDefault(require("http"));
const logger_1 = require("./middleware/logger");
const port = process.env.PORT || 3000;
const httpServer = http_1.default.createServer(server_1.default);
const io = new socket_io_1.Server(httpServer);
const start = () => {
    try {
        io.on('connection', socketController_1.onSocketEvent);
        httpServer.listen(port, () => {
            (0, logger_1.logInfo)(`Starting server on ${port}...`);
        });
    }
    catch (err) {
        console.error(err);
        process.exit(1);
    }
};
start();
//# sourceMappingURL=app.js.map