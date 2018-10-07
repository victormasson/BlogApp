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

// models
import DbArticle from './dbModels/Article'
import DbTag from './dbModels/Tag'
import DbUser from './dbModels/User';
import DbMessage from './dbModels/Message'

// router
import articlesRouter from './routes/articles'
import tagsRouter from './routes/tags'
import usersRouter from './routes/users'


export default class Server {
  readonly port: number
  readonly mongoUri: string
  public app: express.Application
  public httpServer: http.Server

  constructor(port: number, mongoUri: string) {
    this.port = port
    this.mongoUri = mongoUri

    this.app = express()
    this.httpServer = new http.Server(this.app)
    new socketChat(this.httpServer)
    this.config()
    this.routes()
  }

  public start() {
    this.app.get('/', (req: Request, res: Response) => {
      res.send('Hello world')
    })
    this.app.listen(this.port, () => {
      console.log(`server run on http://localhost:${this.port}`);
    })
  }

  public config(): void {
    // set up mongoose
    mongoose.connect(this.mongoUri, () => {
      console.log(`mongoose run on ${this.mongoUri}`)
    })

    // model definition
    DbArticle
    DbTag
    DbUser
    DbMessage

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