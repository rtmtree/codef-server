import cors from 'cors'
import express from 'express'

import api from './api/v1'
import { corsOptions } from './middleware/cors'
const server = express()

server.use(express.json())
server.use(express.urlencoded({ extended: true }))
server.use(cors(corsOptions))
// server.use(express.static("/socket.io/socket.io.js"));
server.use('/api', api)

export default server
