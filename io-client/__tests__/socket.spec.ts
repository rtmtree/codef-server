import { createServer } from 'http'
import { Server } from 'socket.io'
import Client from 'socket.io-client'
import { AddressInfo } from 'net'

describe('Socket', () => {
  let io, serverSocket, clientSocket

  beforeAll((done) => {
    const httpServer = createServer()
    io = new Server(httpServer)
    httpServer.listen(() => {
      const address = httpServer.address() as AddressInfo
      const port = address.port
      clientSocket = Client(`http://localhost:${port}`)
      io.on('connection', (socket) => {
        serverSocket = socket
      })
      clientSocket.on('connect', done)
    })
  })

  afterAll(() => {
    io.close()
    clientSocket.close()
  })

  it('can pass argument to client', (done) => {
    clientSocket.on('PING', (arg) => {
      expect(arg).toBe('test')
      done()
    })
    serverSocket.emit('PING', 'test')
  })

  it('client can talk back to server', (done) => {
    serverSocket.on('SHOOT', (cb) => {
      cb('GOAL!')
    })
    clientSocket.emit('SHOOT', (arg) => {
      expect(arg).toBe('GOAL!')
      done()
    })
  })
})
