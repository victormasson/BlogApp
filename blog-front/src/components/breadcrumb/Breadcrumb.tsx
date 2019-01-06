import * as React from 'react'

// Class
import { ILink as ILink } from '../../class/Link'

export interface IBreadcrumbProps {
  listLink: ILink[],
}

export class Breadcrumb extends React.Component<IBreadcrumbProps> {

  public static defaultProps: Partial<IBreadcrumbProps> = {
    listLink: [],
  }

  public render() {
    if (this.props.listLink !== null && this.props.listLink.length === 0) {
      return (
        <div />
      )
    }

    return (
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          {this.props.listLink.map(item =>
            item.active ? (
              <li className="breadcrumb-item active" aria-current="page" >
                <a href={item.path}>{item.name}</a>
              </li>
            ) : (
                <li className="breadcrumb-item">
                  {item.name}
                </li>
              )
          )}
        </ol>
      </nav >
    )
  }
}









