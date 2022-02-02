import { Socket } from 'socket.io'
import { logInfo } from '../middleware/logger'
import { clientLookup, clients, serverUnity, matchLookup } from '../socket/store'
import { User } from '../socket/type'

export const onSocketEvent = (socket: Socket) => {
  // user unique on each socket
  let user: User = {
    name: undefined,
    socketId: undefined,
    status: 0,
  }

  socket.on('UPDATE_UNITY_SERVER_LOCATION', function (_data) {
    logInfo('UPDATE_UNITY_SERVER_LOCATION' + ' ' + socket.id)
    serverUnity['socketId'] = socket.id
  })

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
          if (serverUnity['socketId']) {
            const matchObj = {
              matchId: user.socketId + '' + clientLookup[i].socketId,
              Hname: user.name,
              HsocketId: user.socketId,
              Aname: clientLookup[i].name,
              AsocketId: clientLookup[i].socketId,
              roomIndex: null,
            }
            matchLookup[matchObj.matchId] = matchObj
            socket.to(serverUnity['socketId']).emit('INIT_ROOM', JSON.stringify(matchObj))
          }
          clientLookup[i].curOpponent = clientLookup[user.socketId].socketId
          clientLookup[user.socketId].curOpponent = clientLookup[i].socketId
        }
      }
    })
  })

  socket.on('CONFIRM_INIT_ROOM', function (_data) {
    logInfo(_data)
    const data = JSON.parse(_data)
    logInfo(' MATCH_CREATED ' + data.matchId)
    socket.to(matchLookup[data.matchId].HsocketId).emit(
      'MATCH_CREATED_TO_CLIENT',
      JSON.stringify({
        name: matchLookup[data.matchId].Hname,
        opName: matchLookup[data.matchId].Aname,
        isHome: true,
        matchId: matchLookup[data.matchId].matchId,
      }),
    )
    socket.to(matchLookup[data.matchId].AsocketId).emit(
      'MATCH_CREATED_TO_CLIENT',
      JSON.stringify({
        name: matchLookup[data.matchId].Aname,
        opName: matchLookup[data.matchId].Hname,
        isHome: false,
        matchId: matchLookup[data.matchId].matchId,
      }),
    )
    matchLookup[data.matchId].roomIndex = data.roomIndex
    logInfo(data)
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
    // if (user) {
    //   socket.to(user.curOpponent).emit('OPPONENT_SHOOT', _data)
    // }
  })

  socket.on('MOVE_BALL', function (_data) {
    logInfo('MOVE_BALL')
    logInfo(_data)
    const data = JSON.parse(_data)
    data['roomIndex'] = matchLookup[data.matchId].roomIndex

    if (serverUnity['socketId']) {
      socket.to(serverUnity['socketId']).emit('CLIENT_MOVE_BALL_TO_SERVER', JSON.stringify(data))
    }
    // if (user) {
    //   socket.to(user.curOpponent).emit('OPPONENT_MOVE_BALL', _data)
    // }
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
