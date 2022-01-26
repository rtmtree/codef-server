"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const v1_1 = __importDefault(require("./api/v1"));
const cors_2 = require("./middleware/cors");
const server = (0, express_1.default)();
const pathToTemplateData = path_1.default.join(__dirname, '../../public/TemplateData');
const pathToBuild = path_1.default.join(__dirname, '../../public/Build');
const pathToPublic = path_1.default.join(__dirname, '../../public');
server.use(express_1.default.json());
server.use(express_1.default.urlencoded({ extended: true }));
server.use((0, cors_1.default)(cors_2.corsOptions));
server.use('/public/TemplateData', express_1.default.static(pathToTemplateData));
server.use('/public/Build', express_1.default.static(pathToBuild));
server.use(express_1.default.static(pathToPublic));
server.use('/api', v1_1.default);
exports.default = server;
//# sourceMappingURL=server.js.map