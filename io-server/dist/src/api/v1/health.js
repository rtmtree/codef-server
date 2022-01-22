"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const store_1 = require("../../socket/store");
const router = (0, express_1.Router)();
router.get('/', (_, res) => {
    res.json({
        status: 'ok',
        clients: store_1.clients,
        totalClients: store_1.clients.length,
    });
});
exports.default = router;
//# sourceMappingURL=health.js.map