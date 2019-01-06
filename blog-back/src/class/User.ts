import { Guid } from 'guid-typescript'


export class User {
  public id: string
  public name: string
  public idRoom: string
  public idSocket: string
  public isAdmin: boolean

  constructor(name: string, idRoom: string, idSocket: string, isAdmin: boolean) {
    let id = Guid.create().toString()
    this.id = id
    this.name = name
    this.idRoom = idRoom
    this.idSocket = idSocket
    this.isAdmin = isAdmin
  }
}

export class ListUser {
  private users: User[]

  constructor() {
    this.users = []
    let userAdmin: User = new User('Admin', '_', '_', true)
    this.users = [...this.users, userAdmin]
  }

  addUser(idSocket: string, name: string, idRoom: string): User {
    if (!this.existUserName(name)) {
      let user: User = new User(name, idRoom, idSocket, false)
      this.users = [...this.users, user]
      return user
    }

    return this.getUserByName(name)
  }

  removeUser(id: string): number {
    if (this.existUserId(id)) {
      this.users = this.users.filter(u => u.id !== id)
      return 1
    }
    return 0
  }

  getAdmin(): User {
    return this.users.filter(u => u.isAdmin)[0]
  }

  getUserById(id: string): User {
    return this.users.filter((user) => user.id === id)[0]
  }

  getUserBySocket(idSocket: string): User {
    return this.users.filter((user) => user.idSocket === idSocket)[0]
  }

  getUserByName(name: string): User {
    return this.users.filter((user) => user.name === name)[0]
  }

  getUserListOfRoom(idRoom: string): User[] {
    return this.users.filter((user) => user.idRoom === idRoom || user.isAdmin)
  }

  existUserId(id: string): boolean {
    let users = this.users.filter((user) => user.id === id)
    return users.length !== 0
  }

  existUserName(name: string): boolean {
    let users = this.users.filter((user) => user.name === name)
    return users.length !== 0
  }
}