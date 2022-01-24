"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.onSocketEvent = void 0;
const logger_1 = require("../middleware/logger");
const store_1 = require("../socket/store");
const onSocketEvent = (socket) => {
    // user unique on each socket
    let user = {
        name: undefined,
        socketId: undefined,
        status: 0,
    };
    socket.on('PING', function (_pack) {
        const pack = JSON.parse(_pack);
        (0, logger_1.logInfo)('message from user# ' + socket.id + ': ' + pack.msg);
        socket.emit('PONG', socket.id, pack.msg);
    });
    socket.on('LOGIN', function (_data) {
        (0, logger_1.logInfo)('[INFO] JOIN received !!! ');
        (0, logger_1.logInfo)(_data);
        const data = JSON.parse(_data);
        user = {
            name: data.name,
            status: 0,
            socketId: socket.id,
        };
        (0, logger_1.logInfo)('[INFO] player ' + user.name + ': logged!');
        store_1.clients.push(user);
        store_1.clientLookup[user.socketId] = user;
        (0, logger_1.logInfo)('[INFO] Total players: ' + store_1.clients.length);
        /*********************************************************************************************/
        socket.emit('LOGIN_SUCCESS', user.socketId, user.name, user.avatar, user.position);
        (0, logger_1.logInfo)(`LOGINSUCCESS:${JSON.stringify(user)}`);
    });
    socket.on('FIND_MATCH', function (_data) {
        (0, logger_1.logInfo)('[INFO] JOIN received !!! ');
        const data = JSON.parse(_data);
        (0, logger_1.logInfo)('[INFO] player ' + data.name + ': find match!');
        store_1.clientLookup[socket.id].status = 1;
        /*********************************************************************************************/
        Object.keys(store_1.clientLookup).forEach(function (i) {
            if (store_1.clientLookup[i].socketId != user.socketId) {
                if (store_1.clientLookup[i].status == 1) {
                    (0, logger_1.logInfo)(user.socketId + ' MATCH_CREATED ' + store_1.clientLookup[i].socketId);
                    socket.emit('MATCH_CREATED', JSON.stringify({
                        name: user.name,
                        opName: store_1.clientLookup[i].name,
                        isHome: true
                    }));
                    socket.to(store_1.clientLookup[i].socketId).emit('MATCH_CREATED', JSON.stringify({
                        name: user.name,
                        opName: store_1.clientLookup[i].name,
                        isHome: false
                    }));
                    store_1.clientLookup[i].curOpponent = store_1.clientLookup[user.socketId].socketId;
                    store_1.clientLookup[user.socketId].curOpponent = store_1.clientLookup[i].socketId;
                }
            }
        });
    });
    socket.on('HOST_TO_RENDER', function (_data) {
        const data = JSON.parse(_data);
        if (user) {
            socket.to(user.curOpponent).emit('RENDER_FROM_HOST', _data);
        }
    });
    socket.on('CLIENT_MOVE_GK', function (_data) {
        const data = JSON.parse(_data);
        if (user) {
            socket.to(user.curOpponent).emit('MOVE_GK_FROM_CLIENT', _data);
        }
    });
    socket.on('SHOOT', function (_data) {
        (0, logger_1.logInfo)('SHOOT');
        if (user) {
            socket.to(user.curOpponent).emit('OPPONENT_SHOOT', _data);
        }
    });
    socket.on('MOVE_BALL', function (_data) {
        const data = JSON.parse(_data);
        (0, logger_1.logInfo)('MOVE_BALL');
        if (user) {
            socket.to(user.curOpponent).emit('OPPONENT_MOVE_BALL', _data);
        }
    });
    socket.on('ANIMATION', function (_data) {
        const data = JSON.parse(_data);
        if (user) {
            user.timeOut = 0;
            socket.broadcast.emit('UPDATE_PLAYER_ANIMATOR', user.socketId, data.animation);
        }
    });
    socket.on('disconnect', function () {
        if (user) {
            user.isDead = true;
            socket.broadcast.emit('USER_DISCONNECTED', user.socketId);
            delete store_1.clientLookup[user.socketId];
            for (let i = 0; i < store_1.clients.length; i++) {
                if (store_1.clients[i].name == user.name && store_1.clients[i].socketId == user.socketId) {
                    (0, logger_1.logInfo)('User ' + store_1.clients[i].name + ' has disconnected');
                    store_1.clients.splice(i, 1);
                }
            }
        }
    });
};
exports.onSocketEvent = onSocketEvent;
//# sourceMappingURL=socketController.js.map