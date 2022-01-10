import { Socket } from 'socket.io'

export type SocketEventParams = {
  socket: Socket
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any
}

export type User = {
  name: string | undefined
  status: number
  socketId: string | undefined
  curOpponent?: string
  avatar?: string
  isDead?: boolean
  position?: object
  rotation?: object
  timeOut?: number
}
