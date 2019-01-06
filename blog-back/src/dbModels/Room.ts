import * as mongoose from 'mongoose'

let roomSchema = new mongoose.Schema({
  name: String,
  dateOfCreation: Date,
})

export default mongoose.model('Room', roomSchema)