
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


}

export {
  Link, ILink
}