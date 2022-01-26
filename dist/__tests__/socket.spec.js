"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const socket_io_client_1 = __importDefault(require("socket.io-client"));
describe('Socket', () => {
    let io, serverSocket, clientSocket;
    beforeAll((done) => {
        const httpServer = (0, http_1.createServer)();
        io = new socket_io_1.Server(httpServer);
        httpServer.listen(() => {
            const address = httpServer.address();
            const port = address.port;
            clientSocket = (0, socket_io_client_1.default)(`http://localhost:${port}`);
            io.on('connection', (socket) => {
                serverSocket = socket;
            });
            clientSocket.on('connect', done);
        });
    });
    afterAll(() => {
        io.close();
        clientSocket.close();
    });
    it('can pass argument to client', (done) => {
        clientSocket.on('PING', (arg) => {
            expect(arg).toBe('test');
            done();
        });
        serverSocket.emit('PING', 'test');
    });
    it('client can talk back to server', (done) => {
        serverSocket.on('SHOOT', (cb) => {
            cb('GOAL!');
        });
        clientSocket.emit('SHOOT', (arg) => {
            expect(arg).toBe('GOAL!');
            done();
        });
    });
});
//# sourceMappingURL=socket.spec.js.map