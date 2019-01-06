import * as React from 'react'
import * as socketIo from 'socket.io-client'
import Server from '../../http/server'

// Class
import { IMessage } from './../../class/Message'
import { IRoom } from './../../class/Room'
import { IUser } from './../../class/User'

export interface IChatState {
  userOk: boolean
  endPoint: string
  listRoom: IRoom[]
  room: IRoom
  listUser: IUser[]
  user: IUser
  listMessage: IMessage[]
  message: IMessage
}

export default class Chat extends React.Component<any, IChatState> {
  socket: SocketIOClient.Socket
  user: IUser

  constructor(props: any) {
    super(props)
    this.state = {
      userOk: false,
      endPoint: Server.getUrl(),
      listMessage: [],
      listRoom: [],
      listUser: [],
      message: { id: "", date: new Date(), idRoom: "", idUser: "", text: "" },
      room: { id: "", name: "" },
      user: { id: "", name: "", idRoom: "", idSocket: "", isAdmin: false },
    }

    this.handleOnClickJoin = this.handleOnClickJoin.bind(this)
    this.handleOnChangeInput = this.handleOnChangeInput.bind(this)
    this.handleOnChangeTextArea = this.handleOnChangeTextArea.bind(this)
    this.handleOnClickSendMessage = this.handleOnClickSendMessage.bind(this)
  }

  componentDidMount() {
    this.socket = socketIo.connect(Server.getUrl(), { reconnection: true })
    this.initSocketEvent()
  }

  initSocketEvent = () => {
    this.socket.on('newMessage', (message: IMessage) => {
      console.log(message)
      this.setState({
        listMessage: [...this.state.listMessage, message]
      })
    })

    this.socket.on('updateUserList', (users: IUser[]) => {
      console.log('Update list users')
      this.setState({
        listUser: users
      })
    })
  }

  handleOnChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    switch (event.target.name) {
      case 'name':
        this.setState({
          user: {
            id: "",
            idRoom: "",
            idSocket: "",
            name: event.target.value,
            isAdmin: false
          }
        })
        break
      case 'room':
        this.setState({
          room: {
            id: "",
            name: event.target.value,
          }
        })
        break
    }
  }

  handleOnChangeTextArea = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    switch (event.target.name) {
      case "text":
        this.setState({
          message: {
            date: new Date(),
            id: "",
            idRoom: "",
            idUser: "",
            text: event.target.value
          }
        })
        break
    }
  }

  handleOnClickSendMessage = (event: React.FormEvent<HTMLElement>) => {
    event.preventDefault()
    this.sendMessage(event)
  }

  sendMessage(event: React.FormEvent<HTMLElement>) {
    const text = this.state.message.text

    if (text.length !== 0) {
      this.socket.emit('createMessage', this.user.id, text, (ok: boolean) => {
        console.log('Message is sent')
      })
    }
  }

  handleOnClickJoin = (event: React.FormEvent<HTMLElement>) => {
    this.joinRoomUser(event)
  }

  joinRoomUser(event: React.FormEvent<HTMLElement>) {
    const nameUser = this.state.user.name
    const nameRoom = this.state.room.name
    this.setState({
      user: {
        id: this.state.user.id,
        idRoom: this.state.user.idRoom,
        name: this.state.user.name,
        idSocket: this.socket.id,
        isAdmin: false
      }
    })

    if (nameRoom.length !== 0 && nameUser.length !== 0) {
      this.socket.emit('join', nameUser, nameRoom, (ok: boolean, newUser: IUser) => {
        console.log('join')
        if (ok) {
          this.user = newUser

          this.setState({
            userOk: true,
            listRoom: [...this.state.listRoom, this.state.room]
          })
        }
      })
    }
  }

  getUserName = (idUser: string) => {
    const user: IUser = this.state.listUser.filter(u => u.id === idUser)[0]
    if (user) {
      return user.name
    }
    return ''
  }

  IsAdmin = (idUser: string) => {
    const user: IUser = this.state.listUser.filter(u => u.id === idUser)[0]
    if (user) {
      return user.isAdmin
    }
    return false
  }

  render() {
    return (
      <div className="container">
        <div className="row" hidden={this.state.userOk}>
          <form className="col">
            <input className="form-control" type="text" name="name" placeholder='Your name' defaultValue="" onChange={this.handleOnChangeInput} />
            <small className="form-text text-muted">Name</small>
            <input className="form-control" type="text" name="room" placeholder='Any room' defaultValue="" onChange={this.handleOnChangeInput} />
            <small className="form-text text-muted">Room</small>
            <button type="button" className="btn btn-primary form-control" onClick={this.handleOnClickJoin}>Ok</button>
          </form>
        </div>

        <p className="lead">Some things to tell..</p>

        <div className="row" hidden={!this.state.userOk}>
          <input className="form-control" type="button" name="quit" value="Exit" onChange={this.handleOnChangeInput} />
          <br />
          <div className="col-12">
            users:&nbsp;
            {
              this.state.listUser.filter(u => !u.isAdmin).map(user => {
                return (
                  <div key={user.id} className="badge badge-light">
                    <div>{user.name}</div>
                  </div>
                )
              })
            }
          </div>
          <br />
          <div className="col-8">
            {this.state.listMessage.map(msg =>
              this.IsAdmin(msg.idUser) ?
                (
                  <p>
                    <div className="badge badge-info">{this.getUserName(msg.idUser)}</div>
                    <div>{msg.text}</div>
                  </p>
                ) : (
                  <p>
                    <div key={msg.id} className="card card-body">
                      <div className="badge badge-pill badge-light">{this.getUserName(msg.idUser)}</div>
                      <div>{msg.text}</div>
                    </div>
                  </p>
                )
            )}
          </div>

          <div className="col" hidden={!this.state.userOk}>
            <form className="position-fixed">
              <input className="form-control" disabled={true} type="text" name="name" placeholder='write your name' defaultValue={this.state.user.name} />
              <small className="form-text text-muted">Name</small>
              <textarea className="form-control" placeholder='write message' name="text" defaultValue={this.state.message.text} onChange={this.handleOnChangeTextArea} />
              <small className="form-text text-muted">message</small>
              <button type="button" className="btn btn-primary form-control" onClick={this.handleOnClickSendMessage}>Send message</button>
            </form>
          </div>
        </div>
      </div >
    )
  }
}
