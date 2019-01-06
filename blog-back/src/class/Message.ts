import * as crypto from 'crypto'
import { Guid } from 'guid-typescript'

export class Message {
  public id: string
  public text: string
  public date: Date
  public idRoom: string
  public idUser: string

  constructor(text: string, idRoom: string, idUser: string) {
    let id = Guid.create().toString()
    let date = new Date()
    this.id = id
    this.text = text
    this.date = date
    this.idRoom = idRoom
    this.idUser = idUser
  }
}

export class ListMessage {
  private messages: Message[]

  constructor() {
    this.messages = []
  }

  addMessage(text: string, idRoom: string, idUser: string): Message {
    let message: Message = new Message(text, idRoom, idUser)
    this.messages = [...this.messages, message]
    return message
  }

  addMessageAdmin(text: string, idRoom: string, idUser: string): Message {
    let message: Message = new Message(text, idRoom, idUser)
    return message
  }

  getMessageOfUser(id: string): Message[] {
    return this.messages.filter((m) => m.idUser === id)
  }
}