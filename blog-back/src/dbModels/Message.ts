import * as mongoose from 'mongoose'

let messageSchema = new mongoose.Schema({
  date: Date,
  text: String,
  sendTo: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  ]
})

export default mongoose.model('Message', messageSchema)