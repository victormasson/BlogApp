
interface ILink {
  name: string,
  path: string,
  position: number,
  active: boolean,
}

class Link implements ILink {
  name: string
  path: string
  position: number
  active: boolean

  constructor(name: string, path: string, position: number, active: boolean, ) {
    this.name = name
    this.path = path
    this.position = position
    this.active = active
  }
}

export {
  Link, ILink
}