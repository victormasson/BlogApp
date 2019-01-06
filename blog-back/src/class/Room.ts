import * as crypto from 'crypto'
import { Guid } from 'guid-typescript'

export class Room {
  public id: string
  public name: string

  constructor(name: string) {
    let id = Guid.create().toString()
    this.id = id
    this.name = name
  }
}

export class ListRoom {
  public rooms: Room[]

  constructor() {
    this.rooms = []
  }

  addRoom(name: string): Room {
    if (this.existRoom(name)) {
      return this.getRoomByName(name)
    } else {
      let room: Room = new Room(name)
      this.rooms = [...this.rooms, room]
      return room
    }
  }

  getRoomById(id: string): Room {
    return this.rooms.filter((room) => room.id === id)[0]
  }

  getRoomByName(name: string): Room {
    return this.rooms.filter((room) => room.name === name)[0]
  }

  existRoom(name: string): boolean {
    let rooms = this.rooms.filter((room) => room.name === name)
    return rooms.length !== 0
  }
}
