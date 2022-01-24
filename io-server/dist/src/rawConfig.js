"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ADDITIONAL_CORS_HOSTS = exports.SERVICE_PORT = exports.SERVICE_DOMAIN = exports.SERVICE_TYPE = void 0;
if (!process.env.SERVICE_TYPE) {
    throw new Error('Missing SERVICE_TYPE');
}
if (!process.env.SERVICE_DOMAIN) {
    throw new Error('Missing SERVICE_DOMAIN');
}
if (!process.env.SERVICE_PORT) {
    throw new Error('Missing SERVICE_PORT');
}
if (!process.env.ADDITIONAL_CORS_HOSTS) {
    throw new Error('Missing ADDITIONAL_CORS_HOSTS');
}
_a = process.env, exports.SERVICE_TYPE = _a.SERVICE_TYPE, exports.SERVICE_DOMAIN = _a.SERVICE_DOMAIN, exports.SERVICE_PORT = _a.SERVICE_PORT, exports.ADDITIONAL_CORS_HOSTS = _a.ADDITIONAL_CORS_HOSTS;
//# sourceMappingURL=rawConfig.js.map