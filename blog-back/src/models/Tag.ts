import * as mongoose from 'mongoose'

let tagSchema = new mongoose.Schema({
  name: String,
  color: {
    type: String,
    default: 'red'
  }
})

tagSchema.virtual('articles', {
  ref: 'Article',
  localField: '_id',
  foreignField: 'tags'
})

let tag = mongoose.model('Tag', tagSchema)
export default tag