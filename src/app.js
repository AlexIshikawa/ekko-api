import express from 'express'
import cors from 'cors'
import helmet from 'helmet'

import 'dotenv/config'
import './database'

import routes from './routes'

class App {
    constructor() {
        this.server = express()
        this.middlewares()
        this.routes()
    }

    middlewares() {
        this.server.use(express.json())
        this.server.use(cors())
        this.server.use(helmet())
    }

    routes() {
        this.server.use(routes)
    }
}

export default new App().server
