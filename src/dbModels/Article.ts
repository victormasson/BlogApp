import * as mongoose from 'mongoose'

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
})

export default mongoose.model('Article', articleSchema)