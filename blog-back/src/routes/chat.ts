import * as http from 'http'
import * as io from 'socket.io'

export default class Chat {
  public server: io.Server
  // public listUser: IUser[]

  constructor(app: http.Server) {
    this.server = io(app)
    // this.listUser = []
    this.startSocketServer()
  }

  startSocketServer() {
    this.server.on('connection', (socket: io.Socket) => {
      console.log('new connection ' + socket.id)
      this.addUser(socket.id)

      socket.on('disconnect', () => {
        console.log('disconnected ' + socket.id)
      })
    })
  }

  addUser(id: string) {
    // let user: IUser = {
    //   _id: id,
    //   login: '',
    //   name: '',
    //   password: '',
    // }

    // this.listUser.push(user)
  }
}