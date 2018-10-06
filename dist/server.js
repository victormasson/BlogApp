"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const compression = require("compression");
const logger = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
// models
const Article = require("./models/Article");
const Tag = require("./models/Tag");
// router
const articlesRouter = require("./routes/articles");
const tagsRouter = require("./routes/tags");
class Server {
    constructor(port, mongoUri) {
        this.port = port;
        this.mongoUri = mongoUri;
        this.app = express();
        this.config();
        this.routes();
    }
    start() {
        this.app.get('/', (req, res) => {
            res.send('Hello world');
        });
        this.app.listen(this.port, () => {
            console.log(`server run on http://localhost:${this.port}`);
        });
    }
    config() {
        // set up mongoose
        mongoose.connect(this.mongoUri, () => {
            console.log(`mongoose run on ${this.mongoUri}`);
        });
        Article.default;
        Tag.default;
        // config
        this.app
            .use(bodyParser.urlencoded({ extended: true }))
            .use(bodyParser.json())
            .use(logger('dev'))
            .use(compression())
            .use(helmet())
            .use(cors());
    }
    routes() {
        this.app.use('/api/articles', articlesRouter.default);
        this.app.use('/api/tags', tagsRouter.default);
    }
}
exports.default = Server;
