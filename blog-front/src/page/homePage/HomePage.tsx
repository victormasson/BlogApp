import * as React from 'react'

// Style
import Logo from '../../image/logo.svg'
import './Home.css'

export default class HomePage extends React.Component {
  render() {
    return (
      <div>
        <div className="jumbotron">
          <header>
            <div className="text-center">
              <img className="App-logo" src={Logo} alt="logo" />
              <h1 className="display-3">Hello, world!</h1>
            </div>
            <p className="lead">Some things to tell..</p>
            <p>Others here.</p>
          </header>
        </div>
      </div>
    )
  }
}