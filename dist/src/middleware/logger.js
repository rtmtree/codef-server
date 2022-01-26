"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logError = exports.logWarn = exports.logInfo = exports.errorToObject = exports.SeverityLevel = void 0;
var SeverityLevel;
(function (SeverityLevel) {
    SeverityLevel["INFO"] = "INFO";
    SeverityLevel["WARN"] = "WARN";
    SeverityLevel["ERROR"] = "ERROR";
})(SeverityLevel = exports.SeverityLevel || (exports.SeverityLevel = {}));
const formatLog = (message, severity) => {
    const log = {
        type: 'app',
        service: 'codef-server',
        severity,
        message,
    };
    return log;
};
const errorToObject = (error) => ({
    message: error.message,
    stack: error.stack,
});
exports.errorToObject = errorToObject;
const logInfo = (message) => {
    const formattedLog = formatLog(message, SeverityLevel.INFO);
    // eslint-disable-next-line no-console
    console.info(JSON.stringify(formattedLog));
};
exports.logInfo = logInfo;
const logWarn = (message) => {
    const formattedLog = formatLog(message, SeverityLevel.WARN);
    // eslint-disable-next-line no-console
    console.warn(JSON.stringify(formattedLog));
};
exports.logWarn = logWarn;
const logError = (message) => {
    const formattedLog = formatLog(message, SeverityLevel.ERROR);
    // eslint-disable-next-line no-console
    console.error(JSON.stringify(formattedLog));
};
exports.logError = logError;
//# sourceMappingURL=logger.js.map