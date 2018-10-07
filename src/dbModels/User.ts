import * as mongoose from 'mongoose'

let userSchema = new mongoose.Schema({
  name: String,
  login: String,
  password: String,
  messages: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Message'
    }
  ]
})

userSchema.virtual('getMessages', {
  ref: 'Message',
  localField: '_id',
  foreignField: 'sendTo'
})

export default mongoose.model('User', userSchema)