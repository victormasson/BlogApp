"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
let articleSchema = new mongoose.Schema({
    name: String,
    date: Date,
    text: String,
    author: String,
    tags: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Tag'
        }
    ]
});
let article = mongoose.model('Article', articleSchema);
exports.default = article;
