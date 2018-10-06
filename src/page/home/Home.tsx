import * as React from 'react';

// Style
import Logo from '../../image/logo.svg';
import './Home.css';

// Component
import { Breadcrumb as Breadcrumb } from '../../components/breadcrumb/Breadcrumb'

// Class
import { Link as Link } from '../../class/Link'

export default class Home extends React.Component {
  render() {
    return (
      <div>
        <Breadcrumb listLink={this.getLinks()} />
        <div className="jumbotron">
          <header>
            <div className="text-center">
              <img className="App-logo" src={Logo} alt="logo" />
              <h1 className="display-3">Hello, world!</h1>
            </div>
            <p className="lead">This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>
            <p>It uses utility classes for typography and spacing to space content out within the larger container.</p>
          </header>
        </div>
      </div>
    )
  }

  public getLinks(): Link[] {
    const links = Array<Link>()
    links.push(new Link("Home", "/home", 1, false))
    links.push(new Link("Index", "", 2, true))
    return links
  }
}