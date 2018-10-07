"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Express = require("express");
const Tag_1 = require("../dbModels/Tag");
let router = Express.Router();
/**
 * Get an tag
 * @returns an tag
 */
router.get('/:id', (req, res) => {
    Tag_1.default.findById(req.params.id)
        .populate('articles')
        .then(tag => {
        res.send(tag);
    });
});
/**
 * Get all tags
 * @returns collection of tags
 */
router.get('/', (req, res) => {
    Tag_1.default.find({})
        .populate('tags')
        .then(tags => {
        res.send(tags);
    });
});
exports.default = router;
