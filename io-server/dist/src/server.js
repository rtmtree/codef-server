"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const v1_1 = __importDefault(require("./api/v1"));
const cors_2 = require("./middleware/cors");
const server = (0, express_1.default)();
server.use(express_1.default.json());
server.use(express_1.default.urlencoded({ extended: true }));
server.use((0, cors_1.default)(cors_2.corsOptions));
// server.use(express.static("/socket.io/socket.io.js"));
server.use('/api', v1_1.default);
exports.default = server;
//# sourceMappingURL=server.js.map