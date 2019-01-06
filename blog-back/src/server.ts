import { Request, Response } from 'express'
import * as express from 'express'
import * as http from 'http'
import socketChat from './routes/chat'
import * as mongoose from 'mongoose'
import * as bodyParser from 'body-parser'
import * as compression from 'compression'
import * as logger from 'morgan'
import * as helmet from 'helmet'
import * as cors from 'cors';
import * as io from 'socket.io'

// models
import * as Context from './dbModels/Context'

// router
import articlesRouter from './routes/articles'
import tagsRouter from './routes/tags'
import usersRouter from './routes/users'

export default class Server {
  readonly port: number
  readonly mongoUri: string
  public app: express.Application
  public httpServer: http.Server
  public socketServer: io.Server

  constructor(port: number, mongoUri: string) {
    this.port = port
    this.mongoUri = mongoUri

    this.app = express()
    this.httpServer = http.createServer(this.app)
    this.config()
    this.routes()

    this.app.get('/', (req: Request, res: Response) => {
      res.send('Hello world')
    })

    this.socketServer = io.listen(this.httpServer)
    new socketChat(this.socketServer)

    // httpServer must listen to have socket, not Express app
    this.httpServer.listen(this.port, (err: string) => {
      if (err) {
        console.log(err)
      }
      else {
        console.log(`server run on http://localhost:${this.port}`);
      }
    })

  }

  public config(): void {
    // set up mongoose
    mongoose.connect(this.mongoUri, { useNewUrlParser: true }, () => {
      console.log(`mongoose run on ${this.mongoUri}`)
    })

    // model definition
    Context.default

    // config
    this.app
      .use(bodyParser.urlencoded({ extended: true }))
      .use(bodyParser.json())
      .use(logger('dev'))
      .use(compression())
      .use(helmet())
      .use(cors())
  }

  public routes(): void {
    this.app.use('/api/articles', articlesRouter)
    this.app.use('/api/tags', tagsRouter)
    this.app.use('/api/users', usersRouter)
  }
}