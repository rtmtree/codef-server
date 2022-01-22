"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SOCKET_SERVER_PORT = exports.SOCKET_SERVER_ENDPOINT = exports.SERVICE_PORT = exports.SERVICE_DOMAIN = exports.SERVICE_TYPE = void 0;
if (!process.env.SERVICE_TYPE) {
    throw new Error("Missing SERVICE_TYPE");
}
if (!process.env.SERVICE_DOMAIN) {
    throw new Error("Missing SERVICE_DOMAIN");
}
if (!process.env.SERVICE_PORT) {
    throw new Error("Missing SERVICE_PORT");
}
if (!process.env.SOCKET_SERVER_ENDPOINT) {
    throw new Error("Missing SOCKET_SERVER_ENDPOINT");
}
if (!process.env.SOCKET_SERVER_PORT) {
    throw new Error("Missing SOCKET_SERVER_PORT");
}
_a = process.env, exports.SERVICE_TYPE = _a.SERVICE_TYPE, exports.SERVICE_DOMAIN = _a.SERVICE_DOMAIN, exports.SERVICE_PORT = _a.SERVICE_PORT, exports.SOCKET_SERVER_ENDPOINT = _a.SOCKET_SERVER_ENDPOINT, exports.SOCKET_SERVER_PORT = _a.SOCKET_SERVER_PORT;
//# sourceMappingURL=rawConfig.js.map