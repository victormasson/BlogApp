import * as http from 'http'
import * as socketIo from 'socket.io'
import { Server, Socket } from 'socket.io'

// Class
import { ListMessage, Message } from './../class/Message'
import { ListRoom, Room } from './../class/Room'
import { ListUser, User } from './../class/User'

var listMessage = new ListMessage()
var listRoom = new ListRoom()
var listUser = new ListUser()

export default class Chat {
  public socketServer: Server

  constructor(app: Server) {
    this.socketServer = app
    // this.socketServer = socketIo.listen(app)
    this.startSocketServer()
  }

  startSocketServer() {
    this.socketServer.on('connection', (socket: Socket) => {
      console.log(`User ${socket.id} is connected`)

      socket.on('join', (userName: string, roomName: string, callback) => {
        if (!userName || !roomName) {
          return callback(false, 'User name and room name are required')
        }
        // else if (listUser.existUserName(userName)) {
        //   return callback(false, `Name ${userName} already taken`)
        // } else if (listRoom.existRoom(roomName)) {
        //   return callback(false, `Room ${roomName} doesn't exist.`)
        // }

        let admin: User = listUser.getAdmin()
        let room: Room = listRoom.addRoom(roomName)

        socket.join(room.id)
        let user: User = listUser.addUser(socket.id, userName, room.id)
        socket.emit('newMessage', listMessage.addMessageAdmin('Welcome to the chat app', room.id, admin.id))
        socket.broadcast.to(room.id).emit('newMessage', listMessage.addMessageAdmin(`${userName} has joigned`, room.id, admin.id))
        this.socketServer.to(room.id).emit('updateUserList', listUser.getUserListOfRoom(user.idRoom))

        callback(true, user)
      })

      socket.on('createMessage', (idUser: string, text: string, callback) => {
        let ok: boolean = false
        let user = listUser.getUserById(idUser)
        if (user) {
          let message = listMessage.addMessage(text, user.idRoom, user.id)

          if (message) {
            this.socketServer.to(user.idRoom).emit('newMessage', message)
            ok = true
          }
        }

        callback(ok)
      })

      socket.on('disconnect', () => {
        console.log(`User ${socket.id} was disconnected`)
        let user = listUser.getUserBySocket(socket.id)
        if (user) {
          listUser.removeUser(user.id)
          let admin: User = listUser.getAdmin()
          this.socketServer.to(user.idRoom).emit('newMessage', listMessage.addMessageAdmin(`${user.name} has left the room.`, user.idRoom, admin.id))
          this.socketServer.to(user.idRoom).emit('updateUserList', listUser.getUserListOfRoom(user.idRoom))
        }
      })
    })
  }
}