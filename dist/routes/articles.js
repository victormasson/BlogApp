"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const Article_1 = require("../models/Article");
let router = express.Router();
/**
 * Get all articles
 * @returns collection of articles
 */
router.get('/', (req, res) => {
    Article_1.default.find({})
        .populate('tags')
        .then(articles => {
        res.send(articles);
    });
});
/**
 * Get an article
 * @returns an article
 */
router.get('/:id', (req, res) => {
    Article_1.default.findById(req.params.id)
        .populate('tags')
        .then(article => {
        res.send(article);
    });
});
/**
 * Post an article
 */
// router.post('/:id?', (req: Request, res: Response) => {
//   new Promise((resolve, reject) => {
//     if (req.params.id) {
//       Article.findById(req.params.id)
//         .then(resolve, reject)
//     }
//     else {
//       resolve(new Article())
//     }
//   }).then(article: Document => {
//     article.name = req.body.name
//     article.date = req.body.date
//     article.text = req.body.text
//     article.author = req.body.author
//     return article.save()
//   })
// })
exports.default = router;
