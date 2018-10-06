import { Request, Response } from 'express'
import * as express from 'express'
import * as mongoose from 'mongoose'
import * as bodyParser from 'body-parser'
import * as compression from 'compression'
import * as logger from 'morgan'
import * as helmet from 'helmet'
import * as cors from 'cors';

// models
import * as Article from './models/Article'
import * as Tag from './models/Tag'

// router
import * as articlesRouter from './routes/articles'
import * as tagsRouter from './routes/tags'


export default class Server {
  readonly port: number
  readonly mongoUri: string
  public app: express.Application

  constructor(port: number, mongoUri: string) {
    this.port = port
    this.mongoUri = mongoUri
    this.app = express()
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
    Article.default
    Tag.default

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
    this.app.use('/api/articles', articlesRouter.default)
    this.app.use('/api/tags', tagsRouter.default)
  }
}