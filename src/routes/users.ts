import * as Express from 'express'
import { Request, Response } from 'express'
import DbUser from '../dbModels/User'

let router = Express.Router()

/**
 * Get an user
 * @returns an user
 */
router.get('/:id', (req: Request, res: Response) => {
  DbUser.findById(req.params.id)
    .populate('messages')
    .populate('getMessages')
    .then(user => {
      res.send(user)
    })
})

/**
 * Get all user
 * @returns collections of users
 */
router.get('/', (req: Request, res: Response) => {
  DbUser.find({})
    .populate('messages')
    .populate('getMessages')
    .then(users => {
      res.send(users)
    })
})

/**
 * Post an article
 */
router.post('/', (req: Request, res: Response) => {
  let newUser = new DbUser(req.body);
  newUser.save((err, user) => {
    if (err) {
      res.send(err)
    }
    res.send(user)
  })
})

/**
 * Put an article
 */
router.put('/:id', (req: Request, res: Response) => {
  DbUser.findByIdAndUpdate(
    { _id: req.params.id },
    req.body,
    { new: true }, // to return the user
    (err, user) => {
      if (err) {
        res.send(err)
      }
      res.send(user)
    })
})

router.delete('/:id', (req: Request, res: Response) => {
  DbUser.remove(
    { _id: req.params.id },
    (err) => {
      if (err) {
        res.send(err);
      }
      console.log(`deleted user ${req.params.id}`);
    })
})

export default router




      // .then(user => {
      //   user = [...user, req.body.name, req.body.date, req.body.text]

      //   return user.save()
      // })
      // .catch((err) => {
      //   res.status(500).send(err)
      // })