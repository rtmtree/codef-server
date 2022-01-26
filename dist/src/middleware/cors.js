"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.corsOptions = void 0;
const additionalSafeHosts = 'ADDITIONAL_CORS_HOSTS' in process.env ? process.env.ADDITIONAL_CORS_HOSTS.split(',') : [];
const CORSSafeList = ['http://localhost:3000'].concat(additionalSafeHosts);
exports.corsOptions = {
    origin: (origin, callback) => {
        if (CORSSafeList.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        }
        else {
            callback(new Error('Not allowed by CORS'));
        }
    },
};
//# sourceMappingURL=cors.js.map