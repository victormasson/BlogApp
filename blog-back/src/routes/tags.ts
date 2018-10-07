import * as Express from 'express'
import { Request, Response } from 'express'
import DbTag from '../dbModels/Tag'

let router = Express.Router()

/**
 * Get an tag
 * @returns an tag
 */
router.get('/:id', (req: Request, res: Response) => {
  DbTag.findById(req.params.id)
    .populate('articles')
    .then(tag => {
      res.send(tag)
    })
})

/**
 * Get all tags
 * @returns collection of tags
 */
router.get('/', (req: Request, res: Response) => {
  DbTag.find({})
    .populate('tags')
    .then(tags => {
      res.send(tags)
    })
})

export default router