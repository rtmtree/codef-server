import cors from 'cors'
import express from 'express'
import path from 'path'
import api from './api/v1'
import { corsOptions } from './middleware/cors'

const server = express()
const pathToTemplateData = path.join(__dirname, '../../public/TemplateData')
const pathToBuild = path.join(__dirname, '../../public/Build')
const pathToPublic = path.join(__dirname, '../../public')

server.use(express.json())
server.use(express.urlencoded({ extended: true }))
server.use(cors(corsOptions))

server.use('/public/TemplateData', express.static(pathToTemplateData))
server.use('/public/Build', express.static(pathToBuild))
server.use(express.static(pathToPublic))

server.use('/api', api)

export default server
