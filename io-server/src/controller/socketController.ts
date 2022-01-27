import { Socket } from 'socket.io'
import { logInfo } from '../middleware/logger'
import { clientLookup, clients } from '../socket/store'
import { User } from '../socket/type'

export const onSocketEvent = (socket: Socket) => {
  // user unique on each socket
  let user: User = {
    name: undefined,
    socketId: undefined,
    status: 0,
  }

  socket.on('PING', function (_pack) {
    const pack = JSON.parse(_pack)

    logInfo('message from user# ' + socket.id + ': ' + pack.msg)

    socket.emit('PONG', socket.id, pack.msg)
  })

  socket.on('LOGIN', function (_data) {
    logInfo('[INFO] JOIN received !!! ')
    logInfo(_data)
    const data = JSON.parse(_data)
    user = {
      name: data.name,
      status: 0,

      socketId: socket.id,
    }

    logInfo('[INFO] player ' + user.name + ': logged!')

    clients.push(user)

    clientLookup[user.socketId] = user

    logInfo('[INFO] Total players: ' + clients.length)

    /*********************************************************************************************/

    socket.emit('LOGIN_SUCCESS', user.socketId, user.name, user.avatar, user.position)
    logInfo(`LOGINSUCCESS:${JSON.stringify(user)}`)
  })

  socket.on('FIND_MATCH', function (_data) {
    logInfo('[INFO] JOIN received !!! ')

    const data = JSON.parse(_data)

    logInfo('[INFO] player ' + data.name + ': find match!')

    clientLookup[socket.id].status = 1

    /*********************************************************************************************/

    Object.keys(clientLookup).forEach(function (i) {
      if (clientLookup[i].socketId != user.socketId) {
        if (clientLookup[i].status == 1) {
          logInfo(user.socketId + ' MATCH_CREATED ' + clientLookup[i].socketId)
          socket.emit(
            'MATCH_CREATED',
            JSON.stringify({
              name: user.name,
              opName: clientLookup[i].name,
              isHome: true,
            }),
          )
          socket.to(clientLookup[i].socketId).emit(
            'MATCH_CREATED',
            JSON.stringify({
              name: user.name,
              opName: clientLookup[i].name,
              isHome: false,
            }),
          )
          clientLookup[i].curOpponent = clientLookup[user.socketId].socketId
          clientLookup[user.socketId].curOpponent = clientLookup[i].socketId
        }
      }
    })
  })

  socket.on('HOST_TO_RENDER', function (_data) {
    logInfo(_data)

    if (user) {
      socket.to(user.curOpponent).emit('RENDER_FROM_HOST', _data)
    }
  })

  socket.on('CLIENT_MOVE_GK', function (_data) {
    logInfo(_data)
    if (user) {
      socket.to(user.curOpponent).emit('MOVE_GK_FROM_CLIENT', _data)
    }
  })

  socket.on('SHOOT', function (_data) {
    logInfo('SHOOT')
    if (user) {
      socket.to(user.curOpponent).emit('OPPONENT_SHOOT', _data)
    }
  })

  socket.on('MOVE_BALL', function (_data) {
    logInfo('MOVE_BALL')
    if (user) {
      socket.to(user.curOpponent).emit('OPPONENT_MOVE_BALL', _data)
    }
  })

  socket.on('ANIMATION', function (_data) {
    const data = JSON.parse(_data)

    if (user) {
      user.timeOut = 0

      socket.broadcast.emit('UPDATE_PLAYER_ANIMATOR', user.socketId, data.animation)
    }
  })

  socket.on('disconnect', function () {
    if (user) {
      user.isDead = true

      socket.broadcast.emit('USER_DISCONNECTED', user.socketId)
      delete clientLookup[user.socketId]

      for (let i = 0; i < clients.length; i++) {
        if (clients[i].name == user.name && clients[i].socketId == user.socketId) {
          logInfo('User ' + clients[i].name + ' has disconnected')
          clients.splice(i, 1)
        }
      }
    }
  })
}
