"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const http = require("http");
const chat_1 = require("./routes/chat");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const compression = require("compression");
const logger = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
// models
const Article_1 = require("./dbModels/Article");
const Tag_1 = require("./dbModels/Tag");
const User_1 = require("./dbModels/User");
const Message_1 = require("./dbModels/Message");
// router
const articles_1 = require("./routes/articles");
const tags_1 = require("./routes/tags");
const users_1 = require("./routes/users");
class Server {
    constructor(port, mongoUri) {
        this.port = port;
        this.mongoUri = mongoUri;
        this.app = express();
        this.httpServer = new http.Server(this.app);
        new chat_1.default(this.httpServer);
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
        // model definition
        Article_1.default;
        Tag_1.default;
        User_1.default;
        Message_1.default;
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
        this.app.use('/api/articles', articles_1.default);
        this.app.use('/api/tags', tags_1.default);
        this.app.use('/api/users', users_1.default);
    }
}
exports.default = Server;
